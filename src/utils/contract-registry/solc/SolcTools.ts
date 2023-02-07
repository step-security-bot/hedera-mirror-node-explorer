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

/* eslint-disable @typescript-eslint/no-var-requires */

import {SolcIndex} from "@/utils/contract-registry/solc/SolcIndex";

const semver = require("semver")

export class SolcTools {


    //
    // Public
    //

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
                result = this.isValidVersion(versionSpec, index) ? versionSpec : null
            } else if (semver.validRange(versionSpec) !== null) {
                result = this.chooseVersion(versionSpec, index)
            } else {
                result = null
            }
        } else {
            result = null
        }

        return result
    }


    public static extractImportPaths(source: string): string[] {

        /*
            import "./HederaResponseCodes.sol";
         */

        const result = new Array<string>()
        const regexp = /import "(.*)"/g
        const matches = source.matchAll(regexp)
        for (const match of matches) {
            if (match.length == 2) {
                result.push(match[1])
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
