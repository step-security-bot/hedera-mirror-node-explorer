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

import {ethers} from "ethers"
import {ContractEntry} from "@/schemas/ContractEntry"
import {Cache} from "@/utils/Cache";
import {RegistryEntry} from "@/utils/contract-registry/RegistrySchema";
import {RegistryService} from "@/utils/contract-registry/RegistryService";
import {routeManager} from "@/router";

export class CustomContractRegistry extends Cache<string, CustomContractEntry> {

    //
    // Cache
    //

    protected async load(contractId: string): Promise<CustomContractEntry> {
        const registryEntry = await RegistryService.query(contractId, routeManager.selectedNetwork.value)
        const result = new CustomContractEntry(contractId, registryEntry)
        return Promise.resolve(result)
    }
}


export class CustomContractEntry extends ContractEntry {

    public readonly contractId: string
    public readonly registryEntry: RegistryEntry

    //
    // Exported
    //

    constructor(contractId: string, registryEntry: RegistryEntry) {
        super(registryEntry.compilationRequest.targetContract)
        this.contractId = contractId
        this.registryEntry = registryEntry
    }


    //
    // ContractEntry
    //

    /*
        https://docs.ethers.io/v5/api/utils/abi/interface/
     */

    protected async buildInterface(): Promise<ethers.utils.Interface|null> {
        let result: ethers.utils.Interface|null

        const abi = this.registryEntry.abi
        try {
            result = new ethers.utils.Interface(abi)
        } catch(error) {
            console.log("Failed to load ABI for contract " + this.contractId )
            console.log("error=" + error)
            result = null
        }

        return Promise.resolve(result)
    }

}

export const customContractRegistry = new CustomContractRegistry()
