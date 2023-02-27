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

import SolcWorker from "worker-loader!./worker/SolcWorker"
import {SolcInput} from "@/utils/solc/SolcInput";
import {SolcOutput} from "@/utils/solc/SolcOutput";

export class Solc {

    public static async run(version: string, input: SolcInput, importSources: Record<string, string>): Promise<SolcOutput> {

        const worker = new SolcWorker()

        function executor(resolve: (value: SolcOutput) => void, reject: (reason: unknown) => void) {
            worker.onmessage = (e: MessageEvent) => {
                const response = e.data as SolcWorkerOutput
                if (typeof response.output == "object") {
                    resolve(response.output)
                } else {
                    reject(response.error)
                }
            }
            const message: SolcWorkerInput = {version, input, importSources}
            worker.postMessage(message)
        }

        return new Promise(executor)
    }

    public static makeSolcInput(source: string, fileName: string): SolcInput {
        const result: SolcInput = {
            language: 'Solidity',
            sources: {},
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*'],
                    },
                },
            },
        }
        result.sources[fileName] = { content: source }
        return result
    }

}


export interface SolcWorkerInput {
    version: string
    input: SolcInput
    importSources: Record<string, string>
}

export interface SolcWorkerOutput {
    output?: SolcOutput
    error: unknown
}