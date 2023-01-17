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

import axios from "axios";
import {CompilerInput} from "@/utils/solidity/CompilerInput";
import {CompilerOutput} from "@/utils/solidity/CompilerOutput";
import {CompilerRegistry} from "@/utils/solidity/CompilerRegistry";

export class SolidityLang {

    //
    // Public
    //

    public static async fetchCompilerRegistry(): Promise<CompilerRegistry> {
        return (await axios.get<CompilerRegistry>("https://binaries.soliditylang.org/bin/list.json")).data
    }

    public static async compile(compilerURL: string, compilerInput: CompilerInput): Promise<CompilerOutput> {
        function executor(resolve: (value: CompilerOutput) => void, reject: (reason: unknown) => void) {
            const workerURL = SolidityLang.makeWorkerURL()
            const worker = new Worker(workerURL)
            const handleEvent = (e: MessageEvent<CompilerOutput> | ErrorEvent): void => {
                if (e instanceof MessageEvent) {
                    resolve(e.data)
                } else {
                    reject(e)
                }
                worker.terminate()
                URL.revokeObjectURL(workerURL)
            }
            worker.onmessage = handleEvent
            worker.onerror = handleEvent
            worker.postMessage({ compilerURL, compilerInput })
        }

        return new Promise<CompilerOutput>(executor)
    }

    //
    // Private
    //

    private static makeWorkerURL(): string {
        const part = "(" + SolidityLang.WORKER_SCRIPT + ")()"
        return URL.createObjectURL(new Blob([part], { type: 'module' }))
    }

    //
    // Private (Worker Script)
    //

    /*
        Inspired from:
            - https://github.com/ethereum/solc-js/blob/master/bindings/compile.ts
            - https://github.com/rexdavinci/browser-solidity-compiler/blob/main/src/browser.solidity.worker.ts
            - https://github.com/alincode/solc-import
            - https://github.com/ericxtang/browser-solc
            - https://github.com/zianksm/solc-browserify
            - https://socket.dev/npm/package/solc-browserify

     */

    private static readonly WORKER_SCRIPT = "function workerBody() {\n" +
        "\n" +
        "    if (typeof importScripts === 'function') {\n" +
        "\n" +
        "        const worker = self\n" +
        "\n" +
        "        worker.onmessage = (e) => {\n" +
        "            const { compilerURL, compilerInput } = e.data\n" +
        "\n" +
        "            console.log(\"Importing compiler \" + compilerURL)\n" +
        "            importScripts(compilerURL)\n" +
        "\n" +
        "            const soljson = worker.Module\n" +
        "\n" +
        "            if ('_solidity_compile' in soljson) {\n" +
        "                console.log(\"Running compiler \" + compilerURL)\n" +
        "                const compile = soljson.cwrap('solidity_compile', 'string', ['string', 'number'])\n" +
        "                const output = JSON.parse(compile(JSON.stringify(compilerInput)))\n" +
        "                worker.postMessage(output)\n" +
        "            }\n" +
        "        }\n" +
        "\n" +
        "    } else {\n" +
        "        console.log(\"workerBody() aborts because importScripts() is not defined\")\n" +
        "    }\n" +
        "}"
}
