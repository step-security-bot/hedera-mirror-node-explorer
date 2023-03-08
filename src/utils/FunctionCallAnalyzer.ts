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
import {ethers} from "ethers";
import {ContractInterfaceCache} from "@/utils/cache/ContractInterfaceCache";

export class FunctionCallAnalyzer {

    public readonly input: Ref<string|null>
    public readonly output: Ref<string|null>
    public readonly contractId: Ref<string|null>
    private readonly watchHandles: WatchStopHandle[] = []
    private readonly interface = ref<ethers.utils.Interface|null>(null)

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
            watch(this.contractId, this.updateInterface, { immediate: true}),
        )
    }

    public unmount(): void {
        for (const wh of this.watchHandles) {
            wh()
        }
        this.watchHandles.splice(0)
        this.interface.value = null
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

    private readonly updateInterface = () => {
        if (this.contractId.value !== null) {
            ContractInterfaceCache.instance.lookup(this.contractId.value)
                .then((i: ethers.utils.Interface|null) => {
                    this.interface.value = Object.preventExtensions(i)
                })
                .catch((reason: unknown) => {
                    this.interface.value = null
                    console.log("FunctionCallAnalyzer.updateInterface() failed with reason: " + reason)
                })
        } else {
            this.interface.value = null
        }
    }

    private readonly transactionDescription = computed(() => {
        let result: ethers.utils.TransactionDescription|null
        if (this.interface.value !== null && this.input.value !== null && this.input.value !== "0x") {
            result = this.interface.value.parseTransaction({data: this.input.value})
        } else {
            result = null
        }
        return result
    })

    private readonly decodedFunctionResult = computed(() => {
        let result: ethers.utils.Result|null
        if (this.interface.value !== null && this.transactionDescription.value !== null
            && this.output.value !== null && this.output.value !== "0x") {
            const functionFragment = this.transactionDescription.value.functionFragment
            result  = this.interface.value.decodeFunctionResult(functionFragment, this.output.value) ?? null
        } else {
            result = null
        }
        return result
    })

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
