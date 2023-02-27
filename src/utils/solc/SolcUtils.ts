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

    public static findMatchingContract(sourceFileName: string, deployedBytecode: string, compilerOutput: SolcOutput): string|null {
        let result: string|null = null

        const contractDescriptions = SolcUtils.fetchDescriptions(compilerOutput, sourceFileName)
        for (const contractName in contractDescriptions) {
            const compiledBytecode = SolcUtils.fetchBytecode(sourceFileName, contractName, compilerOutput)
            if (compiledBytecode !== null) {
                const comparison = SolcUtils.compareBytecode(deployedBytecode, compiledBytecode)
                if (comparison !== BytecodeComparison.mismatch) {
                    result = contractName
                    break
                }
            }
        }

        return result
    }

    public static compareBytecode(bytecode1: string, bytecode2: string): BytecodeComparison {

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

    public static fetchDescriptions(output: SolcOutput, sourceFileName: string): Record<string, ContractDescription> {
        let result: Record<string, ContractDescription>
        if (output.contracts && sourceFileName in output.contracts) {
            result = output.contracts[sourceFileName]
        } else {
            result = {}
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

    public static fetchBytecode(sourceFileName: string, targetContract: string, output: SolcOutput): string|null {
        return SolcUtils.fetchDescription(sourceFileName, targetContract, output)?.evm?.deployedBytecode?.object ?? null
    }

}

export enum BytecodeComparison {
    fullMatch = "fullMatch",
    partialMatch = "partialMatch",
    mismatch = "mismatch"
}
