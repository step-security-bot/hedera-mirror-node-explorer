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
import axios from "axios";

export class AssetCache extends Cache<string, unknown, void> {

    public static readonly instance = new AssetCache()

    //
    // Cache
    //

    protected async load(url: string): Promise<unknown> {
        const response = await axios.get<unknown>(url)
        return Promise.resolve(response.data)
    }

}
