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

export abstract class ContractEntry {

    public readonly description: string

    private interface: ethers.utils.Interface|null = null

    //
    // Exported
    //

    async parseTransaction(data: string): Promise<ethers.utils.TransactionDescription|null> {
        if (this.interface === null) {
            this.interface = Object.preventExtensions(await this.buildInterface())
            // ethers.util.Interface instances does not support being proxied by VueJS
            // Using Object.preventExtensions() (experimentally) avoid proxying.
        }
        // if (this.compileOutput === null) {
        //     this.compileOutput = await CustomContractEntry.compile(this.fileId)
        // }
        // if (this.compileOutput !== null && this.interface === null) {
        //     this.interface = await CustomContractEntry.loadInterface(this.fileId, this.compileOutput)
        // }
        // if (this.interface !== null) {
        //     const r = this.interface._abiCoder.decode(this.interface.deploy.inputs, data)
        //     console.log("r=" + JSON.stringify(r))
        // }
        const result = this.interface?.parseTransaction({data: data}) ?? null
        return Promise.resolve(result)
    }

    async decodeFunctionResult(functionFragment: ethers.utils.FunctionFragment, resultData: string): Promise<ethers.utils.Result|null> {
        if (this.interface === null) {
            this.interface = Object.preventExtensions(await this.buildInterface())
        }
        const result = this.interface?.decodeFunctionResult(functionFragment, resultData) ?? null
        return Promise.resolve(result)
    }

    async getSignature(data: string): Promise<string|null> {
        if (this.interface === null) {
            this.interface = Object.preventExtensions(await this.buildInterface())
        }
        const result = this.interface?.parseTransaction({data: data})?.signature ?? null
        return Promise.resolve(result)
    }

    //
    // Protected
    //

    protected constructor(description: string) {
        this.description = description
    }

    protected async buildInterface(): Promise<ethers.utils.Interface|null> {
        throw new Error("To be subclassed")
    }
}
