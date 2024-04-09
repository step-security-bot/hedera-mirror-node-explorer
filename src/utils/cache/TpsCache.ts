/*-
 *
 * Hedera Mirror Node Explorer
 *
 * Copyright (C) 2021 - 2024 Hedera Hashgraph, LLC
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

import {SingletonCache} from "@/utils/cache/base/SingletonCache";
import axios, {AxiosResponse} from "axios";
import {Block, BlocksResponse} from "@/schemas/HederaSchemas";
import {Timestamp} from "@/utils/Timestamp";

export class TpsCache extends SingletonCache<TpsRecord|null> {

    public static readonly instance = new TpsCache()

    //
    // Cache
    //

    protected async load(): Promise<TpsRecord|null> {
        const blocks = await TpsCache.loadBlocks()
        const result = blocks.length >= 100 ? TpsCache.buildTpsRecord(blocks) : null
        return Promise.resolve(result)
     }

    //
    // Public
    //

    private static async loadBlocks(): Promise<Block[]> {
        let result: Block[] = []

        let nextURL: string|null = "api/v1/blocks?order=desc&limit=100"
        let repeat = 2
        while (nextURL !== null && repeat >= 1) {
            const response: AxiosResponse<BlocksResponse>
                = await axios.get<BlocksResponse>(nextURL)
            result = result.concat(response.data.blocks ?? [])
            nextURL = response.data.links?.next ?? null
            repeat -= 1
        }
        result.reverse()

        return Promise.resolve(result)
    }

    private static buildTpsRecord(blocks: Block[]): TpsRecord|null {
        let result: TpsRecord|null

        const fromBlock = blocks[0]
        const toBlock = blocks[blocks.length-1]
        const fromBlockNb = fromBlock.number ?? null
        const toBlockNb = toBlock.number ?? null
        const elapsedSeconds = TpsCache.computeElapsedSeconds(blocks)
        const toTimestamp = TpsCache.computeToTimestamp(blocks)
        const transactionCount = TpsCache.computeTransactionCount(blocks)
        if (fromBlockNb !== null && toBlockNb !== null &&
            elapsedSeconds !== null && toTimestamp !== null && elapsedSeconds > 0) {
            const tps = transactionCount / elapsedSeconds
            const time = toTimestamp.toEpochMillis()
            result = { tps , time, fromBlockNb, toBlockNb }
        } else {
            // Emergency code
            result = null
        }

        return result
    }

    private static computeElapsedSeconds(blocks: Block[]): number|null {
        let result: number|null

        // assert(blocks.length >= 1)
        const fromBlock = blocks[0]
        const toBlock = blocks[blocks.length-1]
        const fromTimestamp = fromBlock.timestamp?.from ?? null
        const toTimestamp = toBlock.timestamp?.to ?? null
        const fromTT = fromTimestamp !== null ? Timestamp.parse(fromTimestamp) : null
        const toTT = toTimestamp !== null ? Timestamp.parse(toTimestamp) : null

        if (fromTT !== null && toTT !== null) {
            result = toTT.secondInterval(fromTT)
        } else {
            // Emergency code
            result = null
        }

        return result
    }

    private static computeToTimestamp(blocks: Block[]): Timestamp|null {
        const toBlock = blocks[0]
        const toTimestamp = toBlock.timestamp?.to ?? null
        return toTimestamp !== null ? Timestamp.parse(toTimestamp) : null
    }

    private static computeTransactionCount(blocks: Block[]): number {
        let result = 0
        for (const b of blocks) {
            result += b.count ?? 0
        }
        return result
    }
}

export interface TpsRecord {
    tps: number
    time: number,
    fromBlockNb: number
    toBlockNb: number
}
