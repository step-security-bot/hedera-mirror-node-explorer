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
import {AppStorage, ContractMetadata} from "@/AppStorage";
import {SolcUtils} from "@/utils/solc/SolcUtils";
import {ethers} from "ethers";
import {SystemContractEntry, systemContractRegistry} from "@/schemas/SystemContractRegistry";
import {AssetCache} from "@/utils/cache/AssetCache";
import {routeManager} from "@/router";
import {HederaNetwork} from "@bladelabs/blade-web3.js/lib/src/models/blade";
import {ContractCache} from "@/utils/cache/ContractCache";
import {CompilationCache} from "@/utils/cache/CompilationCache";

export class ContractInterfaceCache extends Cache<string, ethers.utils.Interface|null, void> {

    public static readonly instance = new ContractInterfaceCache()

    //
    // Cache
    //

    protected async load(contractId: string /* , context: void */): Promise<ethers.utils.Interface|null> {
        let result: ethers.utils.Interface|null
        const systemContract = systemContractRegistry.lookup(contractId)
        if (systemContract !== null) {
            // contractId is a system contract
            result = await ContractInterfaceCache.makeSystemContractInterface(systemContract)
        } else {
            const network = routeManager.currentNetwork.value as HederaNetwork
            const contractMetadata = AppStorage.getContractMetadata(network, contractId)
            if (contractMetadata !== null) {
                // contractId is a custom contract
                const contractResponse = await ContractCache.instance.lookup(contractId)
                if (contractResponse !== null && contractResponse.runtime_bytecode) {
                    result = await ContractInterfaceCache.makeCustomContractInterface(
                        contractId, contractMetadata, contractResponse.runtime_bytecode)
                } else {
                    result = null
                }
            } else {
                // contractId is unknown
                result = null
            }
        }
        return Promise.resolve(result)
    }

    //
    // Private
    //

    private static async makeSystemContractInterface(
        entry: SystemContractEntry): Promise<ethers.utils.Interface> {

        const url = window.location.origin + "/abi/" + entry.abiFileName
        const data = await AssetCache.instance.lookup(url) as { abi: ethers.utils.Fragment[] }
        return new ethers.utils.Interface(data.abi)
    }

    private static async makeCustomContractInterface(
        contractId: string, contractMetadata: ContractMetadata, deployedBytecode: string): Promise<ethers.utils.Interface|null> {

        let result: ethers.utils.Interface|null
        const compilationRecord = await CompilationCache.instance.lookup(contractId, contractMetadata)
        const contractName = compilationRecord.findMatchingContract(deployedBytecode)
        const contractDescription = contractName !== null
            ? SolcUtils.fetchDescription(contractMetadata.sourceFileName, contractName, compilationRecord.solcOutput)
            : null
        if (contractDescription?.abi) {
            result = new ethers.utils.Interface(contractDescription.abi)
        } else {
            result = null
        }

        return Promise.resolve(result)
    }
}
