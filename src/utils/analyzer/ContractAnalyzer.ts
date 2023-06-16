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
import {SystemContractEntry, systemContractRegistry} from "@/schemas/SystemContractRegistry";
import {ethers} from "ethers";
import {AssetCache} from "@/utils/cache/AssetCache";
import {SourcifyCache, SourcifyRecord} from "@/utils/cache/SourcifyCache";
import {SolcMetadata} from "@/utils/solc/SolcMetadata";
import {ByteCodeAnalyzer} from "@/utils/analyzer/ByteCodeAnalyzer";
import {ContractResponse} from "@/schemas/HederaSchemas";
import {ContractByIdCache} from "@/utils/cache/ContractByIdCache";
import axios from "axios";

export class ContractAnalyzer {

    public readonly contractId: Ref<string|null>
    private readonly watchHandle: Ref<WatchStopHandle|null> = ref(null)
    private readonly byteCodeAnalyzer: ByteCodeAnalyzer
    private readonly contractResponse: Ref<ContractResponse|null> = ref(null)
    private readonly systemContractEntry: Ref<SystemContractEntry|null> = ref(null)
    private readonly sourcifyRecord: Ref<SourcifyRecord|null> = ref(null)
    private readonly ipfsMetadata: Ref<SolcMetadata|null> = ref(null)
    private readonly ipfsLoading: Ref<boolean> = ref(false)
    private readonly abi: Ref<ethers.utils.Fragment[]|null> = ref(null)

    //
    // Public
    //

    public constructor(contractId: Ref<string|null>) {
        this.contractId = contractId
        this.byteCodeAnalyzer = new ByteCodeAnalyzer(this.byteCode)
    }

    public mount(): void {
        this.watchHandle.value = watch(this.contractId, this.contractIdDidChange, { immediate: true})
    }

    public unmount(): void {
        if (this.watchHandle.value !== null) {
            this.watchHandle.value()
            this.watchHandle.value = null
        }
        this.contractResponse.value = null
        this.systemContractEntry.value = null
        this.sourcifyRecord.value = null
        this.abi.value = null
    }

    public readonly metadataOrigin: ComputedRef<MetadataOrigin|null> = computed(() => {
        let result: MetadataOrigin|null
        if (this.systemContractEntry.value !== null) {
            result = MetadataOrigin.System
        } else if (this.sourcifyRecord.value !== null) {
            result = MetadataOrigin.Sourcify
        } else if (this.ipfsMetadata.value !==  null) {
            result = MetadataOrigin.IPFS
        } else {
            result = null
        }
        return result
    })

    public readonly isUnknownContract = computed(
        () => this.metadataOrigin.value === null)
    public readonly isSystemContract = computed(
        () => this.metadataOrigin.value === MetadataOrigin.System)
    public readonly isContractOnSourcify = computed(
        () => this.metadataOrigin.value === MetadataOrigin.Sourcify)
    public readonly isContractOnIPFS = computed(
        () => this.metadataOrigin.value === MetadataOrigin.IPFS)

    public readonly sourceFileName: ComputedRef<string|null> = computed(() => {
        let result: string|null
        if (this.systemContractEntry.value !== null) {
            result = this.systemContractEntry.value.abiFileName
        } else if (this.sourcifyRecord.value !== null) {
            const target = this.sourcifyRecord.value.metadata.settings.compilationTarget
            const keys = Object.keys(target)
            result = keys.length >= 1 ? keys[0] : null
        } else if (this.ipfsMetadata.value !== null) {
            const target = this.ipfsMetadata.value.settings.compilationTarget
            const keys = Object.keys(target)
            result = keys.length >= 1 ? keys[0] : null
        } else {
            result = null
        }
        return result
    })

