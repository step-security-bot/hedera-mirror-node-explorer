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

import {computed, ref, Ref, shallowRef} from 'vue';
import {
    SourcifyInputFilesResponse,
    SourcifyUtils,
    SourcifyVerifyCheckedContract,
    SourcifyVerifyCheckedResponse
} from "@/utils/sourcify/SourcifyUtils";
import {importFromChooser, importFromDrop} from "@/utils/analyzer/FileImporter";

export class ContractSourceAnalyzer {

    private readonly contractId: Ref<string|null>
    private readonly analyzingRef = ref(false)
    private readonly failureRef = ref<unknown>(null)
    private readonly inputFilesResponse = shallowRef<SourcifyInputFilesResponse|null>(null)
    private readonly verifyResponse = shallowRef<SourcifyVerifyCheckedResponse|null>(null)

    //
    // Public
    //

    public constructor(contractId: Ref<string|null>) {
        this.contractId = contractId
    }


    public mount(): void {
        this.reset().then()
    }

    public unmount(): void {
        this.inputFilesResponse.value = null
        this.verifyResponse.value = null
    }

    public readonly analyzing = computed( () => this.analyzingRef.value)

    public readonly failure = computed(() => this.failureRef.value)

    public readonly matchingContractName = computed<string|null>(() => {
        return this.matchingContract.value?.name ?? null
    })

    public readonly matchingContract = computed<SourcifyVerifyCheckedContract|null>(() => {
        let result: SourcifyVerifyCheckedContract|null
        if (this.verifyResponse.value !== null) {
            result = SourcifyUtils.fetchMatchingContract(this.verifyResponse.value)
        } else {
            result = null
        }
        return result
    })

    public readonly contractCount = computed<number>(() => {
        return this.inputFilesResponse.value?.contracts.length ?? 0
    })

    public readonly unusedCount = computed<number>(() => {
        return this.inputFilesResponse.value?.unused.length ?? 0
    })

    public readonly items = computed<ContractSourceAnalyzerItem[]>(() => {
        const result: ContractSourceAnalyzerItem[] = []

        if (this.verifyResponse.value !== null) {
            const jsonExtension = ".json"
            const response = this.verifyResponse.value
            const matchingContract = this.matchingContract.value
            for (const f of response.files) {
                let unused: boolean
                if (f.toLowerCase().lastIndexOf(jsonExtension) == f.length - jsonExtension.length) {
                    // It's a metadata file
                    unused = false
                } else if (matchingContract !== null) {
                    unused = SourcifyUtils.findCompiledPath(f, matchingContract) === null
                } else {
                    unused = response.unused.indexOf(f) != -1
                }
                const target = matchingContract !== null && matchingContract.compiledPath == f
                result.push({ path: f, unused, target })
            }
        } else if (this.inputFilesResponse.value !== null) {
            const response = this.inputFilesResponse.value
            for (const f of response.files) {
                const unused = response.unused.indexOf(f) != -1
                const target = false
                result.push({ path: f, unused, target })
            }
        }
        return result
    })

    public async dropFiles(transferList: DataTransferItemList): Promise<void> {
        if (this.contractId.value !== null) {
            this.analyzingRef.value = true
            try {
                const newFiles = await importFromDrop(transferList)
                await this.verifyWithoutStore(this.contractId.value, newFiles)
                this.failureRef.value = null
            } catch(reason) {
                // Leaves this.inputFilesResponse and this.verifyResponse unchanged
                this.failureRef.value = reason
            } finally {
                this.analyzingRef.value = false
            }
        }
    }

    public async chooseFiles(fileList: FileList): Promise<void> {
        if (this.contractId.value !== null) {
            this.analyzingRef.value = true
            try {
                const newFiles = await importFromChooser(fileList)
                await this.verifyWithoutStore(this.contractId.value, newFiles)
                this.failureRef.value = null
            } catch(reason) {
                // Leaves this.inputFilesResponse and this.verifyResponse unchanged
                this.failureRef.value = reason
            } finally {
                this.analyzingRef.value = false
            }
        }
    }

    public async reset(): Promise<void> {
        this.analyzingRef.value = true
        try {
            await SourcifyUtils.sessionClear()
            this.failureRef.value = null
        } catch(reason) {
            this.failureRef.value = reason
        } finally {
            this.inputFilesResponse.value = null
            this.verifyResponse.value = null
            this.analyzingRef.value = false
        }
    }

    //
    // Private
    //

    private async verifyWithoutStore(contractId: string, newFiles: Map<string, string>): Promise<void> {
        this.inputFilesResponse.value = await SourcifyUtils.sessionInputFiles(newFiles)
        const verificationIds = SourcifyUtils.fetchVerificationIds(this.inputFilesResponse.value)
        if (verificationIds.length >= 1) {
            this.verifyResponse.value = await SourcifyUtils.verifyChecked(contractId, verificationIds, false)
        } else {
            this.verifyResponse.value = null
        }
    }

}

export interface ContractSourceAnalyzerItem {
    path: string
    unused: boolean
    target: boolean
}