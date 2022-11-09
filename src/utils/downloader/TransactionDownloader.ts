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

import {Transaction, TransactionResponse} from "@/schemas/HederaSchemas";
import axios, {AxiosResponse} from "axios";
import {CSVEncoder} from "@/utils/CSVEncoder";
import {EntityDownloader} from "@/utils/downloader/EntityDownloader";
import {computed, ComputedRef} from "vue";

export class TransactionDownloader extends EntityDownloader<Transaction, TransactionResponse> {

    public readonly accountId: string
    public readonly startDate: Date
    public readonly endDate: Date|null
    private readonly now = new Date()

    //
    // Public
    //

    public constructor(accountId: string, startDate: Date, endDate: Date|null, maxTransactionCount: number) {
        super(maxTransactionCount)
        this.accountId = accountId
        this.startDate = startDate
        this.endDate = endDate
    }

    public progress: ComputedRef<number> = computed(() => {

        const startTime = this.startDate.getTime()
        const endTime = this.endDate != null ? this.endDate.getTime() : this.now.getTime()

        const lastEntity = this.lastDownloadedEntity.value
        const lastTimestamp = lastEntity?.consensus_timestamp ?? null
        const lastTime = lastTimestamp !== null ? timestampToMillis(lastTimestamp) : endTime

        /*

                       |        remaining      |            done               |
               --------+-----------------------+-------------------------------+--------> now
                    startTime               lastTime                        endTime
         */

        return lastTime !== null ? (endTime - lastTime) / (endTime - startTime) : 0
    })

    public makeOutputName(prefix: string): string {
        return prefix + " " + this.accountId + ".csv"
    }

    //
    // EntityDownloader
    //

    protected async loadNext(nextURL: string|null): Promise<AxiosResponse<TransactionResponse>> {

        if (nextURL == null) {
            const startTimestamp = dateToTimestamp(this.startDate)
            const endTimestamp = this.endDate !== null ? dateToTimestamp(this.endDate) : null

            nextURL = "api/v1/transactions"
                + "?account.id=" + this.accountId
                + "&timestamp=gte:" + startTimestamp
            if (endTimestamp !== null) {
                nextURL += "&timestamp=lt:" + endTimestamp
            }
            nextURL += "&limit=100"
        }

        return axios.get<TransactionResponse>(nextURL)
    }

    protected fetchEntities(response: TransactionResponse): Transaction[] {
        return response.transactions ?? []
    }

    protected nextURL(response: TransactionResponse): string | null {
        return response.links?.next ?? null
    }

    protected makeCSVEncoder(): CSVEncoder<Transaction> {
        return new TransactionEncoder(this.getEntities())
    }

    //
    // Private
    //

    // private computeStartDate(): Date {
    //     const currentMonthIndex = this.now.getFullYear() * 12 + this.now.getMonth() - 1
    //     const startMonthIndex = currentMonthIndex - this.monthCount
    //     const startYear = Math.floor(startMonthIndex / 12)
    //     const startMonth = startMonthIndex % 12 + 1
    //     return new Date(startYear, startMonth, 1, 0, 0, 0, 0)
    // }
}

function dateToTimestamp(date: Date): string {
    const seconds = date.getTime() / 1000.0
    return seconds.toFixed(9)
}

function timestampToMillis(value: string): number|null {
    const seconds = Number.parseFloat(value);
    return isNaN(seconds) ? null : seconds * 1000
}

export class TransactionEncoder extends CSVEncoder<Transaction> {

    //
    // CSVEncoder
    //

    protected encodeEntity(t: Transaction): string[][] {
        const result: string[][] = []
        const timestamp = t.consensus_timestamp ? this.formatTimestamp(t.consensus_timestamp) : ""
        const type = t.name ?? ""
        for (const transfer of t.transfers ?? []) {
            const amount = transfer.amount ? this.formatAmount(transfer.amount) : ""
            const accountId = transfer.account ?? ""
            result.push([timestamp, type, amount, accountId])
        }
        return result
    }


    //
    // Protected
    //

    protected formatTimestamp(t: string): string {
        const seconds = Number.parseFloat(t);
        return isNaN(seconds) ? t : this.dateFormat.format(seconds * 1000)
    }

    protected formatAmount(tbarValue: number): string {
        return this.amountFormatter.format(tbarValue / 100000000)
    }

    //
    // Private
    //

    private readonly locale = "en-US"

    private readonly dateOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short"
    }

    private readonly dateFormat = new Intl.DateTimeFormat(this.locale, this.dateOptions)

    private readonly amountFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8
    })
}