    public readonly contractName: ComputedRef<string|null> = computed(() => {
        let result: string|null
        if (this.systemContractEntry.value !== null) {
            result = null
        } else if (this.sourcifyRecord.value !== null) {
            const target = this.sourcifyRecord.value.metadata.settings.compilationTarget
            const keys = Object.keys(target)
            result = keys.length >= 1 ? target[keys[0]] : null
        } else if (this.ipfsMetadata.value !== null) {
            const target = this.ipfsMetadata.value.settings.compilationTarget
            const keys = Object.keys(target)
            result = keys.length >= 1 ? target[keys[0]] : null
        } else {
            result = null
        }
        return result
    })

    public readonly interface: ComputedRef<ethers.utils.Interface|null> = computed(() => {
        let result: ethers.utils.Interface|null
        if (this.abi.value !== null) {
            try {
                const i = new ethers.utils.Interface(this.abi.value)
                result = Object.preventExtensions(i) // Because ethers does not like Ref introspection
            } catch {
                result = null
            }
        } else {
            result = null
        }
        return result
    })

    //
    // Public (null if contractId is a system contract)
    //

    public readonly byteCode: ComputedRef<string|undefined> = computed(() => {
        return this.contractResponse.value?.runtime_bytecode ?? undefined
    })

    //
    // Public (null if contractId is not on Sourcify)
    //

    public readonly fullMatch: ComputedRef<boolean|null> = computed(
        () => this.sourcifyRecord.value?.fullMatch ?? null)

    public readonly sourcifyURL: ComputedRef<string|null> = computed(
        () => this.sourcifyRecord.value?.folderURL ?? null)

    //
    // Private
    //

    private readonly contractIdDidChange = async() => {
        if (this.contractId.value !== null) {
            const sce = systemContractRegistry.lookup(this.contractId.value)
            if (sce !== null) {
                // This is a system contract
                this.contractResponse.value = null
                this.systemContractEntry.value = sce
                this.sourcifyRecord.value = null
                this.ipfsMetadata.value = null
                try {
                    const asset = await AssetCache.instance.lookup(sce.abiURL) as { abi: ethers.utils.Fragment[]}
                    this.abi.value = asset.abi
                } catch {
                    this.abi.value = null
                }
            } else {
                // This is a custom contract: may be it's on sourcify or IPFS or not
                this.systemContractEntry.value = null
                try {
                    this.contractResponse.value = await ContractByIdCache.instance.lookup(this.contractId.value)
                } catch {
                    this.contractResponse.value = null
                }
                try {
                    this.sourcifyRecord.value = await SourcifyCache.instance.lookup(this.contractId.value)
                    if (this.sourcifyRecord.value !== null) {
                        // Contract is on sourcify
                        this.ipfsMetadata.value = null
                        this.abi.value = this.sourcifyRecord.value.metadata.output.abi as ethers.utils.Fragment[]
                    } else if (this.byteCodeAnalyzer.ipfsURL.value) {
                        // Checks IPFS
                        this.ipfsMetadata.value = await this.loadFromIPFS(this.byteCodeAnalyzer.ipfsURL.value)
                        this.abi.value = this.ipfsMetadata.value?.output.abi as ethers.utils.Fragment[]|null
                    } else {
                        this.ipfsMetadata.value = null
                        this.abi.value = null
                    }
                } catch {
                    this.sourcifyRecord.value = null
                    this.ipfsMetadata.value = null
                    this.abi.value = null
                }
            }
        } else {
            this.systemContractEntry.value = null
            this.sourcifyRecord.value = null
            this.ipfsMetadata.value = null
            this.abi.value = null
        }
    }

    private async loadFromIPFS(ipfsURL: string): Promise<SolcMetadata|null> {
        let result: SolcMetadata|null
        this.ipfsLoading.value = true
        try {
            const options = { timeout: 10000 }
            const stealthAxios = axios.create()
            result = (await stealthAxios.get<SolcMetadata>(ipfsURL, options)).data
        } catch {
            result = null
        } finally {
            this.ipfsLoading.value = false
        }
        return Promise.resolve(result)
    }
}

export enum MetadataOrigin {
    System,
    Sourcify,
    IPFS,
    // LocalStorage,
}