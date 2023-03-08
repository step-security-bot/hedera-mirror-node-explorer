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

import {Cache} from "@/utils/Cache"
import {ContractResponse} from "@/schemas/HederaSchemas";
import axios from "axios";

export class ContractCache extends Cache<string, ContractResponse|null, void> {

    public static readonly instance = new ContractCache()

    //
    // Cache
    //

    protected async load(contractId: string): Promise<ContractResponse|null> {
        let result: ContractResponse|null
        try {
            const response = await axios.get<ContractResponse>("api/v1/contracts/" + contractId)
            result = response.data
        } catch(reason) {
            if (axios.isAxiosError(reason) && reason.request?.status == 404) {
                result = null
            } else {
                throw reason
            }
        }
        return Promise.resolve(result)
    }

}