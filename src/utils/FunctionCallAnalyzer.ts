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
import {ContractEntry} from "@/schemas/ContractEntry";
import {ethers} from "ethers";
import {CustomContractEntry, customContractRegistry} from "@/schemas/CustomContractRegistry";

export class FunctionCallAnalyzer {

    public readonly input: Ref<string|null>
    public readonly output: Ref<string|null>
    public readonly contractId: Ref<string|null>
    private readonly watchHandles: WatchStopHandle[] = []
    private readonly transactionDescription = ref<ethers.utils.TransactionDescription|null>(null)
    private readonly decodedFunctionResult = ref<ethers.utils.Result|null>(null)

    //
    // Public
    //

    public constructor(input: Ref<string|null>, output: Ref<string|null>, contractId: Ref<string|null>) {
        this.input = input
        this.output = output
        this.contractId = contractId
    }

    public mount(): void {
        this.watchHandles.push(
            watch(this.contractId, this.updateContractEntry, { immediate: true}),
            watch([this.input, this.contractEntry], this.updateTransactionDescription, { immediate: true}),
            watch([this.output, this.transactionDescription], this.updateDecodedFunctionResult, { immediate: true}),
        )
    }

    public unmount(): void {
        for (const wh of this.watchHandles) {
            wh()
        }
        this.watchHandles.splice(0, this.watchHandles.length)
        this.transactionDescription.value = null
        this.decodedFunctionResult.value = null
    }

    public readonly functionHash: ComputedRef<string|null> = computed(() => {
        return this.transactionDescription.value?.sighash ?? null
    })

    public readonly signature: ComputedRef<string|null> = computed(() => {
        return this.transactionDescription.value?.signature ?? null
    })

    public readonly inputs: ComputedRef<NameTypeValue[]> = computed(() => {
        const result: NameTypeValue[] = []
        if (this.transactionDescription.value) {
            const args = this.transactionDescription.value.args
            const fragmentInputs = this.transactionDescription.value.functionFragment.inputs
            for (let i = 0, count = args.length; i < count; i += 1) {
                const value = args[i]
                const name = i < fragmentInputs.length ? fragmentInputs[i].name : "?"
                const type = i < fragmentInputs.length ? fragmentInputs[i].type : "?"
                result.push(new NameTypeValue(name, type, value))
            }
        }
        return result
    })

    public readonly outputs: ComputedRef<NameTypeValue[]> = computed(() => {
        const result: NameTypeValue[] = []
        if (this.decodedFunctionResult.value) {
            const results = this.decodedFunctionResult.value
            const fragmentOutputs = this.transactionDescription.value?.functionFragment.outputs ?? []
            for (let i = 0, count = results.length; i < count; i += 1) {
                const value = results[i]
                const name = i < fragmentOutputs.length ? fragmentOutputs[i].name : "?"
                const type = i < fragmentOutputs.length ? fragmentOutputs[i].type : "?"
                result.push(new NameTypeValue(name, type, value))
            }
        }
        return result
    })


    //
    // Private
    //

    private readonly contractEntry: Ref<ContractEntry|null> = ref(null)

    private readonly updateContractEntry = () => {
        if (this.contractId.value !== null) {
            const systemContractEntry = systemContractRegistry.lookup(this.contractId.value)
            if (systemContractEntry !== null) {
                this.contractEntry.value = systemContractEntry
            } else {
                customContractRegistry.lookup(this.contractId.value)
                    .then((e: CustomContractEntry) => {
                        this.contractEntry.value = e
                    })
                    .catch(() => {
                        this.contractEntry.value = null
                    })
            }
        } else {
            this.contractEntry.value = null
        }
    }

    // private readonly contractEntry: ComputedRef<ContractEntry|null> = computed(() => {
    //     const c1 = this.contractId.value !== null ? systemContractRegistry.lookup(this.contractId.value) : null
    //     const c2 = this.fileId.value !== null ? customContractRegistry.lookup(this.fileId.value) : null
    //     return c1 ?? c2
    // })


    private readonly updateTransactionDescription = () => {
        if (this.contractEntry.value !== null && this.input.value !== null) {
            this.contractEntry.value.parseTransaction(this.input.value)
                .then((d: ethers.utils.TransactionDescription|null) => {
                    this.transactionDescription.value = d
                })
                .catch(() => {
                    this.transactionDescription.value = null
                })
        } else {
            this.transactionDescription.value = null
        }
    }

    private readonly updateDecodedFunctionResult = () => {
        if (this.contractEntry.value !== null && this.transactionDescription.value !== null && this.output.value !== null) {
            const functionFragment = this.transactionDescription.value.functionFragment
            this.contractEntry.value?.decodeFunctionResult(functionFragment, this.output.value)
                .then((result: ethers.utils.Result|null) => {
                    this.decodedFunctionResult.value = result
                })
                .catch(() => {
                    this.decodedFunctionResult.value = null
                })
        } else {
            this.decodedFunctionResult.value = null
        }
    }

}

export class NameTypeValue {
    public readonly name: string
    public readonly type: string
    public readonly value: unknown
    public constructor(name: string, type: string, value: unknown) {
        this.name = name
        this.type = type
        this.value = value
    }
}
