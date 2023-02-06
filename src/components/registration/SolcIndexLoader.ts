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

import {SolcIndex} from "@/utils/contract-registry/solc/SolcIndex";
import {EntityLoader} from "@/utils/loader/EntityLoader";
import axios, {AxiosResponse} from "axios";

export class SolcIndexLoader extends EntityLoader<SolcIndex> {


    //
    // Public
    //

    public fetchLongVersion(version: string): string|null {

        /*
            {
              "path": "soljson-v0.8.18+commit.87f61d96.js",
              "version": "0.8.18",
              "build": "commit.87f61d96",
              "longVersion": "0.8.18+commit.87f61d96",
              "keccak256": "0x9a8fa4183ef95496045189b80dfb39f745db89a903b398e40131f500953e5d57",
              "sha256": "0xd82bdcba2c386d60b33aca148a9cfdf097551f68c5e45d8ec01aebbafacf5075",
              "urls": [
                "bzzr://338117c2130fcb6bce3006330712b6e7ee99875b56ce4bb6182312f76e4a6bac",
                "dweb:/ipfs/QmcKzrqRBy7PeFQxzJDs1AZZzNHKaKbJces6zUDysXZofJ"
              ]
            },

         */

        let result: string|null
        if (this.entity.value !== null && version in this.entity.value.releases) {
            result = null
            const path = this.entity.value.releases[version]
            for (const b of this.entity.value.builds) {
                if (b.path == path) {
                    result = b.longVersion
                    break
                }
            }
        } else {
            result = null
        }

        return result
    }

    //
    // EntityLoader
    //

    protected async load(): Promise<AxiosResponse<SolcIndex> | null> {
        return axios.get("https://binaries.soliditylang.org/bin/list.json")
    }

}