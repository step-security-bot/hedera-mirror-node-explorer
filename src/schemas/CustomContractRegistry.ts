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
        for (const fileId of AppStorage.getSolidityFileIds()) {
            this.addEntry(fileId, AppStorage.getSolidityName(fileId) ?? "")
        }
    }

    public lookup(fileId: string): CustomContractEntry | null {
        return this.entries.get(fileId) ?? null
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


class CustomContractEntry extends ContractEntry {

    public readonly fileId: string

    private compileOutput: CompileOutput|null = null

    //
    // Exported
    //

    constructor(fileId: string, description: string) {
        super(description)
        this.fileId = fileId
    }

    //
    // ContractEntry
    //

    protected async buildInterface(): Promise<ethers.utils.Interface|null> {
        let result: ethers.utils.Interface|null

        if (this.compileOutput === null) {
            this.compileOutput = await CustomContractEntry.compile(this.fileId)
        }
        if (this.compileOutput !== null) {
            result = await CustomContractEntry.loadInterface(this.fileId, this.compileOutput)
        } else {
            result = null
        }

        return Promise.resolve(result)
    }

    //
    // Private
    //

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


    /*
        https://docs.ethers.io/v5/api/utils/abi/interface/
     */

    private static async loadInterface(fileId: string, compileOutput: CompileOutput): Promise<ethers.utils.Interface|null> {
        let result: ethers.utils.Interface|null
        const name = AppStorage.getSolidityName(fileId)
        const abi = name !== null ? compileOutput.fetchABI(name) : null
        if (abi !== null) {
            try {
                result = new ethers.utils.Interface(abi)
            } catch(error) {
                console.log("Failed to load ABI for fileId " + fileId )
                console.log("error=" + error)
                result = null
            }
        } else {
            console.log("No ABI found for fileId " + fileId)
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