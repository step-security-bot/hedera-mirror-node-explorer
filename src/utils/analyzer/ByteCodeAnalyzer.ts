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

import {computed, Ref, ref, watch, WatchStopHandle} from "vue";
import {decode} from "@ethereum-sourcify/bytecode-utils";
import {SolcMetadata} from "@/utils/solc/SolcMetadata";
import axios from "axios";

export class ByteCodeAnalyzer {

    public readonly byteCode = ref<string|undefined>(undefined)

    //
    // Public
    //

    public constructor(byteCode: Ref<string|undefined>) {
        this.byteCode = byteCode
    }

    public readonly solcVersion = computed(() => this.decodedObject.value?.solcVersion)

    public readonly ipfsHash = computed(() => this.decodedObject.value?.ipfs)

    public readonly swarmHash = computed(() => this.decodedObject.value?.bzzr1)

    public readonly ipfsURL = computed(() => {
        return this.ipfsHash.value ? "https://ipfs.io/ipfs/" + this.ipfsHash.value : undefined
    })

    //
    // Private
    //

    private readonly decodedObject = computed(() => {
        let result: DecodedObject|null
        if (this.byteCode.value) {
            try {
                result = decode(this.byteCode.value)
            } catch {
                result = null
            }
        } else {
            result = null
        }
        return result
    })

}

type DecodedObject = {
    ipfs?: string
    bzzr1?: string
    solcVersion?: string
}
