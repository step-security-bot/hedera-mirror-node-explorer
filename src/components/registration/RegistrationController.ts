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
import {SolcTools} from "@/utils/contract-registry/solc/SolcTools";
import {ErrorDescription, SolcOutput} from "@/utils/solc/SolcOutput";
import {Solc} from "@/utils/solc/Solc";
import {BytecodeComparison, SolcUtils} from "@/utils/solc/SolcUtils";
import {ContractLoader} from "@/components/contract/ContractLoader";

export class RegistrationController {

    public readonly currentStep: Ref<number> = ref(1)
    public readonly source: Ref<string|null> = ref(null)
    public readonly sourceFileName: Ref<string|null> = ref(null)
    public readonly compilerVersion: Ref<string|null> = ref(null)
    public readonly importSpecs: Ref<Array<ImportSpec>> = ref([])
    public readonly solcOutput: Ref<SolcOutput|null> = ref(null)


    private readonly contractId: Ref<string|null> = ref(null)
    private readonly solcIndexLoader = new SolcIndexLoader()
    private readonly contractLoader: ContractLoader
    public readonly busy: Ref<boolean> = ref(false)


    //
    // Public
    //

    public constructor(contractId: Ref<string|null>) {
        this.contractId = contractId
        this.contractLoader = new ContractLoader(this.contractId)

        watch(this.source, () => {
            this.compilerVersion.value = this.guessedCompilerVersion.value
            this.importSpecs.value = this.guessedImportSpecs.value
            this.solcOutput.value = null
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
        this.source.value = null // => reset this.compilerVersion and this.importSpecs
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
            result = SolcTools.extractSourceVersion(this.source.value, solcIndex)
        } else {
            result = null
        }
        return result
    })

    public readonly guessedImportSpecs = computed<Array<ImportSpec>>(() => {
        const result = Array<ImportSpec>()

        if (this.source.value !== null) {
            for (const p of SolcTools.extractImportPaths(this.source.value, this.builtinImports)) {
                result.push(new ImportSpec(p))
            }
        }

        return result
    })

    public readonly guessedImportSpecCount = computed(() => this.guessedImportSpecs.value.length)

    public readonly unresolvedSpecCount = computed(() => {
        return ImportSpec.countUnresolvedSpecs(this.importSpecs.value)
    })

    public readonly deployedBytecode = computed(() => {
        const result = this.contractLoader.runtimeBytecode.value
        return result !== null && result.startsWith("0x") ? result.slice(2) : result
    })

    public readonly matchingContract = computed(() => {
        let result: string|null
        const sourceFileName = this.sourceFileName.value
        const deployedBytecode = this.deployedBytecode.value
        const solcOutput = this.solcOutput.value
        const errorCount = this.compilationErrors.value.length
        if (sourceFileName !== null
            && deployedBytecode !== null
            && solcOutput !== null
            && errorCount == 0) {
            result = SolcUtils.findMatchingContract(sourceFileName, deployedBytecode, solcOutput)
            console.log("contractName=" + result)
        } else {
            result = null
        }
        return result
    })

    public readonly bytecodeComparison = computed(() => {
        let result: BytecodeComparison
        const solcOutput = this.solcOutput.value
        const matchingContract = this.matchingContract.value
        const sourceFileName = this.sourceFileName.value
        const compiledBytecode = sourceFileName !== null && matchingContract !== null && solcOutput !== null ?
            SolcUtils.fetchBytecode(sourceFileName, matchingContract, solcOutput) : null
        const deployedBytecode = this.deployedBytecode.value
        if (compiledBytecode !== null && deployedBytecode !== null) {
            result = SolcUtils.compareBytecode(compiledBytecode, deployedBytecode)
        } else {
            result = BytecodeComparison.mismatch
        }
        console.log("bytecodeComparison=" + result)
        return result
    })

    public readonly readyForRegister = computed(() => {
        return this.bytecodeComparison.value !== BytecodeComparison.mismatch
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

    public readonly compilationErrors = computed(() => {
        const result: ErrorDescription[] = []
        for (const e of this.solcOutput.value?.errors ?? []) {
            if (e.severity == "error") {
                result.push(e)
            }
        }
        return result
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
        if (this.currentStep.value == 4
            && this.contractId.value !== null
            && this.source.value !== null
            && this.sourceFileName.value !== null
            && this.compilerLongVersion.value !== null ) {
            this.busy.value = true

            const solcInput = Solc.makeSolcInput(this.source.value, this.sourceFileName.value)
            const importSources = ImportSpec.makeImportSources(this.importSpecs.value)
            Solc.run(this.compilerLongVersion.value, solcInput, importSources)
                .then((r: SolcOutput) => {
                    this.solcOutput.value = Object.freeze(r) // To avoid proxying
                })
                .catch((error) => {
                    console.log("Dry run did fail with error: " + error)
                    this.solcOutput.value = null
                })
                .finally(() => {
                    this.busy.value = false
                })
        } else if (this.currentStep.value == 5
            && this.contractId.value !== null
            && this.solcOutput.value !== null) {
            const contractId = this.contractId.value
            console.log("Will register " + contractId)
        }
    }

    public handleBack(): void {
        this.currentStep.value -= 1
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
                for (const p of SolcTools.extractImportPaths(s.source, this.builtinImports)) {
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
                const fileName = this.fileName(s.path)
                if (fileName != s.path) {
                    result[fileName] = s.source
                }
            }
        }
        console.log("importSources=" + JSON.stringify(result, null, "  "))
        return result
    }

    private static fileName(path: string): string {
        let result: string
        const i = path.lastIndexOf("/")
        if (i != -1) {
            result = path.substring(i+1)
        } else {
            result = path
        }
        return result
    }
}
