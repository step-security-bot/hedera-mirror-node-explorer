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

import {EthereumAddress} from "@/utils/EthereumAddress";

describe("EthereumAddress.ts", () => {

    test("EIP55", () => {

        const random = "0000000000000000000000000000000000440A9C"
        expect(EthereumAddress.normalizeEIP55("0x" + random)).toBe("0x" + random)
        expect(EthereumAddress.normalizeEIP55("0x" + random.toLowerCase())).toBe("0x" + random)
        expect(EthereumAddress.normalizeEIP55("0x" + random.toUpperCase())).toBe("0x" + random)

        const normal = "fB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"
        expect(EthereumAddress.normalizeEIP55("0x" + normal)).toBe("0x" + normal)
        expect(EthereumAddress.normalizeEIP55("0x" + normal.toLowerCase())).toBe("0x" + normal)
        expect(EthereumAddress.normalizeEIP55("0x" + normal.toUpperCase())).toBe("0x" + normal)

        const allCaps = "52908400098527886E0F7030069857D2E4169EE7"
        expect(EthereumAddress.normalizeEIP55("0x" + allCaps)).toBe("0x" + allCaps)
        expect(EthereumAddress.normalizeEIP55("0x" + allCaps.toLowerCase())).toBe("0x" + allCaps)
        expect(EthereumAddress.normalizeEIP55("0x" + allCaps.toUpperCase())).toBe("0x" + allCaps)

        const allLower = "de709f2102306220921060314715629080e2fb77"
        expect(EthereumAddress.normalizeEIP55("0x" + allLower)).toBe("0x" + allLower)
        expect(EthereumAddress.normalizeEIP55("0x" + allLower.toLowerCase())).toBe("0x" + allLower)
        expect(EthereumAddress.normalizeEIP55("0x" + allLower.toUpperCase())).toBe("0x" + allLower)

    })

})