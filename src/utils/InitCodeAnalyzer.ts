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
import {ethers} from "ethers";
import {customContractRegistry} from "@/schemas/CustomContractRegistry";
import {ContractEntry} from "@/schemas/ContractEntry";

export class InitCodeAnalyzer {

    public readonly byteCode: Ref<string|null>
    public readonly fileId: Ref<string|null>
    private readonly watchHandles: WatchStopHandle[] = []
    private readonly transactionDescription = ref<ethers.utils.TransactionDescription|null>(null)

    //
    // Public
    //

    public constructor(byteCode: Ref<string|null>, fileId: Ref<string|null>) {
        this.byteCode = byteCode
        this.fileId = fileId
    }

    public mount(): void {
        this.watchHandles.push(
            watch([this.byteCode, this.fileId], this.updateTransactionDescription, { immediate: true}),
        )
    }

    public unmount(): void {
        for (const wh of this.watchHandles) {
            wh()
        }
        this.watchHandles.splice(0, this.watchHandles.length)
        this.transactionDescription.value = null
    }

    public readonly signature: ComputedRef<string|null> = computed(() => {
        return this.transactionDescription.value?.signature ?? null
    })

    //
    // Private
    //

    private readonly customContractEntry: ComputedRef<ContractEntry|null> = computed(() => {
        return this.fileId.value ? customContractRegistry.lookup(this.fileId.value) : null
    })

    private readonly updateTransactionDescription = () => {
        if (this.customContractEntry.value !== null && this.byteCode.value !== null) {
            this.customContractEntry.value.parseTransaction(this.byteCode.value)
                .then((d: ethers.utils.TransactionDescription|null) => {
                    this.transactionDescription.value = d
                })
                .catch((error) => {
                    this.transactionDescription.value = null
                    console.log("error=" + error)
                })
        } else {
            this.transactionDescription.value = null
        }
    }

}