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

import {KeyOperator, SortOrder, TableController} from "@/utils/table/TableController";
import {NftTransactionTransfer, NftTransactionHistory, Transaction, TransactionResponse} from "@/schemas/HederaSchemas";
import {ComputedRef, ref, Ref, watch, WatchStopHandle} from "vue";
import axios, {AxiosResponse} from "axios";
import {LocationQuery, Router} from "vue-router";
import {fetchStringQueryParam} from "@/utils/RouteManager";


export class TransactionTableControllerXL extends TableController<Transaction | NftTransactionTransfer, string> {

    private readonly entityId: Ref<string | null>
    private readonly accountIdMandatory: boolean

    //
    // Public
    //

    public constructor(router: Router,
                       entityId: Ref<string | null>,
                       pageSize: ComputedRef<number>,
                       accountIdMandatory: boolean,
                       pageParamName = "p", keyParamName= "k") {
        super(router, pageSize, 10 * pageSize.value, 5000, 10, 100,
            pageParamName, keyParamName);
        this.entityId = entityId
        this.accountIdMandatory = accountIdMandatory
        this.watchAndReload([this.transactionType, this.entityId])
    }

    public readonly transactionType: Ref<string> = ref("")

    //
    // TableController
    //

    public async load(consensusTimestamp: string | null, operator: KeyOperator,
                      order: SortOrder, limit: number): Promise<Transaction[] | null> {
        let result: Promise<Transaction[] | null>

        if (this.accountIdMandatory && this.entityId.value === null) {
            result = Promise.resolve(null)
        } else if (this.entityId.value?.includes("---")) {
            const entityArray = this.entityId.value.split("---");
            const tokenId = entityArray[0]
            const serialNumber = entityArray[1]
            const params = {} as {
                limit: number
                order: string
                transactiontype: string | undefined
                timestamp: string | undefined
            }
            params.limit = limit
            params.order = order
            if (this.transactionType.value != "") {
                params.transactiontype = this.transactionType.value
            }
            if (consensusTimestamp !== null) {
                params.timestamp = operator + ":" + consensusTimestamp
            }
            const getTransactions = async() => {
                const r = await axios.get<NftTransactionHistory>(`api/v1/tokens/${tokenId}/nfts/${serialNumber}/transactions`, {params: params})
                const transactions = r.data.transactions?.map(transaction => {
                    return <Transaction> {
                        consensus_timestamp: transaction.consensus_timestamp,
                        nonce: transaction.nonce,
                        transaction_id: transaction.transaction_id,
                        name: transaction.type,
                        entity_id: transaction.sender_account_id,
                        nft_transfers: [
                            {
                                is_approval: transaction.is_approval,
                                receiver_account_id: transaction.receiver_account_id,
                                sender_account_id: transaction.sender_account_id,
                                serial_number: Number(serialNumber),
                                token_id: tokenId,
                            }
                        ],
                    }
                })
                return transactions ?? []
            }
            result = getTransactions()
        } else {
            const params = {} as {
                limit: number
                order: string
                "account.id": string | undefined
                transactiontype: string | undefined
                timestamp: string | undefined
            }
            params.limit = limit
            params.order = order
            if (this.entityId.value !== null) {
                params["account.id"] = this.entityId.value
            }
            if (this.transactionType.value != "") {
                params.transactiontype = this.transactionType.value
            }
            if (consensusTimestamp !== null) {
                params.timestamp = operator + ":" + consensusTimestamp
            }
            const cb = (r: AxiosResponse<TransactionResponse>): Promise<Transaction[] | null> => {
                return Promise.resolve(r.data.transactions ?? [])
            }
            result = axios.get<TransactionResponse>("api/v1/transactions", {params: params}).then(cb)
            let res = await axios.get<TransactionResponse>("api/v1/transactions", {params: params})
            console.log(result)
        }

        return result
    }

    public keyFor(row: Transaction): string {
        return row.consensus_timestamp ?? ""
    }

    public keyFromString(s: string): string | null {
        return s
    }

    public stringFromKey(key: string): string {
        return key
    }

    public mount(): void {
        this.transactionType.value = this.fetchTransactionTypeParam() // Must be done before calling mount()
        super.mount()
        this.watchTransactionTypeHandle = watch(this.transactionType, () => this.updateRouteQuery())
    }

    public unmount(): void {
        if (this.watchTransactionTypeHandle !== null) {
            this.watchTransactionTypeHandle()
        }
        this.watchTransactionTypeHandle = null;
        super.unmount()
    }

    protected makeRouteQuery(): LocationQuery {
        const result = super.makeRouteQuery()
        if (this.transactionType.value != "") {
            result[this.typeParamName] = this.transactionType.value.toLowerCase()
        } else {
            delete(result[this.typeParamName])
        }
        return result
    }

    //
    // Private
    //

    private readonly typeParamName = "type"
    private watchTransactionTypeHandle: WatchStopHandle|null = null

    public fetchTransactionTypeParam(): string {
        return fetchStringQueryParam(this.typeParamName, this.router.currentRoute.value)?.toUpperCase() ?? ""
    }

}
