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
import {CustomContractEntry, customContractRegistry} from "@/schemas/CustomContractRegistry";

export class ContractAnalyzer {

    private readonly contractRef: Ref<ContractResponse|null>
    private readonly contractEntryRef: Ref<CustomContractEntry|null> = ref(null)
    private watchHandle: WatchStopHandle|null = null

    //
    // Public
    //

    public constructor(contract: Ref<ContractResponse|null>) {
        this.contractRef = contract
    }

    public mount(): void {
        this.watchHandle = watch(this.contractRef, this.contractDidChange, { immediate: true })
    }

    public unmount(): void {
        if (this.watchHandle) {
            this.watchHandle()
            this.watchHandle = null
        }
        this.contractEntryRef.value = null
    }

    public readonly contract: ComputedRef<ContractResponse|null> = computed(() => {
        return this.contractRef.value
    })

    public readonly contractEntry: ComputedRef<CustomContractEntry|null> = computed(() => {
        return this.contractEntryRef.value
    })


    //
    // Private
    //

    private contractDidChange = (): void => {
        const contract = this.contractRef.value
        const contractId = contract?.contract_id ?? null
        const runtimeByteCode = contract?.runtime_bytecode ?? null
        if (contractId !== null && runtimeByteCode !== null) {
            customContractRegistry.lookup(contractId)
                .then((e: CustomContractEntry|null) => {
                    this.contractEntryRef.value = e
                })
                .catch(() => {
                    this.contractEntryRef.value = null
                })
        } else {
            this.contractEntryRef.value = null
        }
    }

}
