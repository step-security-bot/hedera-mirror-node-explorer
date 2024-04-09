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

export class Timestamp {

    public readonly seconds: bigint
    public readonly nanoseconds: bigint

    //
    // Public
    //

    public static parse(timestamp: string): Timestamp|null {
        let result: Timestamp|null

        const i = timestamp.indexOf(".")
        const s = i != -1 ? timestamp.slice(0, i) : null
        const n = i != -1 ? timestamp.slice(i+1) : null
        if (s !== null && n !== null && n.indexOf(".") == -1) {
            try {
                const seconds = BigInt(s)
                const nanoseconds = BigInt(n)
                result = new Timestamp(seconds, nanoseconds)
            } catch {
                result = null
            }
        } else {
            result = null
        }

        return result
    }

    public toString(): string {
        return this.seconds + "." + this.nanoseconds.toString().padStart(9, "0")
    }

    public toEpochMillis(): number {
        return Number(this.seconds) * 1000 + Number(this.nanoseconds / 1_000_000n)
    }

    public secondInterval(since: Timestamp): number {
        const s = Number(this.seconds - since.seconds)
        const n = Number(this.nanoseconds - since.nanoseconds)
        return s + n / 1_000_000_000
    }

    //
    // Private
    //

    private constructor(seconds: bigint, nanoseconds: bigint) {
        this.seconds = seconds
        this.nanoseconds = nanoseconds
    }
}
