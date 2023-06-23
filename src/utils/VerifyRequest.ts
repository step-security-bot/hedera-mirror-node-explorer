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

import {SolcMetadata} from "@/utils/solc/SolcMetadata";
import {ref} from "vue";
import {ContractByIdCache} from "@/utils/cache/ContractByIdCache";
import {routeManager} from "@/router";
import axios from "axios";

export class VerifyRequest {

    public readonly running = ref(false)


    public start(contractId: string,
                 metadata: SolcMetadata,
                 sourceContents: Record<string, string>): void {

        this.running.value = true
        this.run(contractId, metadata, sourceContents)
            .then((response: SourcifyVerifyResponse) => {
                console.log("Verify completed with response =" + JSON.stringify(response))
            })
            .catch((reason: unknown) => {
                console.log("Verify request did failed: " + JSON.stringify(reason))
            })
            .finally(() => {
                this.running.value = false
            })
    }


    private async run(contractId: string,
                      metadata: SolcMetadata,
                      sourceContents: Record<string, string>): Promise<SourcifyVerifyResponse> {
        let result: SourcifyVerifyResponse

        const contractResponse = await ContractByIdCache.instance.lookup(contractId)
        const address = contractResponse?.evm_address
        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (address !== undefined && sourcifySetup !== null) {
            const body: SourcifyVerifyBody = {
                address: address,
                chain: sourcifySetup.chainID.toString(),
                files: {
                    "metadata-1.json": JSON.stringify(metadata),
                    ...sourceContents
                }
            }
            const url = sourcifySetup.serverURL + "/verify"
            const sourcifyResponse = await axios.post<SourcifyVerifyResponse>(url, body)
            result = sourcifyResponse.data
        } else {
            throw Error("Contract has no evm address")
        }

        return Promise.resolve(result)
    }
}


export interface SourcifyVerifyBody {
    address: string
    chain: string
    files: Record<string, string> // filename x content
}

export interface SourcifyVerifyResponse {
    result: {
        address: string,
        chainId: string,
        status: string,
        library: Record<string, unknown>
    }
}
