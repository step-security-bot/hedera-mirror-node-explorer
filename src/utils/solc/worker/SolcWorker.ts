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

import {SolcWorkerInput, SolcWorkerOutput} from "@/utils/solc/Solc";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const ctx = self as any;

ctx.onmessage = (event: MessageEvent) => {
    const message = event.data as SolcWorkerInput

    // 1) Basic require => KO
    // // eslint-disable-next-line  @typescript-eslint/no-var-requires
    // const solc = require("solc")

    // 2) https://github.com/ethereum/solc-js/issues/226#issuecomment-611661011
    // ctx.importScripts("https://ethereum.github.io/solc-bin/bin/soljson-v0.6.6+commit.6c089d02.js")
    // ctx.importScripts("/solc.bundle.js")

    // 3) https://github.com/ethereum/solc-js#browser-usage
    const compilerURL = "https://binaries.soliditylang.org/bin/soljson-" + message.version + ".js"
    ctx.importScripts(compilerURL)
    // eslint-disable-next-line  @typescript-eslint/no-var-requires
    const wrapper = require('solc/wrapper');
    ctx.solc = wrapper(ctx.Module);
    console.log("solc=" + JSON.stringify(ctx.solc))

    const importCallback = (path: string) =>  {
        const result = {} as { contents?: string, error: unknown }
        if (path in message.importSources) {
            result.contents = message.importSources[path]
        } else {
            result.error = "File not found: " + path
        }
        return result
    }

    const response = {} as SolcWorkerOutput
    const inputText = JSON.stringify(message.input)
    const options = { import: importCallback }
    try {
        response.output = JSON.parse(ctx.solc.compile(inputText, options))
    } catch(error) {
        response.error = error
    }
    ctx.postMessage(response)

}


