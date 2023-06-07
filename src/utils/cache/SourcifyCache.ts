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

import axios from "axios";
import {EntityCache} from "@/utils/cache/base/EntityCache";
import {SolcMetadata} from "@/utils/solc/SolcMetadata";
import {ContractByIdCache} from "@/utils/cache/ContractByIdCache";
import {routeManager} from "@/router";

export class SourcifyCache extends EntityCache<string, SourcifyRecord|null> {

    public static readonly instance = new SourcifyCache()

    //
    // Cache
    //

    protected async load(contractId: string): Promise<SourcifyRecord|null> {
        let result: SourcifyRecord|null
        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (sourcifySetup !== null) {
            const contractResponse = await ContractByIdCache.instance.lookup(contractId)
            const contractAddress = contractResponse?.evm_address
            if (contractAddress) {
                const partialMatchURL = sourcifySetup.makeMetadataURL(contractAddress, false)
                const metadata = await SourcifyCache.loadSourcifyMetadata(partialMatchURL)
                if (metadata !== null) {
                    const repoURL = sourcifySetup.makeContractLookupURL(contractAddress)
                    result = new SourcifyRecord(metadata, false, repoURL)
                } else {
                    const fullMatchURL = sourcifySetup.makeMetadataURL(contractAddress, true)
                    const metadata = await SourcifyCache.loadSourcifyMetadata(fullMatchURL)
                    if (metadata !== null) {
                        const repoURL = sourcifySetup.makeContractLookupURL(contractAddress)
                        result = new SourcifyRecord(metadata, true, repoURL)
                    } else {
                        result = null
                    }
                }
            } else {
                result = null
            }
        } else {
            result = null
        }
        return Promise.resolve(result)
    }


    //
    // Private
    //

    private static async loadSourcifyMetadata(metadataURL: string): Promise<SolcMetadata|null> {
        let result: SolcMetadata|null
        try {
            const response = await axios.get<SolcMetadata>(metadataURL)
            result = response.data
        } catch(error) {
            if (axios.isAxiosError(error) && error.response?.status == 404) {
                result = null
            } else {
                throw error
            }
        }
        return Promise.resolve(result)
    }
}

export class SourcifyRecord {
    public readonly metadata: SolcMetadata
    public readonly fullMatch: boolean
    public readonly folderURL: string
    constructor(metadata: SolcMetadata, fullMatch: boolean, folderURL: string) {
        this.metadata = metadata
        this.fullMatch = fullMatch
        this.folderURL = folderURL
    }
}