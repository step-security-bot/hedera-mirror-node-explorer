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
import {AppStorage} from "@/AppStorage"
import {ContractEntry} from "@/schemas/ContractEntry"
import {SolidityLang} from "@/utils/solidity/SolidityLang"
import {CompilerOutput, ContractDescription} from "@/utils/solidity/CompilerOutput";
import {CompilerInput} from "@/utils/solidity/CompilerInput";

export class CustomContractRegistry {

    public static readonly COMPILER_URL_FALLBACK = "https://binaries.soliditylang.org/bin/soljson-v0.8.17+commit.8df45f5f.js"

    private readonly entries = new Map<string, CustomContractEntry>()

    constructor() {
        this.reload()
    }

    public lookup(fileId: string): CustomContractEntry | null {
        return this.entries.get(fileId) ?? null
    }

    public reload(): void {
        for (const fileId of AppStorage.getSolidityFileIds()) {
            const name = AppStorage.getSolidityName(fileId) ?? ""
            const compilerURL = AppStorage.getSolidityCompilerURL(fileId) ?? CustomContractRegistry.COMPILER_URL_FALLBACK
            this.addEntry(fileId, name, compilerURL)
        }
    }

    public update(fileId: string, compilerURL: string, contractSource: string, contractName: string): void {
        AppStorage.setSolidityName(fileId, contractName)
        AppStorage.setSoliditySource(fileId, contractSource)
        AppStorage.setSolidityCompilerURL(fileId, compilerURL)
        this.entries.set(fileId, new CustomContractEntry(fileId, contractName, compilerURL))
    }

    public forget(fileId: string): void {
        AppStorage.setSolidityName(fileId, null)
        AppStorage.setSoliditySource(fileId, null)
        AppStorage.setSolidityCompilerURL(fileId, null)
        this.entries.delete(fileId)
    }

    //
    // Private
    //

    private addEntry(fileId: string, description: string, compilerURL: string) {
        if(!this.entries.get(fileId)) {
            this.entries.set(fileId, new CustomContractEntry(fileId, description, compilerURL))
        }
    }
}


export class CustomContractEntry extends ContractEntry {

    public readonly fileId: string
    public readonly compilerURL: string

    private compilationReport: CompilationReport|null = null
    private compilationPromise: Promise<CompilationReport>|null = null

    //
    // Exported
    //

    constructor(fileId: string, description: string, compilerURL: string) {
        super(description)
        this.fileId = fileId
        this.compilerURL = compilerURL
    }

    async getCompilationReport(): Promise<CompilationReport> {
        let result: CompilationReport

        if (this.compilationPromise !== null) {
            result = await this.compilationPromise
        } else if (this.compilationReport !== null) {
            result = this.compilationReport
        } else {
            this.compilationPromise = CustomContractEntry.compile(this.fileId, this.compilerURL)
            this.compilationReport = await this.compilationPromise // (1)
            this.compilationPromise = null
            result = this.compilationReport
        }

        return result
    }


    verifyBytecode(deployedByteCode: string, report: CompilationReport): boolean {
        let result: boolean

        deployedByteCode = deployedByteCode.startsWith("0x") ? deployedByteCode.slice(2) : deployedByteCode

        if (report !== null) {
            const contractDescription = report.getContractDescription("Compiled_Contracts", this.makeBaseName())
            const compiledByteCode = contractDescription?.evm?.deployedBytecode.object ?? null

            if (compiledByteCode !== null) {
                // Compares deployedByteCode and compiledByteCode
                // Comparison logic excludes last 43 bytes of each bytecode (which represent metadata hash)
                // https://docs.soliditylang.org/en/v0.4.25/metadata.html#encoding-of-the-metadata-hash-in-the-bytecode
                const hashSize = 43
                const deployedByteCodeNoHash = deployedByteCode.slice(0, deployedByteCode.length - hashSize * 2)
                const compiledByteCodeNoHash = compiledByteCode.slice(0, compiledByteCode.length - hashSize * 2)
                result = compiledByteCodeNoHash == deployedByteCodeNoHash
            } else {
                result = false
            }
        } else {
            result = false
        }

        return result
    }


    //
    // ContractEntry
    //

    /*
        https://docs.ethers.io/v5/api/utils/abi/interface/
     */

    protected async buildInterface(): Promise<ethers.utils.Interface|null> {
        let result: ethers.utils.Interface|null

        const report = await this.getCompilationReport()
        if (report !== null) {
            const name = this.makeBaseName()
            const contractDescription = report.getContractDescription("Compiled_Contracts", name)
            const abi = contractDescription?.abi ?? null
            if (abi !== null) {
                try {
                    result = new ethers.utils.Interface(abi)
                } catch(error) {
                    console.log("Failed to load ABI for fileId " + this.fileId )
                    console.log("error=" + error)
                    result = null
                }
            } else {
                console.log("No ABI found for fileId " + this.fileId)
                result = null
            }
        } else {
            result = null
        }

        return Promise.resolve(result)
    }

    //
    // Private
    //

    private makeBaseName(): string {
        let result: string
        const fileType = ".sol"
        if (this.description.toLowerCase().endsWith(fileType)) {
            result = this.description.slice(0, this.description.length - fileType.length)
        } else {
            result = this.description
        }
        return result
    }

    private static async compile(fileId: string, compilerURL: string): Promise<CompilationReport> {
        let result: CompilationReport

        // https://github.com/rexdavinci/browser-solidity-compiler

        const sourceCode = AppStorage.getSoliditySource(fileId)
        if (sourceCode !== null) {
            console.log("Starting compilation")
            try {
                const compilerInput = CustomContractEntry.makeCompilerInput(sourceCode)
                const compilerOutput = await SolidityLang.compile(compilerURL, compilerInput)
                result = new CompilationReport(compilerOutput)
                console.log("Compilation succeeded")
                // console.log(JSON.stringify(result, null, " "))
            } catch(error) {
                console.log("Compilation failed")
                console.log("error=" + error)
                result = new CompilationReport(null)
            }
        } else {
            console.log("No source code found in local storage for fileId " + fileId)
            result = new CompilationReport(null)
        }
        return Promise.resolve(result)
    }


    private static makeCompilerInput(source: string): CompilerInput {
        return {
            language: 'Solidity',
            sources: {
                'Compiled_Contracts': {
                    content: source,
                }
            },
            settings: {
                remappings: [
                    "./=https://raw.githubusercontent.com/hashgraph/hedera-smart-contracts/main/contracts/hts-precompile/"
                ],
                outputSelection: {
                    '*': {
                        '*': ['*'],
                    },
                },
            },
        }
    }


}


export class CompilationReport {

    readonly output: CompilerOutput|null

    constructor(output: CompilerOutput|null) {
        this.output = output
    }

    getErrorCount(): number {
        let result = 0
        for (const e of this.output?.errors ?? []) {
            if (e.severity == "error") {
                result += 1
            }
        }
        return result
    }

    getContractDescription(fileName: string, contractName: string): ContractDescription|null {
        let result: ContractDescription|null
        if (this.output !== null && this.output.contracts && fileName in this.output.contracts) {
            result = this.output.contracts[fileName][contractName] ?? null
        } else {
            result = null
        }
        return result
    }


}

export const customContractRegistry = new CustomContractRegistry()
