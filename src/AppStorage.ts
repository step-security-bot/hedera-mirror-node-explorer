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

import {NetworkEntry, networkRegistry} from "@/schemas/NetworkRegistry";
import {HederaNetwork} from "@bladelabs/blade-web3.js/lib/src/models/blade";

export class AppStorage {

    private static readonly VERSION = "v1"

    //
    // network
    //

    private static readonly LAST_USED_NETWORK_KEY = 'network'

    public static getLastNetwork(): NetworkEntry {
        const item = this.getLocalStorageItem(this.LAST_USED_NETWORK_KEY)
        const result = item != null ? networkRegistry.lookup(item) : null
        return result ?? networkRegistry.getDefaultEntry()
    }

    public static setLastNetwork(newValue: string|NetworkEntry): void {
        const newItem = typeof newValue == "string" ? newValue : newValue.name
        this.setLocalStorageItem(this.LAST_USED_NETWORK_KEY, newItem)
    }

    //
    // skip disclaimer (wallet chooser)
    //

    private static readonly DISCLAIMER_SKIP_KEY = 'skipDisclaimer'

    public static getSkipDisclaimer(): boolean {
        return  this.getLocalStorageItem(this.DISCLAIMER_SKIP_KEY) != null
    }

    public static setSkipDisclaimer(newValue: boolean|null): void {
        this.setLocalStorageItem(this.DISCLAIMER_SKIP_KEY, newValue ? "true" : null)
    }

    //
    // contract logs table page size
    //

    private static readonly CONTRACT_LOGS_TABLE_PAGE_SIZE_KEY = 'logsPageSize'

    public static getLogsTablePageSize(): number | null {
        const size = this.getLocalStorageItem(this.CONTRACT_LOGS_TABLE_PAGE_SIZE_KEY)
        return size ? Number(size) : null
    }

    public static setLogsTablePageSize(newValue: number | null ): void {
        this.setLocalStorageItem(this.CONTRACT_LOGS_TABLE_PAGE_SIZE_KEY, newValue ? newValue?.toString() : null)
    }

    //
    // contract states table page size
    //

    private static readonly CONTRACT_STATES_TABLE_PAGE_SIZE_KEY = 'statesPageSize'

    public static getStatesTablePageSize(): number | null {
        const size = this.getLocalStorageItem(this.CONTRACT_STATES_TABLE_PAGE_SIZE_KEY)
        return size ? Number(size) : null
    }

    public static setStatesTablePageSize(newValue: number | null ): void {
        this.setLocalStorageItem(this.CONTRACT_STATES_TABLE_PAGE_SIZE_KEY, newValue ? newValue?.toString() : null)
    }

    //
    // contract metadata
    //

    private static readonly CONTRACT_METADATA_KEY = "contractMetadata"

    public static getContractMetadata(network: HederaNetwork, contractId: string): ContractMetadata | null {
        let result: ContractMetadata|null
        const keySuffix = this.makeContractMetadataKeySuffix(network, contractId)
        const jsonText = this.getLocalStorageItem(keySuffix)
        if (jsonText !== null) {
            try {
                result = JSON.parse(jsonText) as ContractMetadata
            } catch {
                console.warn("Failed to parse JSON from " + keySuffix)
                result = null
            }
        } else {
            result = null
        }
        return result
    }

    public static setContractMetadata(network: HederaNetwork, contractId: string, value: ContractMetadata|null): void {
        const keySuffix = this.makeContractMetadataKeySuffix(network, contractId)
        const jsonText = value !== null ? JSON.stringify(value) : null
        this.setLocalStorageItem(keySuffix, jsonText)
    }

    private static makeContractMetadataKeySuffix(network: HederaNetwork, contractId: string) {
        return this.CONTRACT_METADATA_KEY + "/" + network + "/" + contractId
    }

    //
    // save contract locally
    //

    private static readonly SAVE_CONTRACT_LOCALLY_KEY = 'saveContractLocally'

    public static getSaveContractLocally(): boolean {
        return this.getLocalStorageItem(this.SAVE_CONTRACT_LOCALLY_KEY) !== null
    }

    public static setSaveContractLocally(newValue: string): void {
        this.setLocalStorageItem(this.SAVE_CONTRACT_LOCALLY_KEY, newValue)
    }

    //
    // Private
    //

    private static getLocalStorageItem(keySuffix: string): string|null {
        let result: string|null
        try {
            result = localStorage.getItem(this.makeKey(keySuffix))
        } catch {
            result = null
        }
        return result
    }

    private static setLocalStorageItem(keySuffix: string, value: string|null) {
        const key = this.makeKey(keySuffix)
        try {
            if (value != null) {
                localStorage.setItem(key, value);
            } else {
                localStorage.removeItem(key);
            }
        } catch {
            // Ignored
        }
    }

    private static makeKey(keySuffix: string): string {
        return AppStorage.VERSION + "/" + keySuffix
    }
}

export interface ContractMetadata {
    version: string
    source: string
    sourceFileName: string
    importSources: Record<string, string>
}
