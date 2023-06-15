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

import {computed, ref, Ref, watch, WatchStopHandle} from 'vue';
import {ContractResponse} from "@/schemas/HederaSchemas";
import {ByteCodeAnalyzer} from "@/utils/analyzer/ByteCodeAnalyzer";
import {SolcMetadata} from "@/utils/solc/SolcMetadata";
import axios from "axios";

export class ContractSourceAnalyzer {

    public readonly contract: Ref<ContractResponse|undefined>
    private readonly byteCodeAnalyzer: ByteCodeAnalyzer
    private readonly watchHandle: Ref<WatchStopHandle|null> = ref(null)
    private readonly ipfsLoading = ref<boolean>(false)
    private readonly ipfsMetadata: Ref<SolcMetadata|undefined> = ref(undefined)

    //
    // Public
    //

    public constructor(contract: Ref<ContractResponse|undefined>) {
        this.contract = contract
        this.byteCodeAnalyzer = new ByteCodeAnalyzer(computed(() => contract.value?.runtime_bytecode ?? undefined))
    }

    public mount(): void {
        this.watchHandle.value = watch(this.byteCodeAnalyzer.ipfsURL,this.ipfsUrlDidChange, { immediate: true})
    }

    public unmount(): void {
        if (this.watchHandle.value !== null) {
            this.watchHandle.value()
            this.watchHandle.value = null
        }
        this.ipfsMetadata.value = undefined
    }

    //
    // Private
    //

    private readonly ipfsUrlDidChange = async () => {
        const ipfsURL = this.byteCodeAnalyzer.ipfsURL.value
        if (ipfsURL) {
            this.ipfsLoading.value = true
            try {
                const options = { timeout: 10000 }
                const stealthAxios = axios.create()
                this.ipfsMetadata.value = (await stealthAxios.get<SolcMetadata>(ipfsURL, options)).data
            } catch {
                this.ipfsMetadata.value = undefined
            } finally {
                this.ipfsLoading.value = false
            }
        } else {
            this.ipfsMetadata.value = undefined
        }
    }

}