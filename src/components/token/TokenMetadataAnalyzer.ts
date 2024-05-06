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

import {computed, ref, Ref, watch, WatchStopHandle} from "vue";
import {TopicMessagesResponse} from "@/schemas/HederaSchemas";
import {EntityID} from "@/utils/EntityID";
import axios from "axios";
import {Timestamp} from "@/utils/Timestamp";
import {TopicMessageCache} from "@/utils/cache/TopicMessageCache";
import { IPFS_GATEWAY_PREFIX } from "../values/BlobValue.vue";

export class TokenMetadataAnalyzer {

    private watchHandle: WatchStopHandle | null = null
    private privateAxios = axios.create({timeout: 10000});
    private metadataContentRef = ref<any>(null)

    //
    // Public
    //

    public readonly metadata: Ref<string>

    public constructor(metadata: Ref<string>) {
        this.metadata = metadata
    }

    public async mount(): Promise<void> {
        this.watchHandle = watch(
            this.metadata,
            (value) => this.metadataDidChange(value, this.metadataContentRef),
            {
                immediate: true
            }
        )
    }

    public unmount() {
        if (this.watchHandle !== null) {
            this.watchHandle()
            this.watchHandle = null
        }
    }

    public metadataString = computed(
        () => this.metadataContent.value !== null
            ? JSON.stringify(this.metadataContent.value)
            : null
    )

    public metadataKeys = computed(
        () => this.metadataContent.value !== null
            ? Object.keys(this.metadataContent.value)
            : []
    )

    public metadataContent = computed<any>(() => this.metadataContentRef.value)

    public imageUrl = computed<string | null>(
        () => {
            let result: string | null = null
            for (const key of this.metadataKeys.value) {
                const lowerKey = key.toLowerCase()
                if (lowerKey === 'image' || lowerKey === 'picture') {
                    result = this.metadataContent.value[key]
                    break
                }
            }
            if (result && result.startsWith("ipfs://") && result.length > 7) {
                result = `${IPFS_GATEWAY_PREFIX}${result.substring(7)}`
            }
            console.log(`imageUrl: ${result}`)

            return result
        })


    //
    // Private
    //

    /*

        Content type       | Example syntax                                          | See token example
        ===================+=========================================================+================================================
        IPFS URL           | "ipfs://QmSoJYWXvds2qcPeRGJdirP7YTCYvZv4fo43TadwmbvV8H" | https://hashscan.io/mainnet/token/0.0.5679552/1
        -------------------+---------------------------------------------------------+------------------------------------------------
        HCS URL            | "hcs://6/0.0.5671138"                                   | https://hashscan.io/mainnet/token/0.0.5671193/1
        -------------------+---------------------------------------------------------+------------------------------------------------
        Plain Topic ID     | "0.0.5679050"                                           | https://hashscan.io/mainnet/token/0.0.5679054/1
        -------------------+---------------------------------------------------------+------------------------------------------------
        HCS SUBMIT MESSAGE | "1713509435.878762003"                                  | https://hashscan.io/mainnet/token/0.0.5488525/1
        tx timestamp       |                                                         |
        -------------------+---------------------------------------------------------+------------------------------------------------
        Plain HTTPS URL    |                                                         |
        -------------------+---------------------------------------------------------+------------------------------------------------

     */

    private async metadataDidChange(value: string | null, content: Ref<string | null>): Promise<void> {
        let metadata
        try {
            metadata = Buffer.from(value ?? '', 'base64').toString()
        } catch {
            metadata = value
        }

        console.log(`metadataDidChange - metadata: ${metadata}`)

        if (metadata !== null) {
            if (metadata.startsWith('ipfs://')) {
                content.value = await this.readMetadataFromUrl(`${IPFS_GATEWAY_PREFIX}${metadata.substring(7)}`)
            } else if (metadata.startsWith('hcs://')) {
                const i = metadata.lastIndexOf('/');
                const id = metadata.substring(i + 1);
                if (EntityID.parse(id) !== null) {
                    content.value = await this.readMetadataFromTopic(id)
                } else {
                    content.value = null
                }
            } else if (metadata.startsWith('https://')) {
                content.value = await this.readMetadataFromUrl(metadata)
            } else if (EntityID.parse(metadata) !== null) {
                content.value = await this.readMetadataFromTopic(metadata)
            } else if (Timestamp.parse(metadata) !== null) {
                content.value = await this.readMetadataFromTimestamp(metadata)
            } else {
                content.value = null
            }
        } else {
            content.value = null
        }
    }

    private async readMetadataFromUrl(url: string): Promise<any> {
        console.log(`readMetadataFromUrl: ${url}`)
        let result: any
        try {
            const response = await this.privateAxios.get(url)
            result = response.data ?? null
        } catch (reason) {
            console.warn(`Failed to read metadata from URL ${url} - reason: ${reason}`)
            result = null
        }
        console.log(`readMetadataFromUrl - result: ${JSON.stringify(result)}`)
        return Promise.resolve(result)
    }

    private async readMetadataFromTopic(id: string): Promise<any> {
        console.log(`readMetadataFromTopic: ${id}`)
        let result: any
        const url = "api/v1/topics/" + id + "/messages?limit=1&order=desc"
        try {
            const response = await this.privateAxios.get<TopicMessagesResponse>(url)
            if (response.data.messages && response.data.messages.length >= 0) {
                result = JSON.parse(Buffer.from(response.data.messages[0].message, 'base64').toString())
            } else {
                result = null
            }
        } catch (reason) {
            console.warn(`Failed to read metadata from topic ${id} - reason: ${reason}`)
            result = null
        }
        console.log(`readMetadataFromTopic - result: ${JSON.stringify(result)}`)
        return Promise.resolve(result)
    }

    private async readMetadataFromTimestamp(timestamp: string): Promise<any> {
        console.log(`readMetadataFromTimestamp: ${timestamp}`)
        let result: any
        try {
            const topicMessage = await TopicMessageCache.instance.lookup(timestamp)
            if (topicMessage) {
                result = JSON.parse(Buffer.from(topicMessage.message, 'base64').toString())
            } else {
                result = null
            }
        } catch (reason) {
            console.warn(`Failed to read metadata from timestamp ${timestamp} - reason: ${reason}`)
            result = null
        }
        console.log(`readMetadataFromTimestamp - result: ${JSON.stringify(result)}`)
        return Promise.resolve(result)
    }
}
