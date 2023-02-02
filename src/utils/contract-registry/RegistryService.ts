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

import {CompilationRequest, RegisterResponse, RegistryEntry} from "@/utils/contract-registry/RegistrySchema";
import axios from "axios";

export class RegistryService {

    static readonly REGISTRY_URL = "http://vps-4403a704.vps.ovh.net:8000"

    static async register(contractId: string,
                          network: string,
                          compilationRequest: CompilationRequest,
                          dryRun: boolean): Promise<RegisterResponse> {

        const url = this.REGISTRY_URL + "/register/" + network + "/" + contractId + (dryRun ? "?dryRun=true" : "")
        const r = await axios.post<RegisterResponse>(url, compilationRequest)
        return Promise.resolve(r.data)
    }

    static async query(contractId: string,
                       network: string): Promise<RegistryEntry> {
        const url = this.REGISTRY_URL + "/query/" + network + "/" + contractId
        const r = await axios.get<RegistryEntry>(url)
        return Promise.resolve(r.data)
    }
}
