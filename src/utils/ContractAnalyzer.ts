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
import {CompilationReport, CustomContractEntry, customContractRegistry} from "@/schemas/CustomContractRegistry";
import {ContractResponse} from "@/schemas/HederaSchemas";

export class ContractAnalyzer {

    private readonly contractRef: Ref<ContractResponse|null>
    private readonly contractEntryRef: Ref<CustomContractEntry|null> = ref(null)
    private readonly stateRef: Ref<ContractAnalyzerState> = ref(ContractAnalyzerState.Unknown)
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
        this.stateRef.value = ContractAnalyzerState.Unknown
    }

    public readonly contract: ComputedRef<ContractResponse|null> = computed(() => {
        return this.contractRef.value
    })

    public readonly state: ComputedRef<ContractAnalyzerState> = computed(() => {
        return this.stateRef.value
    })

    public readonly contractEntry: ComputedRef<CustomContractEntry|null> = computed(() => {
        return this.contractEntryRef.value
    })

    public registryDidChange(): void {
        this.contractDidChange()
    }


    //
    // Private
    //

    private contractDidChange = (): void => {
        const contract = this.contractRef.value
        const fileId = contract?.file_id ?? null
        const runtimeByteCode = contract?.runtime_bytecode ?? null
        if (fileId !== null && runtimeByteCode !== null) {
            const contractEntry = customContractRegistry.lookup(fileId)
            this.contractEntryRef.value = contractEntry
            if (contractEntry !== null) {
                this.stateRef.value = ContractAnalyzerState.Verifying
                contractEntry.getCompilationReport()
                    .then((report: CompilationReport) => {
                        if (this.contractRef.value == contract) {
                            if (report.getErrorCount() == 0) {
                                const verified = contractEntry.verifyBytecode(runtimeByteCode, report)
                                this.stateRef.value = verified ? ContractAnalyzerState.OK : ContractAnalyzerState.KO
                            } else {
                                this.stateRef.value = ContractAnalyzerState.Error
                            }
                        }
                    })
                    .catch(() => {
                        if (this.contractRef.value == contract) {
                            this.stateRef.value = ContractAnalyzerState.Error
                        }
                    })
            } else {
                this.stateRef.value = ContractAnalyzerState.Unregistered
            }
        } else {
            this.stateRef.value = ContractAnalyzerState.Unknown
        }
    }

}

export enum ContractAnalyzerState {
    Unknown,
    Unregistered,
    Verifying,
    OK,
    KO,
    Error
}