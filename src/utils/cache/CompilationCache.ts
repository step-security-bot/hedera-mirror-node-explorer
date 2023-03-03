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

import {Cache} from "@/utils/Cache"
import {SolcOutput} from "@/utils/solc/SolcOutput";
import {ContractMetadata} from "@/AppStorage";
import {Solc} from "@/utils/solc/Solc";
import {SolcUtils} from "@/utils/solc/SolcUtils";

export class CompilationCache extends Cache<string, CompilationRecord, ContractMetadata> {

    public static readonly instance = new CompilationCache()

    //
    // Cache
    //

    protected async load(contractId: string, metadata: ContractMetadata): Promise<CompilationRecord> {
        const solcInput = Solc.makeSolcInput(metadata.source, metadata.sourceFileName)
        const solcOutput = await Solc.run(metadata.version, solcInput, metadata.importSources)
        return Promise.resolve(new CompilationRecord(solcOutput, metadata))
    }

}

export class CompilationRecord {

    public readonly solcOutput: SolcOutput
    public readonly metadata: ContractMetadata

    public constructor(solcOutput: SolcOutput, metadata: ContractMetadata) {
        this.solcOutput = solcOutput
        this.metadata = metadata
    }

    public findMatchingContract(bytecode: string): string|null {
        return SolcUtils.findMatchingContract(this.metadata.sourceFileName, bytecode, this.solcOutput)
    }

}
