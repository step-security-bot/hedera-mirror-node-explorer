/*-
 *
 * Hedera Mirror Node Explorer
 *
 * Copyright (C) 2021 - 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {computed, Ref, ref, watch} from "vue";
import {SolcIndexLoader} from "@/components/registration/SolcIndexLoader";
import {CompilationRequest, RegisterResponse, RegistrationStatus} from "@/utils/contract-registry/RegistrySchema";
import {RegistryService} from "@/utils/contract-registry/RegistryService";
import {routeManager} from "@/router";

export class RegistrationController {

    public readonly currentStep: Ref<number> = ref(1)
    public readonly source: Ref<string|null> = ref(null)
    public readonly sourceFileName: Ref<string|null> = ref(null)
    public readonly compilerVersion: Ref<string|null> = ref(null)
    public readonly importSpecs: Ref<Array<ImportSpec>> = ref([])
    public readonly registerResponse: Ref<RegisterResponse|null> = ref(null)


    private readonly contractId: string
    private readonly solcIndexLoader = new SolcIndexLoader()
    private readonly buzy: Ref<boolean> = ref(false)


    //
    // Public
    //

    public constructor(contractId: string) {
        this.contractId = contractId

        watch(this.source, () => {
            this.compilerVersion.value = this.guessedCompilerVersion.value
            this.importSpecs.value = this.guessedImportSpecs.value
            this.registerResponse.value = null
        })
    }

    public activate(): void {
        this.solcIndexLoader.requestLoad()
        this.currentStep.value = 1
        this.source.value = null // => reset this.compilerVersion and this.importSpecs
    }

    public inactivate(): void {
        this.solcIndexLoader.clear()
    }

    //
    // Public (computed)
    //

    public readonly sourceHead = computed(() => {
        return this.source.value !== null ? this.source.value.slice(0, 15) + "..." : null
    })

    public readonly allCompilerVersions = computed(() => {
        const solcIndex = this.solcIndexLoader.entity.value
        return solcIndex !== null ? Object.keys(solcIndex.releases).sort() : null
    })

    public readonly compilerVersionCount = computed(
        () => this.allCompilerVersions.value?.length ?? 0)

    public readonly latestCompilerVersion = computed(() => {
        return this.solcIndexLoader.entity.value?.latestRelease ?? null
    })

    public readonly guessedCompilerVersion = computed<string|null>(() => {
        // To be implemented
        return this.source.value !== null ? this.latestCompilerVersion.value : null
    })

    public readonly guessedImportSpecs = computed<Array<ImportSpec>>(() => {
        // To be implemented
        return []
    })

    public readonly guessedImportSpecCount = computed(() => this.guessedImportSpecs.value.length)

    public readonly unresolvedSpecCount = computed(() => {
        return ImportSpec.countUnresolvedSpecs(this.importSpecs.value)
    })

    public readonly readyForRegister = computed(() => {
        return this.registerResponse.value?.status == RegistrationStatus.accepted
    })

    public readonly compilerRelease = computed(() => {
        return "0.8.17+commit.8df45f5f"
        // let result: string|null
        // if (this.compilerVersion.value !== null) {
        //     result = this.solcIndexLoader.entity.value?.releases[this.compilerVersion.value] ?? null
        // } else {
        //     result = null
        // }
        // return result
    })
    //
    // public readonly contractName = computed(() => {
    //     let result: string|null
    //     const sourceFileName = this.sourceFileName.value
    //     if (sourceFileName !== null) {
    //         const extension = ".sol"
    //         result = sourceFileName.endsWith(extension) ? sourceFileName.slice(0, -extension.length) : sourceFileName
    //     } else {
    //         result = null
    //     }
    //     return result
    // })

    //
    // Public (actions)
    //

    public readonly isNextDisabled = computed((): boolean => {
        let enabled: boolean
        switch(this.currentStep.value) {
            case 1:
                enabled = this.source.value !== null
                break
            case 2:
                enabled = this.compilerVersion.value !== null
                break
            case 3:
                enabled = this.unresolvedSpecCount.value == 0
                break
            case 4:
                enabled = this.readyForRegister.value
                break
            default:
                enabled = false
                break
        }
        return !enabled
    })

    public readonly isBackDisabled = computed(() => {
        return this.currentStep.value == 1
    })


    public handleNext(): void {
        this.currentStep.value += 1
        if (this.currentStep.value == 4
            && this.source.value !== null
            && this.compilerRelease.value !== null ) {
            this.buzy.value = true
            const compilationRequest: CompilationRequest = {
                solcVersion: this.compilerRelease.value,
                source: this.source.value,
                importSources: ImportSpec.makeImportSources(this.importSpecs.value)
            }
            console.log("compilationRequest=" + JSON.stringify(compilationRequest, null, "  "))
            RegistryService.register(
                this.contractId,
                routeManager.currentNetwork.value,
                compilationRequest,
                true)
                .then((r: RegisterResponse) => {
                    this.registerResponse.value = r
                })
                .catch((error) => {
                    console.log("Register did fail with error: " + error)
                    this.registerResponse.value = null
                })
                .finally(() => {
                    this.buzy.value = false
                })
        }
    }

    public handleBack(): void {
        this.currentStep.value -= 1
    }

}

export class ImportSpec {

    public readonly path: string
    public readonly source: string|null

    constructor(path: string, source: string|null) {
        this.path = path
        this.source = source
    }

    static countUnresolvedSpecs(specs: ImportSpec[]): number {
        let result = 0
        for (const s of specs) {
            if (s.source === null) {
                result += 1
            }
        }
        return result
    }

    static makeImportSources(specs: ImportSpec[]): Record<string, string> {
        const result = {} as Record<string, string>
        for (const s of specs) {
            if (s.source !== null) {
                result[s.path] = s.source
            }
        }
        return result
    }
}
