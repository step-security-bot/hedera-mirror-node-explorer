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

import {computed, Ref} from 'vue';
import {ContractAnalyzer, MetadataOrigin} from "@/utils/analyzer/ContractAnalyzer";
import {Lookup} from "@/utils/cache/base/EntityCache";
import {IPFSCache} from "@/utils/cache/IPFSCache";
import {SolcUtils} from "@/utils/solc/SolcUtils";
import {SourcifyCache} from "@/utils/cache/SourcifyCache";
import {AppStorage} from "@/AppStorage";
import {ethers} from "ethers";

export class ContractSourceAnalyzer {

    public readonly sourceFileName: Ref<string|null>
    public readonly contractAnalyzer: ContractAnalyzer
    public readonly ipfsLookup: Lookup<string, unknown|undefined>

    //
    // Public
    //

    public constructor(sourceFileName: Ref<string|null>, contractAnalyzer: ContractAnalyzer) {
        this.sourceFileName = sourceFileName
        this.contractAnalyzer = contractAnalyzer
        this.ipfsLookup = IPFSCache.instance.makeLookup(this.ipfsHash)
    }


    public mount(): void {
        this.ipfsLookup.mount()
    }

    public unmount(): void {
        this.ipfsLookup.unmount()
    }

    //
    // Public (computed)
    //

    public readonly content = computed(
        () => this.sourcifyContent.value ?? this.localStorageContent.value ?? this.ipfsContent.value)

    public readonly fullMatch = computed(() => {
        let result: boolean
        if (this.content.value !== null && this.keccakHash.value !== null) {
            const encoder = new TextEncoder()
            const contentBytes = encoder.encode(this.content.value)
            const contentHash = ethers.utils.keccak256(contentBytes)
            result = contentHash === this.keccakHash.value
        } else {
            result = false
        }
        return result
    })

    public readonly origin = computed(() => {
        let result: MetadataOrigin|null
        if (this.sourcifyContent.value !== null) {
            result = MetadataOrigin.Sourcify
        } else if (this.localStorageContent.value !== null) {
            result = MetadataOrigin.LocalStorage
        } else if (this.ipfsContent.value !== null) {
            result = MetadataOrigin.IPFS
        } else {
            result = null
        }
        return result
    })

    public readonly status = computed(() => {
        let result: string
        if (this.origin.value !== null) {
            result = this.origin.value
            if (!this.fullMatch.value) {
                result += " (mismatch)"
            }
        } else {
            result = "Missing"
        }
        return result
    })

    //
    // Private
    //

    private readonly sourcifyContent = computed(() => {
        let result: string|null
        const response = this.contractAnalyzer.sourcifyRecord.value?.response ?? null
        if (response !== null && this.sourceFileName.value !== null) {
            result = SourcifyCache.fetchSource(this.sourceFileName.value, response)
        } else {
            result = null
        }
        return result
    })

    private readonly localStorageContent = computed(
        () => this.keccakHash.value !== null ? AppStorage.getKeccakContent(this.keccakHash.value) : null)

    private readonly ipfsContent = computed(() => {
        let result: string|null
        const content = this.ipfsLookup.entity.value
        if (typeof content == "string") {
            result = content
        } else if (typeof content === "object" && content !== null) {
            result = JSON.stringify(content)
        } else {
            result = null
        }
        return result
    })

    private readonly ipfsHash = computed(() => {
        let result: string|null
        if (this.sourceFileName.value !== null && this.contractAnalyzer.metadata.value !== null) {
            result = SolcUtils.fetchIPFSHash(this.sourceFileName.value, this.contractAnalyzer.metadata.value)
        } else {
            result = null
        }
        return result
    })

    private readonly swarmHash = computed(() => {
        let result: string|null
        if (this.sourceFileName.value !== null && this.contractAnalyzer.metadata.value !== null) {
            result = SolcUtils.fetchSWARMHash(this.sourceFileName.value, this.contractAnalyzer.metadata.value)
        } else {
            result = null
        }
        return result
    })

    private readonly keccakHash = computed(() => {
        let result: string|null
        if (this.sourceFileName.value !== null && this.contractAnalyzer.metadata.value !== null) {
            result = SolcUtils.fetchKeccakHash(this.sourceFileName.value, this.contractAnalyzer.metadata.value)
        } else {
            result = null
        }
        return result
    })

}