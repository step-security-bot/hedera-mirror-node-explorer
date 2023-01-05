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

import {ethers} from "ethers";
import {solidityCompiler} from "@agnostico/browser-solidity-compiler";
import {AppStorage} from "@/AppStorage";
import {ContractEntry} from "@/schemas/ContractEntry";

export class CustomContractRegistry {

    private readonly entries = new Map<string, CustomContractEntry>()

    constructor() {
        this.reload()
    }

    public lookup(fileId: string): CustomContractEntry | null {
        return this.entries.get(fileId) ?? null
    }

    public reload(): void {
        for (const fileId of AppStorage.getSolidityFileIds()) {
            this.addEntry(fileId, AppStorage.getSolidityName(fileId) ?? "")
        }
    }

    public update(fileId: string, contractSource: string, contractName: string): void {
        AppStorage.setSolidityName(fileId, contractName)
        AppStorage.setSoliditySource(fileId, contractSource)
        this.entries.set(fileId, new CustomContractEntry(fileId, contractName))
    }

    public forget(fileId: string): void {
        AppStorage.setSolidityName(fileId, null)
        AppStorage.setSoliditySource(fileId, null)
        this.entries.delete(fileId)
    }

    //
    // Private
    //

    private addEntry(fileId: string, description: string) {
        if(!this.entries.get(fileId)) {
            this.entries.set(fileId, new CustomContractEntry(fileId, description))
        }
    }
}


export class CustomContractEntry extends ContractEntry {

    public readonly fileId: string

    private compileOutput: CompileOutput|null = null
    private compilePromise: Promise<CompileOutput|null>|null = null

    //
    // Exported
    //

    constructor(fileId: string, description: string) {
        super(description)
        this.fileId = fileId
    }

    async getByteCode(): Promise<string|null> {
        let result: string|null
        const compileOutput = await this.getCompileOutput()
        if (compileOutput !== null) {
            result = compileOutput.fetchByteCode(this.makeBaseName())
        } else {
            result = null
        }
        return Promise.resolve(result)
    }

    async verifyByteCode(deployedByteCode: string): Promise<boolean> {
        let result: boolean

        deployedByteCode = deployedByteCode.startsWith("0x") ? deployedByteCode.slice(2) : deployedByteCode

        const compiledByteCode = await this.getByteCode()
        if (compiledByteCode !== null) {
            // Compares deployedByteCode and compiledByteCode
            // Comparison logic excludes last 43 bytes of each bytecode (which represent metadata hash)
            // // https://docs.soliditylang.org/en/v0.4.25/metadata.html#encoding-of-the-metadata-hash-in-the-bytecode
            const hashSize = 43
            const deployedByteCodeNoHash = deployedByteCode.slice(0, deployedByteCode.length - hashSize * 2)
            const compiledByteCodeNoHash = compiledByteCode.slice(0, compiledByteCode.length - hashSize * 2)
            result = compiledByteCodeNoHash == deployedByteCodeNoHash
        } else {
            result = false
        }
        return Promise.resolve(result)
    }

    //
    // ContractEntry
    //

    /*
        https://docs.ethers.io/v5/api/utils/abi/interface/
     */

    protected async buildInterface(): Promise<ethers.utils.Interface|null> {
        let result: ethers.utils.Interface|null

        const compileOutput = await this.getCompileOutput()
        if (compileOutput !== null) {
            const name = this.makeBaseName()
            const abi = name !== null ? compileOutput.fetchABI(name) : null
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

    private async getCompileOutput(): Promise<CompileOutput|null> {
        let result: CompileOutput|null

        if (this.compilePromise !== null) {
            result = await this.compilePromise
        } else if (this.compileOutput !== null) {
            result = this.compileOutput
        } else {
            this.compilePromise = CustomContractEntry.compile(this.fileId)
            this.compileOutput = await this.compilePromise
            result = this.compileOutput
        }

        return result
    }

    private static async compile(fileId: string): Promise<CompileOutput|null> {
        let result: CompileOutput|null

        // https://github.com/rexdavinci/browser-solidity-compiler

        const sourceCode = AppStorage.getSoliditySource(fileId)
        if (sourceCode !== null) {
            console.log("Starting compilation")
            try {
                const rawOutput = await solidityCompiler({
                    version: `https://binaries.soliditylang.org/bin/soljson-v0.8.17+commit.8df45f5f.js`,
                    contractBody: sourceCode
                })
                result = new CompileOutput(rawOutput)
                console.log("Compilation succeeded")
                // console.log(JSON.stringify(result, null, " "))
            } catch(error) {
                console.log("Compilation failed")
                console.log("error=" + error)
                result = null
            }
        } else {
            console.log("No source code found in local storage for fileId " + fileId)
            result = null
        }
        return Promise.resolve(result)
    }

}


class CompileOutput {

    readonly rawOutput: unknown

    constructor(rawOutput: unknown) {
        this.rawOutput = rawOutput
    }

    fetchABI(name: string): ethers.utils.Fragment[] {
        const result = CompileOutput.fetch(this.rawOutput, ["contracts", "Compiled_Contracts", name, "abi"])
        return result as ethers.utils.Fragment[]
    }

    fetchByteCode(name: string): string|null {
        const result = CompileOutput.fetch(this.rawOutput, ["contracts", "Compiled_Contracts", name, "evm", "deployedBytecode", "object"])
        return result as string|null
    }

    private static fetch(container: unknown, keys: string[]): unknown {
        let result: unknown
        if (keys.length == 0) {
            result = container
        } else if (typeof container == "object" && container !== null) {
            const nextContainer = (container as Record<string, unknown>)[keys[0]]
            result = this.fetch(nextContainer, keys.slice(1))
        } else {
            result = null
        }
        return result
    }
}

export const customContractRegistry = new CustomContractRegistry()
