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

import {computed, ComputedRef, Ref, ref, watch} from "vue";
import {SolcIndexLoader} from "@/components/registration/SolcIndexLoader";
import {BytecodeComparison, SolcUtils} from "@/utils/solc/SolcUtils";
import {ContractAnalyzer} from "@/utils/ContractAnalyzer";
import {ContractLoader} from "@/components/contract/ContractLoader";
import {routeManager} from "@/router";
import {AppStorage, ContractMetadata} from "@/AppStorage";
import {HederaNetwork} from "@bladelabs/blade-web3.js/lib/src/models/blade";

export class RegistrationController {

    public readonly currentStep: Ref<number> = ref(1)
    public readonly source: Ref<string|null> = ref(null)
    public readonly sourceFileName: Ref<string|null> = ref(null)
    public readonly compilerVersion: Ref<string|null> = ref(null)
    public readonly importSpecs: Ref<Array<ImportSpec>> = ref([])


    private readonly contractId: Ref<string|null> = ref(null)
    private readonly solcIndexLoader = new SolcIndexLoader()
    private readonly contractLoader: ContractLoader
    public readonly contractAnalyser: ContractAnalyzer


    //
    // Public
    //

    public constructor(contractId: Ref<string|null>) {
        this.contractId = contractId
        this.contractLoader = new ContractLoader(this.contractId)
        this.contractAnalyser = new ContractAnalyzer(this.contractLoader.entity, this.contractMetadata)

        watch(this.source, () => {
            this.compilerVersion.value = this.guessedCompilerVersion.value
            this.importSpecs.value = this.guessedImportSpecs.value
        })

        watch(this.importSpecs, () => {
            this.updateImportSpecs()
        }, { deep: true })
    }

    public activate(): void {
        this.contractLoader.requestLoad()
        this.solcIndexLoader.requestLoad()
        this.currentStep.value = 1
        this.sourceFileName.value = null
        this.source.value = null // => reset this.compilerVersion,  this.importSpecs and this.compilationRecord
    }

    public inactivate(): void {
        this.contractLoader.clear()
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

    public readonly guessedCompilerVersion = computed<string|null>(() => {
        let result: string|null
        const solcIndex = this.solcIndexLoader.entity.value
        if (this.source.value !== null && solcIndex !== null) {
            result = SolcUtils.extractSourceVersion(this.source.value, solcIndex)
        } else {
            result = null
        }
        return result
    })

    public readonly guessedImportSpecs = computed<Array<ImportSpec>>(() => {
        const result = Array<ImportSpec>()

        if (this.source.value !== null) {
            for (const p of SolcUtils.extractImportPaths(this.source.value, this.builtinImports)) {
                result.push(new ImportSpec(p))
            }
        }

        return result
    })

    public readonly guessedImportSpecCount = computed(() => this.guessedImportSpecs.value.length)

    public readonly unresolvedSpecCount = computed(() => {
        return ImportSpec.countUnresolvedSpecs(this.importSpecs.value)
    })

    public readonly bytecodeComparison: ComputedRef<BytecodeComparison|null> = computed(() => {
        return this.contractAnalyser.bytecodeComparison.value
    })

    public readonly readyForRegister = computed(() => {
        return this.contractAnalyser.bytecodeComparison.value !== BytecodeComparison.mismatch
    })

    public readonly compilerLongVersion = computed(() => {
        let result: string|null
        if (this.compilerVersion.value !== null) {
            result = "v" + this.solcIndexLoader.fetchLongVersion(this.compilerVersion.value)
        } else {
            result = null
        }
        return result
    })

    public readonly contractMetadata  = computed(() => {
        let result: ContractMetadata|null
        if (this.compilerLongVersion.value !== null
            && this.source.value !== null
            && this.sourceFileName.value !== null) {
            result = {
                version: this.compilerLongVersion.value,
                source: this.source.value,
                sourceFileName: this.sourceFileName.value,
                importSources: ImportSpec.makeImportSources(this.importSpecs.value),
                creationTime: Date.now()
            }
        } else {
            result = null
        }
        return result
    })

    public readonly busy = computed(() => {
        return this.currentStep.value == 4 && this.contractAnalyser.compiling.value
    })

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
        return !enabled || this.busy.value
    })

    public readonly isBackDisabled = computed(() => {
        return this.currentStep.value == 1 || this.busy.value || this.currentStep.value == 5
    })


    public handleNext(): void {
        this.currentStep.value += 1
        if (this.currentStep.value == 4) {
            this.contractAnalyser.mount()
        } else if (this.currentStep.value == 5
            && this.contractId.value !== null
            && this.contractAnalyser.compilationRecord.value !== null) {
            const network = routeManager.currentNetwork.value as HederaNetwork
            AppStorage.setContractMetadata(network, this.contractId.value,
                this.contractAnalyser.compilationRecord.value.metadata)
        }
    }

    public handleBack(): void {
        this.currentStep.value -= 1
        if (this.currentStep.value == 3) {
            this.contractAnalyser.unmount()
        }
    }


    //
    // Private
    //

    // private readonly builtinImports = [
    //     "HederaTokenService.sol",
    //     "HederaResponseCodes.sol",
    //     "IHederaTokenService.sol"
    // ]
    //
    private readonly builtinImports = Array<string>()

    private updateImportSpecs(): void {
        const specMap = new Map<string, ImportSpec>()
        for (const s of this.importSpecs.value) {
            specMap.set(s.path, s)
        }
        for (const s of this.importSpecs.value) {
            if (s.source !== null) {
                for (const p of SolcUtils.extractImportPaths(s.source, this.builtinImports)) {
                    if (!specMap.has(p)) {
                        specMap.set(p, new ImportSpec(p))
                    }
                }
            }
        }
        for (const s of this.importSpecs.value) {
            specMap.delete(s.path)
        }
        if (specMap.size >= 1) {
            const newImportSpecs: ImportSpec[] = []
            for (const s of this.importSpecs.value) {
                newImportSpecs.push(s)
            }
            for (const s of specMap.values()) {
                newImportSpecs.push(s)
            }
            this.importSpecs.value = newImportSpecs
        }
    }
}

export class ImportSpec {

    public readonly path: string
    public source: string|null = null
    public sourceFileName: string|null = null

    constructor(path: string) {
        this.path = path
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
