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

import {SolcOutput} from "@/utils/solc/SolcOutput";
import {EntityCache} from "@/utils/cache/base/EntityCache";
import axios from "axios";
import {routeManager} from "@/router";

export class SolcOutputCache extends EntityCache<string, SolcOutput|null> {

    public static readonly METADATA_URL = "https://raw.githubusercontent.com/svienot/smartcontract-verification/main"

    public static readonly instance = new SolcOutputCache()

    //
    // Cache
    //

    protected async load(contractId: string): Promise<SolcOutput|null> {
        let result: Promise<SolcOutput|null>

        try {
            const network = routeManager.currentNetwork.value
            const url = SolcOutputCache.METADATA_URL + "/" + network + "/" + contractId + "/metadata.json"
            const response = await axios.get<SolcOutput>(url)
            result = Promise.resolve(response.data)
        } catch(error) {
            if (axios.isAxiosError(error) && error.response?.status == 404) {
                result = Promise.resolve(null)
            } else {
                throw error
            }
        }
        return result
    }


}