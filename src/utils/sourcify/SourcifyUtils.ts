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

import {SolcInput} from "@/utils/solc/SolcInput";
import {routeManager} from "@/router";
import {ContractByIdCache} from "@/utils/cache/ContractByIdCache";
import axios, {AxiosResponse} from "axios";
import {SolcMetadata} from "@/utils/solc/SolcMetadata";

export class SourcifyUtils {

    //
    // Stateless verification
    //

    public static async verifyWithSolcInput(contractId: string,
                               contractName: string,
                               compilerVersion: string,
                               solcInput: SolcInput): Promise<SourcifyVerifyResponse|null> {
        let result: SourcifyVerifyResponse|null

        const contractResponse = await ContractByIdCache.instance.lookup(contractId)
        const address = contractResponse?.evm_address ?? null
        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (address !== null && sourcifySetup !== null) {
            const requestBody: SourcifyVerifyBody = {
                address: address,
                chain: sourcifySetup.chainID.toString(),
                files: {
                    "SolcJsonInput.json": JSON.stringify(solcInput)
                },
                compilerVersion: compilerVersion,
                contractName: contractName
            }
            const url = sourcifySetup.serverURL + "verify/solc-json"
            const sourcifyResponse = await axios.post<SourcifyVerifyResponse>(url, requestBody)
            result = sourcifyResponse.data
        } else {
            result = null
        }

        return Promise.resolve(result)
    }

    public static async verify(contractId: string, metadata: SolcMetadata, inputFiles: Map<string, string>): Promise<SourcifyVerifyResponse|null> {
        let result: SourcifyVerifyResponse|null

        const contractResponse = await ContractByIdCache.instance.lookup(contractId)
        const address = contractResponse?.evm_address ?? null
        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (address !== null && sourcifySetup !== null) {
            const requestBody: SourcifyVerifyBody = {
                address: address,
                chain: sourcifySetup.chainID.toString(),
                files: {
                    "metadata.json": JSON.stringify(metadata)
                }
            }
            for (const [fileName, content] of inputFiles.entries()) {
                requestBody.files[fileName] = content
            }
            const url = sourcifySetup.serverURL + "verify"
            const sourcifyResponse = await axios.post<SourcifyVerifyResponse>(url, requestBody)
            result = sourcifyResponse.data
        } else {
            result = null
        }

        return Promise.resolve(result)
    }

    public static async verifyV2(contractId: string, inputFiles: Map<string, string>): Promise<SourcifyVerifyResponse|null> {
        let result: SourcifyVerifyResponse|null

        const contractResponse = await ContractByIdCache.instance.lookup(contractId)
        const address = contractResponse?.evm_address ?? null
        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (address !== null && sourcifySetup !== null) {
            const requestBody: SourcifyVerifyBody = {
                address: address,
                chain: sourcifySetup.chainID.toString(),
                files: {}
            }
            for (const [fileName, content] of inputFiles.entries()) {
                requestBody.files[fileName] = content
            }
            const url = sourcifySetup.serverURL + "verify"
            const sourcifyResponse = await axios.post<SourcifyVerifyResponse>(url, requestBody)
            result = sourcifyResponse.data
        } else {
            result = null
        }

        return Promise.resolve(result)
    }

    //
    // Session verification
    //

    private static readonly withCredentials = true

    public static async sessionData(): Promise<SourcifyInputFilesResponse> {
        let result: SourcifyInputFilesResponse

        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (sourcifySetup !== null) {
            const url = sourcifySetup.serverURL + "session/data"
            const config = { withCredentials: this.withCredentials }
            const response = await axios.get<SourcifyInputFilesResponse>(url, config)
            result = response.data
        } else {
            throw Error("No sourcify setup for network " + routeManager.currentNetworkEntry.value.name)
        }

        return Promise.resolve(result)
    }

    public static async sessionClear(): Promise<string> {
        let result: string

        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (sourcifySetup !== null) {
            const url = sourcifySetup.serverURL + "session/clear"
            const config = { withCredentials: this.withCredentials }
            const response = await axios.post<string>(url, null, config)
            result = response.data
        } else {
            throw Error("No sourcify setup for network " + routeManager.currentNetworkEntry.value.name)
        }

        return Promise.resolve(result)
    }

