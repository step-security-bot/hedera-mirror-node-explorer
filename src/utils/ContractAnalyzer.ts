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

import {computed, ComputedRef, ref, Ref, watch, WatchStopHandle} from "vue";
import {systemContractRegistry} from "@/schemas/SystemContractRegistry";
import {SolcOutputCache} from "@/utils/cache/SolcOutputCache";
import {ContractByIdCache} from "@/utils/cache/ContractByIdCache";
import {ContractMatchResult, SolcUtils} from "@/utils/solc/SolcUtils";
import {ethers} from "ethers";
import {SolcOutput} from "@/utils/solc/SolcOutput";

export class ContractAnalyzer {

    public readonly contractId: Ref<string|null>
    private readonly watchHandle: Ref<WatchStopHandle|null> = ref(null)
    private readonly solcOutput: Ref<SolcOutput|null> = ref(null)
    private readonly contractMatchResult: Ref<ContractMatchResult|null> = ref(null)

    //
    // Public
    //

    public constructor(contractId: Ref<string|null>) {
        this.contractId = contractId
    }

    public mount(): void {
        this.watchHandle.value = watch(this.contractId, this.contractIdDidChange, { immediate: true})
    }

    public unmount(): void {
        if (this.watchHandle.value !== null) {
            this.watchHandle.value()
            this.watchHandle.value = null
        }
        this.contractMatchResult.value = null
    }

    public readonly interface: ComputedRef<ethers.utils.Interface|null> = computed(() => {
        let result: ethers.utils.Interface|null
        const o = this.solcOutput.value
        const r = this.contractMatchResult.value
        if (o !== null && r !== null) {
            const d = SolcUtils.fetchDescription(r.sourceFileName, r.contractName, o)
            const i = d?.abi ? new ethers.utils.Interface(d?.abi) : null
            result = Object.preventExtensions(i) // Because ethers.utils.Interface does not like vuejs introspection
        } else {
            result = null
        }
        return result
    })


    //
    // Private
    //

    private readonly contractIdDidChange = async() => {
        if (this.contractId.value !== null) {
            const systemContractEntry = systemContractRegistry.lookup(this.contractId.value)
            if (systemContractEntry !== null) {
                // This is a system contract
                this.solcOutput.value = null
                this.contractMatchResult.value = null
            } else {
                // Check if contract metadata are available and fetch abi
                try {
                    this.solcOutput.value = await SolcOutputCache.instance.lookup(this.contractId.value)
                    if (this.solcOutput.value !== null) {
                        const contractInfo = await ContractByIdCache.instance.lookup(this.contractId.value)
                        const deployedByteCode = contractInfo?.runtime_bytecode ?? null
                        if (deployedByteCode !== null) {
                            this.contractMatchResult.value = SolcUtils.findMatchingContract(deployedByteCode, this.solcOutput.value)
                        } else {
                            this.contractMatchResult.value = null
                        }
                    } else {
                        this.contractMatchResult.value = null
                    }
                } catch {
                    this.solcOutput.value = null
                    this.contractMatchResult.value = null
                }
            }
        } else {
            this.solcOutput.value = null
            this.contractMatchResult.value = null
        }
    }
}