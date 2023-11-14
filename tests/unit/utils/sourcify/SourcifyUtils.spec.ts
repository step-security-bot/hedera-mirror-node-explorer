// noinspection DuplicatedCode

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


import {describe, expect, test} from "vitest";
import {ref} from "vue";
import {flushPromises} from "@vue/test-utils";
import {SourcifySession} from "../../../../src/utils/sourcify/SourcifySession";

describe("AccountLocParser.ts", () => {

    test("test1", async () => {

        const contractId = ref<string|null>(null)
        const session = new SourcifySession(contractId)
        expect(session.busy.value).toBe(false)
        expect(session.failure.value).toBe(null)
        expect(session.status.value).toBeNull()
        expect(session.items.value.length).toBe(0)
        expect(session.matchingContractName.value).toBeNull()
        expect(session.matchingContractPath.value).toBeNull()

        session.mount()
        await flushPromises()
        expect(session.busy.value).toBe(false)
        expect(session.failure.value).toBe(null)
        expect(session.status.value).toBeNull()
        expect(session.items.value.length).toBe(0)
        expect(session.matchingContractName.value).toBeNull()
        expect(session.matchingContractPath.value).toBeNull()

        await flushPromises()
        expect(session.busy.value).toBe(false)
        expect(session.failure.value).toBe(null)
        expect(session.status.value).toBeNull()
        expect(session.items.value.length).toBe(0)
        expect(session.matchingContractName.value).toBeNull()
        expect(session.matchingContractPath.value).toBeNull()


        session.unmount()
        await flushPromises()
        expect(session.busy.value).toBe(false)
        expect(session.failure.value).toBe(null)
        expect(session.status.value).toBeNull()
        expect(session.items.value.length).toBe(0)
        expect(session.matchingContractName.value).toBeNull()
        expect(session.matchingContractPath.value).toBeNull()
    })

})

