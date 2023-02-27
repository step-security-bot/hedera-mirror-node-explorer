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
import {SolcIndex} from "@/utils/solc/SolcIndex";
import semver from "semver";

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

    public static extractSourceVersion(source: string, index: SolcIndex): string|null {
        let result: string|null

        /*
            https://docs.soliditylang.org/en/v0.8.18/layout-of-source-files.html#version-pragma
            https://docs.npmjs.com/cli/v6/using-npm/semver
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet

            pragma solidity ^0.5.2;
            pragma solidity >=0.7.0 <0.9.0;

         */

        // const regexp = /pragma\s+solidity\s+(\w[\s\w])\s*;/
        const regexp = /pragma solidity (.*);/
        const match = source.match(regexp)
        if (match !== null && match.length == 2) {
            const versionSpec = match[1]
            if (semver.valid(versionSpec) !== null) {
                result = SolcUtils.isValidVersion(versionSpec, index) ? versionSpec : null
            } else if (semver.validRange(versionSpec) !== null) {
                result = SolcUtils.chooseVersion(versionSpec, index)
            } else {
                result = null
            }
        } else {
            result = null
        }

        return result
    }

    public static extractImportPaths(source: string, builtinImports: string[]): string[] {

        /*
            import "./HederaResponseCodes.sol";
         */

        const result = new Array<string>()
        const regexp = /import "(.*)"/g
        const matches = source.matchAll(regexp)
        for (const match of matches) {
            if (match.length == 2 && !this.isBuiltinImportPath(match[1], builtinImports)) {
                result.push(match[1])
            }
        }

        return result
    }

    public static isBuiltinImportPath(path: string, builtinImports: string[]): boolean {
        let result = false
        for (const bi of builtinImports) {
            if (path.endsWith("/" + bi)) {
                result = true
                break
            }
        }
        return result
    }


    //
    // Private
    //

    private static isValidVersion(value: string, index: SolcIndex): boolean {
        return value in index.releases
    }

    private static chooseVersion(range: string, index: SolcIndex): string|null {

        function compareReleases(r1: string, r2: string): number {
            let result: number
            if (semver.lt(r1, r2)) {
                result = -1
            } else if (semver.gt(r1, r2)) {
                result = +1
            } else {
                result = 0
            }
            return result
        }
        const releases = Object.keys(index.releases).sort(compareReleases).reverse()

        let result: string|null = null
        for (const r of releases) {
            if (semver.satisfies(r, range)) {
                result = r
                break
            }
        }

        return result
    }


}

export enum BytecodeComparison {
    fullMatch = "fullMatch",
    partialMatch = "partialMatch",
    mismatch = "mismatch"
}
