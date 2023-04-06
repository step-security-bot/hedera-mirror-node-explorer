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


import {ContractDescription, SolcOutput} from "@/utils/solc/SolcOutput";

export class SolcUtils {

    public static findMatchingContract(runtimeBytecode: string, compilerOutput: SolcOutput): ContractMatchResult|null {
        let result: ContractMatchResult|null = null

        for (const fn of Object.keys(compilerOutput.contracts)) {
            const descriptions = compilerOutput.contracts[fn]
            for (const sn of Object.keys(descriptions)) {
                const description = descriptions[sn]
                const deployedBytecode = description.evm?.deployedBytecode?.object ?? null
                if (deployedBytecode !== null) {
                    const comparison = this.compareBytecode(deployedBytecode, runtimeBytecode)
                    if (comparison != BytecodeComparison.mismatch) {
                        result = { sourceFileName: fn, contractName: sn }
                        break
                    }
                }
            }
        }

        return result
    }

    public static compareBytecode(bytecode1: string, bytecode2: string): BytecodeComparison {
        bytecode1 = bytecode1.startsWith("0x") ? bytecode1.slice(2) : bytecode1
        bytecode2 = bytecode2.startsWith("0x") ? bytecode2.slice(2) : bytecode2

        // Last 43 bytes of each bytecode represents metadata hash
        // https://docs.soliditylang.org/en/v0.4.25/metadata.html#encoding-of-the-metadata-hash-in-the-bytecode
        const hashSize = 43
        const bytecode1NoHash = bytecode1.slice(0, bytecode1.length - hashSize * 2)
        const bytecode2NoHash = bytecode2.slice(0, bytecode2.length - hashSize * 2)

        let result: BytecodeComparison
        if (bytecode1 === bytecode2) {
            result = BytecodeComparison.fullMatch
        } else if (bytecode1NoHash === bytecode2NoHash) {
            result = BytecodeComparison.partialMatch
        } else {
            result = BytecodeComparison.mismatch
        }

        return result
    }

    public static fetchDescription(sourceFileName: string, targetContract: string, output: SolcOutput): ContractDescription|null {
        let result: ContractDescription|null
        if (output.contracts && sourceFileName in output.contracts && targetContract in output.contracts[sourceFileName]) {
            result = output.contracts[sourceFileName][targetContract]
        } else {
            result =  null
        }
        return result
    }

}

export interface ContractMatchResult {
    sourceFileName: string
    contractName: string
}

export enum BytecodeComparison {
    fullMatch = "fullMatch",
    partialMatch = "partialMatch",
    mismatch = "mismatch"
}