    public static async sessionInputFiles(files: Map<string, string>): Promise<SourcifyInputFilesResponse> {
        let result: SourcifyInputFilesResponse

        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (sourcifySetup !== null) {
            const body: SourcifyInputFilesBody = {
                files: {}
            }
            for (const [f, c] of files) {
                body.files[f] = c
            }
            const url = sourcifySetup.serverURL + "session/input-files"
            // const config = {
            //     withCredentials: this.withCredentials ,
            //     headers: {'content-type': 'application/json'}
            // }
            // const response = await axios.post<SourcifyInputFilesResponse>(url, body, config)
            // result = response.data

            const options: RequestInit = {
                body: JSON.stringify(body),
                method: "POST",
                headers: {'content-type': 'application/json'},
                credentials: "include",
            }
            try {
                const response = await fetch(url, options)
                result = JSON.parse(await response.text())
            } catch(reason) {
                console.log("reason=" + reason)
            }
        } else {
            throw Error("No sourcify setup for network " + routeManager.currentNetworkEntry.value.name)
        }

        return Promise.resolve(result)
    }

    public static async verifyChecked(contractId: string, verificationId: string): Promise<SourcifyVerifyCheckedResponse> {
        let result: SourcifyVerifyCheckedResponse

        const contractResponse = await ContractByIdCache.instance.lookup(contractId)
        const address = contractResponse?.evm_address ?? null
        const sourcifySetup = routeManager.currentNetworkEntry.value.sourcifySetup
        if (address !== null && sourcifySetup !== null) {
            const body: SourcifyVerifyCheckedBody = {
                contracts: [
                    {
                        address: address,
                        chainId: sourcifySetup.chainID.toString(),
                        verificationId: verificationId,
                        creatorTxHash: null
                    }
                ]
            }
            const url = sourcifySetup.serverURL + "session/verify-checked"
            // const config = {
            //     withCredentials: this.withCredentials ,
            //     headers: {'content-type': 'application/json'}
            // }
            // const response = await axios.post<SourcifyVerifyCheckedResponse>(url, body, config)
            // result = response.data

            const options: RequestInit = {
                body: JSON.stringify(body),
                method: "POST",
                headers: {'content-type': 'application/json'},
                credentials: "include",
            }
            const response = await fetch(url, options)
            result = JSON.parse(await response.text())
        } else {
            throw Error("No sourcify setup for network " + routeManager.currentNetworkEntry.value.name)
        }

        return Promise.resolve(result)
    }

    //
    // Tools
    //

    public static fetchVerifyError(reason: unknown): string|null {
        let result: string|null

        if (axios.isAxiosError(reason)) {
            const response = reason.response as AxiosResponse<SourcifyVerifyResponse>|undefined
            result = response?.data.error ?? null
        } else if ((reason as any).message) {
            result = (reason as any).message
        } else {
            result = null
        }
        return result
    }

    public static fetchVerifyStatus(response: SourcifyVerifyResponse): string|null {
        return response.result && response.result.length >= 1 ? response.result[0].status : null
    }
}


export interface SourcifyVerifyBody {
    address: string
    chain: string
    files: Record<string, string> // filename x content
    compilerVersion?: string
    contractName?: string
}

export interface SourcifyVerifyResponse {
    error?: string,
    result?: {
        address: string,
        chainId: string,
        status: string,
        library: Record<string, unknown>
    }[]
}

export interface SourcifyInputFilesBody {
    files: Record<string, string> // filename x content
}

export interface SourcifyInputFilesResponse {
    contracts: {
        compiledPath: string
        name: string
        compilerVersion: string
        files: {
            found: string[]
            missing: string[]
        }
        verificationId: string
        status: string
    }[]
    files: string[]
    unused: string[]
}

export interface SourcifyVerifyCheckedBody {
    contracts: {
        address: string
        chainId: string
        creatorTxHash: string|null
        verificationId: string
    }[]
}


export interface SourcifyVerifyCheckedResponse {
    contracts: [{
        verificationId: string
        compiledPath: string
        name: string
        compilerVersion: string
        address: string
        chainId: string
        files: {
            found: string[]
            missing: string[]
        }
        status: string
        storageTimestamp: string
    }]
    files: string[]
    unused: string[]
}
