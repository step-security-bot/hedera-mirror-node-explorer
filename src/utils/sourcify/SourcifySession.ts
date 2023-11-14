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


import {computed, Ref, ref, shallowRef, watch, WatchStopHandle} from "vue";
import {SourcifyInputFilesResponse, SourcifyUtils, SourcifyVerifyCheckedResponse} from "@/utils/sourcify/SourcifyUtils";

export class SourcifySession {

    public readonly busy = ref<boolean>(false)
    public readonly failure = ref<unknown>(null)

    private readonly contractId: Ref<string|null>
    private readonly inputFilesResponse = shallowRef<SourcifyInputFilesResponse|null>(null)
    private readonly verifyResponses = shallowRef<SourcifyVerifyCheckedResponse[]>([])
    private readonly verifyResult = shallowRef<SourcifySessionMatch|null>(null)
    private watchHandle: WatchStopHandle|null = null


    //
    // Public
    //

    public constructor(contractId: Ref<string|null>) {
        this.contractId = contractId
    }

    public mount(): void {
        this.watchHandle = watch(this.contractId,  ()  => {
            this.data()
        }, { immediate: true})
    }

    public unmount(): void {
        if (this.watchHandle !== null) {
            this.watchHandle()
            this.watchHandle = null
        }
        this.verifyResponses.value = []
    }

    public data(): void {
        this.busy.value = true
        SourcifyUtils.sessionData()
            .then((response: SourcifyInputFilesResponse) => {
                this.inputFilesResponse.value = response
                this.verifyResponses.value = []
                this.updateResolvedItems()
                this.failure.value = null
            })
            .catch((reason: unknown) => {
                // Let's keep this.verifyResponses.value unchanged
                this.failure.value = reason
            })
            .finally(() => {
                this.busy.value = false
            })
    }

    public clear() {
        this.busy.value = true
        SourcifyUtils.sessionClear()
            .then((/* message: string */) => {
                this.inputFilesResponse.value = null
                this.verifyResponses.value = []
                this.updateResolvedItems()
                this.failure.value = null
            })
            .catch((reason: unknown) => {
                // Let's keep this.verifyResponses.value unchanged
                this.failure.value = reason
            })
            .finally(() => {
                this.busy.value = false
            })
    }

    public inputFiles(files: Map<string, string>): void {
        this.updateVerifyResponses(files).catch()
    }

    public readonly status = computed<string|null>(() => {
        let result: string|null

        if (this.contractId.value !== null) {
            if (this.verifyResult.value !== null) {
                result = "Contract " + this.verifyResult.value.contractName + " is ready to be verified"
            } else if (this.verifyResponses.value.length >= 1) {
                result = "Contract " + this.contractId.value + " does not match this sources"
            } else {
                result = "Add more files"
            }
        } else {
            result = null
        }

        return result
    })

    public readonly items = computed<SourcifySessionItem[]>(() => {
        const result: SourcifySessionItem[] = []
        if (this.inputFilesResponse.value !== null) {
            const resultSourceFile = this.matchingContractPath.value
            for (const f of this.inputFilesResponse.value.files) {
                const unused = this.inputFilesResponse.value.unused.indexOf(f) != -1
                const target = f == resultSourceFile
                result.push({ path: f, unused, target })
            }
            const compareItems = (i1: SourcifySessionItem, i2: SourcifySessionItem): number => {
                let result: number
                if (i1.target != i2.target) {
                    result = i1.target ? -1 : +1
                } else if (i1.unused != i2.unused) {
                    result = i1.unused ? +1 : -1
                } else {
                    result = i1.path.localeCompare(i2.path)
                }
                return result
            }
            result.sort(compareItems)
        }
        return result
    })

    public readonly matchingContractName = computed<string|null>(() => {
        return this.verifyResult.value?.contractName ?? null
    })

    public readonly matchingContractPath = computed<string|null>(() => {
        let result: string|null = null
        if (this.verifyResult.value !== null) {
            const contractName = this.verifyResult.value.contractName
            for (const c of this.verifyResult.value.response.contracts) {
                if (c.name == contractName) {
                    result = c.compiledPath
                    break
                }
            }
        }
        return result
    })

    //
    // Private
    //

    private readonly updateVerifyResponses = async (newFiles: Map<string, string>): Promise<void> =>  {
        if (this.contractId.value !== null) {
            this.busy.value = true
            try {
                const inputFileResponse = await SourcifyUtils.sessionInputFiles(newFiles)
                const verifyResponses: SourcifyVerifyCheckedResponse[] = []
                for (const i of inputFileResponse.contracts) {
                    try {
                        verifyResponses.push(await SourcifyUtils.verifyChecked(this.contractId.value, i.verificationId))
                    } catch(reason) {
                        console.log("reason=" + reason)
                    }
                }
                this.inputFilesResponse.value = inputFileResponse
                this.verifyResponses.value = verifyResponses
                this.failure.value = null
                this.updateResolvedItems()
            } catch(reason) {
                // this.verifyResponses.value is kept unchanged
                this.failure.value = reason
            } finally {
                this.busy.value = false
            }
        } else {
            this.verifyResponses.value = []
            this.failure.value = null
        }
    }

    private updateResolvedItems(): void {
        this.verifyResult.value = null
        for (const r of this.verifyResponses.value) {
            for (const c of r.contracts) {
                if (c.status == "ok") {
                    this.verifyResult.value = {
                        response: r,
                        contractName: c.name
                    }
                }
            }
        }
    }
}

export interface SourcifySessionItem {
    path: string
    unused: boolean
    target: boolean
}

export interface SourcifySessionMatch {
    response: SourcifyVerifyCheckedResponse
    contractName: string
}