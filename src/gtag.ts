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


//
// https://developers.google.com/tag-platform/gtagjs/reference
// https://developers.google.com/tag-platform/gtagjs/reference/events
// https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=browser-history
//

declare global {
    interface Window {
        gtag: Function|undefined
    }
}

export function gtagConfig(targetId: string, options: object) {
    // https://developers.google.com/tag-platform/gtagjs/reference#config
    if (window.gtag) {
        window.gtag(["config", targetId, options])
    }
}

export function gtagEvent(eventName: string, options: object) {
    if (window.gtag) {
        window.gtag(["event", eventName, options])
    }
}

export function gtagPageView(path: string) {
    const tagId = import.meta.env.VITE_APP_GOOGLE_TAG_ID
    if (tagId) {
        gtagConfig(tagId, {
            page_path: path,
            send_page_view: true,
        })
    }
}