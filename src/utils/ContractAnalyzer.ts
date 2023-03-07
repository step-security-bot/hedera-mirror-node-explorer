/*-
 *
 * Hedera Mirror Node Explorer
 *
 * Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
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

import {computed, ComputedRef, ref, Ref, watch, WatchStopHandle} from "vue";
import {ContractResponse} from "@/schemas/HederaSchemas";
import {AppStorage, ContractMetadata} from "@/AppStorage";
import {getNetworkEntryFromCurrentRoute} from "@/router";
import {HederaNetwork} from "@bladelabs/blade-web3.js/lib/src/models/blade";
import {CompilationCache, CompilationRecord} from "@/utils/cache/CompilationCache";
import {BytecodeComparison, SolcUtils} from "@/utils/solc/SolcUtils";
import {ContractDescription} from "@/utils/solc/SolcOutput";
import {ethers} from "ethers";

export class ContractAnalyzer {

    private readonly contractRef: Ref<ContractResponse|null>
    private readonly watchHandles: WatchStopHandle[] = []

    //
    // Public
    //

    public constructor(contract: Ref<ContractResponse|null>) {
        this.contractRef = contract
    }

    public mount(): void {
        this.watchHandles.push(
            watch(this.contractRef, this.reloadContractMetadata, { immediate: true }),
        )
    }

    public unmount(): void {
        for (const wh of this.watchHandles) {
            wh()
        }
        this.watchHandles.splice(0)
    }

    public readonly contract: ComputedRef<ContractResponse|null> = computed(() => {
        return this.contractRef.value
    })

    public readonly contractId: ComputedRef<string|null> = computed(() => {
        return this.contractRef.value?.contract_id ?? null
    })

    public readonly signature: ComputedRef<string|null> = computed(() => {
        let result: string|null
        const abi = this.contractDescription.value?.abi ?? null
        if (abi !== null) {
            const itf = new ethers.utils.Interface(abi)
            result = itf.deploy.format("full") ?? null
        } else {
            result = null
        }
        return result
    })

    public readonly contractName: ComputedRef<string|null> = computed(() => {
        let result: string|null
        const compilationRecord = this.compilationRecord.value
        const deployedBytecode = this.contractRef.value?.runtime_bytecode ?? null
        if (compilationRecord !== null && deployedBytecode !== null) {
            result = compilationRecord.findMatchingContract(deployedBytecode)
        } else {
            result = null
        }
        return result
    })

    public readonly compilerVersion: ComputedRef<string|null> = computed(() => {
        return this.compilationRecord.value !== null ? this.compilationRecord.value.metadata.version : null
    })

    public readonly contractSource: ComputedRef<string|null> = computed(() => {
        return this.compilationRecord.value !== null ? this.compilationRecord.value.metadata.source : null
    })

    public readonly importSources: ComputedRef<Record<string, string>|null> = computed( () => {
        return this.compilationRecord.value !== null ? this.compilationRecord.value.metadata.importSources : null
    })

    public readonly contractDescription: ComputedRef<ContractDescription|null> = computed(() => {
        let result: ContractDescription|null
        if (this.contractName.value !== null && this.compilationRecord.value !== null) {
            const sourceFileName = this.compilationRecord.value.metadata.sourceFileName
            const solcOutput = this.compilationRecord.value.solcOutput
            result = SolcUtils.fetchDescription(sourceFileName, this.contractName.value, solcOutput)
        } else {
            result = null
        }
        return result
    })

    public readonly bytecodeComparison: ComputedRef<BytecodeComparison|null> = computed(() => {
        let result: BytecodeComparison|null
        const compilationRecord = this.compilationRecord.value
        const contractName = this.contractName.value
        const deployedBytecode = this.contractRef.value?.runtime_bytecode ?? null
        if (compilationRecord !== null && contractName !== null && deployedBytecode !== null) {
            const sourceFileName = compilationRecord.metadata.sourceFileName
            const compiledBytecode = SolcUtils.fetchBytecode(sourceFileName, contractName, compilationRecord.solcOutput)
            if (compiledBytecode !== null) {
                result = SolcUtils.compareBytecode(deployedBytecode, compiledBytecode)
            } else {
                result = null
            }
        } else {
            result = null
        }
        return result
    })

    public readonly reloadContractMetadata = (): void => {
        const contractId = this.contractRef.value?.contract_id ?? null
        if (contractId !== null) {
            const network = getNetworkEntryFromCurrentRoute().name as HederaNetwork
            const metadata = AppStorage.getContractMetadata(network, contractId)
            this.contractMetadata.value = Object.preventExtensions(metadata)
        } else {
            this.contractMetadata.value = null
        }
        this.contractMetadataDidChange()
    }

    public readonly compiling: ComputedRef<boolean> = computed(() => this.compilingRef.value)


    //
    // Private
    //

    private readonly contractMetadata: Ref<ContractMetadata|null> = ref(null)
    private readonly compilationRecord: Ref<CompilationRecord|null> = ref(null)
    private readonly compilationFailure: Ref<unknown|null> = ref(null)
    private readonly compilingRef: Ref<boolean> = ref(false)

    private contractMetadataDidChange = (): void => {
        const contractId = this.contractRef.value?.contract_id ?? null
        const metadata = this.contractMetadata.value
        if (contractId !== null && metadata !== null) {
            this.compilingRef.value = true
            CompilationCache.instance.lookup(contractId, metadata)
                .then((r: CompilationRecord) => {
                    this.compilationRecord.value = r
                    this.compilationFailure.value = null
                })
                .catch((reason: unknown) => {
                    this.compilationRecord.value = null
                    this.compilationFailure.value = reason
                })
                .finally(() => {
                    this.compilingRef.value = false
                })
        } else {
            this.compilationRecord.value = null
        }
    }

}
