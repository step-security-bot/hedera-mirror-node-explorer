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

import {SolcTools} from "@/utils/contract-registry/solc/SolcTools";
import {SolcIndex} from "@/utils/contract-registry/solc/SolcIndex";

describe("SolcTools.spec.ts", () => {

    test("extractSourceVersion(HelloWorld)", async () => {
        const version = SolcTools.extractSourceVersion(HELLO_WORLD_SOURCE, SOLC_SAMPLE_INDEX)
        expect(version).toBe("0.8.18")
    })

    test("extractSourceVersion(LookupContract)", async () => {
        const version = SolcTools.extractSourceVersion(LOOKUP_CONTRACT_SOURCE, SOLC_SAMPLE_INDEX)
        expect(version).toBe("0.8.18")
    })

    test("extractSourceVersion(HTS)", async () => {
        const version = SolcTools.extractSourceVersion(HTS_SOURCE, SOLC_SAMPLE_INDEX)
        expect(version).toBe("0.6.12")
    })

    test("extractImports(HelloWorld)", () => {
        const importPaths = SolcTools.extractImportPaths(HELLO_WORLD_SOURCE, [])
        expect(importPaths).toStrictEqual([])
    })

    test("extractImports(HTS)", () => {
        const importPaths = SolcTools.extractImportPaths(HTS_SOURCE, [])
        expect(importPaths).toStrictEqual([
            "./HederaTokenService.sol",
            "./HederaResponseCodes.sol",
        ])
    })

})


const HELLO_WORLD_SOURCE = "pragma solidity ^0.8.17;\n" +
    "\n" +
    "contract HelloWorld {\n" +
    "\n" +
    "   string public message;\n" +
    "\n" +
    "   constructor(string memory initMessage) {\n" +
    "\n" +
    "      message = initMessage;\n" +
    "   }\n" +
    "\n" +
    "   function update(string memory newMessage) public {\n" +
    "      message = newMessage;\n" +
    "   }\n" +
    "}\n" +
    "\n"

const LOOKUP_CONTRACT_SOURCE = "// SPDX-License-Identifier: GPL-3.0\n" +
    "pragma solidity >=0.7.0 <0.9.0;\n" +
    "\n" +
    "\n" +
    "contract LookupContract {\n" +
    "\n" +
    "    mapping (string => uint) public myDirectory;\n" +
    "\n" +
    "    constructor (string memory _name, uint _mobileNumber) {\n" +
    "        myDirectory[_name] = _mobileNumber;\n" +
    "    }\n" +
    "\n" +
    "    function setMobileNumber(string memory _name, uint _mobileNumber) public {\n" +
    "        myDirectory[_name] = _mobileNumber;\n" +
    "    }\n" +
    "\n" +
    "    function getMobileNumber(string memory _name) public view returns (uint) {\n" +
    "        return myDirectory[_name];\n" +
    "    }\n" +
    "}\n"

const HTS_SOURCE = "// SPDX-License-Identifier: Apache-2.0\n" +
    "pragma solidity ^0.6.12;\n" +
    "\n" +
    "import \"./HederaTokenService.sol\";\n" +
    "import \"./HederaResponseCodes.sol\";\n" +
    "\n" +
    "\n" +
    "contract HTS is HederaTokenService {\n" +
    "\n" +
    "    function tokenAssociate(address sender, address tokenAddress) external {\n" +
    "        int response = HederaTokenService.associateToken(sender, tokenAddress);\n" +
    "\n" +
    "        if (response != HederaResponseCodes.SUCCESS) {\n" +
    "            revert (\"Associate Failed\");\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    function tokenTransfer(address tokenId, address fromAccountId , address toAccountId , int64 tokenAmount) external {\n" +
    "        int response = HederaTokenService.transferToken(tokenId, fromAccountId, toAccountId, tokenAmount);\n" +
    "\n" +
    "        if (response != HederaResponseCodes.SUCCESS) {\n" +
    "            revert (\"Transfer Failed\");\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    function tokenDissociate(address sender, address tokenAddress) external {\n" +
    "        int response = HederaTokenService.dissociateToken(sender, tokenAddress);\n" +
    "\n" +
    "        if (response != HederaResponseCodes.SUCCESS) {\n" +
    "            revert (\"Dissociate Failed\");\n" +
    "        }\n" +
    "    }\n" +
    "}"


const SOLC_SAMPLE_INDEX: SolcIndex = {
    "builds": [
        {
            "path": "soljson-v0.1.1+commit.6ff4cd6.js",
            "version": "0.1.1",
            "build": "commit.6ff4cd6",
            "longVersion": "0.1.1+commit.6ff4cd6",
            "keccak256": "0xd8b8c64f4e9de41e6604e6ac30274eff5b80f831f8534f0ad85ec0aff466bb25",
            "sha256": "0xfc54135edfe07d835216f87fa6c3b9049e1415c2825027b926daad018e09269f",
            "urls": [
                "bzzr://8f3c028825a1b72645f46920b67dca9432a87fc37a8940a2b2ce1dd6ddc2e29b",
                "dweb:/ipfs/QmPPGxsMtQSEUt9hn9VAtrtBTa1u9S5KF1myw78epNNFkx"
            ]
        },
        {
            "path": "soljson-v0.1.2+commit.d0d36e3.js",
            "version": "0.1.2",
            "build": "commit.d0d36e3",
            "longVersion": "0.1.2+commit.d0d36e3",
            "keccak256": "0xa70b3d4acf77a303efa93c3ddcadd55b8762c7be109fd8f259ec7d6be654f03e",
            "sha256": "0x7ad9fa9de246a33c5e5472127b6e0b6e713f3900c7ea360c7c2824f6e9202a0f",
            "urls": [
                "bzzr://e662d71e9b8e1b0311c129b962e678e5dd63487ad9b020ee539d7f74cd7392c9",
                "dweb:/ipfs/QmWRGd4p3EUkvPh7QfFVoF829SdFFF2mhtsEsK6exaqdB4"
            ]
        },
        {
            "path": "soljson-v0.1.3-nightly.2015.9.25+commit.4457170b.js",
            "version": "0.1.3",
            "prerelease": "nightly.2015.9.25",
            "build": "commit.4457170b",
            "longVersion": "0.1.3-nightly.2015.9.25+commit.4457170b",
            "keccak256": "0x07de160862e662ea027a5451b78a7d9db6c9d7dd11a314fc19c68b095cb1c6ce",
            "sha256": "0x7b65e00aee537a341df83de88125bd18e020b86a31ef6e506c3881142daeb35b",
            "urls": [
                "bzzr://378cfc60e8801e992ec574511c050450e771d60cf9527c9d00353ec2eab4d5b5",
                "dweb:/ipfs/QmYUkyY3EM6JhbvrXNrPF48TbFsx4p3poL6vUNFrCq6bsk"
            ]
        },
        {
            "path": "soljson-v0.1.3-nightly.2015.9.28+commit.4457170b.js",
            "version": "0.1.3",
            "prerelease": "nightly.2015.9.28",
            "build": "commit.4457170b",
            "longVersion": "0.1.3-nightly.2015.9.28+commit.4457170b",
            "keccak256": "0xa04df894a1fddc56f0a5e2ec41a858a17e1aca7cf3ad18bb78a026b9fd79e19b",
            "sha256": "0x850917e16b843162739269b1ba89722e08ef0fbe12d1e38bcbab97bf0eeaa2ef",
            "urls": [
                "bzzr://91c514a73ad2d3ae4cf31c20532d4f325e28afed5b3846dcde7b7dd72a7c4864",
                "dweb:/ipfs/QmUctprYqMQdufufKgEhsf7mRDWr8qGRavLsK8qgqhFVuY"
            ]
        },
        {
            "path": "soljson-v0.1.3-nightly.2015.9.29+commit.3ff932c8.js",
            "version": "0.1.3",
            "prerelease": "nightly.2015.9.29",
            "build": "commit.3ff932c8",
            "longVersion": "0.1.3-nightly.2015.9.29+commit.3ff932c8",
            "keccak256": "0x6212a9c0a8c43bd0aa65c6ea44df979c0ac8076c0caffb7626187f716494470e",
            "sha256": "0x2124f7474e31bfa0758decc2a2544bed47e9a4dec458fd2793ea4674186c47ee",
            "urls": [
                "bzzr://dcce6719f72d942523ccc834fc9656c063026681999684df89db56d2b7b1193b",
                "dweb:/ipfs/QmX1YTFChDZKBv5Yh9McNKos35GHwhP6rU1KsbFAuen3xE"
            ]
        },
        {
            "path": "soljson-v0.1.3+commit.028f561d.js",
            "version": "0.1.3",
            "build": "commit.028f561d",
            "longVersion": "0.1.3+commit.028f561d",
            "keccak256": "0x39ac3bf19dd7749006b19243aab5bdfd1e92b93133a2fa236e9d61af957dd444",
            "sha256": "0x1a806813a02d4925b180737aff1d58d6ee9bee38a528fb49dbbfd3e676d00a1c",
            "urls": [
                "bzzr://05a3b37b2d7823363272c5b5648e12f3737457430a1f4e4477f6c3467592f7df",
                "dweb:/ipfs/QmeAjv4azyWQy7nZnPRChtGx3Uys2MygDc4LgzSsWDnWig"
            ]
        },
        {
            "path": "soljson-v0.1.4-nightly.2015.10.2+commit.795c894a.js",
            "version": "0.1.4",
            "prerelease": "nightly.2015.10.2",
            "build": "commit.795c894a",
            "longVersion": "0.1.4-nightly.2015.10.2+commit.795c894a",
            "keccak256": "0xbbec189c18f89be0e8922a51ae5c36d8af93862adcebd7e56eefbf553294c1c9",
            "sha256": "0x26c003798eb828ccee0b1d658b3753a60405a21d72348722b290ec6a834f608a",
            "urls": [
                "bzzr://45e946f18d0dd78d88405670a94c0a5971b3df495ca3cd8d744d3e0e29faa7a2",
                "dweb:/ipfs/QmfY5GT6PazoxHUEKdzb4fGGAA8hZQemgWcjikn39VtJ2r"
            ]
        },
        {
            "path": "soljson-v0.1.4-nightly.2015.10.5+commit.a33d173a.js",
            "version": "0.1.4",
            "prerelease": "nightly.2015.10.5",
            "build": "commit.a33d173a",
            "longVersion": "0.1.4-nightly.2015.10.5+commit.a33d173a",
            "keccak256": "0xd549468c636f2e3c404746e6c636fb7ec63b54b0a916e988e762721e83ccc1b2",
            "sha256": "0x919aabc2c97ea54d03c4ccbf23783c60930ece2de40da1c4756f5ec4a05b8e8a",
            "urls": [
                "bzzr://95dc0995a929c94c2838f313ab4ad5cdb96d2e1c6eaecd219f5a8c226edbecde",
                "dweb:/ipfs/QmdMSYYVprFQGLyJ23qUfdXQTMCLPKsuQq2ZJXwCkwrKSi"
            ]
        },
        {
            "path": "soljson-v0.1.4-nightly.2015.10.5+commit.7ff67629.js",
            "version": "0.1.4",
            "prerelease": "nightly.2015.10.5",
            "build": "commit.7ff67629",
            "longVersion": "0.1.4-nightly.2015.10.5+commit.7ff67629",
            "keccak256": "0x327eb1581add1b713ec7059aef981d5f4434147db77c86bf0aa2d58925d4b487",
            "sha256": "0xf0578af6d3857538d138518f54c84ffc77df9f53e50c3e7539f345ce4eebbf20",
            "urls": [
                "bzzr://d432f13d6e6e8f15977d6e3a445844651ca8220c8fb6e69271eb32c5e103a084",
                "dweb:/ipfs/QmNQ3GjRKE9JrnfavrE4wbDiynvvNgQ4SRY5DfgRxX7d2G"
            ]
        },
        {
            "path": "soljson-v0.1.4-nightly.2015.10.6+commit.d35a4b84.js",
            "version": "0.1.4",
            "prerelease": "nightly.2015.10.6",
            "build": "commit.d35a4b84",
            "longVersion": "0.1.4-nightly.2015.10.6+commit.d35a4b84",
            "keccak256": "0x25ead85443c34a11c43628d4e0be18b99f916fde5af8dd72f04b99ca9d1477fe",
            "sha256": "0xdda6e95e9c3d1d7ad65d974a4293f2722c23784d4cb8b5d85a34a96c153cf85b",
            "urls": [
                "bzzr://0845cd024eea931fc09bf97903e06fff00f2228205f46eb3b4dff5435538e690",
                "dweb:/ipfs/QmTMy7byZ7brgmhxaSNLBrrbdfzCpnohmhkuTeuZZYXD2M"
            ]
        },
        {
            "path": "soljson-v0.1.4+commit.5f6c3cdf.js",
            "version": "0.1.4",
            "build": "commit.5f6c3cdf",
            "longVersion": "0.1.4+commit.5f6c3cdf",
            "keccak256": "0xc6b0944a8b55b534eb4eec02d3be54d26791ff60c99288ed5b2dc9c78ced32fe",
            "sha256": "0x34a1e8b62b5eae88ee59e572c8f941a375d587a7f3c21b6d24f415452bdc7a15",
            "urls": [
                "bzzr://4da68f33bd6bf02fff03670b9501121f5ce75cc4a2a7fea657c22d3f4a625d57",
                "dweb:/ipfs/QmXuvThTcmHUAH9uxTLzYqMN3ZSTGrPFQSmMgKfhwajVF3"
            ]
        },
        {
            "path": "soljson-v0.1.5-nightly.2015.10.13+commit.e11e10f8.js",
            "version": "0.1.5",
            "prerelease": "nightly.2015.10.13",
            "build": "commit.e11e10f8",
            "longVersion": "0.1.5-nightly.2015.10.13+commit.e11e10f8",
            "keccak256": "0x75a7f6ddc293fa833c3f8b9557f213646feb1f3acf190bbee9fd2ed3e5bb87a3",
            "sha256": "0x6e50b566c9e11b307e7c71e204cdba63e1eb555a623216010027a887d6b23d1b",
            "urls": [
                "bzzr://b7b4b2371045cabd508187fe76aabb8cae89ce715907686a921f527a0725f4c9",
                "dweb:/ipfs/QmZFPdseGunwo7dgMwXu59oi6mT9a21RhYwCpfuV5Sj2Pw"
            ]
        },
        {
            "path": "soljson-v0.1.5-nightly.2015.10.15+commit.984ab6ab.js",
            "version": "0.1.5",
            "prerelease": "nightly.2015.10.15",
            "build": "commit.984ab6ab",
            "longVersion": "0.1.5-nightly.2015.10.15+commit.984ab6ab",
            "keccak256": "0xd579bf0675fbd793da2e8f0aeb933c4c284393a559ad77aa0dd9820bcd376b3a",
            "sha256": "0x47e567199d3e0634410dc60f1bd10a66638ffec9abe86f683f40ef64e80bcad1",
            "urls": [
                "bzzr://772f6bcb14c954334fb81a60e4ce3b4e5b8fc4646d1c1597600a6f4f8d85287b",
                "dweb:/ipfs/Qma5FBDGePoWfoT29ErfzYASnNLRGRS7i6j2kzbHxMe7RC"
            ]
        },
        {
            "path": "soljson-v0.1.5-nightly.2015.10.16+commit.52eaa477.js",
            "version": "0.1.5",
            "prerelease": "nightly.2015.10.16",
            "build": "commit.52eaa477",
            "longVersion": "0.1.5-nightly.2015.10.16+commit.52eaa477",
            "keccak256": "0x24b5812fa67638b45602f60322417f3988859f4f6697c6d612970192e11a6c53",
            "sha256": "0x81777160a0cb9286081e62cab64b62cd9f56a9a3463f5111da209e351eaa9eb5",
            "urls": [
                "bzzr://1243fcfefe1b30690232b297922a01e7d3725eafc96d6d519e739c7c7c841ec6",
                "dweb:/ipfs/QmPGUTJQpFYH2aDCDmnqjcPmv3jA8ScFz83xXfiywj5DNf"
            ]
        },
        {
            "path": "soljson-v0.1.5+commit.23865e39.js",
            "version": "0.1.5",
            "build": "commit.23865e39",
            "longVersion": "0.1.5+commit.23865e39",
            "keccak256": "0x9639c043ae6df7267b0d904c334342e83c95bc3786dcb2b7d2a7c15c9f6ad916",
            "sha256": "0x6c9bc5397f56746f928ce1d4e2522d2865052348d506f521b4f731f98f99c6df",
            "urls": [
                "bzzr://c6533d87a48abff42c084159156c7fea1fe4fc8c7ee5fa64edaaa944cfb55603",
                "dweb:/ipfs/QmYpMSkjoHMGihr7xrzSzDCMJyXxBoeB8QqCyM367x3Twm"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.10.22+commit.cb8f6633.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.10.22",
            "build": "commit.cb8f6633",
            "longVersion": "0.1.6-nightly.2015.10.22+commit.cb8f6633",
            "keccak256": "0xc01ec46c797646ca067a01d43cec9a299a93805c72141503aade1810426f78dd",
            "sha256": "0x9b4db172dd44e32503a63d9cffd2b50631656b2a0d232755086aa4862337f87f",
            "urls": [
                "bzzr://577a71aaa373c25ca3774ef46cbd52f65744ebf7990b1685be0ecae0b199fa4d",
                "dweb:/ipfs/QmYaSz4mEPodeqq92bGwJE7v7VJYCaigK8Ekkkrfunjvwg"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.10.23+commit.7a9f8d9f.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.10.23",
            "build": "commit.7a9f8d9f",
            "longVersion": "0.1.6-nightly.2015.10.23+commit.7a9f8d9f",
            "keccak256": "0x9e5f2d9b1ff308e931b680d50c56fb98b96a2b5ce68ed84d3e8ce8c86f08de83",
            "sha256": "0xedd5a1b49242c389308523a4713cf4f0a018593443a7d69ba2bb9a8fb83760a7",
            "urls": [
                "bzzr://e849ae0a24b12802c723f4467e0932e0690179579207287229b5616f1d1b85df",
                "dweb:/ipfs/QmaLMSM9u3Fjbef9EJtKAYGoM9dkp6t2XwHrzuF2rF5c5N"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.10.26+commit.e77deccf.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.10.26",
            "build": "commit.e77deccf",
            "longVersion": "0.1.6-nightly.2015.10.26+commit.e77deccf",
            "keccak256": "0xb088fb8782528c5578b3bf2048e6a5b1874c2c2a1eee5fd1d48198e325ad4306",
            "sha256": "0xe99184b01e8e51209e8cd029cf2a08ce0bf9fa9e07e1aefe453a89cf2b8a8510",
            "urls": [
                "bzzr://5ac6626814a9ce5a13031fbf74ac9769bf155b2920275f39acf9821bcd97521d",
                "dweb:/ipfs/QmfEJ5cjbWCddQDtKizkN2sBTnyP2J8eB7gBYLLkzQ6gSu"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.10.27+commit.22723da1.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.10.27",
            "build": "commit.22723da1",
            "longVersion": "0.1.6-nightly.2015.10.27+commit.22723da1",
            "keccak256": "0x439145e3be4288b971aca1121c62b90cc2b148c859b4157ae84e9ab228f8e609",
            "sha256": "0x0703a9ff3aa268f027e1ee6fc8345720548b1a017cfef06c966e1d2a823ee516",
            "urls": [
                "bzzr://1da661a66cc41b6b1751343cf5638adff12d698a8026a46bdcfa783c5a2c705c",
                "dweb:/ipfs/QmQ1Z9fhEe2ZVuuPGLSPba6SYXnEbhdfQyk2VwMdeSW4R7"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.11.2+commit.665344ee.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.11.2",
            "build": "commit.665344ee",
            "longVersion": "0.1.6-nightly.2015.11.2+commit.665344ee",
            "keccak256": "0x52d9e3567cb9f2dd92d2be85dc88cb24cf8d90669e293e8cda17dec8eec22de3",
            "sha256": "0x8a7640c0dd89d349e38a0d9c35dfc52e93d70f3e338e694f074e817e4a2dc89d",
            "urls": [
                "bzzr://6da7d3b8cf7170072c5ead6ce2140830f1d56581460a6cea7ce3bc4550043904",
                "dweb:/ipfs/Qmf2jQp3iJD2e2nuyuhTcY4E1UTRnS9UjPE2iihxugvchj"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.11.3+commit.48ffa087.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.11.3",
            "build": "commit.48ffa087",
            "longVersion": "0.1.6-nightly.2015.11.3+commit.48ffa087",
            "keccak256": "0x196e60c68548a1b0d09f79446300c7045d92a6c61e6f9d3103b514c628d6e3c2",
            "sha256": "0x8b3d0fc558138e22ece848678914305203e35dbbcb765b7597dcd60038245620",
            "urls": [
                "bzzr://ba5064107498b2ae67b091d73febab2177fc9a2d6376ef0de73636a5a4853a81",
                "dweb:/ipfs/QmSWtQ7EDox146zawzHn38fz2ptz6xdyh1gZ2WBLtHVTRd"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.11.7+commit.94ea61cb.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.11.7",
            "build": "commit.94ea61cb",
            "longVersion": "0.1.6-nightly.2015.11.7+commit.94ea61cb",
            "keccak256": "0x8d6dc6a11481a5bf3a197b2bba7c445f13a2652ee6cf5f31811b8c66204f81b5",
            "sha256": "0x8bd53ddecfcd1bdf47af3f6e06007281540f6b490c4758e9e0b797ea71df08f8",
            "urls": [
                "bzzr://66e3417949d6eb9aff78ccca5f9b576b92f0af691f18935d07298140ebf4e34e",
                "dweb:/ipfs/QmRZMbPeox5bVhq2qjKuDt9nwae42o42cq4f43MWBi52ZF"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.11.12+commit.321b1ed2.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.11.12",
            "build": "commit.321b1ed2",
            "longVersion": "0.1.6-nightly.2015.11.12+commit.321b1ed2",
            "keccak256": "0x52845ac387cb670c99560710fe649263fa14d28a79ba4b08381688d36adbc921",
            "sha256": "0x64380ddd7c409f0ae64144297927b24b9ad5338f9817258197da6f9e083917dd",
            "urls": [
                "bzzr://e5a9fde92df9d40c7f8932ead550328f110144829b702f50cc61f8b277c834c6",
                "dweb:/ipfs/QmScgooMmGrX7QrCkWXPWPf4nKn9mQsuroxDnJXTt94KxT"
            ]
        },
        {
            "path": "soljson-v0.1.6-nightly.2015.11.16+commit.c881d103.js",
            "version": "0.1.6",
            "prerelease": "nightly.2015.11.16",
            "build": "commit.c881d103",
            "longVersion": "0.1.6-nightly.2015.11.16+commit.c881d103",
            "keccak256": "0x4dd03f8976b78f217c9e12bd3100c25db7602e4bfa5e7ef9bca1e8cf976b3f22",
            "sha256": "0x1e16f8dbdf4ac168b95543e0753622354c05b1527b1eada470fa70cf75c1d096",
            "urls": [
                "bzzr://3da23a3c9e2e7c844338f5927d7012a89ff8e33364a0c9b595eb0fcd6d2dabf4",
                "dweb:/ipfs/QmR7zc55VByZDrBRN3M2KPMWWpfYPzxayYmztMikszek5e"
            ]
        },
        {
            "path": "soljson-v0.1.6+commit.d41f8b7c.js",
            "version": "0.1.6",
            "build": "commit.d41f8b7c",
            "longVersion": "0.1.6+commit.d41f8b7c",
            "keccak256": "0x08610325fc49fb7dc244cf5adfd60a664c3cfb9d4845c90b30ef6f6abb748c60",
            "sha256": "0xb2fcb4f707ad6545c8a65b70164c59d4555cd607b97204844d51a803917a4549",
            "urls": [
                "bzzr://e6eca935f031f31758db12507e10fe82d576a293b210caa3775c4246bb9679f2",
                "dweb:/ipfs/QmZQFLgDnwS3jpR4KBAnWC4ihTixXmmCUdoBKGooJQDHJ2"
            ]
        },
        {
            "path": "soljson-v0.1.7-nightly.2015.11.19+commit.58110b27.js",
            "version": "0.1.7",
            "prerelease": "nightly.2015.11.19",
            "build": "commit.58110b27",
            "longVersion": "0.1.7-nightly.2015.11.19+commit.58110b27",
            "keccak256": "0xde1ac4213cc34cf4f06b201c20c3a76993a4fbf75fbaf305ed2bd75041193da8",
            "sha256": "0x81cf33f3ab4213c5ff84d58e5335611e6105645dbd1bd00d7b923488dfc9c9c4",
            "urls": [
                "bzzr://9b8d7ae62dba09ab28cdc46b89809a5a68ae80ca089519b7c5c30da107ec13d9",
                "dweb:/ipfs/QmaZLxC3Pqq4DhhhmbzSYBxnm2F2ran7gfrag8i8CdKzEM"
            ]
        },
        {
            "path": "soljson-v0.1.7-nightly.2015.11.23+commit.2554d610.js",
            "version": "0.1.7",
            "prerelease": "nightly.2015.11.23",
            "build": "commit.2554d610",
            "longVersion": "0.1.7-nightly.2015.11.23+commit.2554d610",
            "keccak256": "0x2a8137eb4898c4b8a1f58ec65ff1ea5f30b51b9c62c41514ac1a847b2631450d",
            "sha256": "0x738cb734cf02e76c5a918670258ee7cfc8f0af0457030795c6bf865fc9c18b0a",
            "urls": [
                "bzzr://a38b4728e8eff74f1e93ac9faeac42452f449fe3624af1d43b8d4cc1ec39ab19",
                "dweb:/ipfs/QmNtbPkU7r4Yj2rBR6sCuz6Xx2bEUbtpRiwCBsJseP4mSZ"
            ]
        },
        {
            "path": "soljson-v0.1.7-nightly.2015.11.24+commit.8d16c6e9.js",
            "version": "0.1.7",
            "prerelease": "nightly.2015.11.24",
            "build": "commit.8d16c6e9",
            "longVersion": "0.1.7-nightly.2015.11.24+commit.8d16c6e9",
            "keccak256": "0x5550576ca6d1d81c9c8c3e5c16bf34b7500315cb4bf7b9ccfd221079354dd9f7",
            "sha256": "0x1022f09d15134a43692199a10955717d7ad4443b3a0623e44e86dc362d80b19c",
            "urls": [
                "bzzr://01ae095d65a88a5e0c28b096b419b4643f393f3d8aa89a23a315ad128df8301d",
                "dweb:/ipfs/QmZ4Cpz7dPoB7AW8Qj11RQbA9uLhbYkqPkjcTViJ8KKmjQ"
            ]
        },
        {
            "path": "soljson-v0.1.7-nightly.2015.11.26+commit.f86451cd.js",
            "version": "0.1.7",
            "prerelease": "nightly.2015.11.26",
            "build": "commit.f86451cd",
            "longVersion": "0.1.7-nightly.2015.11.26+commit.f86451cd",
            "keccak256": "0x55778c0ba69297a898a8a613226d67fa55476004d698144ecdd1118735c53aba",
            "sha256": "0xd89f03b50b86fbae346f3da71771b6dc0273bb2f031cb816ad27080eed76ba48",
            "urls": [
                "bzzr://d4922c0e7493b9b7b4beccb318cc12c0401583519f5919354dcd7306bd2ad50c",
                "dweb:/ipfs/QmZjMfMrEiwCK3REETVtKYvqmRB8cweUdmQmAiyvo2zsZT"
            ]
        },
        {
            "path": "soljson-v0.1.7+commit.b4e666cc.js",
            "version": "0.1.7",
            "build": "commit.b4e666cc",
            "longVersion": "0.1.7+commit.b4e666cc",
            "keccak256": "0x90567736ca352a90da3bb8cec7e9f7c5793ec6a77686ed4a87f373b456781e09",
            "sha256": "0x41a0cbd38f6fb957ed3748688078f6e6186d9a2e8b6706de9a63dbf65c62ffd3",
            "urls": [
                "bzzr://84c85953cb16cfb7da8f75b09853ced60ddc3b36de6b2570cd66032a6fe0e802",
                "dweb:/ipfs/QmQKXN99fA1rAi6B4wEt6vBDqEjXsZbepuTBxkUeLdc6Cf"
            ]
        },
        {
            "path": "soljson-v0.6.0-nightly.2019.12.10+commit.7244aa01.js",
            "version": "0.6.0",
            "prerelease": "nightly.2019.12.10",
            "build": "commit.7244aa01",
            "longVersion": "0.6.0-nightly.2019.12.10+commit.7244aa01",
            "keccak256": "0x222464388ebafb6485ee2d24ed052bb823992de16d0ef04c05020e92e61a9462",
            "sha256": "0x505a0956ba2fcc4d82e79a6613c79dd6620d6d434ab9e955df8bb958d4b881e3",
            "urls": [
                "bzzr://15861893edb454c53bd66f62dcb54fe9021e6d68663f27c51bf14c1e05d11ad9",
                "dweb:/ipfs/QmRCefxYvnAkQTyPn7ntKb5agAnzMKRgVM1kJTb9Cb2Xy9"
            ]
        },
        {
            "path": "soljson-v0.6.0-nightly.2019.12.11+commit.7247e72d.js",
            "version": "0.6.0",
            "prerelease": "nightly.2019.12.11",
            "build": "commit.7247e72d",
            "longVersion": "0.6.0-nightly.2019.12.11+commit.7247e72d",
            "keccak256": "0xa8104981b48ed9948737d30907d30388484a392e94ff8078f9635e7b6598cb23",
            "sha256": "0x367392b777e95b77267c901d4d71fe8b8d06ce5a7d92388fe21ccc4ef23907c1",
            "urls": [
                "bzzr://f3dee36fea58aafa1ff7c13092f5c97138cfef11abe5a5cc4a9d1f42aa83ffb7",
                "dweb:/ipfs/QmWg5dW2QD5kaMsHwcSyTUosf7wY1VJJYX83KDa44RXFrP"
            ]
        },
        {
            "path": "soljson-v0.6.0-nightly.2019.12.12+commit.104a8c59.js",
            "version": "0.6.0",
            "prerelease": "nightly.2019.12.12",
            "build": "commit.104a8c59",
            "longVersion": "0.6.0-nightly.2019.12.12+commit.104a8c59",
            "keccak256": "0x40530fbb03e5fba376c969df5f027ed22cf37be1511d3431235c914f683b30be",
            "sha256": "0x4924f9e1c972b552af9dece6c2502acc5484efafca96567d9597f65ff75d450f",
            "urls": [
                "bzzr://1ce680bf3f9abd787fd55173f35c2b74738021fb426d47d64e0b275b726bff69",
                "dweb:/ipfs/QmTeYnZRRY3beTvxpCZkSC36qWVrmYFQZNFahbQc9Mqd25"
            ]
        },
        {
            "path": "soljson-v0.6.0-nightly.2019.12.13+commit.9ddd5042.js",
            "version": "0.6.0",
            "prerelease": "nightly.2019.12.13",
            "build": "commit.9ddd5042",
            "longVersion": "0.6.0-nightly.2019.12.13+commit.9ddd5042",
            "keccak256": "0xcb7353f4a09baa272de421d79498e0ba86bbda5531889648a4d9a56d39f29479",
            "sha256": "0x8b254e670c36cea6510e36bf022590e5d103d95d3930e2060f42f3ed132aac10",
            "urls": [
                "bzzr://a8f2748ec1c9305401abfc3570a7f4d4397476f8c1943a4c32bcb6a23942abe1",
                "dweb:/ipfs/QmWH8jEn5HoubwYZmcy6Dap9HSERUvZWkTv3RXTXjkwVN7"
            ]
        },
        {
            "path": "soljson-v0.6.0-nightly.2019.12.14+commit.1c01c69e.js",
            "version": "0.6.0",
            "prerelease": "nightly.2019.12.14",
            "build": "commit.1c01c69e",
            "longVersion": "0.6.0-nightly.2019.12.14+commit.1c01c69e",
            "keccak256": "0xe6d39f900b14bd22477d3bb6d77da1e2cb556ef0d07d869c888df56c4ca72244",
            "sha256": "0xad1cb746204394e364f2a6992730e3ed9e4408cb47236d8eb18cb1686261e5e0",
            "urls": [
                "bzzr://d97d8bc1e5fdf7a7f58678be03f4f81136c1fd5b4ae0ffbaae07c7484812ebf2",
                "dweb:/ipfs/QmZ49q8KgRrzKx8ZA5cmwEDW2ctoQcmcAZhCJncjMH64Jq"
            ]
        },
        {
            "path": "soljson-v0.6.0-nightly.2019.12.16+commit.7390b5b5.js",
            "version": "0.6.0",
            "prerelease": "nightly.2019.12.16",
            "build": "commit.7390b5b5",
            "longVersion": "0.6.0-nightly.2019.12.16+commit.7390b5b5",
            "keccak256": "0xb82026c5654fbdd9ac14fd8e8a0dfbe15de0d880e4b53b083b87999d4c54830a",
            "sha256": "0x44aed5f11f12309c56a5d51f6c0493d42c7a17d286aa9e0bb6e8c8606e5a271d",
            "urls": [
                "bzzr://981dc2b6b86e92a8cba4bae5b60dd72f81a36d61da1d1a41402c851ca0b6cb09",
                "dweb:/ipfs/QmUpsiHFG8uuEgEsc3fQJoEpjgdgThLNrXS1Jn2hbAoKUm"
            ]
        },
        {
            "path": "soljson-v0.6.0-nightly.2019.12.17+commit.d13438ee.js",
            "version": "0.6.0",
            "prerelease": "nightly.2019.12.17",
            "build": "commit.d13438ee",
            "longVersion": "0.6.0-nightly.2019.12.17+commit.d13438ee",
            "keccak256": "0x5809c4abf1c6f778a4719c897d3b98d92bcc2115cb0b6b936a9f04eda2ea3558",
            "sha256": "0xbbd57d63b0e1a6189764ffe2910e572ba3e0c17b673a23769b004bce290dd6d5",
            "urls": [
                "bzzr://e031a04a50f4a32d6975d37333b081cc3b36848b7a37c786dc133388ea20ad79",
                "dweb:/ipfs/QmdUa3WoCdjSh598oW15qShcv6iZWvFJs7E5mkAuScKWKV"
            ]
        },
        {
            "path": "soljson-v0.6.0+commit.26b70077.js",
            "version": "0.6.0",
            "build": "commit.26b70077",
            "longVersion": "0.6.0+commit.26b70077",
            "keccak256": "0x7ec496e409af23346e2edfada124fa19fd4e16cf70789f401f1d81af39f9ccec",
            "sha256": "0x4a9223dc645e2600d5e250420ed50f77b6f5180b1519711195b9d5bae8e643de",
            "urls": [
                "bzzr://24c043e403b02279c04ecf1237bf30de16d2893fe90982e2a4686b9d2956b5f5",
                "dweb:/ipfs/QmV6Uqh6bUCBhaGDK1VafDvwGXh7bcE6P9Vs1SN1PmZeXk"
            ]
        },
        {
            "path": "soljson-v0.6.1-nightly.2019.12.18+commit.9a1cc027.js",
            "version": "0.6.1",
            "prerelease": "nightly.2019.12.18",
            "build": "commit.9a1cc027",
            "longVersion": "0.6.1-nightly.2019.12.18+commit.9a1cc027",
            "keccak256": "0x9f8781fe276f3c0794a9e0f7683603280bafbd5904f9eac444b693ae5259868c",
            "sha256": "0xa6b83dfaa7aa85ccc7e2979cafaefca0e8127ad705b393cbe9d79335342f9ff0",
            "urls": [
                "bzzr://e2fed58b8b5e9550ffd3ffef23634654d5f3de562a9f13a664d145ea89d61353",
                "dweb:/ipfs/QmUggxsoK5Xc39cvjzXj6m2mHH5QvejCs1tmyeZ6k3c6bi"
            ]
        },
        {
            "path": "soljson-v0.6.1-nightly.2019.12.19+commit.d420fe37.js",
            "version": "0.6.1",
            "prerelease": "nightly.2019.12.19",
            "build": "commit.d420fe37",
            "longVersion": "0.6.1-nightly.2019.12.19+commit.d420fe37",
            "keccak256": "0x4192dee2048749c88e3cfd7113973afc824251185e6c3fa1c6ff754bc1366f56",
            "sha256": "0x3977963e4934398d0e07db8777cf14cc935fc73763826a29758f631b177eea43",
            "urls": [
                "bzzr://7eb8534dc8afe479ae4b42cb5ba251f027d65e3b3d57512a4a40b3ef23c2d114",
                "dweb:/ipfs/QmWA8rWNojNgw3gKbi7jCePywCrWCqi8an6mTpjSfZzYHG"
            ]
        },
        {
            "path": "soljson-v0.6.1-nightly.2019.12.20+commit.ece6463f.js",
            "version": "0.6.1",
            "prerelease": "nightly.2019.12.20",
            "build": "commit.ece6463f",
            "longVersion": "0.6.1-nightly.2019.12.20+commit.ece6463f",
            "keccak256": "0xaa4c7a65cdfc5b2261aedd141e321cd8c28a156f7d7dcc7c5c0d35fc3645ccd8",
            "sha256": "0x9ca6c3a9929fa85b3972d43d8fe4879f2dab94a59bddcb3c497aeff5ccc13f97",
            "urls": [
                "bzzr://1ba0c0fcaf75251e654fdd309377d8f16b8c1ec5ac24e2a39b4580aaa6ffe703",
                "dweb:/ipfs/QmQmZHUvQkbrF5M3L7xFHhieeLAzvNv31qTg8h2QghHa6x"
            ]
        },
        {
            "path": "soljson-v0.6.1-nightly.2020.1.2+commit.d082b9b8.js",
            "version": "0.6.1",
            "prerelease": "nightly.2020.1.2",
            "build": "commit.d082b9b8",
            "longVersion": "0.6.1-nightly.2020.1.2+commit.d082b9b8",
            "keccak256": "0xccdebf261ab1cbd8057ff6204a1a45a1aa4b5719573a05cf214a25ff519df86e",
            "sha256": "0xd8fc6046184de9120b9eb9fa3caa95748a00408a6fe34f19f8fabc540dfc3208",
            "urls": [
                "bzzr://78e8a68aa5aa5a600864b55968f9d5d433a47244f242e5dc0a287f5c947bc459",
                "dweb:/ipfs/QmeiYNi5EvsRcCT4eZGPerXhZf81858p3JtSf8JPug5S2T"
            ]
        },
        {
            "path": "soljson-v0.6.1-nightly.2020.1.3+commit.943af71d.js",
            "version": "0.6.1",
            "prerelease": "nightly.2020.1.3",
            "build": "commit.943af71d",
            "longVersion": "0.6.1-nightly.2020.1.3+commit.943af71d",
            "keccak256": "0xc7ba943964a30f714470a864ab50a27b7be1dbf1708647b6d8ebfe86b77632d1",
            "sha256": "0xe352e2d9fc8f4c89cf1a1acbd7299c95dba194a8eec3401b7d1ff76b042a5808",
            "urls": [
                "bzzr://b31710395eb7f2ee2a8053c049041db0ee73759d62b0b48d01141113a1470c16",
                "dweb:/ipfs/QmVWQ79VjeA8xCKvJUdyMj79nKp7xr6eoFLQDZ7XwVeQQN"
            ]
        },
        {
            "path": "soljson-v0.6.1-nightly.2020.1.6+commit.20cf9d9f.js",
            "version": "0.6.1",
            "prerelease": "nightly.2020.1.6",
            "build": "commit.20cf9d9f",
            "longVersion": "0.6.1-nightly.2020.1.6+commit.20cf9d9f",
            "keccak256": "0x627f4268424b37f25e929868de6fbbac9e9f8201a3232bfba72cf9871b051be9",
            "sha256": "0x1b0157043fd8a5097831b8d23243e3e30810e18ddcb824156622ffc1b3982c82",
            "urls": [
                "bzzr://3a956c85004497cae99dd3d588ee274af49ae3459183df72e60725f1f8e13b8b",
                "dweb:/ipfs/QmdU3YUaPFjob2J6wA79hfqcaRuCDKrMk16wvNRGrou6h4"
            ]
        },
        {
            "path": "soljson-v0.6.1-nightly.2020.1.7+commit.8385256b.js",
            "version": "0.6.1",
            "prerelease": "nightly.2020.1.7",
            "build": "commit.8385256b",
            "longVersion": "0.6.1-nightly.2020.1.7+commit.8385256b",
            "keccak256": "0x50dadd1c29a87f65adfff49af8288e9699059e0912da80f83acb6569f16fbc2f",
            "sha256": "0xfc8fbfd02a6a3d90d5b9d22a1a46a2e657ae2f92777599630a316208238f64dc",
            "urls": [
                "bzzr://9f1f5927ec601e36334d84f5a831a7ff3a4f32578328f84fbefc58f89a47391f",
                "dweb:/ipfs/Qmeog2dEEfccwLFGtqVY11uRsCTnZAyfre5oR83idcjMtL"
            ]
        },
        {
            "path": "soljson-v0.6.1+commit.e6f7d5a4.js",
            "version": "0.6.1",
            "build": "commit.e6f7d5a4",
            "longVersion": "0.6.1+commit.e6f7d5a4",
            "keccak256": "0x587599c37a414855dfb389a774a3eb80e252e3b90ee8b84852ea100fb3662787",
            "sha256": "0x599cfe3faf33c09e3792b245d1e5d5c5eba07acc452f29c98e461d3bf060fda9",
            "urls": [
                "bzzr://9a4a2e4c3afbb116036d2955b11d9cf28968d085796badb8d309ae64075cfe5c",
                "dweb:/ipfs/QmdJ5D8cf2EuBU2sRYvkFnKmJ6HA7ELRL9u9TG2RRU3Q69"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.8+commit.12b52ae6.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.8",
            "build": "commit.12b52ae6",
            "longVersion": "0.6.2-nightly.2020.1.8+commit.12b52ae6",
            "keccak256": "0xc6701ee4e2592bafba60aef4a5e122abb8cf89f548e3aa7b5a6092e7957635cb",
            "sha256": "0xcad18884e9cb04282dcdc202d40ef48ff9f38e244ccfa43df57af2826256fefd",
            "urls": [
                "bzzr://8030beae7da89fbd037820fe809c1eeb464d8424f258b7b318bf1cd55bf93380",
                "dweb:/ipfs/QmWmkhCK5o88KJn3WJ2h9An862CWcz6Td1AZELyCcee4UD"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.9+commit.17158995.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.9",
            "build": "commit.17158995",
            "longVersion": "0.6.2-nightly.2020.1.9+commit.17158995",
            "keccak256": "0x3482a1c7e9a44abed973cf23c69d4d9f75c78a49d38790ab81bde77a617c2656",
            "sha256": "0xf8d575d3ecb7c985265c8e26288dd79265abada976c795c7a3f01df5fecf4f67",
            "urls": [
                "bzzr://c8ed7b3e3319ebb7423f3cb882eb931013d3cabc31039c28db719db8b531f41c",
                "dweb:/ipfs/QmQX1xmELtLqyC6r3noy1GEGcoR3HDMGTJC27qurC4jmdR"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.10+commit.d577a768.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.10",
            "build": "commit.d577a768",
            "longVersion": "0.6.2-nightly.2020.1.10+commit.d577a768",
            "keccak256": "0x05231e4da87886261f5506d99eb091ace796992723982d5138172c06f240cc19",
            "sha256": "0xdac1d49442804e804b286b0daf9b2c8c9a3d92c838f03055ff15e32eb46c6b7a",
            "urls": [
                "bzzr://817aaea6e8082ff8c0ce4b0404f97371dd218385f1038169956914c4511ba8af",
                "dweb:/ipfs/Qmbf4QM6CKaijsB497RZF6vvur2aWS4SJkxeHPmEBTEPxq"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.13+commit.408458b7.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.13",
            "build": "commit.408458b7",
            "longVersion": "0.6.2-nightly.2020.1.13+commit.408458b7",
            "keccak256": "0x50666925696a6351e3fc1ff52e0bfe7e15057ce68effe2da1740adce6fc0942a",
            "sha256": "0x96d2c03d58ebaf6a50456a6d591e808a030b8d551e485c60a471e0972155dfcf",
            "urls": [
                "bzzr://1f6eca655dd7948dfc7a7a8e226d70170a439e51cd469e6cbe0b2d48ec8929d5",
                "dweb:/ipfs/QmazkygiauSnV2n5kB2EhJMF7YjkXXzcxTfdbZBfDtA3Ej"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.14+commit.6dbadf69.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.14",
            "build": "commit.6dbadf69",
            "longVersion": "0.6.2-nightly.2020.1.14+commit.6dbadf69",
            "keccak256": "0xa5fcf88141cb95b4c516e3f4a2715ef82e2a09ee52df2bbcbab0250a0a4280ee",
            "sha256": "0x96594d6ac05a9b9b03fe81628f3be35fca877cbafcb9b71b68d41ae596c51600",
            "urls": [
                "bzzr://7e6b0cf7b5a5a4c8ae3d4a6399e1ee19a07dc9d217dc3177f0089719b07889ed",
                "dweb:/ipfs/Qmaw3uP2XY4Z3RxVtjkf54Q9Fw8gX6yA17MFTjB9DnAJtB"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.15+commit.9d9a7ebe.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.15",
            "build": "commit.9d9a7ebe",
            "longVersion": "0.6.2-nightly.2020.1.15+commit.9d9a7ebe",
            "keccak256": "0x99bd0fdd38a244f2f46bebb0198752c80c219fc3a3d727fcb8617743efc7e85e",
            "sha256": "0x873688831bf139b26b4ee44101908ed8aa5cd8e8a7a8f7620e97cc2cc87a5be9",
            "urls": [
                "bzzr://62cc4f079fee6145896fa6937b4cac42439e12b2f1e90efcf3a43b230a2e5be1",
                "dweb:/ipfs/QmbNmCExN7aMVkUconJZqBZG8sc2UHxRkgQkgZNmnvVun7"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.16+commit.3d4a2219.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.16",
            "build": "commit.3d4a2219",
            "longVersion": "0.6.2-nightly.2020.1.16+commit.3d4a2219",
            "keccak256": "0xf5a25ac66358fb7902e4ec2fb333f9164fd136b310c20af08341cd04de41f7ec",
            "sha256": "0xe17367b4daa5351d4f5cb24f2e6ac7a1a422c14cdf6d42ce3bc79d92d728cd6e",
            "urls": [
                "bzzr://42ce00dd809f0502db73c938fb92aa3315d8cdf79644cb185ca82d195917729a",
                "dweb:/ipfs/QmVg1oQsoeCBSfouBwQmihKQ1psrXZ1Su35oPGjp7veoS3"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.17+commit.92908f52.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.17",
            "build": "commit.92908f52",
            "longVersion": "0.6.2-nightly.2020.1.17+commit.92908f52",
            "keccak256": "0xf02d412995c6e95eccaf9cabd892d6bae3ef4560ef54b2b3e29c136d1ab8cb02",
            "sha256": "0x74e06c1d59b1e88a8348b8a89241f822b004802749dbc0d8714a6bd15858122e",
            "urls": [
                "bzzr://9d612b089ea550ac05cb390ac35420a99c1ca805180c9a6fd1c4ba99165a375c",
                "dweb:/ipfs/QmTYvzcjnAqgAwyXFYKcxddMzB4Aazdv5qXAvxjXNC6KX6"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.20+commit.470c19eb.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.20",
            "build": "commit.470c19eb",
            "longVersion": "0.6.2-nightly.2020.1.20+commit.470c19eb",
            "keccak256": "0xd1918ff23a1dafa1c4d52fcd87ec7354805ac1f415a6253ccdfacd738c414436",
            "sha256": "0x3917bf3fdf88beac40199c306092f20681feaf0a0896504e1ad0ac6619765c0f",
            "urls": [
                "bzzr://6b17c50533e48aeead3506d243278c4d166fa76418ee7db28c65f410ba441f0b",
                "dweb:/ipfs/QmYthpsk8x6vKh5fYcmwXpHCWbuTcMk3cbthqiVCZNERJU"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.22+commit.641bb815.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.22",
            "build": "commit.641bb815",
            "longVersion": "0.6.2-nightly.2020.1.22+commit.641bb815",
            "keccak256": "0xa735b416fde2c174215bfa3335a13a083060df6825bd0fce48c20d77589e6f0e",
            "sha256": "0x65f82ca0cc1454da4012d6a731831f05027f8b3e6a3202d2c297469be1d2feef",
            "urls": [
                "bzzr://8a8548ccccd937cb6f780349680c7ca5f0e503e9ccb257aac7ce61eda68fc451",
                "dweb:/ipfs/QmW21QKdeeMDfjUrTJYp7McAWMkTWwzaDqm6CsJ7dwobXE"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.23+commit.3add37a2.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.23",
            "build": "commit.3add37a2",
            "longVersion": "0.6.2-nightly.2020.1.23+commit.3add37a2",
            "keccak256": "0xc595fa5c0a2b7a20d85516c17a7ce47e8ad5a183aec5c92bc7b770224e8f334c",
            "sha256": "0xcf87eab528f6be9e833641a4456e023f9deb7df3072728afd601637505711cd9",
            "urls": [
                "bzzr://17605467b95873fd200ec5f360510e23ff3871db9cc2678b90161c2bb159d4ea",
                "dweb:/ipfs/QmTtPqEdh62FUN72NEpgs5eoPqf6v9MNbQfJe4S9eY6j4w"
            ]
        },
        {
            "path": "soljson-v0.6.2-nightly.2020.1.27+commit.1bdb409b.js",
            "version": "0.6.2",
            "prerelease": "nightly.2020.1.27",
            "build": "commit.1bdb409b",
            "longVersion": "0.6.2-nightly.2020.1.27+commit.1bdb409b",
            "keccak256": "0xab238eb402bf9e7b32183c0ee1b40c4773e86008d794fa0961c36541c54a5e1f",
            "sha256": "0x98b8394ebf80a9e1f11ac895a2903fb1ba7a6a30f0fcc6da6cbcd65a603a1ea0",
            "urls": [
                "bzzr://67a63ee7f29babfeeddaed7797043798f0e8c969ac23738a1655731509897451",
                "dweb:/ipfs/Qmev2by1jvcr8ukhu2NZYj3yCxyCGU276PQoRBAf2nxVZA"
            ]
        },
        {
            "path": "soljson-v0.6.2+commit.bacdbe57.js",
            "version": "0.6.2",
            "build": "commit.bacdbe57",
            "longVersion": "0.6.2+commit.bacdbe57",
            "keccak256": "0x7dc96455c864b49abc7dd5f38ba6a47904709ad132ea36babbfce98d42e962e6",
            "sha256": "0x25f564cbecc5bfe95d6d358e0e7543c31ece0ab1332c555ff323ca163711bd2b",
            "urls": [
                "bzzr://f61230aa01565c8c24aa2ed50eec7dfd26195be35f5bbe4445c6a3efceaa4b7d",
                "dweb:/ipfs/QmaLUM18c7ecA911ig5u2HY6fAu4AiUbhJpnZwwCMc9cWi"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.1.27+commit.8809d4bb.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.1.27",
            "build": "commit.8809d4bb",
            "longVersion": "0.6.3-nightly.2020.1.27+commit.8809d4bb",
            "keccak256": "0xab25125b1b73862eb45a4d4e04cdd352c329e34c824338fc60c674b122cc1992",
            "sha256": "0xce0554b1cdf0140b1a7d62eeea9dc3d17eb18130e2e3e65bb6e59eec48c61660",
            "urls": [
                "bzzr://5f49380682bb3ba63a0504a857cd075b89f70a522efa769fd7f3d379ec2b8a9a",
                "dweb:/ipfs/QmfLsmoR5iYUoLhwZkqMRpLxGtcs8iSNrkxyQNBDHFEP6f"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.1.28+commit.2d3bd91d.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.1.28",
            "build": "commit.2d3bd91d",
            "longVersion": "0.6.3-nightly.2020.1.28+commit.2d3bd91d",
            "keccak256": "0x4efca31e822f5b08ca9a53ed8bbdd4936fe8e555da4f00310e247e5c0f11a077",
            "sha256": "0x02c7d1c66b4d923dba59e4554cd03178a2efa33f6960c22cf6ff72feb388e911",
            "urls": [
                "bzzr://ed119b6caf264a07ecf3accfc39ea289a7df5595ae55e935005658fd70ec4bf2",
                "dweb:/ipfs/QmdTjs6MXeUcx2bnYqCWKXFuiY6mSB6g1VeNVUm3P1dbae"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.1.29+commit.01eb9a5b.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.1.29",
            "build": "commit.01eb9a5b",
            "longVersion": "0.6.3-nightly.2020.1.29+commit.01eb9a5b",
            "keccak256": "0x6683831a9f0ad3fc96726e332462ed5e0755b452329e28abc4ecf66759dacad7",
            "sha256": "0x829e302a771607e2991226e747008500d7bf87bc9a43598762f3e088bbcaa163",
            "urls": [
                "bzzr://bec1d2437a2a16fb9ebcffd1d79fe1b1ed4aa391086f32ddfcff0e8f79c27166",
                "dweb:/ipfs/QmcwpcZayDNtgeU1Pov7JBMYoHx46YFWdTUkThyxyyiH5g"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.1.30+commit.ad98bf0f.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.1.30",
            "build": "commit.ad98bf0f",
            "longVersion": "0.6.3-nightly.2020.1.30+commit.ad98bf0f",
            "keccak256": "0xc438477643bdaebdd35b2d203b0716885c05d703ae2f79717e74eb82066f41b8",
            "sha256": "0x0632c6c3fd3a5b8038493f90d12318b7089c777248a523b58bfc0e4b82ac8a48",
            "urls": [
                "bzzr://486e2ffde29f54211fd36952a9030dcf9d2c7204064f9717773f5379f4997480",
                "dweb:/ipfs/Qmc7mxA6Ran8imJW8DnGCQGa61DjzaYA4V6fCBDnpgwjwV"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.1.31+commit.b6190e06.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.1.31",
            "build": "commit.b6190e06",
            "longVersion": "0.6.3-nightly.2020.1.31+commit.b6190e06",
            "keccak256": "0xe6eeaa95e8cf40a0217b6076fafaf5a7e56c192388af5a35e1ddf75aa93e10ca",
            "sha256": "0xf7d00e66937250b078ba6c54c7fef21b9231f70bcd88f5e8615c0b7c7e356223",
            "urls": [
                "bzzr://24aa21dcc520b780389d517e0a5d10b0f7aeb94ed54fd0749e6702b0b8fb9a43",
                "dweb:/ipfs/QmQdPm82pgKwfdwd2nBaQSg5qcYo3HwFroAuKU4eroi8re"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.3+commit.93a41f7a.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.3",
            "build": "commit.93a41f7a",
            "longVersion": "0.6.3-nightly.2020.2.3+commit.93a41f7a",
            "keccak256": "0x4b2519d899a346daa55fa10e947ceac6f745d0a38bfb0be9ae0be0968e343493",
            "sha256": "0x65fce9aed435ade3aacd64dfd4d6817f50462eed0f824a3417fe76a2a9960255",
            "urls": [
                "bzzr://c8b41defea9e099d99d7dec9e709a3e7f4a7032b76f0bb17e608b4477f234d68",
                "dweb:/ipfs/QmPV5YTTDuYqdhGh9Kia3ee15pSxcyZeqBCVJxJhzfafJ2"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.4+commit.836938c1.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.4",
            "build": "commit.836938c1",
            "longVersion": "0.6.3-nightly.2020.2.4+commit.836938c1",
            "keccak256": "0xecdede8aa267c6368889bc99d3926e0ea2a939edb39e4bf95cfa567d1f6c721c",
            "sha256": "0x87a60688a74923e5f4c58bee682ecfa85ceea859ba67e02437deae62ad0f8dea",
            "urls": [
                "bzzr://40ad68224c83a7281e18a668d8517a675a71d942b8f4fd813b0c308d1b24824a",
                "dweb:/ipfs/QmUTVT7LRfGs78vwudPFHT9PX4a8PxwxoUX1Y4sUR6AtX1"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.5+commit.913d5f32.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.5",
            "build": "commit.913d5f32",
            "longVersion": "0.6.3-nightly.2020.2.5+commit.913d5f32",
            "keccak256": "0xb96573f17fe2983ba60120c9ec45a6cb02508347dacdea6489b0e980decf88cc",
            "sha256": "0x30f40b017dae49ba7ae2cc4d16f8fcb383534c7156a95923533e1f97330032b6",
            "urls": [
                "bzzr://c02d91363d028bde4f327eb9a907f2e8a32a62af99e9ac8845a2da2f1a3b8d22",
                "dweb:/ipfs/QmXvZwQ9nPTApxWuoSHnWFXHbUzGyJLvKS7Cf7qXnaACCY"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.6+commit.93191ceb.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.6",
            "build": "commit.93191ceb",
            "longVersion": "0.6.3-nightly.2020.2.6+commit.93191ceb",
            "keccak256": "0x9d94df9b549c0ec5d1a1312f7bfcc081ca5f5cad379edec97ec2da2c47690fde",
            "sha256": "0xfdf4d98e89b1c57a98251a18bff7e4870503c95f5e005708d9a6bb5e2a471a6d",
            "urls": [
                "bzzr://6261a5181d415fda6394bb0425548d8b2a24e3ae41f960c27476b671f6b6596c",
                "dweb:/ipfs/QmUnsEmePujFV5YF17VHo8N5RhM4qwKKMGiVnWCZgiNf8q"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.7+commit.462cd432.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.7",
            "build": "commit.462cd432",
            "longVersion": "0.6.3-nightly.2020.2.7+commit.462cd432",
            "keccak256": "0x64c0caa579199acc942778a7230c426ab222a1b615b1301496a452beb4075c05",
            "sha256": "0x9a85a6fda11a1445540948065a7f480b1d0286fa887729381399c17dcd944ced",
            "urls": [
                "bzzr://3b6e74d5befd6fa0b13cb88ccfffcd3af077172f3e9b1faa7e2435f44748e921",
                "dweb:/ipfs/QmaEqayBYUSsCFBdRSNZEn4FSTFHUU55higPQTkcupEqWF"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.10+commit.64bb0d55.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.10",
            "build": "commit.64bb0d55",
            "longVersion": "0.6.3-nightly.2020.2.10+commit.64bb0d55",
            "keccak256": "0x878c468e8cb73a1a1e25c8bc9475bda5745698c2cd4e2597609af26f9f4772e6",
            "sha256": "0x22cd8accf386e07205e147271bb70bc870edf4fdd632fa218c0d959f97f7a17a",
            "urls": [
                "bzzr://3f4d61bc50d3e331c94c04a88e4403b9eb13cb0f601f212ff911f25d0388122c",
                "dweb:/ipfs/Qmaw6Dz4badYrMrgnpezoz2SNg83wVKp3fKs3nnjypEeEL"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.11+commit.5214cb0e.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.11",
            "build": "commit.5214cb0e",
            "longVersion": "0.6.3-nightly.2020.2.11+commit.5214cb0e",
            "keccak256": "0xda30f9ed9ed0f3ecbf3d0a21d7ad2f92f09e726f449005c92fa51ea309c85c82",
            "sha256": "0xd0c7c0e20c95747d2c9302cbabcfd6095b9bac7f969ef1e6400f2f8ebb5b1c99",
            "urls": [
                "bzzr://2cc4a808b9d670c8f6f3d7e9b2ffb3c4fb0edd84e74ad4dce6b45371bb32ae29",
                "dweb:/ipfs/QmU8cvDH4fWYL3TLFCGkRxpLBFaXQQCLhyNzGzg815WpVr"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.12+commit.0e100e7e.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.12",
            "build": "commit.0e100e7e",
            "longVersion": "0.6.3-nightly.2020.2.12+commit.0e100e7e",
            "keccak256": "0x1838b5583e3a3965df45cdd3306473d2314668330967c1800e174cea2f927966",
            "sha256": "0x0d38be0eacea0795cd71c3fa1771ef99e8ef1bc120f7521c34b41b51e205243c",
            "urls": [
                "bzzr://3975de25bfe95242f3247d666f93875d1981c88c0a0965394c30761e1093fa6e",
                "dweb:/ipfs/QmYeFtgzDrwhZWTR2NdjAh4MwY4MKyA9XzWehnoaUxZN9c"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.13+commit.7af581df.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.13",
            "build": "commit.7af581df",
            "longVersion": "0.6.3-nightly.2020.2.13+commit.7af581df",
            "keccak256": "0xedc0fed06419d15a47549af8069ace404e1934398da91e4180eabd62e030de44",
            "sha256": "0x2240e1fd97980403a28638c5a1566fe8e33d3c72e48acfb85c87e562a546fc60",
            "urls": [
                "bzzr://f35862b9beea0d2e1e0be36ffea5e234c4aa6c34297b30a688db108d2c035d38",
                "dweb:/ipfs/QmRuhyhzxPNCmQADbCZrX4orMKzouUgQKCfQREp6NLUBeN"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.14+commit.96709b32.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.14",
            "build": "commit.96709b32",
            "longVersion": "0.6.3-nightly.2020.2.14+commit.96709b32",
            "keccak256": "0x12672ada3c17f3e074913482f693b8fd4ccea71d38223b788525c0b75f1f5d12",
            "sha256": "0x6789992ee1cbf544f2559cda27be56c136a6a20bd0bef94636c2cf8700d4e2a6",
            "urls": [
                "bzzr://9a0c88f6152bfaa0ee8bfc4860bdaa72606815afc8e9739db647aec8439fb3fb",
                "dweb:/ipfs/Qmd47pumVrKQa3Zer7DSqTSGKya7EoHJMbyaLKVHvh2Vbv"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.17+commit.50421e8b.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.17",
            "build": "commit.50421e8b",
            "longVersion": "0.6.3-nightly.2020.2.17+commit.50421e8b",
            "keccak256": "0x43a1cf9441815be354088eb0846f46f4327254b83e969939d8225b42d8e8fff4",
            "sha256": "0xdc972dbc8a1e617eb8732cdaf20a95570dd51f57ce542f9f452a2a7d31c0277b",
            "urls": [
                "bzzr://4983589f46a3c1241e84bf6a86437518e81c0af6fcb6e324e379a335724f32d0",
                "dweb:/ipfs/QmXgsfmXxK3XjHgdSW1q26s1QeYwXGm7rw3ftfShhhDXfd"
            ]
        },
        {
            "path": "soljson-v0.6.3-nightly.2020.2.18+commit.64f9dc35.js",
            "version": "0.6.3",
            "prerelease": "nightly.2020.2.18",
            "build": "commit.64f9dc35",
            "longVersion": "0.6.3-nightly.2020.2.18+commit.64f9dc35",
            "keccak256": "0x0cfaf670a0914daf17f188b673a9380bc8fe0258fd06b4497489a76363726064",
            "sha256": "0x40e2bb09ad5e5fd47e2c3eff2ca46f49a42ddbd597d24cc21d7e4193799f3c6e",
            "urls": [
                "bzzr://93c4ed9dddfe75213e2f69d45bd4cfe85f1a054acad340195a85bb16dfe895ee",
                "dweb:/ipfs/QmRzUipdAmAuEDQEbTh4cRvBDTxN9kFV4AjQD6Bqo4JpAr"
            ]
        },
        {
            "path": "soljson-v0.6.3+commit.8dda9521.js",
            "version": "0.6.3",
            "build": "commit.8dda9521",
            "longVersion": "0.6.3+commit.8dda9521",
            "keccak256": "0x39ae8b2f3ba05ed7d4a7c16f0a9f4f5118180a209379cfc9bdd2d4fb5d015dff",
            "sha256": "0xf89514dedd8cfb3c4d351580ff80b8444acde702f8be0e5fad710fe6e906c687",
            "urls": [
                "bzzr://1d6deff5623d883b8d0b3a3a5539e4604925ce4c1677defb86e0e37838ea70c5",
                "dweb:/ipfs/Qmd9JfFpUXsUQrJad1u2QDuMxBMeVrcG8mrpfJVV9jiBXB"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.2.18+commit.ba9f740a.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.2.18",
            "build": "commit.ba9f740a",
            "longVersion": "0.6.4-nightly.2020.2.18+commit.ba9f740a",
            "keccak256": "0xab25df7aad329af7e6b031c3d24949774c9f6efe30816a764fa5b3899073d947",
            "sha256": "0xb6583e022b5ac66239023da4db2bf2cb27c1e4392aeb8a6692959040faf9f774",
            "urls": [
                "bzzr://9c9b76a62e226885dcdea1afe826472d5ca5cb562d55081896e16cd1f140c4ff",
                "dweb:/ipfs/QmcDR1fBnmA6Maue4MQRXdE5yaur9oZJt7bGyFRJzkm5fq"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.2.19+commit.8f2c5fc0.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.2.19",
            "build": "commit.8f2c5fc0",
            "longVersion": "0.6.4-nightly.2020.2.19+commit.8f2c5fc0",
            "keccak256": "0x9e5dc2815736eddad095f8d1f1687799e2f2b3b49d996fda9c8a91d9cf6506e5",
            "sha256": "0x4c7b69f76c35b20ab5f4a6580594e859db08d118c67b44aab8f2f78e3bfb2314",
            "urls": [
                "bzzr://a017b99847a6927f7c0884b484c1780beed11029f0b74e7c8dc5423ba73e50a6",
                "dweb:/ipfs/Qmc9JDHjzF8QZvtcfnA3w2PmDdBStbK1F9z4nRDzrDXZNi"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.2.20+commit.525fe384.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.2.20",
            "build": "commit.525fe384",
            "longVersion": "0.6.4-nightly.2020.2.20+commit.525fe384",
            "keccak256": "0x7967d606168d19e40ed75439cb894e27f5612513db61a96b91b82a6434d28348",
            "sha256": "0x4be3e9f7f8f37b3f42597a07c474e05cb93e02bd15ac0876838f09793a9267fa",
            "urls": [
                "bzzr://1d0d501459046042d4b8ec04fc60efb48a54d75a5f584d54f6048f8efed2315a",
                "dweb:/ipfs/QmbxQcmWrxF2Sy9tuNb4LQWcpAvqKy1oaot6Ui5hUPcpvV"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.2.24+commit.aa6a2b47.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.2.24",
            "build": "commit.aa6a2b47",
            "longVersion": "0.6.4-nightly.2020.2.24+commit.aa6a2b47",
            "keccak256": "0xa5f23186e6a0c2981ee898f747e08c24e6e62e410fea5b082eaf2263487d4969",
            "sha256": "0x22bcf2adac4f201dce6ac7b7ddd1cfe788c868c49b6ee0d62fae04fe793b0b68",
            "urls": [
                "bzzr://9af3e66820ad6f38e0760bc18291a7da394b2dea566e8e77ac378bb3590e382c",
                "dweb:/ipfs/QmPXnwuBRvRKxkp46uYQmapLXQLM4RhRCKqvqVyQBckFeQ"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.2.25+commit.af81d4b6.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.2.25",
            "build": "commit.af81d4b6",
            "longVersion": "0.6.4-nightly.2020.2.25+commit.af81d4b6",
            "keccak256": "0x3f807f3204e8666252a7f25582346398d19140e5f60ebf02cd3868fb5f0b8672",
            "sha256": "0xe93160e52703ea86cdec96c51b817a3df951aa3ed21cfe0b3c736fcc71866d21",
            "urls": [
                "bzzr://d4254b43282ed8dc85de0a28974a655738270381153939fb6a71264cbb778931",
                "dweb:/ipfs/QmZRpQATGG9AfCVbaNpVXLya71zrgLpZknuT9wt96JNSFj"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.2.26+commit.6930e0c2.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.2.26",
            "build": "commit.6930e0c2",
            "longVersion": "0.6.4-nightly.2020.2.26+commit.6930e0c2",
            "keccak256": "0x853496154ae09ef36e221996ce8cd74aedef82afe69f4a6d5d365e3aad0e9bf4",
            "sha256": "0x6f8fe651dddaed6198942d24fbd6cc4c2462edb25156dcd1de68dd4c58ca5e9a",
            "urls": [
                "bzzr://08e522f83f6dba1896bf8a5c61b9b9708e6e30a15d7d00eabb7ffacc648e3c11",
                "dweb:/ipfs/QmfSKqZRCdD3mRq9zYmWkgRPPv1xLs931qA5H8NgXbw9Tu"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.2.27+commit.b65a165d.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.2.27",
            "build": "commit.b65a165d",
            "longVersion": "0.6.4-nightly.2020.2.27+commit.b65a165d",
            "keccak256": "0x8c12309e06396ab78c120c10e51533a582d376a303353ce2913b3ddb3ce5bc09",
            "sha256": "0xec27311fbf319ef7be69e8fe21fe29afabd7ddc2adf2b8661c01c224a2d43fb1",
            "urls": [
                "bzzr://8281361950f346179877d3f24a1c5e3e1e99c421e4b9d0a1d97051c6d24fd977",
                "dweb:/ipfs/QmS8v1FYxCe5dYV9jtpLJHqySPDaRojG26mtB2dvfXKx5y"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.3.3+commit.20679d63.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.3.3",
            "build": "commit.20679d63",
            "longVersion": "0.6.4-nightly.2020.3.3+commit.20679d63",
            "keccak256": "0x0a61bd855afc453ccbe9ab0dd2c06cadbe2138f54602b5581c9bc1440da0a973",
            "sha256": "0x31f25254c368eb56b9b7ea5bfa5253fa8acd58494a14a67e39318c9496a7b578",
            "urls": [
                "bzzr://bccbc243d6b2acd3f003ebc1e4fea270023f9c1afea5d17ca6a3be81aa1fec12",
                "dweb:/ipfs/QmNvAKDtDqsQLXFF5NDE2S65dCEoCNmA2rZrfGYzagJWVB"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.3.4+commit.27a4670a.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.3.4",
            "build": "commit.27a4670a",
            "longVersion": "0.6.4-nightly.2020.3.4+commit.27a4670a",
            "keccak256": "0xf7da87b48b2332777ed786baeb00598222ef80c30b44618daa9478f3db458a45",
            "sha256": "0x79f169656c56902c42698ff34b5ee195fce15493de118f145babf31b8f6e2b2e",
            "urls": [
                "bzzr://c5c8f7fcee2ab8000508cede378c74c26a53217d60cad27513298065179924e3",
                "dweb:/ipfs/QmQuYfEyWvakm2sdM3FcHRCuL7vEu92ptn7LpSrGoJyqhz"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.3.6+commit.78ce4b96.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.3.6",
            "build": "commit.78ce4b96",
            "longVersion": "0.6.4-nightly.2020.3.6+commit.78ce4b96",
            "keccak256": "0x31c01d21b7ea8154c1a45ee1ab1f213c67c49dbd76845b2f7764cf97ce1f3991",
            "sha256": "0xf9b08418b9245eef3a3590953ec716b6d6c2e945192c5a8005ff4a99a0d9689d",
            "urls": [
                "bzzr://a91cedfc816f738794e93e9b4bedbfa5b3e7ebde36c928323b1926ccab7a6468",
                "dweb:/ipfs/QmRXPBsuTucPf6HDXB79PBYut7Zbhi6hxYoHonZVkCeNDY"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.3.8+commit.a328e940.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.3.8",
            "build": "commit.a328e940",
            "longVersion": "0.6.4-nightly.2020.3.8+commit.a328e940",
            "keccak256": "0xfb768185e9822c333b995ff8e81203399a0a8871a5211da8c0f43bc9567ea5c7",
            "sha256": "0x22d9265b0660b2553fcc81ff4c8b4c35e04252672c86ed5c06127ba7de0f278d",
            "urls": [
                "bzzr://350e0308e9cef2d4ffbe2bdef8b0db030048fed5de6d56fdfcc1d2ef3d4301d2",
                "dweb:/ipfs/Qmb7URbyeXbQc32w6rJ949QUC7DnQBJEWqrP4ADmiYSUov"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.3.9+commit.dbe2a5f4.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.3.9",
            "build": "commit.dbe2a5f4",
            "longVersion": "0.6.4-nightly.2020.3.9+commit.dbe2a5f4",
            "keccak256": "0x2947927c0d8c3789d7248a84aca44f48c4162b56650c6f632164eca7c0b291ab",
            "sha256": "0x09b46eff28534de6f0ec78dfd506006ec8e301efe44f2d88931bb089d2405791",
            "urls": [
                "bzzr://41c5b98f17c49ce26b1eae6c4c36d704239e2784504a6f598674a0c5d76fb9c8",
                "dweb:/ipfs/Qmd3SwG4ZZa3fXSz6dJ5oqsTwrpq65WAmfgmXNfugEhHdB"
            ]
        },
        {
            "path": "soljson-v0.6.4-nightly.2020.3.10+commit.683ebc8e.js",
            "version": "0.6.4",
            "prerelease": "nightly.2020.3.10",
            "build": "commit.683ebc8e",
            "longVersion": "0.6.4-nightly.2020.3.10+commit.683ebc8e",
            "keccak256": "0xde935372ae7ba0c9f5f5b855052a855fb0fb607c3e52f0a86a6ac5587c82d34e",
            "sha256": "0xa46f055b82689a9a821fefd3811d6d3caecbfc167f4df025317d4b14de10312b",
            "urls": [
                "bzzr://c4828e0e1751dc2f2c7540d5c890ee8aa56e1536d358673f1333e4d3a458991a",
                "dweb:/ipfs/QmUh1G9YtVmYLcNjDYpdPeQEdLDfNqhpHHr7cmN9YkbVK1"
            ]
        },
        {
            "path": "soljson-v0.6.4+commit.1dca32f3.js",
            "version": "0.6.4",
            "build": "commit.1dca32f3",
            "longVersion": "0.6.4+commit.1dca32f3",
            "keccak256": "0x435820544c2598d4ffbfb6f11003364c883a0766c8ac2a03215dd73022b34679",
            "sha256": "0xa4fd5bb021259cdde001b03dac0e66353a3b066b47eb2476acb58b2610a224ca",
            "urls": [
                "bzzr://62ef2a9bf7dbb8fd596b7c6ca6848d9b1a6c8562d10239659f0a56ee27c110ce",
                "dweb:/ipfs/QmTxzbPN4HwcK5YX7n3PNkb1BzKFiRwStsmBfgC9VwrtFt"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.10+commit.59071f60.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.10",
            "build": "commit.59071f60",
            "longVersion": "0.6.5-nightly.2020.3.10+commit.59071f60",
            "keccak256": "0x74acdd6df18dec6f479e5b23bc7693e6e255666ef60da55cd87c8544e04af345",
            "sha256": "0xa72f44ab0126134cfd3e9e1bd890cb8714db1b582544c7cf3f2d6591136c7196",
            "urls": [
                "bzzr://d782a14f988224495c2f1663f3e19d31ab25cd6822201480b7cb95bf451fb994",
                "dweb:/ipfs/QmXhrsCeTfiARfZ1sq2gWUiKCXARKub9P6ZxtZndpXYmjq"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.11+commit.1167af1d.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.11",
            "build": "commit.1167af1d",
            "longVersion": "0.6.5-nightly.2020.3.11+commit.1167af1d",
            "keccak256": "0x5d678dcb1ccdbb5877fbc3f4d1ed012debe92c7103216c5360c7af0a479389f3",
            "sha256": "0x4328405ff1e8d566f6900ef1d157cbf50968d18715cb3c0c303d3bf42f114608",
            "urls": [
                "bzzr://dee303244571a5dfa50667918f4ec12149713ba59e7b577462ec2b37c42563c3",
                "dweb:/ipfs/QmPsasA9CY1TyDx4iuwKnC2i4bi7xb9vEMe9zcAdNgXBDB"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.12+commit.bdd8045d.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.12",
            "build": "commit.bdd8045d",
            "longVersion": "0.6.5-nightly.2020.3.12+commit.bdd8045d",
            "keccak256": "0x4fc7c62d7466381a06978d318ffb324f9db7e7ab2f9802598d7362cda565300d",
            "sha256": "0x7199ef27c56dbd46f3e3357b0eae711f72ba9beab767298230e6d3c7e541e6f5",
            "urls": [
                "bzzr://004854e59e0aa04b19dde6b4be297f87a5562871f835b73596d3dd4a7be48b78",
                "dweb:/ipfs/QmcWSmstcyaK4AgN8zZr27baPJhNjHtPYm4yycmjuYtWJ8"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.13+commit.362c2175.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.13",
            "build": "commit.362c2175",
            "longVersion": "0.6.5-nightly.2020.3.13+commit.362c2175",
            "keccak256": "0x9759e7fd9c571210f85c50e0a9c83f22a5da437a600c8b0ef9afcd107a1fe3cd",
            "sha256": "0xd2d221210ccaa1891cc31bc86af5467dedfe3db45ed778f1ca09c401119c46f8",
            "urls": [
                "bzzr://53988ec7013fbab5a4f5438a048c6c6daef6c03951a2ed00f2625fc23eb47a96",
                "dweb:/ipfs/QmZLbZ1qHZ71zfKb23X71eS88aMorbGV6aR4uTYAcY23d8"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.16+commit.e21567c1.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.16",
            "build": "commit.e21567c1",
            "longVersion": "0.6.5-nightly.2020.3.16+commit.e21567c1",
            "keccak256": "0x9fc610e68fd0eac467354e6ec1a020f86f9121575e46c348f93b6f222c286ea1",
            "sha256": "0x538d39457455eaaaad547e225413d3cd320790bf3abdcad77c15615b00ec2930",
            "urls": [
                "bzzr://8c7ceb45096f7f3173865c48b00906de0ce842a977317ffa5225b2e96c5a9fc1",
                "dweb:/ipfs/QmXWQLHX15EEHEBCqWJrrD6kqvH5u8KRHeYwoqo4TCxnoX"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.17+commit.435c9dae.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.17",
            "build": "commit.435c9dae",
            "longVersion": "0.6.5-nightly.2020.3.17+commit.435c9dae",
            "keccak256": "0xeec559692b7d2c27be338d7b2cce6fb6ead42564a14f994385a1607a53368483",
            "sha256": "0x528c32e0da1c34f64792423a421830627f3045710d80917df8ef3fbd406fa29c",
            "urls": [
                "bzzr://d561db91235f6a361ea5290ba0380283ab3774ff09105b8761b43609fb475165",
                "dweb:/ipfs/QmbEFtuP7XFmAXJQsU97SJEn92hKEpUdisRPX4TPKYMREa"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.18+commit.cfd315e1.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.18",
            "build": "commit.cfd315e1",
            "longVersion": "0.6.5-nightly.2020.3.18+commit.cfd315e1",
            "keccak256": "0xc74ee33ef44c9d2de52a6f0e41fbbe39d5a41b8af040664cef27793a08a71322",
            "sha256": "0xf6b2fc77c8a38c56c15443ebb91a13dcd23babc71861e114726e50c7916b2f68",
            "urls": [
                "bzzr://9478a3eaae9ea219c33910a827e6f712c13268df83d53eee94a1bc245885b105",
                "dweb:/ipfs/QmNvp9ZGawCS2KB3bXAAsgoizXQy2yaS87Kt6uAueSnMFy"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.19+commit.8834b1ac.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.19",
            "build": "commit.8834b1ac",
            "longVersion": "0.6.5-nightly.2020.3.19+commit.8834b1ac",
            "keccak256": "0x88c5079ccdaea27094deeaa39faebfd74c3c310cc218738c8d34027abc850345",
            "sha256": "0x9f2a6a91d1155bfe46d3b08160f8054dede67f1f6e7597df9098808301141878",
            "urls": [
                "bzzr://0b1a66a7fb27f65a6cb34db564fd2eaf7244192e2284bb39134932d0e85f0b63",
                "dweb:/ipfs/QmTa8XN8qoQPHETM5vfjJkJdKWuHRy8prFCFvWjGwMCkPm"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.23+commit.848f405f.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.23",
            "build": "commit.848f405f",
            "longVersion": "0.6.5-nightly.2020.3.23+commit.848f405f",
            "keccak256": "0xa02c559886cc455faffb443108450f2c82811958bc605498401585d3dcd0cc07",
            "sha256": "0xe57a5a4d90af32c5c08f30cbbfe80cdc264bb59d275fa59cd8fbbe98f3da6f50",
            "urls": [
                "bzzr://ab07840e1d1c52abded06e54b9d0d892e9e906aee1eaf113a94c8bea9dc82554",
                "dweb:/ipfs/QmPiqn9nSx3xG92SRJ4cDRGD77mUoGRwhNLjm5EFD8FYB2"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.24+commit.d584b2d1.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.24",
            "build": "commit.d584b2d1",
            "longVersion": "0.6.5-nightly.2020.3.24+commit.d584b2d1",
            "keccak256": "0xaa9cc8864b8b0c1ab93d43dbfea45f79ca6a86445f67f8b6a9364f1a95c8dfca",
            "sha256": "0xe3606eb58b664bee2d80c79fe1c226dc0918d172107dc0057457696365339bb4",
            "urls": [
                "bzzr://87928eb4c85db186a033c006b79259292a056ff193babfa409e11bbd4427ac66",
                "dweb:/ipfs/QmSQSX3cpbkUbYp11izawNLUZBXC3DJjdWa3EDNJySu9Bo"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.25+commit.18971389.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.25",
            "build": "commit.18971389",
            "longVersion": "0.6.5-nightly.2020.3.25+commit.18971389",
            "keccak256": "0x2b51474de211a0c0670cca7a9e0f767456edae2e3719215f92db0c768526d00a",
            "sha256": "0xb8b22ca9c14fce8c074d808c52717aab86a08a46f51b55e9d8b33e2d8f8d31fd",
            "urls": [
                "bzzr://ac03c2a7929a7177c874d22af43a4e3f6511003bf6b5ed76215cad239e4b5cd4",
                "dweb:/ipfs/QmXcfmwaToR64dxYisiSTFpSydGfBrmJKm1HbwSSJ2w9oa"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.26+commit.994591b8.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.26",
            "build": "commit.994591b8",
            "longVersion": "0.6.5-nightly.2020.3.26+commit.994591b8",
            "keccak256": "0xe7cc1a2c7ac9a9311cd85229942c6145218c324f00c050f68c0999f7d2116850",
            "sha256": "0xe1fccf43b5bfdb40babded1c2deeee8be1503c0a739e8f427375a8b00209ec76",
            "urls": [
                "bzzr://3bb2a525a45840bfc71262d5a3dda2bf6fbaaf14405e9f8f5a12016717740896",
                "dweb:/ipfs/QmZ2PRJCdaS3BsueuV1d83zF6CVG7KhKynUgwo6XTkaxu1"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.30+commit.469316f8.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.30",
            "build": "commit.469316f8",
            "longVersion": "0.6.5-nightly.2020.3.30+commit.469316f8",
            "keccak256": "0xe41fd04cec5d74eb41caa85991f3c4fde5aa873256cb0f5b2328ecbcd1c1afd1",
            "sha256": "0x15cf76b60b2a6d3bec56d96bb70ab8845d2686894475cf136aecb168032e2ad6",
            "urls": [
                "bzzr://97a9c371412180f55f4f9df3293fb336b53a650ca46dfb965cd9e32fb1199329",
                "dweb:/ipfs/QmPSfGs4TThuG6bmkqxAp1dkg5fxMonDDGg9aL2M6NNWJW"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.3.31+commit.b83d82ab.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.3.31",
            "build": "commit.b83d82ab",
            "longVersion": "0.6.5-nightly.2020.3.31+commit.b83d82ab",
            "keccak256": "0x46ac00b914f85edeb7cc255b605f11d37043fba953e43d7609bb7c2eef2f9e62",
            "sha256": "0xc2a5fc843959e8f29fd7dd2b39670c49efeaf552c2f9f4cf5f81d88fd07d698f",
            "urls": [
                "bzzr://ced40f5a7baa270bdbce302e438fede82df1fc1f375c78d92c59304470f05817",
                "dweb:/ipfs/QmQk8j3U9cqESivhT2Ks32bbDrW4FUSRK2dAyj9wegVBwu"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.4.1+commit.c11d5b8d.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.4.1",
            "build": "commit.c11d5b8d",
            "longVersion": "0.6.5-nightly.2020.4.1+commit.c11d5b8d",
            "keccak256": "0xaea89892341fe59cf2c2860100c7ac4efd768633123e97cd04acea743a34eae7",
            "sha256": "0xf0622abaa11a47fbf56ff054ad1a789139ea934e052cf9cb34ff0bd3f605ca0d",
            "urls": [
                "bzzr://9b643e72be6a889789af24da646c4c3acaafb2b4808a84c3d31dc25710b19acb",
                "dweb:/ipfs/QmdvkMuggo3TP9YHGCG5t3HxUW7XBjcPgmVbXXqmiRrdRJ"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.4.2+commit.c8f0629e.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.4.2",
            "build": "commit.c8f0629e",
            "longVersion": "0.6.5-nightly.2020.4.2+commit.c8f0629e",
            "keccak256": "0xbae7832d317b2be47bae892d1f6de4b56587c6ee17e26924a44a432cc3efd80e",
            "sha256": "0x9bec709789395b8c2f03a0f7ee2d2b6df84ae75596092d8e2cc93dd49443b217",
            "urls": [
                "bzzr://a29a025020631cbcb5c9ee57a83584510ac0b8968d249e666279c73ae52226ca",
                "dweb:/ipfs/Qmdv1Qv9Hc5juuVV4wNxSpeXaxi5ujiye2Ett1FdFr6b9r"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.4.3+commit.00acaadd.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.4.3",
            "build": "commit.00acaadd",
            "longVersion": "0.6.5-nightly.2020.4.3+commit.00acaadd",
            "keccak256": "0x244209cbb6289778383ac3a94d31ee77bb07741d6febe411ca6de450928ea464",
            "sha256": "0x4209d030bf7908c1ab0c21fe446753e420b6a970c2e62a4ade9d34c6e95d1e46",
            "urls": [
                "bzzr://28ca6f3f5078413340fbe1dcdf760441bae84f363529c676f5a710fd4cc8313d",
                "dweb:/ipfs/QmPAHSb7VJ47fK5mwS8XHwcBCG1B9o8CCDiqgMBWetjQFp"
            ]
        },
        {
            "path": "soljson-v0.6.5-nightly.2020.4.6+commit.8451639f.js",
            "version": "0.6.5",
            "prerelease": "nightly.2020.4.6",
            "build": "commit.8451639f",
            "longVersion": "0.6.5-nightly.2020.4.6+commit.8451639f",
            "keccak256": "0x2e47901e8fc02cf48b61e97fb0112cf34d9797bc6c09c17ee08b79c3c6926248",
            "sha256": "0xb89c402b4a600766a9bf882cf162884fc68f42522e1fb1b919b2fb068192f838",
            "urls": [
                "bzzr://f7cc3d83f42ecec197ee24f4c4710586632e0e3b6779b74b4434bba38c5c81ee",
                "dweb:/ipfs/QmRYoeCJ6sRiodz1P4ef29hjZd65SDoA4i1MAsMaYQrjN8"
            ]
        },
        {
            "path": "soljson-v0.6.5+commit.f956cc89.js",
            "version": "0.6.5",
            "build": "commit.f956cc89",
            "longVersion": "0.6.5+commit.f956cc89",
            "keccak256": "0x6262768243c1ceaf91418e52dc6f52d2ce94d19c6e1065d54499b7bc4d6e14dc",
            "sha256": "0xf8f83757e73f33f44389d1fa72d013fb266454a8dd9bb6897c7776f8fc3b0231",
            "urls": [
                "bzzr://ed91c1114615572c10a34f0ab28a3a159d2d433fabbcec9eae7253c25ecac8b4",
                "dweb:/ipfs/QmRUoBQeA5zpun1NK7BvBhQk6pTT4uZw7Jn2wZnWQETH9W"
            ]
        },
        {
            "path": "soljson-v0.6.6-nightly.2020.4.6+commit.e349f4b7.js",
            "version": "0.6.6",
            "prerelease": "nightly.2020.4.6",
            "build": "commit.e349f4b7",
            "longVersion": "0.6.6-nightly.2020.4.6+commit.e349f4b7",
            "keccak256": "0xba5ab6a2d8295070b5da744573afacf1c944cdf4771d7887f280453a7281df0f",
            "sha256": "0x031b38740249dd9cf6aa890a9376d9a165fae857ced8903de07722e409f76de4",
            "urls": [
                "bzzr://47fa2954c502bc89b089e0e1dac52905292f1c4789e9e4e95c88433a12884a57",
                "dweb:/ipfs/QmS2FD9ZwFzTFScbyKPhV9NSNYqcG9PF8Ga9kt1pXsNSfG"
            ]
        },
        {
            "path": "soljson-v0.6.6-nightly.2020.4.7+commit.582c7545.js",
            "version": "0.6.6",
            "prerelease": "nightly.2020.4.7",
            "build": "commit.582c7545",
            "longVersion": "0.6.6-nightly.2020.4.7+commit.582c7545",
            "keccak256": "0xbc59141c7fb5cc3540f20d4d4e0967546b6ca7d859fecf7a91df2598b7a90058",
            "sha256": "0x8b75b91e88b2f3fd4253ae4210940de3aff970fba8f0bcd8c1b9ec7599680927",
            "urls": [
                "bzzr://1e504357a73f2983e6d4a7601d05063388ed609e6a178f2793fad7ed271bcc28",
                "dweb:/ipfs/QmWRmSvhw8xQB3sGdGorvZ65q5qYGxtut5Xsb7UBxcj7fs"
            ]
        },
        {
            "path": "soljson-v0.6.6-nightly.2020.4.8+commit.9fab9df1.js",
            "version": "0.6.6",
            "prerelease": "nightly.2020.4.8",
            "build": "commit.9fab9df1",
            "longVersion": "0.6.6-nightly.2020.4.8+commit.9fab9df1",
            "keccak256": "0x93d39f7683ee9d584d0c2ccc215dbe354a56a9ca00604dffd2cf6b1260be9570",
            "sha256": "0x14b87e69f5489808c8d9945966d6cd81540db7faa44568831eedf1306a05fc22",
            "urls": [
                "bzzr://dddc0450e10bb3b289f597e38a65be014ae86715c1e7e6473ed374766739b5e8",
                "dweb:/ipfs/QmciCS7DySdpPFBW19mtwp5mwMqaR5jYhAVB4trTVpSXn4"
            ]
        },
        {
            "path": "soljson-v0.6.6-nightly.2020.4.9+commit.605e176f.js",
            "version": "0.6.6",
            "prerelease": "nightly.2020.4.9",
            "build": "commit.605e176f",
            "longVersion": "0.6.6-nightly.2020.4.9+commit.605e176f",
            "keccak256": "0xa9cd0e0b2d4418292a3a977e879fbba69c101a5ff6e7ad383431543e4288f0cc",
            "sha256": "0x8b81ef835e34ff3c97bc02e443b4ea998d4a807e0e127d6f92c63fe0681a7eb6",
            "urls": [
                "bzzr://cb85a3c47350633814b7c6bbb78e962bd6d55f65670cabe112097846d3448717",
                "dweb:/ipfs/QmeMEjF9mGKpG9RS6qHCT3uugy55dh2jzox8MRkMPHqgx6"
            ]
        },
        {
            "path": "soljson-v0.6.6+commit.6c089d02.js",
            "version": "0.6.6",
            "build": "commit.6c089d02",
            "longVersion": "0.6.6+commit.6c089d02",
            "keccak256": "0x3c9cfccc78bf352f4c7901d7af76757bd228f93af2634af4cd16b4916c13e44e",
            "sha256": "0x09f6098026622c5c334c7798c3ad2b8f7c0ebc62f87846c7d5e7e725c3d1cbc2",
            "urls": [
                "bzzr://ab23bd0e01952ee485f0426c9c4e47fcf6a508bc4919e83be31c0f9ea6e396ca",
                "dweb:/ipfs/QmRj2pxXxvmJ96i57maVjLMfs4DUtCuptM8vSVvvDweJ74"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.9+commit.f8aaa83e.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.9",
            "build": "commit.f8aaa83e",
            "longVersion": "0.6.7-nightly.2020.4.9+commit.f8aaa83e",
            "keccak256": "0x19fbeafba343a0018108c8af7247c564a48a39dce05c7c738687ef214c7e7063",
            "sha256": "0x8b472165ccf506fbec23fefaa1c28d0f905116e2d1074dd819b9281e6e747089",
            "urls": [
                "bzzr://9b97d4999835e41a48be3bb162f0efc0f1351b0aed92f0394830e56a17c3fe5e",
                "dweb:/ipfs/QmUna9GdTDeyNpDFZ6uXWTAuWytNRvZ6VmqVzBhDHrPkGg"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.14+commit.accd8d76.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.14",
            "build": "commit.accd8d76",
            "longVersion": "0.6.7-nightly.2020.4.14+commit.accd8d76",
            "keccak256": "0xc5e366cf172df63ef1f1bff9fee60bafd0df8dcdb98bc6f2619b5a0fe917dda1",
            "sha256": "0x5fe06ed4be5137808ae29b260eeca7aa040f5f62db53ddd1767a79344c9c16a2",
            "urls": [
                "bzzr://70cc4360f92c1909efcabda1308e2f74e43213b111d53730c458990c26940fc2",
                "dweb:/ipfs/QmdyLgJ4C7mwsRV1RWBaHFCdjjxaP6tZwGnL6oP2MFBPC4"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.15+commit.cbd90f8d.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.15",
            "build": "commit.cbd90f8d",
            "longVersion": "0.6.7-nightly.2020.4.15+commit.cbd90f8d",
            "keccak256": "0x5a1d324a51cafd54068de279afc7602684c53dbb6f726aa1f73721792531694d",
            "sha256": "0xa9f53b38b7ad77c5bf287e35b9e49f7e60f0ba6e524941aec9b7aaf78f5d3b19",
            "urls": [
                "bzzr://9d20a584a3787b6d8ae1d7537aaecfc048bb01f8a47b6b898be01b93d79a098f",
                "dweb:/ipfs/QmUYGDjfaJbFVwkoCdtCkfmYdf8KhoX11gjpAyGe63JDNm"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.16+commit.0f7a5e80.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.16",
            "build": "commit.0f7a5e80",
            "longVersion": "0.6.7-nightly.2020.4.16+commit.0f7a5e80",
            "keccak256": "0x120ee8a12f7d9ab285f9bf74915e3b28aef52714bdc02417b1794214bf3d6477",
            "sha256": "0xa0f956aed5c0023fd6a2efe12390f01294275135d40714c6efda3304f14fd836",
            "urls": [
                "bzzr://55e8f3cd5449acd01944e2b95dd2c199aebfdcdc6fc15133f450e3b16b2d5217",
                "dweb:/ipfs/QmPmKCBz3Hw71DewzgkWjShnhboAPJ7y295rwDatwmYPbZ"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.17+commit.ccc06c49.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.17",
            "build": "commit.ccc06c49",
            "longVersion": "0.6.7-nightly.2020.4.17+commit.ccc06c49",
            "keccak256": "0x792fd7829941a9ef6a5493cc41d3f76860be7ce66f59411d539f9f8f720c5012",
            "sha256": "0x3e1f45aa8dc0fa962e5f6f0017872eb441fc3dd0cda1e7c54317c75ed6d12113",
            "urls": [
                "bzzr://9c7ac2507f78e06d9f54c0d464da8463320e251f2e86535dadcb74aa6d3a46a4",
                "dweb:/ipfs/QmZkDn2CN4SEPTbZCLCNDpSHRzEYPs24FJwtjuSgG1jzcM"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.20+commit.7eff836a.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.20",
            "build": "commit.7eff836a",
            "longVersion": "0.6.7-nightly.2020.4.20+commit.7eff836a",
            "keccak256": "0x7e11a240a01bcbe7b2bb3c6975a931969b935ea65438a22741d1f95818d8f481",
            "sha256": "0xbb3c611d4948527959b5d1352f504dd3cd5cf9c144e046b8cd670505ef81dc1a",
            "urls": [
                "bzzr://fd635c6a895afa6f21615468150d020816f93892ef8a5d5f87abc8e96effda29",
                "dweb:/ipfs/QmQJzkojqkr6WqYvYFF6vKSSsaqKMwhBQEfMSKnkVU1yRE"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.22+commit.d0fcd468.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.22",
            "build": "commit.d0fcd468",
            "longVersion": "0.6.7-nightly.2020.4.22+commit.d0fcd468",
            "keccak256": "0x1cde350fcc1893559355c23fccbfdb5c21810c05bcfb2581f1d8b87059b57504",
            "sha256": "0x4b2e7fad814ea17af6af2f727f28542daeb2863153d8c4c0a50bad842d45d883",
            "urls": [
                "bzzr://68851f611407c0673efbbdea9fbde35601c5c34388308f10ecf0a46f4184ad64",
                "dweb:/ipfs/QmVURabrvsZUxYqa8FLgY4BjPJD7bEySrxhn8kZpg98yA7"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.23+commit.aaa434da.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.23",
            "build": "commit.aaa434da",
            "longVersion": "0.6.7-nightly.2020.4.23+commit.aaa434da",
            "keccak256": "0x64735da694a27ce3f3a3243e126748a4bb85a4eb4a12629dc24a1d707cf782b1",
            "sha256": "0xa6bd926a3a7dac9d636573896e5fc93f1fb35f7adc5577fe2e665f03bcd68883",
            "urls": [
                "bzzr://d4cd436bb4de4402600c10392772f2ef646b0ba4d4ea0ad71fede17b5928fd1f",
                "dweb:/ipfs/QmYB1w9o2ULTeRB3SW8Dshbn79DYqqDGZ71SkYvisJpXT3"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.24+commit.2b39f3b9.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.24",
            "build": "commit.2b39f3b9",
            "longVersion": "0.6.7-nightly.2020.4.24+commit.2b39f3b9",
            "keccak256": "0x40c0d5ef3cec50a2a7a03ee5d706b773f3763adcdbd7a77b00fbed79e77f56f1",
            "sha256": "0x56aa67abf659221618b1b05b6f451c429a5d786006a9f01ce5d566bbfa8b49d6",
            "urls": [
                "bzzr://ffe811967b00cba002c81d70f3d7ef5a1529edc86097a180cdfd660b2076c0af",
                "dweb:/ipfs/QmV4ktVa11PKpPvRPvYPoK5agXbNEXkmhFf3ufTC5LLfSH"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.25+commit.ed6c6b31.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.25",
            "build": "commit.ed6c6b31",
            "longVersion": "0.6.7-nightly.2020.4.25+commit.ed6c6b31",
            "keccak256": "0x7096b86953f032a2c9ecb96303234e25bf1e5c9dba3f7ee5936605b3068b6438",
            "sha256": "0xf95545cdc6b637911e9290b315367880d6ac456b03182d50e2038f522b382298",
            "urls": [
                "bzzr://95ebd3e2bfb0e59aee833b4482dcf47d299b8a19fa2c6846754124adbc2b8d73",
                "dweb:/ipfs/QmQh5f3w9hmtXvFXqEMjW1ddiJHU1gN6gv57XedNJg7C9W"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.27+commit.61b1369f.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.27",
            "build": "commit.61b1369f",
            "longVersion": "0.6.7-nightly.2020.4.27+commit.61b1369f",
            "keccak256": "0x9d7f6c44a99f1a4807c81b1c75e672e9d8d1563d1975dc7b8a7165a56b2b0e4f",
            "sha256": "0xf5f7ac61c7e7239751578c815e023bc8a566ca7d1ac94f7457598a8afcebfc25",
            "urls": [
                "bzzr://a42b252283c0275a162f2190db1d4ef0105a8a784d42500d6147a6239b94a8d2",
                "dweb:/ipfs/QmTKLZ2JJamMm61CnqPzhLnD1yJ2QNq7bhRMSRzuMmYX1e"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.28+commit.75a25d53.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.28",
            "build": "commit.75a25d53",
            "longVersion": "0.6.7-nightly.2020.4.28+commit.75a25d53",
            "keccak256": "0x857d67de4e34496949017f2b30c506ca890160dfd44ce0b25b0b32ee2a805d69",
            "sha256": "0x116b2291f3e84dda91f52fdff1641d57efae7f260830df5edad27cdcf0e64cd3",
            "urls": [
                "bzzr://331ace49774b9a67eb4f4cf19fd966b86584d7c562fa0ff115182d3e5f937369",
                "dweb:/ipfs/QmQAjF9tnUzBkSyk5eufbL2ivq9ms6a5kbuPwfJLmLHfuW"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.4.29+commit.602b29cb.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.4.29",
            "build": "commit.602b29cb",
            "longVersion": "0.6.7-nightly.2020.4.29+commit.602b29cb",
            "keccak256": "0xd6360433fa58cd913cb3d3bb9e37d305289398acc338d6557a72fc2cc2ab7e34",
            "sha256": "0xfcd88194ea796a2ae0b1a9f8625c5ad9fb39931da150b843d5d4a55a6206d955",
            "urls": [
                "bzzr://dd62fc029203a56873f475a8a812c935b602b0eb61df7926e6e681a9384acd23",
                "dweb:/ipfs/QmSfqCCzTCXtyX2FuBrDxBB4mZktAxgEhL6wQfaKjGBu2G"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.5.1+commit.5163c09e.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.5.1",
            "build": "commit.5163c09e",
            "longVersion": "0.6.7-nightly.2020.5.1+commit.5163c09e",
            "keccak256": "0x564eaa1bc426bd6fbd4a0d8b7d53d00ffb03efe6d221fb4aec2072ef2876e265",
            "sha256": "0x581082fb70f99f2277c8093220180aae83b59adc662a196b7a6b58dd37685463",
            "urls": [
                "bzzr://ec7871163a6e7493cee89713ce708720a59d38031df71c4ae654371eaf41c7bf",
                "dweb:/ipfs/QmSxntRkfgDg1uMP6ewzCBWPuvXGimbiB8JfnTgfSqhfR7"
            ]
        },
        {
            "path": "soljson-v0.6.7-nightly.2020.5.4+commit.94f7ffcf.js",
            "version": "0.6.7",
            "prerelease": "nightly.2020.5.4",
            "build": "commit.94f7ffcf",
            "longVersion": "0.6.7-nightly.2020.5.4+commit.94f7ffcf",
            "keccak256": "0xfb65e186862d956a864ee54eb71715334891b30d913a8042af963e00b2e06a62",
            "sha256": "0xdec05c0dc0c04b7e003b881a010fec7f82af759eb19153073e4b48fd03faa3a7",
            "urls": [
                "bzzr://4875df1d38ab410e050b4ecdb639fe4e18126d11f1b9049bdac2c3c4bb7ef1ca",
                "dweb:/ipfs/QmQgKXE7ZqmnpJHXgY5UT9qHRkyqjxD5Z6QT2MQKDUs2vz"
            ]
        },
        {
            "path": "soljson-v0.6.7+commit.b8d736ae.js",
            "version": "0.6.7",
            "build": "commit.b8d736ae",
            "longVersion": "0.6.7+commit.b8d736ae",
            "keccak256": "0xb463b6a61fc027247655a32cbfd50bf543eafa3a6b42ceacdda7293e3ada8866",
            "sha256": "0xb795f1b20f065a0aee492c24071fc1efa1633c3caab77cff20278a9ae822f04e",
            "urls": [
                "bzzr://c82fea785ae31fb4847f5640e6305edc05d1a5b0b47552f60325c25cce280f75",
                "dweb:/ipfs/QmShUrNZf1dZFjziorJYE8fMGNUSMFsbaR3ipSvsCMvExM"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.4+commit.1bb07e26.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.4",
            "build": "commit.1bb07e26",
            "longVersion": "0.6.8-nightly.2020.5.4+commit.1bb07e26",
            "keccak256": "0x28da1c17071b4eac2a3a675223302bb774a9c2e0fe59ec2ce22c0efe38283e8c",
            "sha256": "0xfe62f4678724e283d433b85b3fd66c955a306903fbf25d8f7da436fd18ae657a",
            "urls": [
                "bzzr://5b3cc8bde9102b0bf71a19c2c2aa83de80aa2934266f1ca07aebce65b7bb1168",
                "dweb:/ipfs/Qmd41FMuhDGBU6LDzcYJ9Z1pewh1MxnzX1qPNmEN5gH712"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.5+commit.1de73a16.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.5",
            "build": "commit.1de73a16",
            "longVersion": "0.6.8-nightly.2020.5.5+commit.1de73a16",
            "keccak256": "0x2eeaa9d4f332db4ac4340964adde23f1690248779369c5e6003ebd146c7d9c55",
            "sha256": "0xc85c124f8744caeb168fd0b7922745d0cedfa9f962fb7c3c3402fde0b644466c",
            "urls": [
                "bzzr://4c4583422732f4a81b92811a38d9fa604809368a2bbad03609db12750ef11bb4",
                "dweb:/ipfs/QmaC2emJnoUijbdUAPwVndx9cehNpFPiTpyu5CzurTaoc2"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.6+commit.3a93080c.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.6",
            "build": "commit.3a93080c",
            "longVersion": "0.6.8-nightly.2020.5.6+commit.3a93080c",
            "keccak256": "0xcb21eb25cc01c9f3347981bd5dcc5d1118554ae1f050b37e3f3f0d4d4388e671",
            "sha256": "0x189bfabf4bc2588c6b505c121b0ca29b1d0516983e883d5eb9664aaad4c7749e",
            "urls": [
                "bzzr://61bdc33a70d1b2bf8101a1beb2c945cb0a0716929ed6e9ccd5823e59052e9cc8",
                "dweb:/ipfs/QmXTKT89UFjG6arfDukVbR299JdXiE2kh1argi71Hx5btE"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.7+commit.741c41a1.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.7",
            "build": "commit.741c41a1",
            "longVersion": "0.6.8-nightly.2020.5.7+commit.741c41a1",
            "keccak256": "0x2b0d0a991a94b59ca18051cfdd74140f7536c274e79e76f032a69988aaaca7fc",
            "sha256": "0xc3f9e06e055a34ae5824852e6a9da02bcd8092607fd90b3630195719e8bfd5c3",
            "urls": [
                "bzzr://27b3ef1bcd572e3f6d6149efa3ea616189c145f5a81bc1e292e6f353d1d96a1e",
                "dweb:/ipfs/QmNqdJTVTee554nthobhTPHJkfXgAz6gHn8pWXPvgNJvCr"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.8+commit.4e58c672.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.8",
            "build": "commit.4e58c672",
            "longVersion": "0.6.8-nightly.2020.5.8+commit.4e58c672",
            "keccak256": "0xf723bf586e943d5011d347e7369e0a90956e79e9d7f68ad097348a0d915dbb7c",
            "sha256": "0xfab017bed24278a847a6346e8498776f454a33bf34b65cb70f15e60a8cf1fe30",
            "urls": [
                "bzzr://1b285970161ad94d74661021a74bad7ad0ace50d18b9f629f6cb5db3d19f2f36",
                "dweb:/ipfs/QmQCzX6Mruzj81kuha1N14g7NWm62UCrAbQZDwj67Btugb"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.11+commit.39249bc6.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.11",
            "build": "commit.39249bc6",
            "longVersion": "0.6.8-nightly.2020.5.11+commit.39249bc6",
            "keccak256": "0xa8dd43fbab06bc8d314d775e72297ebe8cf0a2c3f79ec03ee75dbde0129c4a1f",
            "sha256": "0x7ed6ba966f3dc18d195707b22e5d7f8fbbabf84750d2c1b1d66103e3c42d99ee",
            "urls": [
                "bzzr://447739ce479133ae9adbe9bab111451d737bc5669aacb58ae139e73e6eea6bef",
                "dweb:/ipfs/QmaHokAfVMyzuhb73yKG32mfvjBV1tCeHhNTmz73QQSiQr"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.12+commit.b014b89e.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.12",
            "build": "commit.b014b89e",
            "longVersion": "0.6.8-nightly.2020.5.12+commit.b014b89e",
            "keccak256": "0xf09d30abaa34a5b5740e0035bf211e7509297713dc95f3b4fc9af8d9c8727d8c",
            "sha256": "0x80d26ab5c7850369f92f8b5685099c9a07176f134c701b8c31ee547d40c339fa",
            "urls": [
                "bzzr://7bb9fd69bbf0c27793d5d9c2b48b4a3d028bb7df30fcaa63e015154b562f21c5",
                "dweb:/ipfs/QmbwGo7gditFqwsybPN5HCLUUMCWbjNGtCuVVsVnEzXbhN"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.13+commit.aca70049.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.13",
            "build": "commit.aca70049",
            "longVersion": "0.6.8-nightly.2020.5.13+commit.aca70049",
            "keccak256": "0x891a2cfb76256a3d06f10f42d4e5eef7481092425ee8c91c6a55129d5986ecb2",
            "sha256": "0xfb5c95864c722210319db4e2f63f860e187bc4be4f5869fd56dd3c330945ea82",
            "urls": [
                "bzzr://dda1b5759181aeb7b1afbbee4d8f4192d3dce322b67ec717699ce8faef989ade",
                "dweb:/ipfs/QmSvaeeRPsrw7n7nDCzWxf5BzRyysowVj8jUQx2CWxMHZ3"
            ]
        },
        {
            "path": "soljson-v0.6.8-nightly.2020.5.14+commit.a6d0067b.js",
            "version": "0.6.8",
            "prerelease": "nightly.2020.5.14",
            "build": "commit.a6d0067b",
            "longVersion": "0.6.8-nightly.2020.5.14+commit.a6d0067b",
            "keccak256": "0x9aab2d12b8311829476e08cca4c7111bac97cc79168541895b5f18dc1fcb21b4",
            "sha256": "0x0866809f8f6d7098b12bc698e0b8b4395dbcf48416124b655521991d1b0aa375",
            "urls": [
                "bzzr://4a4b8c6b21aed96964ef91a687697ba71b6142934595e35024ba3e43037bce2c",
                "dweb:/ipfs/QmUEZP24e8Frs8tkFyZGempyrtpXHHwiPAduksyw6gSv8R"
            ]
        },
        {
            "path": "soljson-v0.6.8+commit.0bbfe453.js",
            "version": "0.6.8",
            "build": "commit.0bbfe453",
            "longVersion": "0.6.8+commit.0bbfe453",
            "keccak256": "0x537cefc0579dd9631ec952cae951b3df0a50a3e557b5638107a67275f7aacc07",
            "sha256": "0x3e8b01cbd194e40971b41017ada7c8b2fa941b0458cb701bdfb6a82257ca971b",
            "urls": [
                "bzzr://130bff47eed9546c6a4d019c6281896186cf2368b766b16bc49b3d489b6cdb92",
                "dweb:/ipfs/Qmdq9AfwdmKfEGP8u7H9E4VYrKLVinRZPZD1EWRnXSn1oe"
            ]
        },
        {
            "path": "soljson-v0.6.9-nightly.2020.5.14+commit.33d8d838.js",
            "version": "0.6.9",
            "prerelease": "nightly.2020.5.14",
            "build": "commit.33d8d838",
            "longVersion": "0.6.9-nightly.2020.5.14+commit.33d8d838",
            "keccak256": "0x804042004c0ce1cea569cef85c2b99afbdc996e40bc348cfce181a274da15405",
            "sha256": "0x2430f6ed8973a704c3373346c1c6ab47799de0a9915b5e23593af2d2a1fa634c",
            "urls": [
                "bzzr://31f9d5d199c3896d1ae1c1cced515edf80eb0a4d6f19af0e3762024d3f25a0aa",
                "dweb:/ipfs/QmYtz4TqKgq1Jit17W4oRGXGrnGVJYT9UcfwQPKCnRSUkn"
            ]
        },
        {
            "path": "soljson-v0.6.9-nightly.2020.5.27+commit.57ac8628.js",
            "version": "0.6.9",
            "prerelease": "nightly.2020.5.27",
            "build": "commit.57ac8628",
            "longVersion": "0.6.9-nightly.2020.5.27+commit.57ac8628",
            "keccak256": "0x6ba0ff7e6d68922d78f08a26db768146b3e14c923c8a5a9d641ffe73a25e18c2",
            "sha256": "0xf79675e431e1b3671da540ffe916f44a54cc922f2d7fbf3252deef0e2dcb06a1",
            "urls": [
                "bzzr://fa13db5f38913bee1475458757e651eeb701d3fc69bf6c4f050aa7527ae95901",
                "dweb:/ipfs/QmcsCimkhWnjYY1eT4TRy3gmzdEguyWtSBqNXLcxDLZVjp"
            ]
        },
        {
            "path": "soljson-v0.6.9-nightly.2020.5.28+commit.ee8307ce.js",
            "version": "0.6.9",
            "prerelease": "nightly.2020.5.28",
            "build": "commit.ee8307ce",
            "longVersion": "0.6.9-nightly.2020.5.28+commit.ee8307ce",
            "keccak256": "0x4948204fab7559aad90e269b073f13a199a401ec9f7a3b213f6c493e30034a52",
            "sha256": "0xd4c1f75c1671a6ccf38728eaceec81c29be7816563b98037dd4ecb64288bf382",
            "urls": [
                "bzzr://8f4e1b68422ebd17c2945e056f69cd78f024f7701c9e44ca482558c8ec1b90c7",
                "dweb:/ipfs/QmbVJevP91jbNRDttTsif7SWbAP6CEBJ6xPApsryi4YNd8"
            ]
        },
        {
            "path": "soljson-v0.6.9-nightly.2020.5.29+commit.b01a1a36.js",
            "version": "0.6.9",
            "prerelease": "nightly.2020.5.29",
            "build": "commit.b01a1a36",
            "longVersion": "0.6.9-nightly.2020.5.29+commit.b01a1a36",
            "keccak256": "0x33f252725a15d4cc5e80f32c0080cb8b52c1ca97d38eccddbbb09410010a0843",
            "sha256": "0xacd80236906c00f514cab42fbf040f201d0ba5c7715a40e4a28b04a03b0f5878",
            "urls": [
                "bzzr://e1a46adb108ebf6daab58b1166a85482bf6cfd654f8cb8fa01324401de05aea3",
                "dweb:/ipfs/QmbCpu7Dg3MyBnucfttcb9Cx48aSUzh3wa6zLDAJPmhpi9"
            ]
        },
        {
            "path": "soljson-v0.6.9-nightly.2020.6.2+commit.22f7a9f0.js",
            "version": "0.6.9",
            "prerelease": "nightly.2020.6.2",
            "build": "commit.22f7a9f0",
            "longVersion": "0.6.9-nightly.2020.6.2+commit.22f7a9f0",
            "keccak256": "0x90d01cd2ae8a7dd0d5ffc047dade64fc56945a40ad673efb3a17bd263d4e332a",
            "sha256": "0xfffcfb5bda410edcaeb4cf79f9f46ea20a786fe16959f7c26c2166c93eb55560",
            "urls": [
                "bzzr://0898ecb36eecde721133ad3d0c6dfd54ef60a4c6045e5851e0b608045f2bf8a2",
                "dweb:/ipfs/QmVKsevG4R1vC6H6g4pbienE9746cRcKP9aoc9kUT4rUhb"
            ]
        },
        {
            "path": "soljson-v0.6.9-nightly.2020.6.3+commit.de5e2835.js",
            "version": "0.6.9",
            "prerelease": "nightly.2020.6.3",
            "build": "commit.de5e2835",
            "longVersion": "0.6.9-nightly.2020.6.3+commit.de5e2835",
            "keccak256": "0x437eac6576ae67297144418d2dd1fff8c9bbaef775a68ea8c87981dcffa7b582",
            "sha256": "0x6b47799d984e52ea761a0bf05fdc6ff38318be964fa36c36593c9405024a0cf4",
            "urls": [
                "bzzr://990f8db990b963cc8d2e1da7886999fff34210e68de2210791cd35bc33772157",
                "dweb:/ipfs/QmVrhBEp8a1dHEXYyZLfwWoPBfJWo4HLE4YwpswUMXH233"
            ]
        },
        {
            "path": "soljson-v0.6.9-nightly.2020.6.4+commit.70e62524.js",
            "version": "0.6.9",
            "prerelease": "nightly.2020.6.4",
            "build": "commit.70e62524",
            "longVersion": "0.6.9-nightly.2020.6.4+commit.70e62524",
            "keccak256": "0x74a5f64693db9aa2c8813478538da45dbd18e233682a0b7cb4ff94d000443a6a",
            "sha256": "0x3ec23d906929f50f76abf1c7453524c9dc628ad981c0a0eae14ee9b1c5df0388",
            "urls": [
                "bzzr://6b9c3342058d91c60a9a36dfc950d19aa8ff9d3d0cb26a857b835871cee62d4f",
                "dweb:/ipfs/QmetxP9mrnDa17EV9Uu5K7LFSBqCaosRYHJBFei9vpBmgo"
            ]
        },
        {
            "path": "soljson-v0.6.9+commit.3e3065ac.js",
            "version": "0.6.9",
            "build": "commit.3e3065ac",
            "longVersion": "0.6.9+commit.3e3065ac",
            "keccak256": "0xa2d4d3ebe5d52bfa7ddf1a1fcd9bfed81eaa8678e6a1dd5a1c84954dd064422c",
            "sha256": "0xf1724fd46b7a353561b3f8d473b0dc8c855b6d84b5af559d7e3326ac79b9d758",
            "urls": [
                "bzzr://2c5fff6b816edb78adb2220f175591c9f4f6d38cfd27a83afb1849191cf9a524",
                "dweb:/ipfs/Qmad6iesaR5FQ45RRtMrt2Fa1EYDuq1oGoMJJB6beMHESn"
            ]
        },
        {
            "path": "soljson-v0.6.10-nightly.2020.6.4+commit.0ec96337.js",
            "version": "0.6.10",
            "prerelease": "nightly.2020.6.4",
            "build": "commit.0ec96337",
            "longVersion": "0.6.10-nightly.2020.6.4+commit.0ec96337",
            "keccak256": "0xa53ea08e9a1b79f882ede910c03c1b42add38ee50d0fe6bc41a1dff024dae4ec",
            "sha256": "0x1dc2a3f7ef51c8afa628ebf04c45e8ae44158c2a3bdffd88873c8ca69917fa0e",
            "urls": [
                "bzzr://02392f4dd6861789472e900b1d2356f5274132d67e450b1ddcdeb43e9c4fecdb",
                "dweb:/ipfs/QmapDK9S5wDLF84s1CR6PescxU66mrVMN2QfUnbJ68tZwm"
            ]
        },
        {
            "path": "soljson-v0.6.10-nightly.2020.6.5+commit.d4552678.js",
            "version": "0.6.10",
            "prerelease": "nightly.2020.6.5",
            "build": "commit.d4552678",
            "longVersion": "0.6.10-nightly.2020.6.5+commit.d4552678",
            "keccak256": "0xe96dc60bf822c66e051442e22c395bf73f32d1a70168f8410b0cd066b789c1f3",
            "sha256": "0xb64bc67a90bded4971dc2613adc0984f058a4352ecd838c87462348acabdc52a",
            "urls": [
                "bzzr://3f859a7bd461e30fffa815260e41775a6346fe3781f1fbc2eb49fb86b45ada24",
                "dweb:/ipfs/QmXUKauuHC5UKgaW8aSRB7nr7nwU1ViqZNU9ZEkgvX2K4H"
            ]
        },
        {
            "path": "soljson-v0.6.10-nightly.2020.6.8+commit.3d241eed.js",
            "version": "0.6.10",
            "prerelease": "nightly.2020.6.8",
            "build": "commit.3d241eed",
            "longVersion": "0.6.10-nightly.2020.6.8+commit.3d241eed",
            "keccak256": "0x26fa8a1217515b97ce42e0d1d6aa48ba23fd6b4ae5577351b50a3bc99a85580d",
            "sha256": "0xab1c5dc641b09e561ff1845acf6ca61b363cb0dca9d5620d932bf194fe35652b",
            "urls": [
                "bzzr://d616f978e8bb4d31b012ecc8c9a5657baaa5330594c81683f83f4a6ae1f8c76b",
                "dweb:/ipfs/QmZbuqdaeSF5VepivAStG2Q7ELaqCpCg8ZbV4HGSvieJGX"
            ]
        },
        {
            "path": "soljson-v0.6.10-nightly.2020.6.9+commit.1e8e0ebd.js",
            "version": "0.6.10",
            "prerelease": "nightly.2020.6.9",
            "build": "commit.1e8e0ebd",
            "longVersion": "0.6.10-nightly.2020.6.9+commit.1e8e0ebd",
            "keccak256": "0x8a713ace2dc546b57fb40af4623df5afa47b91298cb679de3cb22f9741be167e",
            "sha256": "0x8e9b68f364ebf3c7ac07a6cfd633e1564f06c8135b8c423c2994e93761ace3cf",
            "urls": [
                "bzzr://1ff0c522ca11ffccc62d1936e9b205fc8556db2334cf6dc30ef9f224baeade76",
                "dweb:/ipfs/QmSPhLznnjdZBwzK6uXDngQJj3rs9qZAspmDThdbSsJi8N"
            ]
        },
        {
            "path": "soljson-v0.6.10-nightly.2020.6.10+commit.0a5d9927.js",
            "version": "0.6.10",
            "prerelease": "nightly.2020.6.10",
            "build": "commit.0a5d9927",
            "longVersion": "0.6.10-nightly.2020.6.10+commit.0a5d9927",
            "keccak256": "0xe180b286ea1a1788efcb8c4ced2e2c72e00bdc0c090dd205b4d39ae3a2c95fdc",
            "sha256": "0x7531dbf6c26abc25323bbadcf68503c631a486f48b7dc63cb815ab66aa37748a",
            "urls": [
                "bzzr://00c1402c4dedbe200b967eb8262e1cb78cc87a3e57d49131b2f251e74e4e1d2d",
                "dweb:/ipfs/QmaDvEVrD74AFLAj3jnYZ4SRxLJHfrbh6s7jyPPf9su99k"
            ]
        },
        {
            "path": "soljson-v0.6.10+commit.00c0fcaf.js",
            "version": "0.6.10",
            "build": "commit.00c0fcaf",
            "longVersion": "0.6.10+commit.00c0fcaf",
            "keccak256": "0x620163da7ee7b2622c9ee48b06110a52739f633189555148a3b5ecf767e60cfb",
            "sha256": "0xfa27ce9d23bddaa76a4aefbafa48e48affde9a1ee7c8a5e8784cf8d4c390f655",
            "urls": [
                "bzzr://823b4efe3ca2964d660348214fd1a44579e13e1e8ce69a81f447372a11d60316",
                "dweb:/ipfs/QmUinsRZvs2zFNG6FMWy7ngTYUnZccXq7MRtgpj1dPfxu4"
            ]
        },
        {
            "path": "soljson-v0.6.11-nightly.2020.6.25+commit.48dd3634.js",
            "version": "0.6.11",
            "prerelease": "nightly.2020.6.25",
            "build": "commit.48dd3634",
            "longVersion": "0.6.11-nightly.2020.6.25+commit.48dd3634",
            "keccak256": "0x37ea3a5577336cd30069896ed6eded08a7518aca9b299240bfd5a7bceef4511f",
            "sha256": "0x9674b6ae7b90840178a36d965b91b877bb01d37bfa54428f1e5f1b8ef666f54b",
            "urls": [
                "bzzr://042d845611822ef27c4e0cad0e2db619a62ea8834f30f6a1f370547cb2c4d8c6",
                "dweb:/ipfs/QmR2KRdx59jNsKC3tMminGi8kvdH258jeZu5r1ayUWvdUK"
            ]
        },
        {
            "path": "soljson-v0.6.11+commit.5ef660b1.js",
            "version": "0.6.11",
            "build": "commit.5ef660b1",
            "longVersion": "0.6.11+commit.5ef660b1",
            "keccak256": "0xf0abd02c495a0b4c5c9a7ff20de8b932e11fc3066d0b754422035ecd96fcdbbc",
            "sha256": "0x9778e4a7667d5fd7632caf3ef3791d390a7cc217f94f96e919a31e3be332386a",
            "urls": [
                "bzzr://9f9244a3605543a67f5ff35f21e3d6d3331a6e1361f09b271c37f396b5b89bd5",
                "dweb:/ipfs/QmXyjgFNMyFD4fdf8wt9uvUU92MGdDVGmcPdMZhNEo1g8N"
            ]
        },
        {
            "path": "soljson-v0.6.12+commit.27d51765.js",
            "version": "0.6.12",
            "build": "commit.27d51765",
            "longVersion": "0.6.12+commit.27d51765",
            "keccak256": "0xe1412d909a0dae79b13c0066b9bf08831c522daec00b273bbc19a799af213d6a",
            "sha256": "0x3e1956c550ca48e289044c7c0bd892403081b4b5e17e77ce707c815ce6c4228f",
            "urls": [
                "bzzr://b69ab6704a1e42fddb326e91f331e35fdf071b158e8754e2c887c0e607aee7b0",
                "dweb:/ipfs/QmTs8PnAGr1ijXtWvMjoWraefAtVv2Y5ZnwkArz6NqJ93w"
            ]
        },
        {
            "path": "soljson-v0.8.0+commit.c7dfd78e.js",
            "version": "0.8.0",
            "build": "commit.c7dfd78e",
            "longVersion": "0.8.0+commit.c7dfd78e",
            "keccak256": "0x08dd57a5cf5fd59accbd5b601909ffa22d28da756b5367c29b523ff17bbc2f99",
            "sha256": "0xc596765f9b3dce486cf596ea35676f37124d54f3ada0fcbc02f094c392066a59",
            "urls": [
                "bzzr://7047ade6879aab4c825594dab0914b8ec673bb907eecc6dfbd68f63086e5a36e",
                "dweb:/ipfs/QmYh5C2rgDAx452f7HyHA8soLhnoL1GeeNNEWEuw9jKY8w"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.16+commit.2be078b4.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.16",
            "build": "commit.2be078b4",
            "longVersion": "0.8.1-nightly.2020.12.16+commit.2be078b4",
            "keccak256": "0x70ceee6ccaa25d03ef593cdfb1ed1afb6e8ad414d80d2375b79608d798420a9e",
            "sha256": "0x1572c6226d01293ab30a66b24712b7879ce4e9911c687490ca4cb994c4ce0202",
            "urls": [
                "bzzr://023996c3648cbd184530d51f4d8e2a51aff9fffd732e5c22c8b9135213f35c93",
                "dweb:/ipfs/QmRK8VrAdDpLBMSYh5as2VLTLKemmGFnTfzDaHczDtv5Af"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.17+commit.8194cbb4.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.17",
            "build": "commit.8194cbb4",
            "longVersion": "0.8.1-nightly.2020.12.17+commit.8194cbb4",
            "keccak256": "0xd23d91912eeea1dc2585febbe5a2dc43506b10001466afd40cae75e8b34e0356",
            "sha256": "0x38dadbc7793c61ea3278d4a612ed23dde2ed0eee0b9cc7c54b66f4c53d09cd26",
            "urls": [
                "bzzr://13a09ea778a916a00e7165849895c15edf6bed9783b09524796e2acd5e1d344b",
                "dweb:/ipfs/QmanNAFs888TS6cSX2jZcGocw7QXryfK5mdNFgYcUb5RLp"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.18+commit.158154ba.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.18",
            "build": "commit.158154ba",
            "longVersion": "0.8.1-nightly.2020.12.18+commit.158154ba",
            "keccak256": "0x7a69e15ed4df24455c9cc3a2372587411bc4216cce3320bd9e5d85203f312fbe",
            "sha256": "0xbd06247bd73e5b6b3b1fdffad959149ea3cd79e0f24bb76fb680413ad900fca6",
            "urls": [
                "bzzr://0dc04820914b9fffb373d0f78724ef3d3fa7cdb27fe979c73171a81a0d246032",
                "dweb:/ipfs/QmW18rF3MfGi9AvJgBeyNoPUk5YpEA8tAL8YqzppoUspCR"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.20+commit.67712d50.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.20",
            "build": "commit.67712d50",
            "longVersion": "0.8.1-nightly.2020.12.20+commit.67712d50",
            "keccak256": "0x2c5a8b07099f0548264e983189a05ae89aa28b2c922750056fb40d44d295f8c1",
            "sha256": "0xd4390eef8df7644c6ccedf6263689ac231503c30b62d27927265e61715bdeb4e",
            "urls": [
                "bzzr://a11d1462005056a55870f2fdb57a12be241c4295b1647d82598c14ef9588918c",
                "dweb:/ipfs/Qme3WLk9mzbuevQQ4gssP5QTarYPMfmYcu3ZCN7wGRKmDb"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.21+commit.b78443ac.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.21",
            "build": "commit.b78443ac",
            "longVersion": "0.8.1-nightly.2020.12.21+commit.b78443ac",
            "keccak256": "0xd0671ff67e876ae500f3fed78c966d70025c4ebe16b2b06361d0c76a29f3f5ab",
            "sha256": "0xe0b2f9f62d9e70b7167da31662a91115fafab137c7bb88adea56939deabb708e",
            "urls": [
                "bzzr://f6400db776e10afa0963209380f33e60e860aa7920ee93f86c88b4a80752cc8f",
                "dweb:/ipfs/QmQa7V9wfuFXZLxP3jQLdgKAxetJBFaVbHwrdX8NRVV3EF"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.22+commit.e299d8ba.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.22",
            "build": "commit.e299d8ba",
            "longVersion": "0.8.1-nightly.2020.12.22+commit.e299d8ba",
            "keccak256": "0x1a86189707b3cd291da6e189a6f917590c2724fe9f9036da764cc9270282ebc3",
            "sha256": "0x154727f1b0aa68459797effd51d8b953f5c8d8f7a5bf941332a422befd0536da",
            "urls": [
                "bzzr://e9c2e72f4769c55273c42e8be05eb4df88467be323938e4f7ca5d0f78a84f575",
                "dweb:/ipfs/QmPaoRFYtgx4tJ5Qi4eZBfcfDAuhUYpP4Rhb1Fb2UFQivC"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.28+commit.8e9a5a02.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.28",
            "build": "commit.8e9a5a02",
            "longVersion": "0.8.1-nightly.2020.12.28+commit.8e9a5a02",
            "keccak256": "0x9cd5bbf8c2379122f0aa696e678309cfdf2cb1dc35d1e11608517680e2f52565",
            "sha256": "0x50eaf1ba143cf4e73ad09704d8eccae7faa004a5e80ec0968adb18da31da062d",
            "urls": [
                "bzzr://9f3806387e50bd83ba1239c4b3669a9752ef3a74321c7d6dc495e47c85bd31a6",
                "dweb:/ipfs/Qmbf4Myd2q4389tWyXvPdjwfGdkp8o4Wc9vNqiV1uKqmFc"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.29+commit.86c30b4c.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.29",
            "build": "commit.86c30b4c",
            "longVersion": "0.8.1-nightly.2020.12.29+commit.86c30b4c",
            "keccak256": "0x4ecc327bcbb4b0d4ac7c8bdec6745eff2916a5721a2642b89ad5b82cb02e7cbc",
            "sha256": "0x7542ce7c992028a2ba48ca9f8d376f32d7069d1bae4390d43e88aaa7640b60e1",
            "urls": [
                "bzzr://5fcbdd2acd3e8f72244390c07ab5789354c1c0ed2819cf080e9d22cb72b9d91e",
                "dweb:/ipfs/QmUTzSnMNado2GCsUX9GPGgLteCbnA1Hsa1e9M49jhp1iZ"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2020.12.30+commit.0e32fa82.js",
            "version": "0.8.1",
            "prerelease": "nightly.2020.12.30",
            "build": "commit.0e32fa82",
            "longVersion": "0.8.1-nightly.2020.12.30+commit.0e32fa82",
            "keccak256": "0xaced83ffba034311962a8207f1080d2a0196f9e1c1ea3b2a546eb24d5daaf2a6",
            "sha256": "0xb1491b3835a041f90c4d2b1e5cc9e79231626b85259e9043fb59a6386f178419",
            "urls": [
                "bzzr://5227dcdd55fb172b782c562fca98bf3938a52e5a37cfb3ce10e5fe4829cb8316",
                "dweb:/ipfs/QmTQMyf4aWXSukGtSxqstbbi6AchzFTzZEPqhbujFDRNgb"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.4+commit.fce6d999.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.4",
            "build": "commit.fce6d999",
            "longVersion": "0.8.1-nightly.2021.1.4+commit.fce6d999",
            "keccak256": "0x39c8f0ab8581ddcbffce1127c17e315aff5217f677ee5ae570c9ac9b94b1e368",
            "sha256": "0x53f1d513bf88080a7554defb89128c0184e5b29f1859d728de8ea8fa48969a42",
            "urls": [
                "bzzr://ea4778eeac6d3a2d5a05c893b6a7645c48470bb04f70e88eee900f662b049641",
                "dweb:/ipfs/QmVUnz7EDYG9dyrpmFCCpumf5PZR7aubDAB3KUAXNVqZyz"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.6+commit.5241b7b7.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.6",
            "build": "commit.5241b7b7",
            "longVersion": "0.8.1-nightly.2021.1.6+commit.5241b7b7",
            "keccak256": "0x9b458742bfe89b73c8266acd870d41ef7ec31015e7fa277154ee750b0aca876b",
            "sha256": "0xfdde3d1261a3ee3aa3de421dd1ecf93644290eca31a3529470d5bb23920f7de8",
            "urls": [
                "bzzr://51a8079d948c5fc00e429cda6cbecdfdea2062b800a6d0ac82c387f2b4efbc3e",
                "dweb:/ipfs/Qmemt4oRPo7mmv2QeQC9YTNj49XkhZQbqD6X8iX9LdpUXn"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.7+commit.d11cf15d.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.7",
            "build": "commit.d11cf15d",
            "longVersion": "0.8.1-nightly.2021.1.7+commit.d11cf15d",
            "keccak256": "0x9468048243871673a4f1f14dcebb7801b008c5d0b0d8afca70c6f672be18aa0f",
            "sha256": "0x0eff232fd6b62547dbab53f0822a638cde4f0088cc84e04f1bb6f3fadbde67db",
            "urls": [
                "bzzr://0a0bd5b76531966993f00877d828dd10e1323a8a1e261a614e4098cb4feb2a42",
                "dweb:/ipfs/QmRNJNqkF5TKNj84Uj8uWNRpDKAaudDR9kdTMdmbvvMXXf"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.8+commit.f03245d4.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.8",
            "build": "commit.f03245d4",
            "longVersion": "0.8.1-nightly.2021.1.8+commit.f03245d4",
            "keccak256": "0x33c709821c7179e302eb3852675f77f658035f376006d8bb89446e6095d3a85f",
            "sha256": "0x67c291a511475b648ff6690b2bf5f0c4d5fb753afbe0dbf7b25e8c6167fb43f0",
            "urls": [
                "bzzr://bee9baacddf60a2750d8df7df3f986274c9fe40cd2997b9488812499c3c5a4e8",
                "dweb:/ipfs/QmVgvxaJdtR4VyqFr4Bir9NNakxWPw6QtbwNzaDK8Lnvqk"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.11+commit.67d21a87.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.11",
            "build": "commit.67d21a87",
            "longVersion": "0.8.1-nightly.2021.1.11+commit.67d21a87",
            "keccak256": "0x1a109a95d318d66b3a94b8e6862ea6d8c2bc328fd3caeabb84ade02d7baa8cda",
            "sha256": "0xf23dc4f82c9bb25402af85d76a64e024bbf821b711ce3355f7988ce11a6b5bff",
            "urls": [
                "bzzr://84de46dca6383d2351c099caa597cd4e6ec86706b1a5c37bdebacb1d50fea9dc",
                "dweb:/ipfs/QmNgAqjWFLnB6m9XD5eiNNpSBaZ7rcuW4qYVcJJhM6kVrA"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.12+commit.e9dcd4f8.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.12",
            "build": "commit.e9dcd4f8",
            "longVersion": "0.8.1-nightly.2021.1.12+commit.e9dcd4f8",
            "keccak256": "0xce0eb9d31b71c4a3e813a8f16f64c6800a8726da0d2cceab3441f469289cc391",
            "sha256": "0x39fbcceaae51ad340f176de8b8c0df307c33eeb0b44c90606df3382e90b4f557",
            "urls": [
                "bzzr://81bac30739dfbd78f5f655aae54f22a9c2769d1417d6508bc059d2c589dd891f",
                "dweb:/ipfs/Qmah5QQBR9Etsoxf3grb6M9EBjpLZbKP6eMcjbqUAbRcfd"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.13+commit.50146114.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.13",
            "build": "commit.50146114",
            "longVersion": "0.8.1-nightly.2021.1.13+commit.50146114",
            "keccak256": "0xfdb3cad26266a3363041cdaa3da618d6a50fbf6c471d009af193ebad7676f214",
            "sha256": "0xe464033385c2f112bee182d73406aea7e4bbf6d8ca4e5c45305146ae6bd26b55",
            "urls": [
                "bzzr://ac8e9be91295edcc27f95d4e0742e3619075eb8af77facd5b54e0ed824a603f3",
                "dweb:/ipfs/QmPxv2qtoyfShD7PZNKo8Ktsebbt1DE2w3VqGbwax4YfPZ"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.14+commit.eaf7d7da.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.14",
            "build": "commit.eaf7d7da",
            "longVersion": "0.8.1-nightly.2021.1.14+commit.eaf7d7da",
            "keccak256": "0x619c6c9f1e15e7002b1659df0f6b8f7c662201d0577fc9d7f47f2e869b1c96a6",
            "sha256": "0xd9a6dabe5d94ade9bb17219f4027caa0d37545339b75e0f1dd322b4678cacd2c",
            "urls": [
                "bzzr://db308a6a36ed86b1dbe0e983683356ef1fb5634be0d7b2830724739be887128a",
                "dweb:/ipfs/Qmdox4sPh3jtM748SUHK8zTATDYgnicyZvsdmXrq5eTmWz"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.15+commit.055c4b4d.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.15",
            "build": "commit.055c4b4d",
            "longVersion": "0.8.1-nightly.2021.1.15+commit.055c4b4d",
            "keccak256": "0x65565109d6bca3f4d84f558f4fe8b8222a30585aca5f44d2e188c366a6149a14",
            "sha256": "0xc57d016d163aedc1f621f14a9214a81c593f06ac048c4522846a9b630d724ca4",
            "urls": [
                "bzzr://66066b4140bd370cc1a9e035fecb92feea1eba0a6885848274133a50eb728dde",
                "dweb:/ipfs/QmRz4cpWWAZyFY53UFL1GMWSmPBRSmqNivasGV38RGu83P"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.18+commit.957e9995.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.18",
            "build": "commit.957e9995",
            "longVersion": "0.8.1-nightly.2021.1.18+commit.957e9995",
            "keccak256": "0x5d37fc8aa3218867a00f508a2f23e974c8bdaf0e3afb2caa3cbd6e241781357c",
            "sha256": "0x4ee86b327eed351b6c16b0f41b732e2ded3b395d7ac8d39fd5a6230aa172502c",
            "urls": [
                "bzzr://72494d0eada60f5141bfbe481b13cdfc1dea04fe469787150b9bd09bcc55bb70",
                "dweb:/ipfs/QmQDwCSdEMKH8NXvb59uWnJiRquuLabmGcuzhpiZ4kufhn"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.19+commit.1df28473.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.19",
            "build": "commit.1df28473",
            "longVersion": "0.8.1-nightly.2021.1.19+commit.1df28473",
            "keccak256": "0xaba9da05a6367d3b7684bd833364a529fce32116f1d66911a2f8aae6218278fd",
            "sha256": "0xd6b2595fdfc48fd2b4ebd1a131f7a6ca89737800b94a6ff15a5be5052bf43d95",
            "urls": [
                "bzzr://fdc377e9e5cdbc3907a0e99be0f425c7f4ac2232dd71518c767d914aa75167ce",
                "dweb:/ipfs/QmRvFeh28VQ35vG6JK2jKUSsfQkLj6qxJ8Lycq97dDDr98"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.20+commit.a75b87c8.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.20",
            "build": "commit.a75b87c8",
            "longVersion": "0.8.1-nightly.2021.1.20+commit.a75b87c8",
            "keccak256": "0xb345314abc628e5974d81eaef6c95191412407825066940b6a69ed10e3aa9136",
            "sha256": "0x71703fba5d77a9684b5dbdd1e46e9a74ff4c393905dea96de27acea6aa4fe2ab",
            "urls": [
                "bzzr://37828ccdf73f308a7cd82a38b136e1fe35d49ff5c9176e86bae749da092979e5",
                "dweb:/ipfs/QmRGJaH6vJxPuvcmDrtna1acWmfFZJgT2kqYzd7WNVnArH"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.21+commit.3045770a.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.21",
            "build": "commit.3045770a",
            "longVersion": "0.8.1-nightly.2021.1.21+commit.3045770a",
            "keccak256": "0x6d5355f30911dddf7db98cfcc0a5fb250212fd4921ed8bd66aa5bd598d83e7ed",
            "sha256": "0x0b928c9325ba1737aeaa921eee88ed7e2a655c888e7bc8809f07109e30f5b8fb",
            "urls": [
                "bzzr://039fb575016abed8ed75fefa0298a88fa98a372a313a60af3c019cfde1dca8b9",
                "dweb:/ipfs/QmT8jnt3hZN5vhdkuFKeSQw7VQNevXtiXmXMooGdWwgo1E"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.22+commit.8a844237.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.22",
            "build": "commit.8a844237",
            "longVersion": "0.8.1-nightly.2021.1.22+commit.8a844237",
            "keccak256": "0x56b598fad3189508235538759b9dff762b5d7f69c2b50df7dca4b2ee8fefc8fd",
            "sha256": "0x585101f0ec518e79dd31d580bda799ead0035d7fe2407d85e7bbc9e08886c814",
            "urls": [
                "bzzr://35db4cd2df9d4ff6bc1a00fb208829f19441cef5505adb557663cb6afd98108c",
                "dweb:/ipfs/QmdgqbWwLGvUdEUgzJDNUjCSBHBoi34gwdbqx6iKmXvgTP"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.25+commit.ccdf57c9.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.25",
            "build": "commit.ccdf57c9",
            "longVersion": "0.8.1-nightly.2021.1.25+commit.ccdf57c9",
            "keccak256": "0x0dddf74964327a2707f3be5b549800399470959eb8bfc9db42c90721045ec1a1",
            "sha256": "0xa078f03c9467d7d910653a2e88c7116c6ba9edc23635a7629531b12e277ef621",
            "urls": [
                "bzzr://d68e2bc8fcf21d3041583dcd0934acb9307147b1f6286c783b2a86edc33fecde",
                "dweb:/ipfs/QmbBLFSzwkfSUVQ1jHHpBYNrUeqEDJMj7CBTtyiR5RfLmX"
            ]
        },
        {
            "path": "soljson-v0.8.1-nightly.2021.1.27+commit.34fa756f.js",
            "version": "0.8.1",
            "prerelease": "nightly.2021.1.27",
            "build": "commit.34fa756f",
            "longVersion": "0.8.1-nightly.2021.1.27+commit.34fa756f",
            "keccak256": "0xb40b0f08285513bc1281fba3b01a9f4c2c491131c823c52b79af1457282e536d",
            "sha256": "0x7c9cf4847c4847de40ad7a4bdb30722fcb5caf0fc129c44b7eea284c221ed5ff",
            "urls": [
                "bzzr://eeb2ec519634ffca9273065a51bf4c6cfdea80e046c3b38b2f420aa03d8aac63",
                "dweb:/ipfs/QmQMgFGCCT9YzrgXgKdqrC3AgtP7sYnuA3shHCoN25BybC"
            ]
        },
        {
            "path": "soljson-v0.8.1+commit.df193b15.js",
            "version": "0.8.1",
            "build": "commit.df193b15",
            "longVersion": "0.8.1+commit.df193b15",
            "keccak256": "0x84a0e9282047512eeec499d55c83dbb6981430b08692d81d6c09730bb18e6cd8",
            "sha256": "0xf77f141e5fed9594b28342e2c630ac6d48f2a724e4383a457881acd7fa62b1cf",
            "urls": [
                "bzzr://da8c5ea3f2ecd33d3f83ac2c276871f4ee41370fb55ae62c6c29835c9376bdec",
                "dweb:/ipfs/QmQ6W5VedQpZAwuGTtp1BhmNkvVheLnJq4xwN9Qmt9bAbH"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.1.27+commit.49dbcba3.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.1.27",
            "build": "commit.49dbcba3",
            "longVersion": "0.8.2-nightly.2021.1.27+commit.49dbcba3",
            "keccak256": "0xdb4babcdd1ab9aee67f25b5131173ac3eeef5348a7f98b4b29d04e4708e12b18",
            "sha256": "0xc4713a920a053a1071b09443445de6c1f21ed001391c65210ce5a4d9e1d365a9",
            "urls": [
                "bzzr://4fc02782efad80edc8391bb609c040fbb8407f60ff3d201c4f9fd2572739f111",
                "dweb:/ipfs/QmemiCtQbk4yW5u82gC1J11Hwip5nM5LGsWpbaztyJoTMj"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.1.28+commit.70882cc4.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.1.28",
            "build": "commit.70882cc4",
            "longVersion": "0.8.2-nightly.2021.1.28+commit.70882cc4",
            "keccak256": "0x8af93b2b1cdf1a70a5b0a1d95aae4243bfa73266bb3344d71f85a9d4cc5d0012",
            "sha256": "0x3b6cc04db183199d04c86d1452c19811b29a9f9ba300980d95c3d34eb23d3e42",
            "urls": [
                "bzzr://96f485dee27e87180b9ad4b0d3853e2ef20b8f0c1dd5052a9157f0b78824762a",
                "dweb:/ipfs/QmeWH3gMLANFWi4GL7NpRcqWrwkjT7bNGMM976Ho2cZaxm"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.1+commit.dde6353c.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.1",
            "build": "commit.dde6353c",
            "longVersion": "0.8.2-nightly.2021.2.1+commit.dde6353c",
            "keccak256": "0xaabee60ec190b2afb3f85760cf9339e05d470988812a21e1a38937e39802ba43",
            "sha256": "0x5de715bf9208ead746d765ebee6e179af374521e19d1bcd3f71dc88acb6c86f7",
            "urls": [
                "bzzr://f73dbfce3c101a8318523818f382395fa51209def59a25384325ce7803d99ae8",
                "dweb:/ipfs/QmezwLqqCw1rKDe3EpWwK4gfqrzdC7Q8d8uBi5Cdujfuii"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.2+commit.358324ed.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.2",
            "build": "commit.358324ed",
            "longVersion": "0.8.2-nightly.2021.2.2+commit.358324ed",
            "keccak256": "0x6cebc9bccfadcebc24c0eb72d30d8325f37e544175d8a70a5ca7ca5f4dbb8f5b",
            "sha256": "0xf912b8cb0285ae75a6ff10672a73727f9c291acf74d1e47b804edd072796016f",
            "urls": [
                "bzzr://b460c28306dc1fae66b0c4f64cb00a244e18a42a7c0c5aa4656a92708d4bee0d",
                "dweb:/ipfs/QmaL7k7QTDbFdzTf4ikQ4itP71gYXTk3sUNVXEwHdJvqus"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.3+commit.1a949e53.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.3",
            "build": "commit.1a949e53",
            "longVersion": "0.8.2-nightly.2021.2.3+commit.1a949e53",
            "keccak256": "0xf147e0f7a54b46bdf0bd21af35d0ed8a6387edc7cc024270770509556f83cced",
            "sha256": "0xe22d1d50013d3675ab35bd5fdb7b61e76f33c5936247a44037db82297a0f1703",
            "urls": [
                "bzzr://c55cb959cd70233cde34b09da913ce408c1b3b6b661938ceb58417001e4339ad",
                "dweb:/ipfs/QmWPRhBLzmkCgWbsSwLumnnXwec16WkHnzp1d3RcWJr8yT"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.4+commit.2fb27884.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.4",
            "build": "commit.2fb27884",
            "longVersion": "0.8.2-nightly.2021.2.4+commit.2fb27884",
            "keccak256": "0x835d288ae6949349a68098116cd5ba7cf9f99385ba89006b569f8f044600be2e",
            "sha256": "0x35e5fcfba2d8a54da4384d1606830d72588e5d46d69f77f8a17e187549396f1c",
            "urls": [
                "bzzr://ac64537d392db4a08811c55999d2d5049b9fa43b1dc48823609d5c106cc817d4",
                "dweb:/ipfs/Qmf82LyKuS4DaWGxW69MYX2bmGxGQ8KiGB2r7Cg136Dx76"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.8+commit.ec62d123.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.8",
            "build": "commit.ec62d123",
            "longVersion": "0.8.2-nightly.2021.2.8+commit.ec62d123",
            "keccak256": "0x72fb2d3793e0327ffba901701364571218a0569dc37466af686fe8456ac3955e",
            "sha256": "0xeba42283055d4af946ef3b0425ee6977a590845660cea25864c7a3e75c8826bd",
            "urls": [
                "bzzr://08439437e3a07af29295c2b4a69915cb222ea307e3a28553b4144b41ca92dca2",
                "dweb:/ipfs/QmViSJWoxs9qYqFWE6oRpDFwACLfon9s9e5pM18zMXZ4L7"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.9+commit.9b20c984.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.9",
            "build": "commit.9b20c984",
            "longVersion": "0.8.2-nightly.2021.2.9+commit.9b20c984",
            "keccak256": "0xff0e1455e5c55ce42c0dcca06d71487738262baf311880c702ffb6194fd21d43",
            "sha256": "0x6e1741e1b9817a5180a06d3500d2bbbaadcc86168cb678f4dadbb7cff44a0fa3",
            "urls": [
                "bzzr://ff8aea1515410668c6732cf86cefff6ce1d8cae3922f041677abae98cfbebc40",
                "dweb:/ipfs/QmPiEAamzXxX8Eu5NbxhzRWPjdAxsmjtJaJsM2aHhyfw8q"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.10+commit.215233d5.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.10",
            "build": "commit.215233d5",
            "longVersion": "0.8.2-nightly.2021.2.10+commit.215233d5",
            "keccak256": "0x6d4950176dfeb8e610d5e1c254bfc90dacee17ab4d6fe1fec75e1f82308f7bfe",
            "sha256": "0xc10b9612ca1e8a9faaa1ff1a024ce84716bb39ffb372cc680657dd7edc352a7a",
            "urls": [
                "bzzr://f240e4cc03f78f61551aeb1304975007c5e623aa4a6e20736bd3585688b63b6f",
                "dweb:/ipfs/QmVB5VAm4ti8FMbAnsRr1krM3xjdbsM54sVhv5WW9NXb7H"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.11+commit.003701f6.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.11",
            "build": "commit.003701f6",
            "longVersion": "0.8.2-nightly.2021.2.11+commit.003701f6",
            "keccak256": "0x812557544d6f3182f0129526fe850dd7730a34ed907f1d617582384c6cba1768",
            "sha256": "0x05569271c11cc1469a8cfd60fdd447afeffccc824bffdd90eab31f13e9b4a20a",
            "urls": [
                "bzzr://1528c6ecc12408fee306b427842f234183942dacecb6a4c413ed1d9409cd97bf",
                "dweb:/ipfs/QmSACBzUqDUFB4Tdua9a5XUB2Vsv2c5BhB3Jbk7RN2QNVB"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.12+commit.b385b41f.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.12",
            "build": "commit.b385b41f",
            "longVersion": "0.8.2-nightly.2021.2.12+commit.b385b41f",
            "keccak256": "0xcc7bde32fcfe5ef94e3943a92d5d727791efab2f4d1da228f0abcc72f04ac4d7",
            "sha256": "0xb72470718b0832e01b725f137b890ce72df204e58d17db3f20cda032d109661e",
            "urls": [
                "bzzr://32e08343a47d12362182ed3c00f15c9162cf1d87fbfa02d28397ba8c00d38e10",
                "dweb:/ipfs/QmZupwbDR9ZQZ3gZUbGbG6QXCSuYgvF65wEUdygAZg4Vdr"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.18+commit.5c6633f9.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.18",
            "build": "commit.5c6633f9",
            "longVersion": "0.8.2-nightly.2021.2.18+commit.5c6633f9",
            "keccak256": "0x338197f498e020c26c0f6ea7d35bfdaa14efd818ada76d4f026c2871e7c0cdc0",
            "sha256": "0x13dfa1ffc3ef6dcf4aa8507d10d25d260d9a1ac5799de599e445b9fb64ab3ee9",
            "urls": [
                "bzzr://87b5b01f6b9ab91abdadc5669dc0e4b2262cddf048d09fd269b0fa07265691ed",
                "dweb:/ipfs/QmS2ZHuXE7Qrn21i7siwAQc7rKa1Txad8nWVyL8qTTdy6S"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.19+commit.6fd5ea01.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.19",
            "build": "commit.6fd5ea01",
            "longVersion": "0.8.2-nightly.2021.2.19+commit.6fd5ea01",
            "keccak256": "0xa832f842a843a2e896e985f01ca088c6b39ea9a8d56a460e5aa25c429034d829",
            "sha256": "0x6ba8e04a5d1827cff4d8ecb72f1a6e490ceaa1d3fb683da15d0b8dc2db9abc70",
            "urls": [
                "bzzr://1f062cfdb574ce6b590fbd1c6fd0f2c9af05bd290cf4a66abbccabafc4a45e6c",
                "dweb:/ipfs/QmUkfiivYLGfSWzZrjHDWnm5tgvUyG7cTdc3bioPDSSrUt"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.22+commit.e75e3fc2.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.22",
            "build": "commit.e75e3fc2",
            "longVersion": "0.8.2-nightly.2021.2.22+commit.e75e3fc2",
            "keccak256": "0x89e3aae91edd6c888aab05b35230432e33ff9dd51ec9ee56a7a1049a80d06637",
            "sha256": "0x1af94fc436400f4392cca7bb23e22507c7847710d0737c5c6a3cc8bc2689321e",
            "urls": [
                "bzzr://ebda984e825fa497477049407f14ed2791cff26a60ca941b75aba8eaaf9108fe",
                "dweb:/ipfs/QmcworY6nD9k1i9NCF9vgenumqBiHpLz1cGiBTqjmt9fXy"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.23+commit.1220d8df.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.23",
            "build": "commit.1220d8df",
            "longVersion": "0.8.2-nightly.2021.2.23+commit.1220d8df",
            "keccak256": "0x61402e62e2a65bf70d576ccf501408ac85ebaff2ca4677c19025e14868eb4f22",
            "sha256": "0x8eb7b2b211a298125cb9869209a954be47450a503c6efbdd64246db27cb56d30",
            "urls": [
                "bzzr://77f44350423b658c3925c7301ed1fe96b5ffbccef8d18d2829832ef1ba2de787",
                "dweb:/ipfs/QmXdvHTA47kZkUVvzcZLMUBTvdWoscLkr6AiTUvD9mRKC9"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.24+commit.eacf7c1c.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.24",
            "build": "commit.eacf7c1c",
            "longVersion": "0.8.2-nightly.2021.2.24+commit.eacf7c1c",
            "keccak256": "0x04d3c482b0129798ad2656560f3f794f57f83db77ef72f296e9614ae4c676c2d",
            "sha256": "0xd329a60c3be6faa6de5536e10d89d58717f176662255231ac02b66542b48b37f",
            "urls": [
                "bzzr://d2d6533605648047a3b0063e456e43b5f40654f3b8062f160aa45bb9ee1a8a0d",
                "dweb:/ipfs/QmbQKWJTSA2KuE4AXzDEob1p9VbkAsLnQjf9HUAoAebife"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.2.25+commit.44493ad4.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.2.25",
            "build": "commit.44493ad4",
            "longVersion": "0.8.2-nightly.2021.2.25+commit.44493ad4",
            "keccak256": "0x63e14f38181a4d7798945f48b0e4558f31800f1e1b22b4e46ef7899d1d2376c9",
            "sha256": "0xd2c6d2e2e973ff261560918d5ed2ebc2fc56c373bcff6ac7344303e354261ef1",
            "urls": [
                "bzzr://309233f67b2bafcaf6ac20ac4402a39241c91a309d6eac3b9d7c2da55c6531a6",
                "dweb:/ipfs/QmetymiZQze9BfYPaBmQ7JEADwN6gGFDEktoJw1qaUvH2U"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.3.1+commit.ad48b713.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.3.1",
            "build": "commit.ad48b713",
            "longVersion": "0.8.2-nightly.2021.3.1+commit.ad48b713",
            "keccak256": "0x7a3ecf926e850b22367ee0f01d15ca95b4708df20c6726fd356dbdcfd4866c44",
            "sha256": "0xed3813f876cef5ecd311f5a096c782a570300f2f167fc186a4496cbcc85a2b6d",
            "urls": [
                "bzzr://0ee8cb22e37dae65fc624c704de97071866ae839a5c7eed73f91468a04416e58",
                "dweb:/ipfs/QmR6kUEnDsiMcteHDA3mKz7vMP2qv4pkfQDTSxz1rpTvNn"
            ]
        },
        {
            "path": "soljson-v0.8.2-nightly.2021.3.2+commit.661d1103.js",
            "version": "0.8.2",
            "prerelease": "nightly.2021.3.2",
            "build": "commit.661d1103",
            "longVersion": "0.8.2-nightly.2021.3.2+commit.661d1103",
            "keccak256": "0xbb0a0d54e384ef1565b2ffb23468056c833c0f33d793e98c6d6c41a20eba1502",
            "sha256": "0x3e2007f4f9453c58b3eec0e1af4db19a4ee47d8336ad2ac18301c8e9db5cd7c2",
            "urls": [
                "bzzr://24619759385b2f2437e64a3ed66e7567b35c76c8cc76e9ce0dabc5fc580e728c",
                "dweb:/ipfs/QmXk52Y7SWWHNKgGfSde3Sdk7VDeTNZnb1trTUbZeuNKC7"
            ]
        },
        {
            "path": "soljson-v0.8.2+commit.661d1103.js",
            "version": "0.8.2",
            "build": "commit.661d1103",
            "longVersion": "0.8.2+commit.661d1103",
            "keccak256": "0xd0c15275c5b0d03871332719def9b0f17e8860c7db60e0e71f18b971458a7391",
            "sha256": "0x015e83fb0b72ccdafb0c217961b21a0321adb2d3f2ad992f5e79635c2086e6dd",
            "urls": [
                "bzzr://629ae5ad84c45c248144b5eec7827a9cd5b2f2779ef84ab251c8cd876347a098",
                "dweb:/ipfs/QmdfVfa2mhyosaJVeV7rbfnvQ95GTHPeRPzmvxcds7RYej"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.3+commit.be564773.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.3",
            "build": "commit.be564773",
            "longVersion": "0.8.3-nightly.2021.3.3+commit.be564773",
            "keccak256": "0x1756f4ac574102e819c515381494d3dae92e3cbe755575dea6e732e2be882c7d",
            "sha256": "0xa204e1c3d457e664e966023f66912c9f29df9f191b5e7a71010f6890d9ed1130",
            "urls": [
                "bzzr://90235e6ae95882af33de965dc75e35e6b33285e94c700578928921551ee15d10",
                "dweb:/ipfs/QmYsgowyLTweSj3zyNfHW4MQEKxG4kV1U5yUswwm2KZx1f"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.4+commit.08df163a.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.4",
            "build": "commit.08df163a",
            "longVersion": "0.8.3-nightly.2021.3.4+commit.08df163a",
            "keccak256": "0x8c1a3464df1dbad1d2fcfe0983ddf97b81ddf14ebe18c97000d87e501039769e",
            "sha256": "0x2604149b4ce94d79e7d64bfda690d8f2c237b9433b3319841df4e77249805518",
            "urls": [
                "bzzr://b0437b90c90dbcdafd7a760f2717d2f7fde4854c9d7384ee1897845bdb6299d1",
                "dweb:/ipfs/QmVnR1ya9DgqjWFdnij7GNQdm1th8zsQe9rKHHmEbD3XZA"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.5+commit.093ea461.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.5",
            "build": "commit.093ea461",
            "longVersion": "0.8.3-nightly.2021.3.5+commit.093ea461",
            "keccak256": "0x0d0427e9f23df17aecd8f093a85ba3628013c94540acd5d5b70e2957d672d693",
            "sha256": "0xa6ee3e4d735f665b7eefb46d5645edd22ee91ee51b74b2a8c23438feca41d709",
            "urls": [
                "bzzr://82a6f35139c920678c72f883188adbd5dc6cd35556f683942dfd642a336f7580",
                "dweb:/ipfs/QmdByR1HL5oxLBoABk7y3E6Ge2bt8QEuTpVN4M2KDktNUN"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.9+commit.ad5d34df.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.9",
            "build": "commit.ad5d34df",
            "longVersion": "0.8.3-nightly.2021.3.9+commit.ad5d34df",
            "keccak256": "0x9c7a7db38a46a0d9c16000569db064b8758966feed7dfe175352cd94fc0b3411",
            "sha256": "0x6174d5939034f5c8a1ba8d843a957e56c2acc54f5cc6f20539b576db2880ed5c",
            "urls": [
                "bzzr://88885af7123ecf985cb185ae4bdec92c8ebf4a3e12eab993b3b471fc1993b570",
                "dweb:/ipfs/Qmf16BVtpLoVwc5WG97dZWs5873v2Npyw7WyCBPP8b4d2M"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.10+commit.23f03e1b.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.10",
            "build": "commit.23f03e1b",
            "longVersion": "0.8.3-nightly.2021.3.10+commit.23f03e1b",
            "keccak256": "0xc80718b0e0cb26a978c0eb0e0a3685d00efdb8517e531c97b5e286df8207d9cd",
            "sha256": "0x09dfdc842940c31fbb87d512d48fb36cbec374a3aaddc1f527e05e29288838a7",
            "urls": [
                "bzzr://4011a6d13b2502f5303d022c8e398a03467579ad6388ac745d4dca89d30627c0",
                "dweb:/ipfs/QmXP8jyNcXqK5hYwkNo8Nvk3pxfCrPkrs7hqydH3qppZWF"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.11+commit.0e22d0bd.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.11",
            "build": "commit.0e22d0bd",
            "longVersion": "0.8.3-nightly.2021.3.11+commit.0e22d0bd",
            "keccak256": "0x9d422954e49d0523c6403592fae5f81cc8c42c6e0aa00d22b27e6a981e5f17a5",
            "sha256": "0xc668187419edda1bf0debd1c328a0b535611e627109397e48f49fb0ddfe028b5",
            "urls": [
                "bzzr://64d18cd0fb8bf0faa31808305ec5feb716f1f0d5602032f7e0f45fe4511b3e2d",
                "dweb:/ipfs/QmXnYgrJSFPQrUPd9eWimxWDp21AYcyKGCnAG5Q3AjXsdX"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.12+commit.ccd9de13.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.12",
            "build": "commit.ccd9de13",
            "longVersion": "0.8.3-nightly.2021.3.12+commit.ccd9de13",
            "keccak256": "0x5d7be3b2ca09f235e7db92bff22edd4e4127e135b69aeac8afa43add8c70d820",
            "sha256": "0x7f982b06bcc3f79e8548db11dd62dba03806b7a9f743bc076846944d38844357",
            "urls": [
                "bzzr://5a32b7e6e52aff66226e3ebb4a9a4e5f0b68c09f5a118b05e5a3fd3eb232077e",
                "dweb:/ipfs/QmXQqP3Csxu2SWFejrJEHAc7GobXBgKokhSapw8y6CFd4V"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.15+commit.ae1b321a.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.15",
            "build": "commit.ae1b321a",
            "longVersion": "0.8.3-nightly.2021.3.15+commit.ae1b321a",
            "keccak256": "0xc635c2a60f8e57017d0ee7ca0e1d17a7c823792d2d8862e8d6d974c3f22da4a0",
            "sha256": "0x401c758c0c09624c7cd89dbd27180ef20814a24c2f3a2f055e232e402aabebd5",
            "urls": [
                "bzzr://483b33c81c8bb4eeeb78275a8fed9330b43656490749a21d084fcd11ab37f9ca",
                "dweb:/ipfs/QmPvoFnzC54Sm6Rud18PJezkK61PtXFPYwZCTYD9NCYjc1"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.16+commit.35da404c.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.16",
            "build": "commit.35da404c",
            "longVersion": "0.8.3-nightly.2021.3.16+commit.35da404c",
            "keccak256": "0x2f2e0849b6d7aa05f43f4cb3188971fca2d2297c56e195fc441eca8c7c961c42",
            "sha256": "0xde8ef4500a9f8fee34d3d76113cfb9b1cd43a278bae1ec0b75a1c16e752e43c0",
            "urls": [
                "bzzr://525a81cea60033f3f4ae7bad1ca01475da653c994c9fc168ee47d58cde958ccf",
                "dweb:/ipfs/QmWwMutZzPwrUJ1KMDr2yrxeE7amRT7X6WFARoK5xR5zZH"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.17+commit.e179d0aa.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.17",
            "build": "commit.e179d0aa",
            "longVersion": "0.8.3-nightly.2021.3.17+commit.e179d0aa",
            "keccak256": "0x6fd5679a082c8ce7b12de084e51e3659b534a05f79684ee70c200a885776842f",
            "sha256": "0x29d0bd45994f99b031d9c565108f7a4bda0e2601e72c8bed707a2007432cbe14",
            "urls": [
                "bzzr://4c68494d65c3862b818d48cec1e74ab82adde25097fc35c4b13a987b08c19efd",
                "dweb:/ipfs/QmbqPkbPh9BtYbgp2fnntZHW9fmE1dZ6ZefcbyQm4ZZMay"
            ]
        },
        {
            "path": "soljson-v0.8.3-nightly.2021.3.22+commit.54cea090.js",
            "version": "0.8.3",
            "prerelease": "nightly.2021.3.22",
            "build": "commit.54cea090",
            "longVersion": "0.8.3-nightly.2021.3.22+commit.54cea090",
            "keccak256": "0x3d8680bae12b8c196424d917e26c7c4b059c6d4505f66e2f3589730edbd0e1f1",
            "sha256": "0x973b2542ac42f1a34e5028198cfe6695687e92d280b027dda2a9635b392f6f11",
            "urls": [
                "bzzr://56911ca47c26f38b8e3768442f58e59110a672a28169eaba04b218378bc6c4f7",
                "dweb:/ipfs/QmNagRdFNdB3KTL42u6FZuGc7hZxpasrKCUs4fJh3Hw6vX"
            ]
        },
        {
            "path": "soljson-v0.8.3+commit.8d00100c.js",
            "version": "0.8.3",
            "build": "commit.8d00100c",
            "longVersion": "0.8.3+commit.8d00100c",
            "keccak256": "0x51777116af58223a41aa3016d0bf733bbb0f78ad9ba4bcc36487eba175f65015",
            "sha256": "0xb5cedfa8de5f9421fbdaccf9fd5038652c2632344b3b68e5278de81e9aeac210",
            "urls": [
                "bzzr://c7d43da1bc5529d2cc311e00579c36dcff258c42b8ed240b6c4e97bd85492a64",
                "dweb:/ipfs/QmWbNMzJryhiZmyifLDQteGPwN4aTgXQB6barBvXYVw975"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.3.24+commit.6eac77ae.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.3.24",
            "build": "commit.6eac77ae",
            "longVersion": "0.8.4-nightly.2021.3.24+commit.6eac77ae",
            "keccak256": "0xf6cf9ea56f89794a2068113bb7346f9d8e2f17f673d6f106460925ad2a2d1104",
            "sha256": "0x2651c1f52344980e359ab8cae8e5dd7c2e326ae125736eaab0a955f29080dff4",
            "urls": [
                "bzzr://1f263c015ffb81a41d71a1708061cf72f343262b4a0997decdbb8a4c1182ac71",
                "dweb:/ipfs/QmRhMyy5qRcGYzSJV5CTnJDUhdLoA6tHDFbPFDUcSsnGA3"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.3.25+commit.d75a132f.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.3.25",
            "build": "commit.d75a132f",
            "longVersion": "0.8.4-nightly.2021.3.25+commit.d75a132f",
            "keccak256": "0x4557c6939ad9978c713dfc9a8ec0d830871ec1c6f894b7d6e22c14f2a9038bc5",
            "sha256": "0xeb398188f7964943a184cff20f3ede305c6014624170dd484c2af666325e3866",
            "urls": [
                "bzzr://342eec265ca1dfefd42a59c5cd7a41686b63d124232c278b019e82da111c87a8",
                "dweb:/ipfs/QmWWmu2pSXRZWGbyN3aMaSe9L1oZEFVbT4LrgVKukuJ9ae"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.3.26+commit.c37bf893.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.3.26",
            "build": "commit.c37bf893",
            "longVersion": "0.8.4-nightly.2021.3.26+commit.c37bf893",
            "keccak256": "0xe27b1e15a244d18042900182d758d0fd7b210b24f6b8212a584eea42a0249112",
            "sha256": "0x32962f332495c7137a2b5b208e97640194dbb5a9e8c7625fc6bf50e196cd1da3",
            "urls": [
                "bzzr://9a8391015bbc88f30cc60cb412dbe8681518ab1b22714d90fe547131577cb572",
                "dweb:/ipfs/Qmcoa7gU68cBVK3WA5JTbZLix9sHwYTA7VqcZXUoMXoBgK"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.3.29+commit.2346ec1c.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.3.29",
            "build": "commit.2346ec1c",
            "longVersion": "0.8.4-nightly.2021.3.29+commit.2346ec1c",
            "keccak256": "0xc0e1141aaad2714b8a06ce3f278e67317b5e3106c4a2f1795b4b6169588e6eb6",
            "sha256": "0x76dbf64c2399d23bf9e2ff39d228156f9eb8ba78ae7c4c618558db80196ac8a2",
            "urls": [
                "bzzr://03d775c4c0648463529e47078edbdbcafd9fe7e56c18be36d04aa05484216752",
                "dweb:/ipfs/QmQG2ZcT54mNhHcXYoBtNWD7g61LTbLzhx5f8qPxNe2NY2"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.3.30+commit.851051c6.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.3.30",
            "build": "commit.851051c6",
            "longVersion": "0.8.4-nightly.2021.3.30+commit.851051c6",
            "keccak256": "0xdd08bb1e140a2260b64d3e38e0cef0f7e306ae6ea6caf1c2d8ece613773dd200",
            "sha256": "0x3e4c8662a38767cba15555bff326899eed197c8000d616082968a43e9829fad6",
            "urls": [
                "bzzr://1aa79ce3900611d7f28999713c9f9392e4099b69f9cf0fd9ec59c4413440549e",
                "dweb:/ipfs/QmXKhKhyB2DQVfYrNuNkHF5Ci571wze8KJSN3VMpbLy2VB"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.3.31+commit.b2555eac.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.3.31",
            "build": "commit.b2555eac",
            "longVersion": "0.8.4-nightly.2021.3.31+commit.b2555eac",
            "keccak256": "0x6244b189110fd55587ae8386fe83c67695cfa57991d7b33fe5c6cacd3ea46632",
            "sha256": "0x3fb7f3d1dc71ee86fcdadb03797ae79daf064a2efe321ff064524a7587fd01d5",
            "urls": [
                "bzzr://3594b937b6f1e0c5e771a4e0c895752759b6a4a94639062ebb776eab49a02900",
                "dweb:/ipfs/QmXaa5wgiqSdpFScbXAtSWssJEbSQLiioyjmsx72FNiwrs"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.1+commit.5433a640.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.1",
            "build": "commit.5433a640",
            "longVersion": "0.8.4-nightly.2021.4.1+commit.5433a640",
            "keccak256": "0x6691e13020527719f8ed9c0f198fb3fe5d3b75d4730b51178308780b3b1106bc",
            "sha256": "0x82e20b97cfdb62338d4ce7d0ca3242c818ac5450a660d52b0c0d80aeb0447580",
            "urls": [
                "bzzr://de54f60110259f82484e0232c57e9b4b0cb27fbf2a201ce75bb7fec292282229",
                "dweb:/ipfs/QmcxcUQGKJbBUwVTENVLhV8CnYJBLdYqzeJQRNzDqoF2n1"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.6+commit.a5cae64a.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.6",
            "build": "commit.a5cae64a",
            "longVersion": "0.8.4-nightly.2021.4.6+commit.a5cae64a",
            "keccak256": "0x8cad3125db54c9096845a8d4a629b9e010eb4baba537f5bfe4970a5127cac426",
            "sha256": "0x1752dae94621f8f3977d2461eead9d0c009e63e3215b8ee975782a7ccb44298d",
            "urls": [
                "bzzr://ed83995456ab1306189dc5b787f710545dc635615ebedcb328bffd36c8a6aec3",
                "dweb:/ipfs/QmWcYiJCiv99f5d4jFWQDVkYQbQZAFvpNUjD9Mn6KL3DYr"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.8+commit.124db22f.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.8",
            "build": "commit.124db22f",
            "longVersion": "0.8.4-nightly.2021.4.8+commit.124db22f",
            "keccak256": "0xc111e452242404f40394055ae96a00a590b30ffb224434fd80a60543114df850",
            "sha256": "0x1ea13152e79b21986f99471103905ef54f93dae2a64ceaffe6847ccfe9b2398b",
            "urls": [
                "bzzr://60a25a588eb4464211f0cedf9b16e8298bf218514ef338c8e45aad97aeb3faea",
                "dweb:/ipfs/QmQEJ1dsHr81FxxZpZogeJLTqVPkSbuVAwk7nYaNwjQQzg"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.12+commit.0289994d.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.12",
            "build": "commit.0289994d",
            "longVersion": "0.8.4-nightly.2021.4.12+commit.0289994d",
            "keccak256": "0x719e9d6ea8d77dd82c8cbf9a4d68e543e4d12395c536946b65793b7205fdd6aa",
            "sha256": "0xc913f11127f168264e1349912123f0ee38e4c268ce241cb89b53536cf0728806",
            "urls": [
                "bzzr://670b43896fa1841c72e292ec74a33a20aba4294986b29c88e3ac5826a0332e92",
                "dweb:/ipfs/QmUC8jVSaU3g5DaKoxtMXf4SJfTrqdniGXDUc8y66o9Nib"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.13+commit.f188f3d9.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.13",
            "build": "commit.f188f3d9",
            "longVersion": "0.8.4-nightly.2021.4.13+commit.f188f3d9",
            "keccak256": "0x16fca9b9e10bdbb5fa5fbbb7a8925bc0f8ade91fb9ac4c3fc733b54c35f8ffdb",
            "sha256": "0xfff7c1692dbefc4c9cd72fe8b9396876ba00af926f5c717f23cd93dcdaa7e7a4",
            "urls": [
                "bzzr://9eb1b6b0e5be45befe8bfe083b37f3a4c7f28f1ec09e50aa6b1b3d7469c439c5",
                "dweb:/ipfs/QmeJ1QivuBgYMUyutt4tFDne1XSkVXcLqGTRYLg7Xyyioz"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.14+commit.69411436.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.14",
            "build": "commit.69411436",
            "longVersion": "0.8.4-nightly.2021.4.14+commit.69411436",
            "keccak256": "0x18252617dc5164950e9b09b5aec22b4ffd5dfa54735c563ecfe33fa6ce0b3e44",
            "sha256": "0x411698d18e4af6ff02b79053f5fba07a8f76855b74be98018da83f78bd16f693",
            "urls": [
                "bzzr://1debc4b9a35ee1917ebe9452468c1eb74c998f3058298b5a0af5b0501b11a475",
                "dweb:/ipfs/QmUATC4nGK27HvAPWgRyeWgcQxpQBioVRHqyhVKtnuzWcR"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.16+commit.f9b23ca8.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.16",
            "build": "commit.f9b23ca8",
            "longVersion": "0.8.4-nightly.2021.4.16+commit.f9b23ca8",
            "keccak256": "0xb8ab065dbbe9e9f2745d5e01e73e48987d7ce76db6f32f0b86f665d51cf518d3",
            "sha256": "0x3e5c33449ffe115a0891ce1a6642f985cfde7f53da0f163663a4f6854d76408f",
            "urls": [
                "bzzr://004838709feeda9ef22ad19d9ea3686841b7a928490afbf04a312ad747773983",
                "dweb:/ipfs/QmVK2EkE8HZRMTMrKQ5Kt26nCrSMaqK35F3gMck9NMqws4"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.19+commit.159d6f9e.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.19",
            "build": "commit.159d6f9e",
            "longVersion": "0.8.4-nightly.2021.4.19+commit.159d6f9e",
            "keccak256": "0x431d502c446c261139fda1e0ac7dd95771ce93189ec62d4ce818ffe0b1993d93",
            "sha256": "0x02074b56e38f423970a51373771e95af1681a194640a4c96de9ccadacbdd84c0",
            "urls": [
                "bzzr://b6b62dcf430652b3d5ac00a8a26d78463ee8c4bc5978be75754fe96b76537df6",
                "dweb:/ipfs/QmT85sg3Rr17FotmwJVyuRbx6PTEAVB9qEyjv3D5zLV9NP"
            ]
        },
        {
            "path": "soljson-v0.8.4-nightly.2021.4.20+commit.cf7f814a.js",
            "version": "0.8.4",
            "prerelease": "nightly.2021.4.20",
            "build": "commit.cf7f814a",
            "longVersion": "0.8.4-nightly.2021.4.20+commit.cf7f814a",
            "keccak256": "0xe84b229dfa89a53fb5715975ebe4c83225af6787379eaaf960d938d8b746f1c0",
            "sha256": "0xba0bcfb9178ca85c7607a28cb10eeb100f31bc7dfaafa7d3f69c6d617272128b",
            "urls": [
                "bzzr://0b9bdebd7243746c0a840cae3756a84c4783e9674c7d7644fa4f9d6b0c22fa31",
                "dweb:/ipfs/QmTag817J3bHP28duKG1hYBTARp9r13SbyF5TzwsfEjy9r"
            ]
        },
        {
            "path": "soljson-v0.8.4+commit.c7e474f2.js",
            "version": "0.8.4",
            "build": "commit.c7e474f2",
            "longVersion": "0.8.4+commit.c7e474f2",
            "keccak256": "0x7e0bca960d11fb095798ff65d029436f23358ac060b25a0938acfcb4652da2ec",
            "sha256": "0x4a14c7bcaf0d988a829db2174b8f7731898aa8633216490603ad74bff64eca3c",
            "urls": [
                "bzzr://7f33fe204160253c7ec23cb0ac83224bde3aca9f91a7a686cb67d99248c5fbb6",
                "dweb:/ipfs/QmPYDf4qYtZLNEAicW7hcvpUJ69FoHiXmUypipDpTKo9hU"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.4.21+commit.85274304.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.4.21",
            "build": "commit.85274304",
            "longVersion": "0.8.5-nightly.2021.4.21+commit.85274304",
            "keccak256": "0x2299d629a966986186ede41a48d15de1701380560b9fd4d4a83feef10973665f",
            "sha256": "0xfada547a1ddc9f64c3d72c3bdd7d971e40cd53350e0a56bb8dfff096ff2735c4",
            "urls": [
                "bzzr://459fe00ed0398cbeeff491f6e8d3279e1d68ed696c173bbc21484d1916029d7f",
                "dweb:/ipfs/Qma2ZaLxvUhZKrAFieoWGaNeprXsJgf2gAh7EHxU6doAzh"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.4.22+commit.f162c484.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.4.22",
            "build": "commit.f162c484",
            "longVersion": "0.8.5-nightly.2021.4.22+commit.f162c484",
            "keccak256": "0x744ea6053b6c526def51e31761c49272db62e88e332170aa733c67b7772f1c22",
            "sha256": "0xde026387f1305afb3871a2b36856d634fb3bded8746b65c3e7f86aece5bf8d3f",
            "urls": [
                "bzzr://a743cc37d24b6d4ddafcbec5ad9f9f4c07972afddf84e7a3626956467799843f",
                "dweb:/ipfs/QmNVumJS1i8taq2i7wfTEPWw3Zf2Ev5rPtb1QDEBaQTVMe"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.4.23+commit.173a5118.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.4.23",
            "build": "commit.173a5118",
            "longVersion": "0.8.5-nightly.2021.4.23+commit.173a5118",
            "keccak256": "0x6a0e0f1aa3516877ae119d3c1333e98dc8939618f3871497b06ac79fca6c8d11",
            "sha256": "0x20ebdee320bb57abb9c9ffc9bf83b895ad2b9be3ce6758d68d8f343cfc5f8c53",
            "urls": [
                "bzzr://93628ef0a32459bee7478b286a4bb7a436750050cf66fc04b58ffb281c531cd1",
                "dweb:/ipfs/QmS3WEjaTpcpy6XcsXHAQyXcHn98jmAsxaeaXc6AgcUASR"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.4.24+commit.eed0bf58.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.4.24",
            "build": "commit.eed0bf58",
            "longVersion": "0.8.5-nightly.2021.4.24+commit.eed0bf58",
            "keccak256": "0x3efd981523b0e9e24349d7eb664214603e4d9143eaaaa092803590b64b065ec8",
            "sha256": "0x748b07980723a4af63cd79ab8863ae26471b4aa9177e586b4d0513b2165b35ba",
            "urls": [
                "bzzr://dc441a1e18d65fde67ec6bbbab6089a3bdb9249d9dab9d3f9416ea5dd191c206",
                "dweb:/ipfs/QmX1X6D5KDV3GSjdEJ3xjHiX7oNaWok6eDoSkCiDn3WPbY"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.4.26+commit.2e99a56b.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.4.26",
            "build": "commit.2e99a56b",
            "longVersion": "0.8.5-nightly.2021.4.26+commit.2e99a56b",
            "keccak256": "0x65fb2434d8fafc6bb95f165e09b448a87a308eac91ecbd372f2e2261887a4398",
            "sha256": "0x5437a98e7d180d51b44dc1126afd7472812f7ec7f2934632d837f0caad8c54cd",
            "urls": [
                "bzzr://4d9f3edfdd5d05555b74778ae85bc1807f9b50bdc03dfd7e2ad5558e702e310e",
                "dweb:/ipfs/QmatwgkARMmiGpvT8pvvqPoPQUEwE8mFmLJxLsjDNRX1rk"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.4.27+commit.c7944637.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.4.27",
            "build": "commit.c7944637",
            "longVersion": "0.8.5-nightly.2021.4.27+commit.c7944637",
            "keccak256": "0x2892aa81d1e795b1d05a50db3bc4e5a91031d0b69a3d8add893c8c29d43ab594",
            "sha256": "0xe3624e8d41ba20792691cbf8620789e251c53a1f1d9b69db99fd5338d97c5e0e",
            "urls": [
                "bzzr://1b2d2920a7018e0e4ca20efd8c248aae78208a34b1dd53bf1712e68ebe91578c",
                "dweb:/ipfs/QmdBAPy6gFtSC2ZaV3xf2kx2PmBgZKarTaeQbbncTmUV28"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.4.28+commit.850c25bf.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.4.28",
            "build": "commit.850c25bf",
            "longVersion": "0.8.5-nightly.2021.4.28+commit.850c25bf",
            "keccak256": "0x8bbede675ae4dde6aace0efe1f03ed7776999bd1d26ad879ba120c84a1fbf5c8",
            "sha256": "0xaa16f096dc98383a80baa3fa88f992e9add57db205cae29ce09057a12d72a57f",
            "urls": [
                "bzzr://7f82ee1a5e28f6a34fee7891ef7ba51f7974c8de5d81fc4d16f547fbc245657e",
                "dweb:/ipfs/QmXnidpdXmqD3p27zrzewKqcwpu4XbxcDzHkf5QfmpiQjN"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.4.29+commit.f1d58c54.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.4.29",
            "build": "commit.f1d58c54",
            "longVersion": "0.8.5-nightly.2021.4.29+commit.f1d58c54",
            "keccak256": "0x36ba0b76b14da4dc7cb9d0bb0daef02ff8cbecc4bd5dab80a5e7c698da982075",
            "sha256": "0x14e1528f1d9016eb692e7f2fc7da6fc79768ca7906f3c9a816d91fdc679b3103",
            "urls": [
                "bzzr://33d306d44632de26043b4361e239777fc6c5352906107855e286ef30a311d3ef",
                "dweb:/ipfs/QmdoPUhzF1wisV2smwpUxj5pbEcLpnt1doSty5dKEsuvWx"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.3+commit.fe4822a1.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.3",
            "build": "commit.fe4822a1",
            "longVersion": "0.8.5-nightly.2021.5.3+commit.fe4822a1",
            "keccak256": "0xad326c81da3a33e94d1d3fb515b46f3f81d167b6921a011dfb204cbc57e91406",
            "sha256": "0x166c5b377c7b20905d33af31528c9d33ad6e16759a510b2d37a5afc37b984fff",
            "urls": [
                "bzzr://a3c91a67ad9f79ccc568b883a98e7e9461c3128942b57ba5f07251fc4ca1f30d",
                "dweb:/ipfs/QmcUHAoSAiKz8AtwBYR9Kuz4jTehq1d57NhH9G4c2mZLZq"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.4+commit.1d1175c2.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.4",
            "build": "commit.1d1175c2",
            "longVersion": "0.8.5-nightly.2021.5.4+commit.1d1175c2",
            "keccak256": "0x6986121f8902a09d41ca953f7d477b87527180fc0c3625e936a67207e590c315",
            "sha256": "0x3a01f526f31a62e6242cbf8adf3814833da82b8fcc4fe6d767d489ea1fead12e",
            "urls": [
                "bzzr://96fd0778a892bca83ec7bae470688ce8bf59b9e27f9a4e43f813f00a0f3c1e42",
                "dweb:/ipfs/QmViR7oUvggJqaUHBqySUWDU6PLVemoY4Pjv48oLt53kCL"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.5+commit.4c7b61d8.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.5",
            "build": "commit.4c7b61d8",
            "longVersion": "0.8.5-nightly.2021.5.5+commit.4c7b61d8",
            "keccak256": "0xfc0ff5985f7c2a766b4280a6659a5051bdbad755b75da942aed484f936254495",
            "sha256": "0x09b782dec05908ceb112676413662470487dea450c472f57a8520f28b296446d",
            "urls": [
                "bzzr://d62ccf97289562ce4c43ed4ec880aefd9f1cd23f8678564bf42624d9af98bc95",
                "dweb:/ipfs/QmY3zYMoKN9xtfabhJ7CThkBsgUJMMmjHowY9CK83gdK1U"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.6+commit.518629a8.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.6",
            "build": "commit.518629a8",
            "longVersion": "0.8.5-nightly.2021.5.6+commit.518629a8",
            "keccak256": "0x0f800ddb7f268f9174745ab26102c980b875181c9d2bd8b2f4c594611744f938",
            "sha256": "0xf5a8aad8d6e2e3d5149f432d3f9c550d48da6980dcce3322227cd879b6a89a2d",
            "urls": [
                "bzzr://c5a4bc35fc56453b2c669169dae433e788f0f83a046c488d818fabf6f33dc107",
                "dweb:/ipfs/QmcDwmDeshVzsdETXuKLpZ982PCfBAow7tUjbobeQNpXx9"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.7+commit.5d070c5b.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.7",
            "build": "commit.5d070c5b",
            "longVersion": "0.8.5-nightly.2021.5.7+commit.5d070c5b",
            "keccak256": "0xfcaa64a2950e5bea8c49b0938cb4605dd1b72976b1b9e7b0a5b6a53702ec9ca3",
            "sha256": "0x2051e9b76a523aba85f154005d12b807865aecc4be6c3e87a8891dd2f9b5e271",
            "urls": [
                "bzzr://6a385fb3f0abc70fcf50f3e901781c2dd0911a950ee03cdc25218fcd68674bcb",
                "dweb:/ipfs/QmcTocseN2tbpcycniUfkbpEej9QMd4U9XMtGH21qR2wNB"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.10+commit.643140e2.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.10",
            "build": "commit.643140e2",
            "longVersion": "0.8.5-nightly.2021.5.10+commit.643140e2",
            "keccak256": "0x6c3533a2b12eb5baed3c8f5c8caf37791e20fecab76a3e377ce665ea35722fa6",
            "sha256": "0x49cf2be9563d78fd9fe3681328540e88992f9d84da85e0f64fc8f5075b74a34c",
            "urls": [
                "bzzr://1a57e8c0ee5a9f32e8db437adbbec55df4e5c209b4c35d719a7f24c15d713710",
                "dweb:/ipfs/QmXcVmjzd4FEwjYttKXDqAjHKFK24USPBKfbSvEK3954Ag"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.11+commit.eb991775.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.11",
            "build": "commit.eb991775",
            "longVersion": "0.8.5-nightly.2021.5.11+commit.eb991775",
            "keccak256": "0x354042d885c62f32be484faa638bec28b70e69be43f0ae5734867e9c3ec64a9f",
            "sha256": "0xd7aa14b13552772dbcf928707053f140238fc01420872d6d17493c8ecc5ee2d8",
            "urls": [
                "bzzr://122afbf392c5971dd47d855d67b7604adef2fbef179636ad328d292eae4fdb37",
                "dweb:/ipfs/QmUtFmceAancyQWjDAeLjqKVSvzv3iqobYz3nUJsLPrKa3"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.12+commit.98e2b4e5.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.12",
            "build": "commit.98e2b4e5",
            "longVersion": "0.8.5-nightly.2021.5.12+commit.98e2b4e5",
            "keccak256": "0xb9763efd6ba0a9190018f941ee17d7656caa601dd883c38dc6cda59aa2695898",
            "sha256": "0xb5d0b16fbc03b38895b4948b10eb1324e5ed3764a458f3eccd07601ee83fcfcd",
            "urls": [
                "bzzr://3fd873f606a155f491b6fef3ed5b6ddccdd552fe64104735a0edda9d657503d7",
                "dweb:/ipfs/QmXyeD61g37x4EPc8ytVLMsXPhhSEYy98nH4Tt29AAYdVh"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.13+commit.324caef5.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.13",
            "build": "commit.324caef5",
            "longVersion": "0.8.5-nightly.2021.5.13+commit.324caef5",
            "keccak256": "0xfb5f0d7766600837de71f45f9e287a7a2dc03f20f426c77b73d475b5cc64f315",
            "sha256": "0xe8f955a911e5b8d609ccc1f2cb473bdc27432cd4ec953022241fadb6d6904c17",
            "urls": [
                "bzzr://64b1640822c365ec9221a29de8c60132dd5f2e10f5a1faedceb2e6a2a76b456e",
                "dweb:/ipfs/QmXD5YUXFQ7UBEDewyhxonKuxguKCfhzVUFQsTYRKzt5ke"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.14+commit.f58d5873.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.14",
            "build": "commit.f58d5873",
            "longVersion": "0.8.5-nightly.2021.5.14+commit.f58d5873",
            "keccak256": "0x336c5eb4506980bb34e81f2180414a83ec5862d3c40b5d156833a7edd5b7151a",
            "sha256": "0xc5356f043a6c94f87c794e03f94d3c7e6b392b44a82d1f30557b38a3452553eb",
            "urls": [
                "bzzr://6ed3dc5edaca72dded5c9ccbfecc6102f0c30d918b2da1d5b87fd545f9d7e945",
                "dweb:/ipfs/QmPiNQUHUofd45eAPRwpTxiujrMc1S83ZfG9JjNMfVv9Rf"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.17+commit.21af5408.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.17",
            "build": "commit.21af5408",
            "longVersion": "0.8.5-nightly.2021.5.17+commit.21af5408",
            "keccak256": "0xa36c8afec8af1c5f45a9a195c904f5754ab8fd722c03d56a541ef0ede0899d5e",
            "sha256": "0xd0421290589dc67cb3031782a2a3920df515119dfe130c4d0556e06811596965",
            "urls": [
                "bzzr://f7b8a3cf5a3e090b23ea38867251fd9902fab0f3e0b21b203d19ea66f83ee14d",
                "dweb:/ipfs/QmZkXuD4Xyg9Pmg2UhpgsHQkUYd3WKHQHbECrjY3MZB4RE"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.18+commit.dac24294.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.18",
            "build": "commit.dac24294",
            "longVersion": "0.8.5-nightly.2021.5.18+commit.dac24294",
            "keccak256": "0xc49b88584aee69ab1f0c4143353322d1759608a106c3028a37288ca3424f2d13",
            "sha256": "0x79935134048cd0d094ab4b5fc8ede96e899f651739fc8d885c58596459d99efe",
            "urls": [
                "bzzr://0b939279c89c52e0ba7cd0de3045d86042444f0940d7ad686a7811afc139ffbd",
                "dweb:/ipfs/QmauJqwazcW3BTZe7rDDvWcvC65sxWhXPq1MBrPUq7kBfF"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.19+commit.d07c85db.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.19",
            "build": "commit.d07c85db",
            "longVersion": "0.8.5-nightly.2021.5.19+commit.d07c85db",
            "keccak256": "0x10b272199e871d90c2053fa40f42087210f242fbc7a6b0a5081b27cac47dcc91",
            "sha256": "0xb1cdaa78fb95b3296ac83f7b4fc90e9df7ef54e57ceb96d93c43c13ee9d72b1e",
            "urls": [
                "bzzr://db3850f550d1b68ee39a20e45cac8245ab0d97a47e83108db1764490689fac82",
                "dweb:/ipfs/QmY5moJG9Zt1mV3w2sHDq55NDodhLgvhefVi4tyigC4jBu"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.20+commit.13388e28.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.20",
            "build": "commit.13388e28",
            "longVersion": "0.8.5-nightly.2021.5.20+commit.13388e28",
            "keccak256": "0x7c5eab4061162388ba116f4b9d0ba724124b9161cd9aea8b3f020c1aa9e232ad",
            "sha256": "0xe0f8e6bb8a601c3d46a5c8d4e747f9c001171b225eedfed2b8a49b80a5d3ef44",
            "urls": [
                "bzzr://4354c62d54cc9ad7c7542903e4eed9db5d19d691d75902d9469360a99afc1bb8",
                "dweb:/ipfs/QmZHQcHNSoxSiC53NioZiAhcmR99KVYrjVjaCwxk2fCHRo"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.21+commit.29c8f282.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.21",
            "build": "commit.29c8f282",
            "longVersion": "0.8.5-nightly.2021.5.21+commit.29c8f282",
            "keccak256": "0xebcc2650f7bd64b9bf3e7b42b6c33ce58fb421af1aaf6f1ce341de8b2e16ba2a",
            "sha256": "0x482f1e020a39836d3fc034d8947a2c479f2186f7907d9ade90ef940b31ff0ef8",
            "urls": [
                "bzzr://800c84266fde08bb378c1d2b036d35cd14a1f00c129588ebb372518ebe42f79d",
                "dweb:/ipfs/Qmc6sfDqDExKTxVLDmJmAGeBthS2LaiHpy17oieB1bwhqe"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.24+commit.c5031799.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.24",
            "build": "commit.c5031799",
            "longVersion": "0.8.5-nightly.2021.5.24+commit.c5031799",
            "keccak256": "0x65090ee4d4d0cb12e1929bd8e13760a463bc2f3bc36dadebcf49746961874bc9",
            "sha256": "0xd50f6494eab1562e805b2801fe5cee5226e657e05511f562b39351a38f64dc8d",
            "urls": [
                "bzzr://0303b5adda98991a3c401affa5508c02db346a5c132eae7ca0dd7e2afdd6615a",
                "dweb:/ipfs/QmXgCj8ow8yL5TzaPryMnjvpcXMJ2smD3vWtkd51wapKJJ"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.25+commit.6640fb8c.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.25",
            "build": "commit.6640fb8c",
            "longVersion": "0.8.5-nightly.2021.5.25+commit.6640fb8c",
            "keccak256": "0xd721785b3b2cc9818d6a04974dffd9ccb727ff1909792cc591e185de97fafef6",
            "sha256": "0xc5ab50b48e8d6f121c0e279bad1ec52add6d5938a439c5f53bdcbbdb3d954abd",
            "urls": [
                "bzzr://4cd0ed0078704fabe9849e67db4fb2d5bdae97c5d915b8c9e2a3147ac92e1785",
                "dweb:/ipfs/QmbE3TiB8A57uhTPGQubtjgWYeGqnpypSG5e9GpHtdmNuq"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.26+commit.a3634934.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.26",
            "build": "commit.a3634934",
            "longVersion": "0.8.5-nightly.2021.5.26+commit.a3634934",
            "keccak256": "0x212bb481eabd2b6127321bbfa2a7534076681435e45081602033fa3f0273baec",
            "sha256": "0xee01806420a8009333277f3fee1c4b89d8b85f6d83bd4864ceb8f5ae835fbb2c",
            "urls": [
                "bzzr://b6e56aae0936c4a888a8f38502500883adce28fb48439c052e2d17fb727451ad",
                "dweb:/ipfs/QmVpSyfoQH9mBijutmwL4cVwAPAofTweZem1hCYqs41bqw"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.27+commit.2f0df8f0.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.27",
            "build": "commit.2f0df8f0",
            "longVersion": "0.8.5-nightly.2021.5.27+commit.2f0df8f0",
            "keccak256": "0x50ef3d1b3b5ffe3bd51cd33ca08de4084b18bbf3aa8678bb190655e1c903fa4c",
            "sha256": "0xad5a8b9b9eb385ccdc7ca79b1b2f58dba877cd85519faeaf016202100aaedca6",
            "urls": [
                "bzzr://a9675aa25caa176c008e93b38be2c0235734dfbe22d7c348356e5c7dca70541f",
                "dweb:/ipfs/QmbzsnBDoZBvubgegguD2Em7MvAGS2ELGB2NuTe5scZqn9"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.5.31+commit.7d1df951.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.5.31",
            "build": "commit.7d1df951",
            "longVersion": "0.8.5-nightly.2021.5.31+commit.7d1df951",
            "keccak256": "0x9de700778ac70566719002357d44c401c9807e4154b109b3fa9f47ecd3db3512",
            "sha256": "0x27665f3f8872ce0626121ac575af0f8d89f8b348189532e6ee0ff5bab6afb658",
            "urls": [
                "bzzr://5d999ce92268c2cddf7699b2597c14792869f29625220e6f06b705a0bb09fcc1",
                "dweb:/ipfs/QmVLEbVGsvXvbywZcYem3dLyGTknHuykozRYVuZAMQWPGi"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.6.1+commit.4cbf9ff7.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.6.1",
            "build": "commit.4cbf9ff7",
            "longVersion": "0.8.5-nightly.2021.6.1+commit.4cbf9ff7",
            "keccak256": "0xddf282b1a117a815085c52aed28b574ab269c9371eaab34e402645f6bd874d49",
            "sha256": "0x805633d54ce5c8d8211df0ad8ba534bc69efe61a5e8049bc5c51c8133018182b",
            "urls": [
                "bzzr://ec34b00a30fe871d633f8aec95e0cf1739c85aaa5ef6f81977056a4396bbdfb5",
                "dweb:/ipfs/QmYCG2BHS3Ym3EzKuVo9KJfkbjuVsnYWpNeVxdUVf8jbLS"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.6.3+commit.1638b210.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.6.3",
            "build": "commit.1638b210",
            "longVersion": "0.8.5-nightly.2021.6.3+commit.1638b210",
            "keccak256": "0x34e1eb1fc3abdb41d668e1af187d38ea40223218feccc3029856564b193bb91e",
            "sha256": "0xe2e93f0092200aec90d619b6b601de8e4ea5a1a73980100b8552baf6dbb9bafd",
            "urls": [
                "bzzr://caa06af241e2ad72572d65725d36ebf08bda31331ed9da6a018e5e5a45005b65",
                "dweb:/ipfs/QmX1Q7VVhGrFCGaT5gpkaFf5DKcGWTNDi5Yv1kTCWvPtju"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.6.4+commit.1f8f1a3d.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.6.4",
            "build": "commit.1f8f1a3d",
            "longVersion": "0.8.5-nightly.2021.6.4+commit.1f8f1a3d",
            "keccak256": "0x5a4cfeca0c30e1e732113587ca204c0cb72c8af842912af16217dc5c6ba22440",
            "sha256": "0x016c572379a728a7c3e4d498533bec84a34f8c5b46025497cc592b1bc1f0db38",
            "urls": [
                "bzzr://1fc1da5ca441f6f3731c3402c7ac0640ebc516691f41072e206fc6162f664112",
                "dweb:/ipfs/QmQuqqisPytX2wc45skna7t6bXQ3qrT3M3XbBkDRhcQmAH"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.6.7+commit.7d8a4e63.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.6.7",
            "build": "commit.7d8a4e63",
            "longVersion": "0.8.5-nightly.2021.6.7+commit.7d8a4e63",
            "keccak256": "0x5975dd901c960d4c41075eb6bb38a2e96c4e89da356ead06af3e79b7d79d8a86",
            "sha256": "0x47c7c22596e5501b3364a6a700efa4bdecc03391b0894761cb5592deb670178e",
            "urls": [
                "bzzr://9e107855c31f04076a8a593eb842de4f4403576ad47a11a90b8fd0a6be81979e",
                "dweb:/ipfs/QmRCJo6HYqt9UtQVqbujvXePnMWCVRGyN19oqGRFiLEb2K"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.6.8+commit.e77e9e44.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.6.8",
            "build": "commit.e77e9e44",
            "longVersion": "0.8.5-nightly.2021.6.8+commit.e77e9e44",
            "keccak256": "0x9b5847c79175a7f524da01f6af177f21325267baed25b79a458243851cba78ae",
            "sha256": "0x80ab3a685bce5e3b8691077840874d4c2f3ae5506951f5379d0e296382195c60",
            "urls": [
                "bzzr://972544ab43aa9dbcd95022110b9b8f9af9b43ad24ce8ef3045d7f996693cece7",
                "dweb:/ipfs/QmcVTKWX9A3rfPk4sEmnaUGdBBGQGhYxqNvh12cANWE9hj"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.6.9+commit.98e7b61a.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.6.9",
            "build": "commit.98e7b61a",
            "longVersion": "0.8.5-nightly.2021.6.9+commit.98e7b61a",
            "keccak256": "0x444c03a30962b59b6e8ae227f827aabeec13167ca0bd2d1d7055581b7d8623c8",
            "sha256": "0x88639444a6a255e3d580f10d7d20e858eb637d7087f43617df34c4a2dd5d784e",
            "urls": [
                "bzzr://55046e6d3e1f130d998ec4171d6876c791f855c0040d8a0f8a4b6902fd2bc837",
                "dweb:/ipfs/QmZxJsm5LHXCi4XU3dnCKuxmhUrN8tQ4Fxq3XoP2VqvA3X"
            ]
        },
        {
            "path": "soljson-v0.8.5-nightly.2021.6.10+commit.a4f2e591.js",
            "version": "0.8.5",
            "prerelease": "nightly.2021.6.10",
            "build": "commit.a4f2e591",
            "longVersion": "0.8.5-nightly.2021.6.10+commit.a4f2e591",
            "keccak256": "0x5bd14ebdf7b70b15d39b0c54c8510eca44f7754c80ae3af415f14bb039883112",
            "sha256": "0xd000ee1b9ed78ca2ea688b58c6cb16ed7951d684a00b60e7aa4a9b205f96ebe6",
            "urls": [
                "bzzr://12b78c5f18fcf6f490dbbda533d4e2824a1c069cbf736a48b2c9392c56edad55",
                "dweb:/ipfs/QmUJM5C7f53DBpw9NYN8ahbX7emxTT2fMPdAUtbHjxqeZk"
            ]
        },
        {
            "path": "soljson-v0.8.5+commit.a4f2e591.js",
            "version": "0.8.5",
            "build": "commit.a4f2e591",
            "longVersion": "0.8.5+commit.a4f2e591",
            "keccak256": "0x6d6d75b033717aae0a728e527005d8d2cc7dbd0a835c8873c630a2a9689a2976",
            "sha256": "0x4af595f976235d33a22ffe223e9e3210b4ca510f6a93f153b3daed60f2b11fbc",
            "urls": [
                "bzzr://d501ee8c460db75379b5716bcb5ae10e3e32625d6c9b08e319822a110f178906",
                "dweb:/ipfs/QmNWkyirqXy3gDHNXpPuVUbExMGWjMqPR82Xzs64RzgQzy"
            ]
        },
        {
            "path": "soljson-v0.8.6-nightly.2021.6.14+commit.b2ffa910.js",
            "version": "0.8.6",
            "prerelease": "nightly.2021.6.14",
            "build": "commit.b2ffa910",
            "longVersion": "0.8.6-nightly.2021.6.14+commit.b2ffa910",
            "keccak256": "0x11d0c9128e4a0b51deb8b3bdc3d7ed94723168b980fcb90d42ce9c59a395262f",
            "sha256": "0x100b0e43e437d90991b9b0e37c0832448c4c29e3a24cdfa1300e237f114d6c45",
            "urls": [
                "bzzr://65d9ed65dde2ac1cabcb3854488b8c343518dd56e6070465301041e774cd705a",
                "dweb:/ipfs/QmdioCEdaSNqwaagGSCd44b82eeUozHe1xXExpUMdZ79SX"
            ]
        },
        {
            "path": "soljson-v0.8.6-nightly.2021.6.15+commit.e7bf1cc7.js",
            "version": "0.8.6",
            "prerelease": "nightly.2021.6.15",
            "build": "commit.e7bf1cc7",
            "longVersion": "0.8.6-nightly.2021.6.15+commit.e7bf1cc7",
            "keccak256": "0x74073492bbf37358b472f3d04c8900f988983445286f8c58ab67a39bece17443",
            "sha256": "0xd6689ce982d2e303dd81c43d4466dbb703508bfac6ae0568f8bcd890633c11d4",
            "urls": [
                "bzzr://e3701f39fedb80d827a5e64b7d62cc48122554f83dae82937c4a7412d31b223c",
                "dweb:/ipfs/QmPY91YEKCjiu843tbRNGekBNyXFcBi9nXazSXZ3EXuU7m"
            ]
        },
        {
            "path": "soljson-v0.8.6-nightly.2021.6.16+commit.61468301.js",
            "version": "0.8.6",
            "prerelease": "nightly.2021.6.16",
            "build": "commit.61468301",
            "longVersion": "0.8.6-nightly.2021.6.16+commit.61468301",
            "keccak256": "0x112ad59e28036aa064bb95ec831799593b495200365be54ad0e8ebfb4f132bae",
            "sha256": "0xc96a4406c8ab0e5e0db04f136a69d2797616d671c60909225922f4beef4cd3d5",
            "urls": [
                "bzzr://434faadf9aac680573dde53ae486303050701d41fd5e9155f440c0fec56afea3",
                "dweb:/ipfs/Qmc3rXUrD2vvykYV4AjgLKWQBBXGTfbLCfN2MspgHwdtnM"
            ]
        },
        {
            "path": "soljson-v0.8.6-nightly.2021.6.17+commit.11281586.js",
            "version": "0.8.6",
            "prerelease": "nightly.2021.6.17",
            "build": "commit.11281586",
            "longVersion": "0.8.6-nightly.2021.6.17+commit.11281586",
            "keccak256": "0x493d25ff39ff34f9695be37e5df4bd8aee625da7d0ad256569cc7e02f5df670e",
            "sha256": "0x5b018c0af11681c50c407d4cc6b92825966f6d12a82a813ccd09e7b211f9f199",
            "urls": [
                "bzzr://1ec30e6b4ba2f7a8d337cb409c5138a0df427261ca55b3716bcf76d4565f1b2f",
                "dweb:/ipfs/QmcmCJLU4NGBpftTmud6dZRbXZ2hjd6A8piCSoCgyVEf9N"
            ]
        },
        {
            "path": "soljson-v0.8.6-nightly.2021.6.21+commit.a96114b3.js",
            "version": "0.8.6",
            "prerelease": "nightly.2021.6.21",
            "build": "commit.a96114b3",
            "longVersion": "0.8.6-nightly.2021.6.21+commit.a96114b3",
            "keccak256": "0xff3ca5ab3b7d60d8de1fbceca802a06c16f090b5a965e4a41f181925873250c1",
            "sha256": "0x5e0fd49a6d45091879e15831b450123b3299330ae7fb4870c0d3152e80b3767a",
            "urls": [
                "bzzr://6370f0e527eef7c4f7cf5754974e8eb6366e798979835dae383f6b654edda34d",
                "dweb:/ipfs/QmaJqUf1BWeNkAhBRsJrkZEEqx9gst9KPEuo1NaN7AoQL2"
            ]
        },
        {
            "path": "soljson-v0.8.6+commit.11564f7e.js",
            "version": "0.8.6",
            "build": "commit.11564f7e",
            "longVersion": "0.8.6+commit.11564f7e",
            "keccak256": "0x070e41c7f761ff1a8383a2c0d54c22aab0f115ca8c3790ecea27d6dde11611ca",
            "sha256": "0x06a671efd8865a6ecc0ad648076177b35abcd06a7059888ea65111272e33a57f",
            "urls": [
                "bzzr://e4f8176cdb3a0f3ba0b7061079dd9d3495f6a2288bd724780337cacd96515148",
                "dweb:/ipfs/QmQre11ZPgWSx79Jzca1tkTYFyMbXz8H4kcrhfpWSj4qs8"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.6.22+commit.9cf6021d.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.6.22",
            "build": "commit.9cf6021d",
            "longVersion": "0.8.7-nightly.2021.6.22+commit.9cf6021d",
            "keccak256": "0x8c1e691e3c03835657fd026d883a1d0e8dc91e0e4077b187e97ecd2eb5155e4c",
            "sha256": "0x6afb26b4e8e0f83f729a0f34ec721c5f194fca17500271811650bdb82bfca763",
            "urls": [
                "bzzr://ebc9aad0d42d36d6a583f027a65c699b18f6764fd64a38f6f7e502c067ca1aac",
                "dweb:/ipfs/QmVhxcejWtDtTyEsfJSJn3PmtxMiL67Mcdq9euF8EnDsfE"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.6.23+commit.cbf1c3ae.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.6.23",
            "build": "commit.cbf1c3ae",
            "longVersion": "0.8.7-nightly.2021.6.23+commit.cbf1c3ae",
            "keccak256": "0xc84f115c0ffea0d6ed3a652cf7c052d162441ac4519786e5fa0594575c2a2da9",
            "sha256": "0xf7577f3ba35e295f75ec5710aa2441800d0b0dd5284096de857c344b28583cda",
            "urls": [
                "bzzr://524d5cf4d77660ce1f7148669d442811a9f644aa68c7e46d672758eefef081b1",
                "dweb:/ipfs/QmRFT9zAULAVsdg4UypLi5nq8M4oMfg56vgDoF6RBzoDM9"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.6.28+commit.d91dc995.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.6.28",
            "build": "commit.d91dc995",
            "longVersion": "0.8.7-nightly.2021.6.28+commit.d91dc995",
            "keccak256": "0x67d21887ffd506b975fd6d1ad7a659151bce9ee062bb2bae041655c4bc3c3c66",
            "sha256": "0x55d6dbc79b1e0dcb7e1eeb4ec0ac05d03e309aea23ecb27ddc5b22b8e0c57c07",
            "urls": [
                "bzzr://9e2360121187c6642a622174232ec3b5fe1b2039367a27cb501f0c0a854aaae9",
                "dweb:/ipfs/QmV8ZbvrmyUQN2R4YZSzsvNrjwTU6xD9g4f4XdnfsAYUqM"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.6.29+commit.eaac16c7.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.6.29",
            "build": "commit.eaac16c7",
            "longVersion": "0.8.7-nightly.2021.6.29+commit.eaac16c7",
            "keccak256": "0xde71ad0281b39212336ba2b39e4b6e2005eb287df5293f2403dd121943b5e903",
            "sha256": "0x6a43aab1cdbbe3a15f15a9f3ac138432abafa34ef53bbaa497999ffd92f77c16",
            "urls": [
                "bzzr://5d3bd1a89136a0b7bfdd87cff5100da0b8a90209f3e6030636e715521ac91502",
                "dweb:/ipfs/QmTyKeryynX3QPB7TfLoHoKxPk6qzKCZWfmDEN8LZV98ba"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.6.30+commit.8a6a330d.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.6.30",
            "build": "commit.8a6a330d",
            "longVersion": "0.8.7-nightly.2021.6.30+commit.8a6a330d",
            "keccak256": "0x9e4d310b1670690c0d15ee94b10cfcd0504238c1afaae9d7ec76708201cf65aa",
            "sha256": "0x27c50b5afcd423173885c1e8528fd2838e831155b438102d1625bc6021525d8b",
            "urls": [
                "bzzr://96ce985530b930528c3c6e362b3e075497af799f95f03912a68224dc6564df18",
                "dweb:/ipfs/QmPkhNN4BRTEC5eVTrwgAkmytXWosppAAgWyus2UPZ2TEB"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.1+commit.98e1dee4.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.1",
            "build": "commit.98e1dee4",
            "longVersion": "0.8.7-nightly.2021.7.1+commit.98e1dee4",
            "keccak256": "0x774dd51625bea7180ec3c02ad6f2e3b38f6481b08b7de416c5977291ca5ddce3",
            "sha256": "0x1a8400afe80766793f2b265762ab5e9e175c96ca7986d53c47206c8c9537f054",
            "urls": [
                "bzzr://b5a683f95ba51c81a8ea79b0d987f8f85708954911b5147e4e6678709d037613",
                "dweb:/ipfs/QmXYso4txQWPDEh5aVZp2WM5r2oSige1fhF3GHHUSXBYit"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.2+commit.f6cb933f.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.2",
            "build": "commit.f6cb933f",
            "longVersion": "0.8.7-nightly.2021.7.2+commit.f6cb933f",
            "keccak256": "0x2b3f3f70b8b98a0cd5cf60af0d62c6aad7351f1e428e4ff1eea573b6ade81b01",
            "sha256": "0xbd0b3ae3ac53c1e2ceae064f38bb6748784ef149bf1bd2e21b824b3c36b052e5",
            "urls": [
                "bzzr://c449e7bb4ab64fbeaf894c08fc4cb08724fedb8fd5dafa7b0e4e0289fa3357ef",
                "dweb:/ipfs/QmWCLNbkkRU1zCcoQMtMiCVtMLJVEaDiAsxQSfXARmnjFj"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.5+commit.19b217dc.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.5",
            "build": "commit.19b217dc",
            "longVersion": "0.8.7-nightly.2021.7.5+commit.19b217dc",
            "keccak256": "0x7cff364917fc49bf244a44901289538bab1a9600c04aeecb666cd273006ba8d6",
            "sha256": "0xefc3f3f3b5755124b6c6012e55e2c3571252c7d15893903ca6add614f47f5596",
            "urls": [
                "bzzr://0d5c08df01411587fe19f4b2ebbc4b7ee29f6a83fe4eadbc3aed82f75016b419",
                "dweb:/ipfs/QmTWXoqiTKipXTRv6USmXpVPwqase6qqXiL3hza8udMAnV"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.6+commit.69233c37.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.6",
            "build": "commit.69233c37",
            "longVersion": "0.8.7-nightly.2021.7.6+commit.69233c37",
            "keccak256": "0x4edc70c69cea5ffc48f7c60c4b4bb9a88108da6c0dcd9c9f3b851fdb7d8bbff9",
            "sha256": "0x806840f8703be639bee5fa248f23a3522333340e51b4b9f2f2f12991c9a33aae",
            "urls": [
                "bzzr://3539a51ae1dd44c20299818c877e09811e4dedc7e44403a1726b3a5c1064deb4",
                "dweb:/ipfs/QmT57K75ydFsz4bTuKC6JrFXcYgZJ1AUKAdk227Pp41N4z"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.7+commit.46514ffa.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.7",
            "build": "commit.46514ffa",
            "longVersion": "0.8.7-nightly.2021.7.7+commit.46514ffa",
            "keccak256": "0xafee76254b2a4c3d7e4793377d921e5507584a3db82f8d1578f33d3093cc03f1",
            "sha256": "0x6c6fceac89822699d73e46db2eb39fd392ba21e7a8bd2aeaf8a181d8d98f6761",
            "urls": [
                "bzzr://68f775dc368ffebf467f4f3e343f26bd3a440454fca41ea289f8eab4e8a207c4",
                "dweb:/ipfs/QmUx2VBEitVdnahF8jARhSJ8aidKifwT9S11Na818hrLuD"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.8+commit.c3fa520c.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.8",
            "build": "commit.c3fa520c",
            "longVersion": "0.8.7-nightly.2021.7.8+commit.c3fa520c",
            "keccak256": "0xfe29c020bad23efc138dbdfd2e539ca06363c976c4cf7b1df8a7d693ff6a839d",
            "sha256": "0xc57298d295e17609e661598ebb97cc8a798073bbc0e6733225ffbf02a7b5da36",
            "urls": [
                "bzzr://739bf73fe4b7eaa3cce8d5756c313be367cb403e8ee1b078a74cd36dfd03234c",
                "dweb:/ipfs/QmRge8WmQKKN85E3Zc66DttZuF5dwhegRu2jQLWHWitmZB"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.12+commit.ef6ad57c.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.12",
            "build": "commit.ef6ad57c",
            "longVersion": "0.8.7-nightly.2021.7.12+commit.ef6ad57c",
            "keccak256": "0xe7ceb192cca61e5a0c5d0f5eb10475f2618d325a1150242414fcc22eb65985ad",
            "sha256": "0xf82b48c7c8b0b35c91865a09ee7467f843923f69a9eb94cf154181861bbbb241",
            "urls": [
                "bzzr://65973f916c284c2ace27d2afe7b7483233b00f86313e390423d67d78f8b6baf9",
                "dweb:/ipfs/QmQ1567je6h6J4BPWC1KGzvZQK1nrc6GZ7cjgU2PUetyob"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.13+commit.57d32ca2.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.13",
            "build": "commit.57d32ca2",
            "longVersion": "0.8.7-nightly.2021.7.13+commit.57d32ca2",
            "keccak256": "0x45b5e77c9e3795e7aa08bda3a23399bd9ac1f4ffbea03f99b6a574e51af94a67",
            "sha256": "0xc3b920f1d9a5da0aa391a75039d14c654abd31354931eafc5ad1f489d41e8959",
            "urls": [
                "bzzr://9b1ca11dcbc85bc6ede615b9395f5118c2b6009529bc55539b9a7cfec0c37c4c",
                "dweb:/ipfs/QmPnVBNQj7H7QwfQBDQrfp3juHSSKbtFr9WJPWifvbVZbT"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.14+commit.90f77f8c.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.14",
            "build": "commit.90f77f8c",
            "longVersion": "0.8.7-nightly.2021.7.14+commit.90f77f8c",
            "keccak256": "0xab9165665669b2673884a2e7ed64e35c01457352cc709838920570868fd32ed4",
            "sha256": "0x222f3cd5b8ebbd6e433e73f4bf15168bdf51d564a64b0eec3b5423337eb40c07",
            "urls": [
                "bzzr://2d1ca39909f6b77dd1520957dd866296f1e2645c1cf5cef2529b9b14071b8742",
                "dweb:/ipfs/QmcyBuVvuP41h1doYqS51XugYM4w2zL7XsM88et8dUcSBP"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.15+commit.3d26d47d.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.15",
            "build": "commit.3d26d47d",
            "longVersion": "0.8.7-nightly.2021.7.15+commit.3d26d47d",
            "keccak256": "0x445ef3fb3bb640844fad7f13c4e41fcb86ebc77bf014d43af7790d0f1a698fa5",
            "sha256": "0x5e94faaed7a49b28b5865e4485197c7b7d42c03ff2994df20f88282f04c5dfcb",
            "urls": [
                "bzzr://8786b7d60e4ae111d18e627c0680d1ac6c1ffaba7539450b22394d33beda8039",
                "dweb:/ipfs/QmXRozvVQBLkwegMRfDNHe6uFuUVqDtLVpCVKFKsXEv2we"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.20+commit.d655a3c9.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.20",
            "build": "commit.d655a3c9",
            "longVersion": "0.8.7-nightly.2021.7.20+commit.d655a3c9",
            "keccak256": "0x98dc39aa3ec29c4bc2b9227e1325a4ebd2a499fd8dc4f27e9ae57191e16c125c",
            "sha256": "0x0cac2dfbc54f7c6205ab66d27568f5cd1efa6fcefc1e0504c0ba39a80d438163",
            "urls": [
                "bzzr://9f555d0e24491c8d04c16025901b20ace10c6d78a3ddd5b2ebfa6e0b87056b69",
                "dweb:/ipfs/QmfJv7521XNJhntdbNeE9ZS5i87qUMHYfM5f7DzPkvRK4H"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.21+commit.6d6c9e6e.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.21",
            "build": "commit.6d6c9e6e",
            "longVersion": "0.8.7-nightly.2021.7.21+commit.6d6c9e6e",
            "keccak256": "0x8e5503cfe93a27374b984cbe34cb2ac31652c79a9d988eb1b4f129e908a89308",
            "sha256": "0x9ccc14a53ae9c546958cb222448d4b2e41abdf2d70d3ac378063418f10295be2",
            "urls": [
                "bzzr://2473c26782bc9786d070f4be1ab16596538fb2397451c286f840917c52b9e499",
                "dweb:/ipfs/QmXBbA5BgzD4pcmNL7YHJRwzTSednsafzgRpKupiyrtSrb"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.25+commit.a2ce4616.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.25",
            "build": "commit.a2ce4616",
            "longVersion": "0.8.7-nightly.2021.7.25+commit.a2ce4616",
            "keccak256": "0xd8289e591d92694d79f65ba9ce8ef9b7f774d86a4e72ed112adeb1656dedcd89",
            "sha256": "0xc3c3e57b87678c2c5e62da580a8642c21603ef6898d25ff9c40f1228605f7e7b",
            "urls": [
                "bzzr://8029980d3030f991def66546223411539e107ddf7c0dd258aa3f9394b1dbf675",
                "dweb:/ipfs/QmUN5JEXMMJpzFDMgd49ZfQXAFesaPy17sU1k8f5nVAYdC"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.26+commit.f97fe813.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.26",
            "build": "commit.f97fe813",
            "longVersion": "0.8.7-nightly.2021.7.26+commit.f97fe813",
            "keccak256": "0x2b55eb95003941336bd73da320fd1f73a701017e4d9a5b9fc61ace29bf9e5167",
            "sha256": "0xb1d15e3416d71f9ff73d813df53debbe5dd6839ed4bd78c60ee3a09cbe34d3b5",
            "urls": [
                "bzzr://84f7154168113b25762972a673bfaa08866ca1b8baa3765b103306faf06861a1",
                "dweb:/ipfs/Qma8dBaMFrQfzDxAkbrqGidjv5tiRJm6LMdc9BcRspxiuD"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.27+commit.c018cdf4.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.27",
            "build": "commit.c018cdf4",
            "longVersion": "0.8.7-nightly.2021.7.27+commit.c018cdf4",
            "keccak256": "0xb7d9535df47b449e092f5112bd51b5a5189861b999a1d48a0e0eebd3a444a6a2",
            "sha256": "0x276ef88bf7f2d35508dce8ad74afd012aaf7d23b2a7d26ad93814999eae28aca",
            "urls": [
                "bzzr://7778f3dfd0446be8b63f021a91f121e23b43d08ef46065f9529c866114201a6a",
                "dweb:/ipfs/QmXJvNjY3nMT7hP33B9EmSpAGRV6v1CuQsYuoZ2Q8KRCzX"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.28+commit.1794e1c8.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.28",
            "build": "commit.1794e1c8",
            "longVersion": "0.8.7-nightly.2021.7.28+commit.1794e1c8",
            "keccak256": "0x1745bb165fc451bc62a24faa3b721cbeaa410f12df57c9a5fd9073ebd6639ed6",
            "sha256": "0xa597ff29588a3461435d5cc09f3790f712adb0cd7aa5af763405b577e4e0ba72",
            "urls": [
                "bzzr://050e62153c2bbf3e5596fe469c3d2ec4c3d259b74e864374781e5fbc5fcb4d9f",
                "dweb:/ipfs/Qma676ssC4Ryc5sNSJ74HJCQ3NbZaSVXbv4EQ4n7RCsL2x"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.7.29+commit.5ff0811b.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.7.29",
            "build": "commit.5ff0811b",
            "longVersion": "0.8.7-nightly.2021.7.29+commit.5ff0811b",
            "keccak256": "0x560fbf0908f1888636791f449023ba3b117bbff84a019317e88f954fc27db3e7",
            "sha256": "0xdcd1b7b65fe1c62c7f4d3f55d8cbd126bb0bcd3675576648e96836df80855b9e",
            "urls": [
                "bzzr://d3a401214d5d789ec6716347d7006b0ffdbb0355458ce3e2e60e59a1168df202",
                "dweb:/ipfs/QmPB3gjLoiG1XbnroPSNpuUgNaDz31nopHneLv4ixe7ATT"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.8.2+commit.e9cab0ff.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.8.2",
            "build": "commit.e9cab0ff",
            "longVersion": "0.8.7-nightly.2021.8.2+commit.e9cab0ff",
            "keccak256": "0xb4cb106b829dbd9ff49018ed9645d714ac91fb2f35af3bed8a04b52baa2d299a",
            "sha256": "0xf4874d377b9a8661de6e0f6269792c82ad5d0d086d85a9301fdaabd7f3d60073",
            "urls": [
                "bzzr://3e510f297af9aa766379ee674cb8b561184acdddf24621e96be23c3c34983b09",
                "dweb:/ipfs/QmXYRetER2Li3i2GGAbgCwH1WocL6cN22hUa6VRjwkbqDe"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.8.3+commit.ae519c12.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.8.3",
            "build": "commit.ae519c12",
            "longVersion": "0.8.7-nightly.2021.8.3+commit.ae519c12",
            "keccak256": "0x1efef014903b8d81443205f25e5e2365708e10ac2c55ed0fde05eef85baa974b",
            "sha256": "0x77d408647006841c09d6f15667a636e09ed22b38b38bc66fc9c3cc4f551eeaac",
            "urls": [
                "bzzr://e23b6ba55a07c2abeeedb0cc60ebdf333a648fab6683bd387ce03a2a528cd44b",
                "dweb:/ipfs/QmbjWRDJ2mzPqP5ADsptdMDNQ2K3eGyqcovn5akNhZBXVj"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.8.4+commit.2d5b9036.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.8.4",
            "build": "commit.2d5b9036",
            "longVersion": "0.8.7-nightly.2021.8.4+commit.2d5b9036",
            "keccak256": "0x33379658780fcc6713009ea00834ecdb967d326ceabfe3ec2690e5c562095f9b",
            "sha256": "0xf076773d5ff0718a9509b77189cea4c50fc671b26c6feab9bbe541174bb435f3",
            "urls": [
                "bzzr://b0b898c9fa094be188b3d4b3a2db3f5b40360be2fadd3320abbc4567fa829240",
                "dweb:/ipfs/QmYE2udYzmiCvq62swzaVcgZFqBYnLauqfSUm9W1NNjNF7"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.8.5+commit.a532df20.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.8.5",
            "build": "commit.a532df20",
            "longVersion": "0.8.7-nightly.2021.8.5+commit.a532df20",
            "keccak256": "0xb0549200deefefcbf0418abbc3aee5af6e1e33a1f046a299c8d9c45b85b752ed",
            "sha256": "0xcf9929031281574d13480d8bbb6cad57e5b5e623ff7e962397691dc9b683151f",
            "urls": [
                "bzzr://09ead148419767ae30f5d4269573f977fd085f8c8d04c71b9ca46da3f46b967f",
                "dweb:/ipfs/QmR5TGXz5g1EcQeU3yZrDVhPM3T5mSckQWubSwDUDFoPCc"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.8.6+commit.ce0e0c48.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.8.6",
            "build": "commit.ce0e0c48",
            "longVersion": "0.8.7-nightly.2021.8.6+commit.ce0e0c48",
            "keccak256": "0xf79615cb7477e910dd6d152b85366bb00254e9b5d0f829db9dd99135fd91e103",
            "sha256": "0x6f26e222752105b2f2c05f08cdba8b32401dac54749eaf39460e2bd85c5e3867",
            "urls": [
                "bzzr://78930769cfdc7b7d4984bc87662f3666f727d346cc0c7582fee59ea442f36e76",
                "dweb:/ipfs/QmWR1DN9gqE36UmzLt1mp2NqcNQwM4RfNm9eh5ZV1569Fr"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.8.9+commit.74c804d8.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.8.9",
            "build": "commit.74c804d8",
            "longVersion": "0.8.7-nightly.2021.8.9+commit.74c804d8",
            "keccak256": "0x050abe653b5034cf8d1326e64dbab2c0772cca216b1ddff9700005f0b687a06f",
            "sha256": "0x2d5afc5b27f6d1fca1dbdccf1dd4e9807b7551b9e8236698646e36f04e70c0ed",
            "urls": [
                "bzzr://76c748a394dea2fefe8052b7bb27aeb0af332ed85c98c9d9a2fc2030dc7facfb",
                "dweb:/ipfs/QmRG7F3T9eNxRfQrCE1i3Wjdt8P5rPnVfSs2jgJDdnAW6Y"
            ]
        },
        {
            "path": "soljson-v0.8.7-nightly.2021.8.10+commit.13b26949.js",
            "version": "0.8.7",
            "prerelease": "nightly.2021.8.10",
            "build": "commit.13b26949",
            "longVersion": "0.8.7-nightly.2021.8.10+commit.13b26949",
            "keccak256": "0x0e469a1571e2aa66433143c5b9b3a20784b108c2c6ec431eb378556dd50a0b5c",
            "sha256": "0xc92e6827d0c8543a596b76622a00ddcd9326a1937ac57e931b276edff0e5a289",
            "urls": [
                "bzzr://e575400fe9e530c5ee3b23a6a9566a00141866fd423c4f9a11fce284aa95519a",
                "dweb:/ipfs/QmddqWhRywxKfonhdEMJgK2CPoFjfNftcYSW72DcVyMXRR"
            ]
        },
        {
            "path": "soljson-v0.8.7+commit.e28d00a7.js",
            "version": "0.8.7",
            "build": "commit.e28d00a7",
            "longVersion": "0.8.7+commit.e28d00a7",
            "keccak256": "0x8d6be9e58c33d265b5a8b1132a27fce126067419f3f4f15d3ef6b7147593b61d",
            "sha256": "0x663ba99f7c7ee907f0f03227502d48a78256c3c292ace3b79a5d3eb510665306",
            "urls": [
                "bzzr://0bdbad1bdcc3a9775f16f20a35556be4baa0e6c9a9b9d820e8e2cdea80667c6a",
                "dweb:/ipfs/QmYv3Rsi9pL6PZAtc4XLHezPqti8yCRGEdDBqzEsQv57GV"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.11+commit.cc4e24c2.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.11",
            "build": "commit.cc4e24c2",
            "longVersion": "0.8.8-nightly.2021.8.11+commit.cc4e24c2",
            "keccak256": "0x35314a2dbf71cb70a7d33d917f190afff338ddfa6ed848a5ee37dae3670c8c2d",
            "sha256": "0xbb76ecf59eb837d88cd6ddad9059fe7d8c26e58d936a5934b7bab377e84a03d0",
            "urls": [
                "bzzr://2659bba46717d61a964563bfeaa3579583ec1a589c25dfd13860283a2e66e5b1",
                "dweb:/ipfs/QmQnsAfXwk4TqVCwwJVZmjzobxBwHmBhLMrrLdMAhbp5oU"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.12+commit.4fdf7db0.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.12",
            "build": "commit.4fdf7db0",
            "longVersion": "0.8.8-nightly.2021.8.12+commit.4fdf7db0",
            "keccak256": "0xee9cc3950896d787e48c8d7c1e3b22e18db80dfa659ce27e24543d8bba060afe",
            "sha256": "0x6d7b6068b2bd7ecbcea0878ca19e7b5d8fb9b9b7744671cb5de38ee88be1ae44",
            "urls": [
                "bzzr://3562d9fa2765495bf2c2693358b8c79fe7bc1b4ee93a6c507b3dbcdabebd34d4",
                "dweb:/ipfs/QmUvZdfnmtVfJoVcQT6pV4QCD5HnyUEkXXMemmqbcFdJ2B"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.16+commit.97b4ff15.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.16",
            "build": "commit.97b4ff15",
            "longVersion": "0.8.8-nightly.2021.8.16+commit.97b4ff15",
            "keccak256": "0x2a50c6b7c869450404e83a5ff8698c6efddb89d8c703bbb41e1578f42a3f8c2b",
            "sha256": "0x985d396862e79aff8163edeb0a1450d1935eaa1935d0249eb7ad45df0f2e1b06",
            "urls": [
                "bzzr://e09d79f13c32dc601bbf2405053b4e8cfbe96ea8f1064226f72b38dafbfd85db",
                "dweb:/ipfs/QmUxDGfkyMprTNHGMh2BoXH8pTN3LWGrMpi9sgi9XA1UPb"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.17+commit.729db521.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.17",
            "build": "commit.729db521",
            "longVersion": "0.8.8-nightly.2021.8.17+commit.729db521",
            "keccak256": "0x26800ffe0a6aea0601f73f3675a059ac2cd817e01d5f72c14d611479d05e632a",
            "sha256": "0x81b42e8562e00ce23ae674424eebd73773bac7d6d8dff3822e056e1bd43013c0",
            "urls": [
                "bzzr://1c59229b9ae3d4b1d4f852a6c7de4298477bf5947ac110cce8187b4e197ba855",
                "dweb:/ipfs/QmfH7cSpg2JTLzEMAebQdPHraBbr1azvBLN5hgdDRCkuwT"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.18+commit.cef0f1b9.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.18",
            "build": "commit.cef0f1b9",
            "longVersion": "0.8.8-nightly.2021.8.18+commit.cef0f1b9",
            "keccak256": "0xd74c4ec1f160d84404d0f897d36871929bb8eb3a73c9ca0c45766237a758bfa7",
            "sha256": "0x8ae7f59979ba3f4f0c3b48fc3e9b8420b440635b6586ddf4012a05399a432668",
            "urls": [
                "bzzr://8bf197b084b44d1bf256aba58c0e2ed1befe13f178051f4bea490b336339f397",
                "dweb:/ipfs/QmdrSWkGQesrDEQzb4aMrjxZdY6AHaVMaLUYmmDezkZWbN"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.19+commit.26207968.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.19",
            "build": "commit.26207968",
            "longVersion": "0.8.8-nightly.2021.8.19+commit.26207968",
            "keccak256": "0x3392e7f5f9715df5e803765fc2ffb1ca687ca639363a5769cea96056dcdf7cdb",
            "sha256": "0x02805fb644b1b863cc6ad352c44f893e2e037d342724019746854b1828d06478",
            "urls": [
                "bzzr://272ea9871f7c150ec7e46866488068f58f9ed5967a1581c310a8ee1d560015ab",
                "dweb:/ipfs/QmUpDW67wU8FGXboNQXtzcrwvvaZFNWS5Lhtqzni1ac7YW"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.20+commit.6b7857d5.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.20",
            "build": "commit.6b7857d5",
            "longVersion": "0.8.8-nightly.2021.8.20+commit.6b7857d5",
            "keccak256": "0x37b9a0bb3363e76ff2f3d4cffe6a26b9905440a1b9a41c15e5fb47f0fe185230",
            "sha256": "0x95952cc07eede5331c15c4311de7adc9073767dec10ab5ff34cca5049f88b51c",
            "urls": [
                "bzzr://0a9cafe5f42462dc2ac7bc86a7c2867f7074a518cb4aeb3d03021be232c990e7",
                "dweb:/ipfs/QmcpgCAsPtX3gSSacKpBrcVDRtutoTNuLsNQ5dfaPdfaZ6"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.23+commit.a39eb7ae.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.23",
            "build": "commit.a39eb7ae",
            "longVersion": "0.8.8-nightly.2021.8.23+commit.a39eb7ae",
            "keccak256": "0x8b7ae6153ca9221b0c1b05fdea399d05eb38996cff3dd5b9134dc202e1458d86",
            "sha256": "0xc1b318bd4d8dbd22d584d7a73585a3f908364f22bb889071169bff8a0bb45172",
            "urls": [
                "bzzr://5daff62479dfdda04bbe111066a9e6858cd601c52fd2662f27176947e86715b7",
                "dweb:/ipfs/QmYRBADFwTWstSYAJ9VoMQK84WaCPbAjzsTurdQqjzMDze"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.24+commit.7a0295ec.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.24",
            "build": "commit.7a0295ec",
            "longVersion": "0.8.8-nightly.2021.8.24+commit.7a0295ec",
            "keccak256": "0x40b7d096aa53ddfe8e6fb1d5ed34494172bb1f2fcee16ad54f0f467858d4bff3",
            "sha256": "0xc82efe8a8e16491d7996e14279d71f0a9471f812a5aac050c86d15ee5c0b1796",
            "urls": [
                "bzzr://cf06637d094488e025487abd4baeb6f86a4ca32e117d47f50c5cdc795237ed94",
                "dweb:/ipfs/QmbKSubRo5npQ5PHLkygxakWqsWBFB7mBmdfFkd6hyZzBi"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.25+commit.208cf6a3.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.25",
            "build": "commit.208cf6a3",
            "longVersion": "0.8.8-nightly.2021.8.25+commit.208cf6a3",
            "keccak256": "0xa78f58c1c0693596873319a472fa899cd0b2c0808bcf773484de624b979a5520",
            "sha256": "0xb2a26c297fd8794619212615aa849e33640a3f697b5477b923f410d0477c3b25",
            "urls": [
                "bzzr://2b156e4c44424700f8015fa8fd4a95641558a21d96244ad48ced02cb6a042773",
                "dweb:/ipfs/QmRhvKu3brteKUMzERwWHSSETuphMcZFhNgESwaXBAseA9"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.26+commit.7df33f0d.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.26",
            "build": "commit.7df33f0d",
            "longVersion": "0.8.8-nightly.2021.8.26+commit.7df33f0d",
            "keccak256": "0x6aed552802e9760e99c76a59d7eaddca3c09215c864550c37c654680b9e38f27",
            "sha256": "0x010d3f094cf0f0972924ef720b4057bf1755701fd086a54781f545f9e0726a10",
            "urls": [
                "bzzr://d0b86b765d3713d4f2f727ea9119f43f3d9063e6fcca1d2166e20fe23c27277d",
                "dweb:/ipfs/Qmbg6WhK2EXiV2yWGUuUYvw57F4QqtqSn52P4Wt92otUQ4"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.27+commit.a3d8da25.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.27",
            "build": "commit.a3d8da25",
            "longVersion": "0.8.8-nightly.2021.8.27+commit.a3d8da25",
            "keccak256": "0xdcb997044de21fe80101833f9cb6527ee25c8d5e5e9ca02d975821fd7c6b13bc",
            "sha256": "0xcef8cdcd40fe8e66adf4bfcd0377ed3da6e5dae048ac1e20b0870113dbd15058",
            "urls": [
                "bzzr://d0a8527b289f6f5964e360bb7e3810ff5b83eadeb617d0c54b3300e8764e8844",
                "dweb:/ipfs/QmZXnXZVFhvK9wb7gzDaN5mVbDBhvWTjDWHeguMpupG7wt"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.30+commit.78afd71a.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.30",
            "build": "commit.78afd71a",
            "longVersion": "0.8.8-nightly.2021.8.30+commit.78afd71a",
            "keccak256": "0x32e6b88af5549bc052749e2ad3f9aa287a08c5904c7de6f474b8a6c3ca1a8cbd",
            "sha256": "0x7ebfadcc43a421bdf3c20d769a197063586a74a5557481036221ec9430f0ac87",
            "urls": [
                "bzzr://811b2eeaa62698d4c44cfbc2cee92ed156c804f028dcc7bc4482f4b1998cb291",
                "dweb:/ipfs/QmfN21UYWJo1wF7x57uvQcGshTahLKirmrRBsv9Yq8KgF8"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.8.31+commit.1e334a89.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.8.31",
            "build": "commit.1e334a89",
            "longVersion": "0.8.8-nightly.2021.8.31+commit.1e334a89",
            "keccak256": "0xcceed635ce31f1b2dcae91ac48b09106e89fb50f9bf5edce930ee0b0ec3143eb",
            "sha256": "0x701cd415858e8fd62cf367787b38f9f4fa8d2fcafa27e895e77ea0bcb32405d5",
            "urls": [
                "bzzr://3fef1c0355c1c4f45302fa3ab047d7b14a1beae9b8fa6ce796d4be9511643cb3",
                "dweb:/ipfs/QmQR1iqgdPAtDVWLY5MYmdXb8vMHHkYm5be2SF9FHnFEb4"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.1+commit.70fe0c65.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.1",
            "build": "commit.70fe0c65",
            "longVersion": "0.8.8-nightly.2021.9.1+commit.70fe0c65",
            "keccak256": "0x5fb9b5fb6190fe30f103aaabe4a10262f100e49df1fbdeef5744b2fd8ef97043",
            "sha256": "0x74341af2ebe10a5d3da249840db4457b835b1459cd19914af236b238309b3051",
            "urls": [
                "bzzr://64a962a4d626cf5b7a57abc5b426820031a3e5a3ba9a9abd266217ae65ae97ff",
                "dweb:/ipfs/QmVXWA1vBmwbGpUPAbj1SCBVY9JfMhjWH36F3qFnHV27q9"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.2+commit.7f137d35.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.2",
            "build": "commit.7f137d35",
            "longVersion": "0.8.8-nightly.2021.9.2+commit.7f137d35",
            "keccak256": "0x21c6dfe3480a854d63289fa9ca9050134ba981aeff51dcb634af2a5b61e9206a",
            "sha256": "0x61f29ee584209207224082de39fe51cfc8da8bfa6a7999089a3462c2916b1fee",
            "urls": [
                "bzzr://10b6489809950a5b9403016289d4179efec2c4c3d6d3356c38e11784f857fa8a",
                "dweb:/ipfs/QmPeRuniSVKdQsubL6vjWyWsDeSH76UWQLXLd2TzTiqdAx"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.3+commit.8447b32d.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.3",
            "build": "commit.8447b32d",
            "longVersion": "0.8.8-nightly.2021.9.3+commit.8447b32d",
            "keccak256": "0xea512c6206b2f246a6e47249fc29c8628f55d38ec02a759199f5d12293af7cb8",
            "sha256": "0xcd0408296affd965c2f6c685114c57e39722cd350c68053e9afc5cb1ae01d98e",
            "urls": [
                "bzzr://cc65a0efa06ec1b6dfcf2915adcc07f7ff0166325ab63c673620979290e9d92a",
                "dweb:/ipfs/QmV6M6mypksdotqoi3Win8UkJS2FwcCKpYCE9E7HWAhUA8"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.6+commit.11a85059.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.6",
            "build": "commit.11a85059",
            "longVersion": "0.8.8-nightly.2021.9.6+commit.11a85059",
            "keccak256": "0x6d925a976c8e669ccf2291a41dab94a2aa9943dee09758ad21c6da5bc6c6ac45",
            "sha256": "0x45ced6081d6535aac1285136872482facc49015ffc51963336e49e68adf99782",
            "urls": [
                "bzzr://75de0d519e588f546fb8d554444bffcf1a9a87cd90bf2ef6cebcf66a9459b832",
                "dweb:/ipfs/QmeNd5eYf1HmejGJLR6E8Xnooxhc5u6W89f8xxypsDFwG1"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.7+commit.6feed460.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.7",
            "build": "commit.6feed460",
            "longVersion": "0.8.8-nightly.2021.9.7+commit.6feed460",
            "keccak256": "0x835267015822d6847c583a1b007aaaea8a68b00d6a6ff275780b9e24cdd50542",
            "sha256": "0xd54e008568a41a72d7f4df6fd8222c1f5f7a90a149ca5ea010c3aa27f9d7caa9",
            "urls": [
                "bzzr://53516dd02764e31d0b906c4a3a24c4d42ec835d971ca80a211a15454e3688a15",
                "dweb:/ipfs/QmYo9c6qyXigffU3a2dsvy71ykvqEZ6Nm8jpd8ESDGZg9s"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.8+commit.dae6b53c.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.8",
            "build": "commit.dae6b53c",
            "longVersion": "0.8.8-nightly.2021.9.8+commit.dae6b53c",
            "keccak256": "0xac9ab543505cb91d3ac7b57bc0afb4e78888f9f68b9146432be3bf5296a6a703",
            "sha256": "0xd1b83b7d2f49e813df5338687c341ddaf8be7b47a0490518458fd1e79e62e9de",
            "urls": [
                "bzzr://6493fef25af2df9d671f90a8b8950aaa325c067b410acd570523e3333cb510a1",
                "dweb:/ipfs/QmRAVGzfddeZFRpuScgC3qRBcaGdGJAP5jjqF6hN5Dgu6W"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.9+commit.dea1b9ec.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.9",
            "build": "commit.dea1b9ec",
            "longVersion": "0.8.8-nightly.2021.9.9+commit.dea1b9ec",
            "keccak256": "0xffc5aef94da8a106a8c53e52b246ef6846c3bb9b0912ed4f8b1a73a626131d92",
            "sha256": "0x7a06c17861daf9a3046b6fe90371ebc2d785fe0fe53a086e51f823b46b3f6cda",
            "urls": [
                "bzzr://6283edfe37ad5f885f97aaca45131065fbadf4a6eb6d228a2dea8477c119d4f2",
                "dweb:/ipfs/QmZNefhptFw8PZyVQbwsY5VjnngqKLi4kyiP2KpJMF9HDB"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.13+commit.49cde9d4.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.13",
            "build": "commit.49cde9d4",
            "longVersion": "0.8.8-nightly.2021.9.13+commit.49cde9d4",
            "keccak256": "0xe87d5c3dd09bc85f1228b10bbc4a884c2dac5aa82cce125705d929125730e914",
            "sha256": "0x04c112ca1d255fb3cb61c2b202d99f2dddcabca8ff482bd1a020de3a2881cc5c",
            "urls": [
                "bzzr://e6cd64032be5334176da8018ebc9e99f59c4bd8a28387b27c7cf472ecbeface8",
                "dweb:/ipfs/QmeV8JDS3CER5kwdGSFywHoARC9Y1Jbrs9mf29bMdXH4w9"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.14+commit.0fa24c78.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.14",
            "build": "commit.0fa24c78",
            "longVersion": "0.8.8-nightly.2021.9.14+commit.0fa24c78",
            "keccak256": "0x031bb02e5ffcbdf3a97c14a2a20727612e62d44edc9947942456185845eed614",
            "sha256": "0x92858e382dd253c7feeae383b5cbc6f84fde243986d561fb34808c1b58084b98",
            "urls": [
                "bzzr://28928be05772d01e4b077793e0ee525747adb00c52fc0fad29b69e14cf54862a",
                "dweb:/ipfs/QmUw1QxWynzfX3xWppmhrqcLMgUikzDDos5Zdyas41LJAW"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.15+commit.c1070fab.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.15",
            "build": "commit.c1070fab",
            "longVersion": "0.8.8-nightly.2021.9.15+commit.c1070fab",
            "keccak256": "0x3fa6bfaa3de28e6d0070672e7be6497cc5ba5895ac5f39623a655c4451be84b1",
            "sha256": "0xcd87baa9daf569c2169728e19e5331900566b7d2bf3aebd50bcdee4f90e53087",
            "urls": [
                "bzzr://d58f63a5644b1caf7ea9c11617aebaeed5fef100deb4ff434123f77f723f2688",
                "dweb:/ipfs/QmbLfTHjjtMAJUaYcUEpn2y3K31aMf3fNKKge148AnJh5V"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.16+commit.7877758c.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.16",
            "build": "commit.7877758c",
            "longVersion": "0.8.8-nightly.2021.9.16+commit.7877758c",
            "keccak256": "0xce61002fa6d826cdf0c4ad82bbeb549129dfe786c1cb7a4113e77cbab42bcddd",
            "sha256": "0xe16386004687b5d06a78ea999dd65c812f8468bacd2457d09b1c526531860038",
            "urls": [
                "bzzr://b0aae157f30689108630a14cfaf69b8b576a20c54b172c1d64b3a7e0174efdf2",
                "dweb:/ipfs/QmceG2DcBog8RmmFR4q9JvUczMDkoKtn2SyXKrdzkuk9RL"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.17+commit.d7ddfcc6.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.17",
            "build": "commit.d7ddfcc6",
            "longVersion": "0.8.8-nightly.2021.9.17+commit.d7ddfcc6",
            "keccak256": "0x47c2a7830a544ca0a21430d9494ce1e4db85930489b0be6b93276dec07b4cedf",
            "sha256": "0x9feb2b571d8e549bc76edcc16301a426501be9fbfada94c11e071d9c0c8bebbb",
            "urls": [
                "bzzr://dbd484798dd03be577d4ad7749f494cead5b987868b24f5d06bbabaee1aa3d3f",
                "dweb:/ipfs/QmXxiAqBXqfMhz7KCJHnTppgCydudvhehd2MNXvh77Kgzz"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.20+commit.2c3322cb.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.20",
            "build": "commit.2c3322cb",
            "longVersion": "0.8.8-nightly.2021.9.20+commit.2c3322cb",
            "keccak256": "0xf57f46032a7bb10cc863684ec92b762c014853fca6d91240991bc109c20a7b8d",
            "sha256": "0x5339b55650eaca41367e23dc31ec8129e921ba052e13008d3a0de1f0682edf51",
            "urls": [
                "bzzr://fd7358537a155b1dea8378bb4fb16c0ded35a44fe0bd3c0d8835da0ba4363a56",
                "dweb:/ipfs/QmQWtjxHJGCJFBpsDoSDCsSX51J3N9CjQEQvV1MAuR5Fd6"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.21+commit.fc954367.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.21",
            "build": "commit.fc954367",
            "longVersion": "0.8.8-nightly.2021.9.21+commit.fc954367",
            "keccak256": "0x0cf275ea2f84e4a741a72e4dc2ed9764ae15c2d57cade49c93a1bf9f983fde22",
            "sha256": "0x48ec0dddaeba9095a1ab3cf192eb0754b49c873e6adac114ced1e787d37a0c63",
            "urls": [
                "bzzr://25f5a3968a6f8c027893b53983053bd8cb7249d1c1a6f2a537cee58f1c618ac7",
                "dweb:/ipfs/QmdPvEPNUfArBC5WRpHMSm4GLfvVmLcJdiD3PMRki81PLY"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.22+commit.72fc3449.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.22",
            "build": "commit.72fc3449",
            "longVersion": "0.8.8-nightly.2021.9.22+commit.72fc3449",
            "keccak256": "0x1ec8b8ee45bad6482ca8b468a361a62d82f8c62c50ba28f46570b1947d3a3104",
            "sha256": "0x2c3bfffe524ea5307bc9325e6ca9ea8ba64e9b159d23ddbbe69ea6f9aae7ba23",
            "urls": [
                "bzzr://fa4b122a3111fcb08898926840a6fef3011a571a508c58b6a1621f60b1628bc6",
                "dweb:/ipfs/QmSYncr4fbo5irr2jBCbMZYLjLSZvFBAUntr5MXZYbArD4"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.23+commit.55467c1c.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.23",
            "build": "commit.55467c1c",
            "longVersion": "0.8.8-nightly.2021.9.23+commit.55467c1c",
            "keccak256": "0x47d429168fcb439822be95eec04d966f3780a31477f8c6f5edf009346f9c5284",
            "sha256": "0x3fb0cbdb5818d44cc5b209998b6757ed1e3aabebdeff94802cf62f4a143cb968",
            "urls": [
                "bzzr://a92926cc4ed4261e9ec1ed5a90c44de421b0ec01a1e0cc121fc2d1e383627010",
                "dweb:/ipfs/QmQpncgmgYGkPtZLHKkpcd1opc5t56FefHBs4ZmBqASnMV"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.24+commit.3c8846e6.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.24",
            "build": "commit.3c8846e6",
            "longVersion": "0.8.8-nightly.2021.9.24+commit.3c8846e6",
            "keccak256": "0xf1bade81b24046effa9b17b8fb418c5f39320bab553999534d44ae518121b6a8",
            "sha256": "0xc13722abc1a98a18220ed75063b68124032d5be2d2308803498a80f85f0448ce",
            "urls": [
                "bzzr://141d58df4109dc1c446cc138ccc0cfeafc3fcd073cbededa05fa2a7a1b07a05d",
                "dweb:/ipfs/QmU5iJGFZcaz6CnvUTKaCK62PkTH3oLvSxCEMYV46Gk8Sa"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.27+commit.c3ef27f3.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.27",
            "build": "commit.c3ef27f3",
            "longVersion": "0.8.8-nightly.2021.9.27+commit.c3ef27f3",
            "keccak256": "0x9c6d474687cf27ce9333503578f7cef807bd4b6d57e8f40fe8395a450c57bdc8",
            "sha256": "0xaebfbc6916cc99fae3f976b6536612d1eb1bed133e7cc14c4a30d44388e13e80",
            "urls": [
                "bzzr://029821defe237537439cc8ea4165118b1278672e6d5de2576280e7248e26d026",
                "dweb:/ipfs/Qma6qpvjNBiEtb1r8Qe2MVCC8cAfAiUutJj9W91uZeKqnn"
            ]
        },
        {
            "path": "soljson-v0.8.8-nightly.2021.9.28+commit.89d959d7.js",
            "version": "0.8.8",
            "prerelease": "nightly.2021.9.28",
            "build": "commit.89d959d7",
            "longVersion": "0.8.8-nightly.2021.9.28+commit.89d959d7",
            "keccak256": "0xf61f3f166582fec79c07e820c8b7762463274f53c2e4cecfc105555affd268ea",
            "sha256": "0x9e2ed87e283302d5913105bd4fb6646cda5c286260f41544a7d04108c57cfd25",
            "urls": [
                "bzzr://76fdda27b0b611aab3a3147ac4b369dce6ecff16b6dc017f11c28d0ef8d3c780",
                "dweb:/ipfs/Qmd8ueG76LgX7NvNEGWFKspEq5rUCqc8FmdaNj9ZX6jwhm"
            ]
        },
        {
            "path": "soljson-v0.8.8+commit.dddeac2f.js",
            "version": "0.8.8",
            "build": "commit.dddeac2f",
            "longVersion": "0.8.8+commit.dddeac2f",
            "keccak256": "0x56cb2f6978bf1213982ef217ee76b39dc97b6e66c92a7be7a1b44079c0236e5c",
            "sha256": "0x534b7d4079d13bb4cd10b7559dc105c2adec625df4105f20ebce47e6da60bfda",
            "urls": [
                "bzzr://7543aa16521848b06a1359afcb9dbd7be1dd09a36f4ca53edd3ed3a512a475e9",
                "dweb:/ipfs/QmZaSrn3TPvPVoShtjSonQLFd3BV6RdgRMqw8GTzhnKYpm"
            ]
        },
        {
            "path": "soljson-v0.8.9+commit.e5eed63a.js",
            "version": "0.8.9",
            "build": "commit.e5eed63a",
            "longVersion": "0.8.9+commit.e5eed63a",
            "keccak256": "0xbc470ab3442e78bb4d3f16c01c39b2f160f4f34eb4373efed11c234e1c7f6ca0",
            "sha256": "0x5b25f987aae32a0275fdc6c1be36cc47cf126024a04dafd8e4be39a1d1d1422c",
            "urls": [
                "bzzr://83bf64f11a09845a6eb732da08283a58f877e9227190f489c9852f790c81d0c4",
                "dweb:/ipfs/QmfFq3MvisCSUJy8N8EVsBribgPbdpTZb7tQ2eHYw7dwag"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.9.29+commit.7a9f4815.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.9.29",
            "build": "commit.7a9f4815",
            "longVersion": "0.8.10-nightly.2021.9.29+commit.7a9f4815",
            "keccak256": "0x64131808e556b5b2ecbd6516bc1f05cdaf3750a33852e53aece7aeaa8dee14d9",
            "sha256": "0xae2ac8ad81fecac8f1091eca0bc1930648101a74a1dd71894c6ed9e2816a10c0",
            "urls": [
                "bzzr://c3042b9fa07de4f63c00feaf7ee30374883fbd90f1827eb33bf7a38bdaea61db",
                "dweb:/ipfs/QmRJiSPgNQ6sJFT2yi4dqjUTAtgr3E99nC4919QNLA1zm6"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.9.30+commit.0e7e936f.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.9.30",
            "build": "commit.0e7e936f",
            "longVersion": "0.8.10-nightly.2021.9.30+commit.0e7e936f",
            "keccak256": "0x56330274899613513737957a7acd6d190df1101b8d2b1d2c37b388a0a0a6bef9",
            "sha256": "0x2d98a93fb7c8c0a884ce4ef026d2c6489a9e24ec1bf58f707a532b7270926b7e",
            "urls": [
                "bzzr://39462e1faf6cf01bc48558840b5e11822ed14014d7430472b108ebbf62371645",
                "dweb:/ipfs/QmckZHMzUGEt22JWnMKp3GwRM6TyBCH9ox6AfyKSDmuiT2"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.1+commit.d10e668f.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.1",
            "build": "commit.d10e668f",
            "longVersion": "0.8.10-nightly.2021.10.1+commit.d10e668f",
            "keccak256": "0x6369260fafd230bfa4a8230ecca6966a9257424fb1832c5b49ffadce46d34297",
            "sha256": "0x318b86649a52562631a6c79a168b5ff68f35927a550a816804e96a4e82f4ddf7",
            "urls": [
                "bzzr://c62a85080d84297aa8cc6e65c74ce9cc61b23d000d6a6e7941a7cc8e979e8fad",
                "dweb:/ipfs/QmUNP7FaWZWh6kZGVBZFjAVJcciK6M3u4i4dXNqcZX7nj6"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.4+commit.9d6eaa7a.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.4",
            "build": "commit.9d6eaa7a",
            "longVersion": "0.8.10-nightly.2021.10.4+commit.9d6eaa7a",
            "keccak256": "0x5471f1b1898627725090894429fc1ff49f3b8a25e5b5049ea29a5dcc18b409ed",
            "sha256": "0x1fedf17c40320f2fedae50067ba2f7333f42bb43b1a5b2148c696026e8c47177",
            "urls": [
                "bzzr://ea6b7ccb8a036e9c0fb40389a7f523f7c5ae5b8166d58526ff1bdbf842d0f562",
                "dweb:/ipfs/QmSWft55GQQ2LcLn16Uru86Ur2SzuWa7s1G7YDSzzXUM8m"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.5+commit.9c6ca4f4.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.5",
            "build": "commit.9c6ca4f4",
            "longVersion": "0.8.10-nightly.2021.10.5+commit.9c6ca4f4",
            "keccak256": "0xe449286d744cbfef407264c81ea9d5318c9dd97041bc0b4dd79a308c0f38cc5c",
            "sha256": "0x87dddd28a44524935f9de749406bcff3b32963a1e1cb3e749ed11188c65527ef",
            "urls": [
                "bzzr://2c483bf70d7ca448e449e6c4e6a36e32bf698f44a4b8a9fa401f78b749edafa9",
                "dweb:/ipfs/QmbbPdkvS1acYoBe3c3Z4QnAbbjdjhQimowxpLeYp9NdkA"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.6+commit.0549c42c.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.6",
            "build": "commit.0549c42c",
            "longVersion": "0.8.10-nightly.2021.10.6+commit.0549c42c",
            "keccak256": "0xa23ffd292d66c5f1e219e1069b32206ba6e7c712ff9385fa246611cd6fae42bb",
            "sha256": "0x07e268d94112e8848009a0aaf77d99c50dd904c63b8ce88d4e635b20be97b544",
            "urls": [
                "bzzr://d91b602870e759c7616a02d01cff580fc7045450ce62ed58a81456b9f3f9738e",
                "dweb:/ipfs/QmdNNexpQA17yyc6TcktsZHZb2N9DubbC3jyUXk2ESBWPC"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.7+commit.b343e132.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.7",
            "build": "commit.b343e132",
            "longVersion": "0.8.10-nightly.2021.10.7+commit.b343e132",
            "keccak256": "0x24b67d677e6dbe00ed82205c9c1aa9edd292e5955700ebe27f1f64770f31bf4e",
            "sha256": "0xb549e2eafd6c8f6ab5c5d4f28bb626a4577d748bc5c80f4e8b35a190cd9d427d",
            "urls": [
                "bzzr://2bcd3fbd87ea73ad2e977afe29466f56b7cadf2ee81f13ecf82af7027500debf",
                "dweb:/ipfs/QmQs9Df9XmSTFkEtZDc6jGfgroFarDd84FoPUp36R6zHj1"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.11+commit.b0a5b92f.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.11",
            "build": "commit.b0a5b92f",
            "longVersion": "0.8.10-nightly.2021.10.11+commit.b0a5b92f",
            "keccak256": "0x42ea2801748a5fb3f1ba16dbb6be376caefaf26b5db5b2adbb83b5e0c2dde507",
            "sha256": "0x2ed58f6207884a50523ebd25e90482d31a257f47c1111fe05aaed94c7e5cb676",
            "urls": [
                "bzzr://52dd64bb332bc3bb8e0521c8172fbf2bf9003bc210923e26191e79c10fd147bc",
                "dweb:/ipfs/QmRTAVnhpRFiRAsi5A8oKHw7sydiDCrkhbiXWWzWqVVemQ"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.12+commit.a79120fe.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.12",
            "build": "commit.a79120fe",
            "longVersion": "0.8.10-nightly.2021.10.12+commit.a79120fe",
            "keccak256": "0x1002f0ee07bd61f795c4f3193de5fbc62e9532739eddd5db96d0ab205fef16e0",
            "sha256": "0xe0262d99a166deed00514cef9d5f5f8297a370d8790c5efa900388e2691dbfc6",
            "urls": [
                "bzzr://edc15328acbb8d40a5e2817dbba5cba39bfbed843a975b01c6bbab2f2d6ccbae",
                "dweb:/ipfs/QmPCo6HjbCx6PSGo36quseLY1RqXFMdCrK5D7oGCZdBGee"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.13+commit.1deda33e.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.13",
            "build": "commit.1deda33e",
            "longVersion": "0.8.10-nightly.2021.10.13+commit.1deda33e",
            "keccak256": "0xfbb3312e8a2a7e6a397350fe205ccd702dff36f185e16f8fad6f95bc92d2fca8",
            "sha256": "0x892b0ae05142d4d99a3837af1d6817a7ac860c4b54a9521e3d9484326bee523d",
            "urls": [
                "bzzr://63a36afbbbeb7a76bef9fff6e08920162b1ea5b1fdd174bc22d54325424146da",
                "dweb:/ipfs/Qmf4PvrEyzHMyjRmcpChUE7UGQzVgQaa1jtY1goyCjVwts"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.14+commit.1e630fc5.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.14",
            "build": "commit.1e630fc5",
            "longVersion": "0.8.10-nightly.2021.10.14+commit.1e630fc5",
            "keccak256": "0x0781c1427066ca83eb590277e18edd47048fbc444189180be13de767803408c4",
            "sha256": "0x8ffe23756cb563b86b1601a1c70d0cf3d61b4f7a1d1fdd695639be0a16aa4742",
            "urls": [
                "bzzr://de0507d13a9e9998992a57f51c3a586899d63d416b94620629e671b12bd9f271",
                "dweb:/ipfs/QmVMHBG9xB5K3MxnEDhUiJREHHtzcR4FtxgWHExiYN33FW"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.15+commit.7f0771f8.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.15",
            "build": "commit.7f0771f8",
            "longVersion": "0.8.10-nightly.2021.10.15+commit.7f0771f8",
            "keccak256": "0x45d1524710b4d26a005e9ad154f57bbbfb1ec295efc1f6dbffe589dfe33c7fc6",
            "sha256": "0xdacc7e27dc62aadc0bf4a4cf874ef8fcbe40b4c89ffe7502e41b20db4b0a8a6e",
            "urls": [
                "bzzr://45dc6844a7f1ce5796c0fe848cf3cb0e1df5392c5ca12e43cb49569912f20230",
                "dweb:/ipfs/QmSLFzc2qqaxDiT81ouihnfhHqsYzH9xcmQvbfe4LCRPkD"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.16+commit.fdf3b96e.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.16",
            "build": "commit.fdf3b96e",
            "longVersion": "0.8.10-nightly.2021.10.16+commit.fdf3b96e",
            "keccak256": "0xdb71cc106246d5873f7182b6a4a8de3a51b22f1c7249b55bdefe1f6457210ba0",
            "sha256": "0xc9ca626f1a3ff82ddce2b4b46153734a57bfa77fbb452e94266db7e7c47ce8a5",
            "urls": [
                "bzzr://20bd39accc6ecf81ec76441a177430dc92aac6c28c9afaf52d192fd1bd7d5ade",
                "dweb:/ipfs/QmNR38xfKi7qHZEX7ZbVSXjaeNmJq3BCU3feVPpqhv3RxD"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.18+commit.6bca1549.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.18",
            "build": "commit.6bca1549",
            "longVersion": "0.8.10-nightly.2021.10.18+commit.6bca1549",
            "keccak256": "0x54183c56b2d0004a5e33b805b4212297848dc79113993887903822e639b95fd1",
            "sha256": "0xc243efa1bf8b5238e6f56c9f2c15f48aa4e4a21b59ed3b2ac830694d9e77163e",
            "urls": [
                "bzzr://6fcf68b2b4cf5aa6cc96d249ddf4cbf56f514ccaba60fea3bb26e051575e6ae3",
                "dweb:/ipfs/QmeneQxeZZbzjCZiTajPhxn2FYJXvJaqkHnXC7SHsqqvxp"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.19+commit.863a0d3b.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.19",
            "build": "commit.863a0d3b",
            "longVersion": "0.8.10-nightly.2021.10.19+commit.863a0d3b",
            "keccak256": "0xec7ff4d45da1b7677c2a2314a96074541f56e80296383351bbe1f201dd08eb07",
            "sha256": "0xc410b8a5282e3079c0f5faf057cdda4271d09891ec3f28194fa3e31e83b410d3",
            "urls": [
                "bzzr://21a8f65405179cf54d27cd237c5bd869d6b3a1bbd794481c86182a4ec76e3c87",
                "dweb:/ipfs/QmX6p2HSxdVQXYhaRqzVsSLZqn8AmV6RM3fj1hGyKoD4Wi"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.20+commit.ef21e43f.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.20",
            "build": "commit.ef21e43f",
            "longVersion": "0.8.10-nightly.2021.10.20+commit.ef21e43f",
            "keccak256": "0xae35363bb2f2243e155f788886f0ba46b5c3562d22942ddf088228f131bc5e73",
            "sha256": "0xfbd38cdf3c49ccabcc9aeb6dfa54b7fbbeb90ec42e5fd2c31891dca82c3daded",
            "urls": [
                "bzzr://5601194cb6ac0b02902f75feb6e100e9ff0b52606838575584b98686ded9d982",
                "dweb:/ipfs/QmcFVVDXcnJ2Ek6ZdnZW9dQJdPgYc1Tn5Jtn73ihmsmGHp"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.22+commit.3774955d.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.22",
            "build": "commit.3774955d",
            "longVersion": "0.8.10-nightly.2021.10.22+commit.3774955d",
            "keccak256": "0x6062632b6ad4582b51d9370321e2ed31d8cbaab9e9849a2e2e000d0eb7607b58",
            "sha256": "0xb322931b3f35183e0094ae2e5e8a04886141762c594c92ec8303a16893f8f4bd",
            "urls": [
                "bzzr://e38e2f10a02bec04881c031fd8b110954baa9bdc71bb8256669fb0d2509f4fdd",
                "dweb:/ipfs/QmeNpprWrpfrJGz9gjsNPQyE7oBXUuy1e6PqJk6NAk1Utd"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.25+commit.e6e30f82.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.25",
            "build": "commit.e6e30f82",
            "longVersion": "0.8.10-nightly.2021.10.25+commit.e6e30f82",
            "keccak256": "0xb49c47b7ffe42589b724b4b0c3e21471a57576628d7142c77e6d1bfe18e0b880",
            "sha256": "0x2a9372e69575feeb9343e55cfccd545f562e328f90990d7339ae8a76c63414a7",
            "urls": [
                "bzzr://165742161bef27fb5570d59975dd493628e38db52898b3a98f11083a02d2fa80",
                "dweb:/ipfs/QmfTyASyQbLb8aSbcd5S7Ak39puTutxXtP3kWuKDKmzdU4"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.26+commit.453f404f.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.26",
            "build": "commit.453f404f",
            "longVersion": "0.8.10-nightly.2021.10.26+commit.453f404f",
            "keccak256": "0x2ced2c892f879806acb379b3f933316c35838c4a195781fe6b3029c0e6c1a5f0",
            "sha256": "0xd58132bbeb46b2d0e87ae28e4b72e81572d6fce7930b6f084c2f3811becb78ae",
            "urls": [
                "bzzr://59e05906a3a135c4570cd73ffa765d67c7325d823b8efa3ee35153b037a177ab",
                "dweb:/ipfs/QmcaHUgPyuFshu8tsc7VVQx3KHUvUZ8SxySei93jgXMkSE"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.27+commit.cede3693.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.27",
            "build": "commit.cede3693",
            "longVersion": "0.8.10-nightly.2021.10.27+commit.cede3693",
            "keccak256": "0x57c16015f011bd86dedfe223e41cdd51e0c6ca6f1928228e53fc5793f21e44f1",
            "sha256": "0x976906f9d6097e224e28c7fdaf1f3d9abc90194c047e09d011a2cb7eed960394",
            "urls": [
                "bzzr://a743f29425eded2e4acfac9793942fc7630fcf60b30cd433a21042bd14959c05",
                "dweb:/ipfs/QmP6QwRmX14msTsY9bYKXfDsQpdMJGGT6aHDPv2TSTvpDP"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.28+commit.558d9d45.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.28",
            "build": "commit.558d9d45",
            "longVersion": "0.8.10-nightly.2021.10.28+commit.558d9d45",
            "keccak256": "0xcc67567d1d81f2c186b75825daf11180965bcf22a634fb57ba1952e39f1f7c05",
            "sha256": "0x0c7b7b5641689c5879abb03a550b87cf7ad6afcb836daa3bc0e75cd09387d814",
            "urls": [
                "bzzr://8059c0e4e1e521bd12ad4d4fc82ef6b0479f6c642bc6aaa36e98fef6968191f1",
                "dweb:/ipfs/QmX4ThtVXsD76h6q3g9rhe4NXNUFxneFRcRTFf94atBp91"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.10.29+commit.408bd5fa.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.10.29",
            "build": "commit.408bd5fa",
            "longVersion": "0.8.10-nightly.2021.10.29+commit.408bd5fa",
            "keccak256": "0x61699e41126e6f593e46685ddffe3c8976282982040b29d849ca4872a2aaaf20",
            "sha256": "0x8ea0c1faa5ca53571f08c1a165fb22094cbb56717380cb7c7b1a675c0b798bdf",
            "urls": [
                "bzzr://739317d051af3f1947e8d2fb8de37d616f230c4f4ff652a1c0258e3492a4391b",
                "dweb:/ipfs/QmZSZTDuroNgM3awsot31bfJSZ5JTMVFmCoXxdSkP52WCe"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.11.1+commit.5eb97fa6.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.11.1",
            "build": "commit.5eb97fa6",
            "longVersion": "0.8.10-nightly.2021.11.1+commit.5eb97fa6",
            "keccak256": "0xce97e0ab8808b6a0a49873027799e9ea9db5c8b8e4b981cc824c7cce8c928337",
            "sha256": "0x73c9e5fd0aefefb333c28b2809140346dd928e26de42280f49c5f362a1ef7dd7",
            "urls": [
                "bzzr://a6170a6c9595415e6ba14dea75fbcd9a287ada960e22070bdbdfff7e14dccd78",
                "dweb:/ipfs/QmZK5hAK71Hv4VjTDvuLZn1jBUq3xoXYrBd4jJYbGCYuSA"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.11.2+commit.a7b13782.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.11.2",
            "build": "commit.a7b13782",
            "longVersion": "0.8.10-nightly.2021.11.2+commit.a7b13782",
            "keccak256": "0x78207d66823a7eed97c23dd41ff880bbf70e04728cb74440d3bddebdd82617e4",
            "sha256": "0xbf23313f3a4f5133afeb7dbeab87e66345c1d25548219c95ae447d70bfcd0e87",
            "urls": [
                "bzzr://aebbb61358b37a7702d94726d6ecf5f79c32cab35500b98b43a99587c0841d5f",
                "dweb:/ipfs/QmerRbmj2hLE1VzeCCyFG7jhMipMJnZK17R68v5hZRJwsP"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.11.3+commit.4a49e6e4.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.11.3",
            "build": "commit.4a49e6e4",
            "longVersion": "0.8.10-nightly.2021.11.3+commit.4a49e6e4",
            "keccak256": "0xb9185a5c71bacc846e93aab1ef07c22a8ba2e12368a8f33ac97a6f79a2b2b737",
            "sha256": "0x37267f7c20858b3c1a26035c75f2363757015bc4db981cefb587c0a618b91e47",
            "urls": [
                "bzzr://92edb1d399227ae6e0bc8c01789ee565a6011ea4000b235e2561cd8f61b027a7",
                "dweb:/ipfs/QmSGLFPgJ14aq5inXWzXMNycZVUcoLnS455y3S3uCNQ16r"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.11.4+commit.dd0ff194.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.11.4",
            "build": "commit.dd0ff194",
            "longVersion": "0.8.10-nightly.2021.11.4+commit.dd0ff194",
            "keccak256": "0x2435810a1b4f04020f9ba9f3548af3dc6263ace6807481e01927152d614b54c9",
            "sha256": "0xdb7a175ccb37d0257b7ce02ca69790854d0243b0f6d3527d40480077cf180854",
            "urls": [
                "bzzr://6d139672dd17bec40060fdef926aff9f57aaa94f0c342a2c27a977a550330998",
                "dweb:/ipfs/QmRgx39mDWMNNBia3bHwra9F3aZZoFGeNnMRKVnPV3YPRp"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.11.5+commit.2f720f22.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.11.5",
            "build": "commit.2f720f22",
            "longVersion": "0.8.10-nightly.2021.11.5+commit.2f720f22",
            "keccak256": "0xf25b80d51dd22d138942bac584b397001e385a50c1ce6fce3cf33307db4be990",
            "sha256": "0x1f06eef1a2de3fc8d42883e02677f6b64b562476cbed0b2050877645f7cd0134",
            "urls": [
                "bzzr://a258b158e833012ead4285687d63dc41839c0f8bfa48adbd47e89a0e59504fe3",
                "dweb:/ipfs/QmZa3kS8HzdTPhFgSS1bbBNvPx3PGffQ3ayBs6NjvGUiRX"
            ]
        },
        {
            "path": "soljson-v0.8.10-nightly.2021.11.8+commit.f095442d.js",
            "version": "0.8.10",
            "prerelease": "nightly.2021.11.8",
            "build": "commit.f095442d",
            "longVersion": "0.8.10-nightly.2021.11.8+commit.f095442d",
            "keccak256": "0x67d457ee9a355a78af79edcf1a3f875fb8f789091d12a70c8f21bfbc705fcd60",
            "sha256": "0x9f2d1dc654c369218fceee2dd139d1c05326552105f4a978e44b9a8b6c1bc4fd",
            "urls": [
                "bzzr://350fe1bc2717ac43d0735e928feef595a4163bfa4cdc951920cf0411ee8baa75",
                "dweb:/ipfs/QmXdJJMF6j3QFwrbYga3qf9cvphZGJe6PRJFnN442fRQPK"
            ]
        },
        {
            "path": "soljson-v0.8.10+commit.fc410830.js",
            "version": "0.8.10",
            "build": "commit.fc410830",
            "longVersion": "0.8.10+commit.fc410830",
            "keccak256": "0x3820aae0de50f10f62819d65f0b5a236ccffed11ab465a3295a5408fa47e24f5",
            "sha256": "0x5eaee3240a06891abf5ac70c75caf9a0c33ebe9a2736abdaa22a337f86c22933",
            "urls": [
                "bzzr://5124a21890d6b0ae70bfd031f741d7edc74cff70a26ca74750d446b15a8efb06",
                "dweb:/ipfs/QmcsfYpEWbPXfVptzi1YvGokxi2FYCUzUr8rQYJCc5fEiB"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.9+commit.19159b96.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.9",
            "build": "commit.19159b96",
            "longVersion": "0.8.11-nightly.2021.11.9+commit.19159b96",
            "keccak256": "0xb20533462a42a87e8d5e7ef1b4cd1c83c24e29078a61d208b96842125ed196a6",
            "sha256": "0x9b0dfe1170a006c72955f8b0e161c8af2109e9a425f4658662957610c1f095dd",
            "urls": [
                "bzzr://bee76aeef1a043f394991d5b26d75e55f2024d8efbed6bb3a8b961a80485df1d",
                "dweb:/ipfs/QmNyjhRAvTMCKaSHAdYDAm9zSqvjsVKtDhmG7roG75rB6X"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.10+commit.9240368e.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.10",
            "build": "commit.9240368e",
            "longVersion": "0.8.11-nightly.2021.11.10+commit.9240368e",
            "keccak256": "0xf02492521bd3c5a8a8723beddb86b4b5721025e60f67bb8707b33e67082d28f5",
            "sha256": "0x03ed4e9a85dc845d090f08add230706a1566d82d7467b495626407c7d6bb504c",
            "urls": [
                "bzzr://cad931e93a842ae9c38769f8419460ef6906ab91b002064dd59e808dee0c129b",
                "dweb:/ipfs/QmXBuequCr1NoxivKtdTfAng7HXFQ2SY3Nts7oggc1gy2U"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.11+commit.73344204.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.11",
            "build": "commit.73344204",
            "longVersion": "0.8.11-nightly.2021.11.11+commit.73344204",
            "keccak256": "0x756d13da0a4aa29d6757ff5dc3231bcb5de3ddf7b9fb2c05fda6b8c4365d8d69",
            "sha256": "0xe7e1807bbd69c7891f3bc199df1e1b3bfb121446e9362088a1ae63c620a9b7fb",
            "urls": [
                "bzzr://f37bd33dd61b67ca8130f73610d8dce4c205723c491227a84719456595b0755e",
                "dweb:/ipfs/QmTPUcMrtbnPYKZDK8pGPhUbwfKSTiXpCaVWTFiPTnnoEd"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.16+commit.e5579526.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.16",
            "build": "commit.e5579526",
            "longVersion": "0.8.11-nightly.2021.11.16+commit.e5579526",
            "keccak256": "0xaee3dea17317b0a7c9cbb454bd859a9717a1952d4511d58a2263633ba4dcff2b",
            "sha256": "0xfe31a2d216b74888d8fb6283bb93bcba7d6c66e981d5fe00bf69f3271ffba17f",
            "urls": [
                "bzzr://70ef80f7b5bf99f7d24ac16b8c0b70d5626960c62550273d1d68ab0ebc606887",
                "dweb:/ipfs/QmWTetDvHv2MiHz6TeZVbMsh9YNhsKXsM4riSG3jjTKJBk"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.18+commit.2aeeef83.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.18",
            "build": "commit.2aeeef83",
            "longVersion": "0.8.11-nightly.2021.11.18+commit.2aeeef83",
            "keccak256": "0x86a9be3cf91c42db2d3d2de91486af5fcf34fbf183e8ed32d40d222670606f13",
            "sha256": "0x4b3c7f1d7601afe5d0ba3d434c4d3707ac5342f8b00e5c71bafbb80bcd338669",
            "urls": [
                "bzzr://f4c7dec62e0d288e1c42134158e81b91a194c6f7626d9594a7234e5a2eee6abd",
                "dweb:/ipfs/QmQ17VTZNzGGabb7zPnEWTaXiSGuDPn5mbKQdpZnNtvbDs"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.22+commit.9b6a687a.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.22",
            "build": "commit.9b6a687a",
            "longVersion": "0.8.11-nightly.2021.11.22+commit.9b6a687a",
            "keccak256": "0x99724c499d43b112017e3c7a032d82a0229afeaa4c414de2676390b8f9b94c7c",
            "sha256": "0xcb348b93ae23e2759fb1072de1eb3ce59da659e9577ec6494e3e0cfb3c981d5c",
            "urls": [
                "bzzr://7335180735b05634ed77b6fd17ce78126f7664e10739e61bacf0bf8f6584b98a",
                "dweb:/ipfs/QmRmahRK15EPcuJxgRwifGV4z2oA3C8nTkvNPnsAfrc2BJ"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.23+commit.71f8576b.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.23",
            "build": "commit.71f8576b",
            "longVersion": "0.8.11-nightly.2021.11.23+commit.71f8576b",
            "keccak256": "0xd53b9a1b0c7e2f4a5c00c79e63229aca2a460beb9f2f02862e50374a7dc378a1",
            "sha256": "0xbe7cf00339c5f3e02825318eab0c31b4be14dece213d9f5e80c95745272572b0",
            "urls": [
                "bzzr://f7add8518c6bc84593317de539f7adffc1ac5b9261fc0900c270fa3e8ffeaa93",
                "dweb:/ipfs/QmVzGNoJBNRnWn5qoy4gXxpDgT64BVmdsTaYyqc4HtUxm5"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.25+commit.e0c85c6f.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.25",
            "build": "commit.e0c85c6f",
            "longVersion": "0.8.11-nightly.2021.11.25+commit.e0c85c6f",
            "keccak256": "0x66c851af8cfa87240cec85c03ce995832c17cddb89fbd30a97f4e94dd235765a",
            "sha256": "0x0d13021c701169016a46d6165e694640bc4326c5f920a96710b20bbcb23db29a",
            "urls": [
                "bzzr://154d464ae04772a67fa75aae8833016669547329a52a92452db6c22e7c35d75b",
                "dweb:/ipfs/QmewU3WRueQZbvpfdGDff55hp3G3AAVQxmUgCHdVZX5Qf2"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.29+commit.cb610b50.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.29",
            "build": "commit.cb610b50",
            "longVersion": "0.8.11-nightly.2021.11.29+commit.cb610b50",
            "keccak256": "0xc78a13305f3af807be30abe7aa357d50073508bbb3155d5e4c7f0df1e70836ad",
            "sha256": "0x0326541fd7a89366dad0a8eba4fc8fcaa932a2149e69760574b0f593e9b93ef9",
            "urls": [
                "bzzr://c36b660f51173d25d694be5ce907560a43570db28d6c5bd0f621f18f80d431c0",
                "dweb:/ipfs/QmdbKSHsq33zFx1daWJWeJKjqeUfboKdB2kx2c1RjrYDMf"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.11.30+commit.c04fca7c.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.11.30",
            "build": "commit.c04fca7c",
            "longVersion": "0.8.11-nightly.2021.11.30+commit.c04fca7c",
            "keccak256": "0x0233aee6c0db9bcee7e6ec20370812dcd8ee74dbb707142edef77c400a99c238",
            "sha256": "0xaa937c8519ba64d865d795a0d483bd9bbb55c1d5862ed56bd269c106a46c9cb6",
            "urls": [
                "bzzr://359f5826dfbc23e9fcb9be4344e4f7ac6e16d837902c80f0ffff25ac6ebddf77",
                "dweb:/ipfs/QmXP9xnrfjw5uM8GiVJh8YKLZhEDdkbUtCW4BjPwXXzzjG"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.12.1+commit.dcef56a5.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.12.1",
            "build": "commit.dcef56a5",
            "longVersion": "0.8.11-nightly.2021.12.1+commit.dcef56a5",
            "keccak256": "0xeb0fab03ff926ed4d1ab792a0c6854f1a9b0d88bb703f30e2eb03d922a05eaff",
            "sha256": "0x2b9f30ebcaaed37d977e4771c32f431ab6aaf7e91af914c172ea67a6a4263c22",
            "urls": [
                "bzzr://12edb3d38fe4ec0d9620598af0322004ef24ed8276e3f80db8726a11c0fc8d7e",
                "dweb:/ipfs/QmSFUP2NniKuKFTtwVJ3d5WjAVhXdfVybsLNFhw9JnQjnz"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.12.3+commit.c76a6bdb.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.12.3",
            "build": "commit.c76a6bdb",
            "longVersion": "0.8.11-nightly.2021.12.3+commit.c76a6bdb",
            "keccak256": "0x7279b07acb8b3bd785489d421f9c2e27dfb26f14875c4f2271cc93ed467d4dad",
            "sha256": "0x07b51f0f2133f24b9d3aabc176edab5ece150c36b256930f891c0cfa254b7623",
            "urls": [
                "bzzr://b49d235f72b179d4989147178f767035e8e67d34c6d2da506649c71a017b9512",
                "dweb:/ipfs/QmPoLGPT7Awbpoj1cmHaSyU9mLFyeoRSfTfvzRbYRY8k1Z"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.12.15+commit.1822261d.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.12.15",
            "build": "commit.1822261d",
            "longVersion": "0.8.11-nightly.2021.12.15+commit.1822261d",
            "keccak256": "0xc7d9d28aebc780fdde40250ca095d1cd6e3e577ad074bf82d0ab85dda05d9aab",
            "sha256": "0x943e165c123350fed56748db871e6eed85eadbbfc97b8cb74b9fe541d51f7af2",
            "urls": [
                "bzzr://3a7e79a07ac9702861539a0a11c6ffcd91dfa2796a30d1254a9a5f87b31cc580",
                "dweb:/ipfs/Qmb3eT2CWf67JxUFoDrxwuNCpzBxisRS1GoU7wd31qzzdV"
            ]
        },
        {
            "path": "soljson-v0.8.11-nightly.2021.12.16+commit.10289fbc.js",
            "version": "0.8.11",
            "prerelease": "nightly.2021.12.16",
            "build": "commit.10289fbc",
            "longVersion": "0.8.11-nightly.2021.12.16+commit.10289fbc",
            "keccak256": "0x77133f9ca2d9eeeaf93dd23b4c8399e207a1aa54fe644d8f063b32cba2d59da8",
            "sha256": "0x2a25791ed2a918e11a3a5e20474fd0084ae5d5f86ba1181f876b9ed196632eef",
            "urls": [
                "bzzr://3e5f682a961966c53c2de4a5cb779ef2e1afdb21c61ef14ddcd86601ebb2a0c9",
                "dweb:/ipfs/QmYKgLSFhEgDnmAKzmABL7cXxGeWKZexer5vk9Xgoo79MQ"
            ]
        },
        {
            "path": "soljson-v0.8.11+commit.d7f03943.js",
            "version": "0.8.11",
            "build": "commit.d7f03943",
            "longVersion": "0.8.11+commit.d7f03943",
            "keccak256": "0x798b23086ce1339e3d47b3648a1f3ae40561e2c9f66ffcc98e71fc14a7f77584",
            "sha256": "0x64117d4b13bfc5bc6e5f80823519b140e753a0c09e99edd756772dc3029bc1f8",
            "urls": [
                "bzzr://0fd1c8db6338b2143ab0e49a33edaa133108ba77f1238408018b5b2a0ecdeb62",
                "dweb:/ipfs/QmNQTFQmfnjxnDmbguVSnZ5DiHGFQHCsffccW5c2DMcSsT"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2021.12.20+commit.b65e0933.js",
            "version": "0.8.12",
            "prerelease": "nightly.2021.12.20",
            "build": "commit.b65e0933",
            "longVersion": "0.8.12-nightly.2021.12.20+commit.b65e0933",
            "keccak256": "0x50ce53fca65685494ff1fbf018c1e33543b166a6bbadc664d9dbab65c3b33e9b",
            "sha256": "0x9d3e80e0673627d4a61b5402ecb593cdd79f274d1f50f1e6e9e21b4d0f238147",
            "urls": [
                "bzzr://6444cf6628eeb055d370921db03708361965d1b718c6313db0a5b6956a9ca84e",
                "dweb:/ipfs/Qmd5gMTFd7HxFYz2bxVBBKHniJ1p415gtmE55mDNbkPGmT"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2021.12.21+commit.15826826.js",
            "version": "0.8.12",
            "prerelease": "nightly.2021.12.21",
            "build": "commit.15826826",
            "longVersion": "0.8.12-nightly.2021.12.21+commit.15826826",
            "keccak256": "0xf1f02efa3474923233e9ae0231524bba695b4773e459c16a17aaf31555aba130",
            "sha256": "0xb8ee2d10c775a12244b0d29a19a3b31ec643405fc346f910f3f94675cd9e41ba",
            "urls": [
                "bzzr://b1599f62b3b96d5b07393c38272519e5ead1f6ffb3ac4d958b4977356d7f10c7",
                "dweb:/ipfs/QmSCgaS6uUhFT83reAksA3AKjffKTL2a821o37uEnuQ8YX"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2021.12.22+commit.b28cd00a.js",
            "version": "0.8.12",
            "prerelease": "nightly.2021.12.22",
            "build": "commit.b28cd00a",
            "longVersion": "0.8.12-nightly.2021.12.22+commit.b28cd00a",
            "keccak256": "0x36c956c870be2852e6d1852957cd1ac05a3d1798a704ec81242e82b03218a37f",
            "sha256": "0xbcc8e9418b641114a34b858791b4ffb9e675aeaf64ac8628bbca3cde406c6f01",
            "urls": [
                "bzzr://914bc464f86345cadc730e1bc07407c128f007cdd842d39596ca67465b52bdfa",
                "dweb:/ipfs/QmTzZuJbvr6Jy8ajQEwn4sxLSfMCaME4MTaujif1QZ1Cgw"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2021.12.29+commit.692614df.js",
            "version": "0.8.12",
            "prerelease": "nightly.2021.12.29",
            "build": "commit.692614df",
            "longVersion": "0.8.12-nightly.2021.12.29+commit.692614df",
            "keccak256": "0xd69a9b1a4fcf65f9ecdae29ddb66d3a636b9a80b6c58adcdbeeb4e4e9072b5ca",
            "sha256": "0xb3e547cdafdd56fda0b5cf088c8c094f4b13a3b2709ff371c4d4f07f7443b885",
            "urls": [
                "bzzr://f9bee25917a96108fd1069710f194dde60b5d67d55df7814dd05d62cb18a46e6",
                "dweb:/ipfs/QmRoBc5q5amsHA43i2gzvfrkbptzXT6dsGD8hJZ6AWj7re"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2021.12.30+commit.6849774b.js",
            "version": "0.8.12",
            "prerelease": "nightly.2021.12.30",
            "build": "commit.6849774b",
            "longVersion": "0.8.12-nightly.2021.12.30+commit.6849774b",
            "keccak256": "0xf281fde09cd89a2716ba67bf648da15a066ff0f4377979df0da25eda2da691dc",
            "sha256": "0x4c132ffab1dfb376c3edaf27f1f374a2db1a45770038c5e00cd111c8fb2a0c7a",
            "urls": [
                "bzzr://50f32aedd055825ba060b44190c4c4fcf8b813ab07ffa908a788d68d3b389383",
                "dweb:/ipfs/QmRAz7evFbwqB6rJSWATnqnPFSqzDKivwUNrfF8E9cLqbm"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.3+commit.c28f85f1.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.3",
            "build": "commit.c28f85f1",
            "longVersion": "0.8.12-nightly.2022.1.3+commit.c28f85f1",
            "keccak256": "0xa49748ed3450eeeeebd5e2c6740bc55da820f571d980fa0c37462a1681aa1989",
            "sha256": "0x4486cdfc65fe83980e9458e6674c7c5d776c5a2587feb3e449e7fdfbee8ad1ea",
            "urls": [
                "bzzr://f1933e96418466c9826db4b9bbf87722dd881c39f0d7a3b716822ad2eb67c62b",
                "dweb:/ipfs/QmZQvY3rarAdxxrKsFARvwTr7sUWMbC2i7M5VZD3auJrF1"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.4+commit.b892851d.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.4",
            "build": "commit.b892851d",
            "longVersion": "0.8.12-nightly.2022.1.4+commit.b892851d",
            "keccak256": "0xcf3b93ca6a562b7db055ffe67974f765ace4dc7d867518f92941d4efa956c9d9",
            "sha256": "0xa90c2d3dc48c9dea916340210ef4cbdef695e6eaba752b56ce69fc17d4641f47",
            "urls": [
                "bzzr://d89a1423863f59a343ade2f777990abd14c75840b4cdee1c9e92afa23f4f71f2",
                "dweb:/ipfs/QmYtVEKgJvxR6EKuQycYEiXSkzrxnBQBrRXHmbvzwKxYAK"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.5+commit.b6a203a9.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.5",
            "build": "commit.b6a203a9",
            "longVersion": "0.8.12-nightly.2022.1.5+commit.b6a203a9",
            "keccak256": "0x08b8b2da07d67b188aff39ea81c3d5685f99cebf87063c5ce7636e49ec7c317d",
            "sha256": "0x62b8922ad92823bf9b0ec0f17792617a88bfcff533b8ae4590222c02bb85dea9",
            "urls": [
                "bzzr://e7694d3d322a8fc3084965cdcedc3073697b59957c24917c68f135a4c8f610bc",
                "dweb:/ipfs/QmXeuUnCo7xjaPHKRFmPhG3s1HVKGC6LXdoH5mqBCaCLcC"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.6+commit.c3b4292d.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.6",
            "build": "commit.c3b4292d",
            "longVersion": "0.8.12-nightly.2022.1.6+commit.c3b4292d",
            "keccak256": "0x5840a73cfef513ff672cf477ea9fa47b212d1071b87d875b55e713f5d3a056b1",
            "sha256": "0x41611c5744181c59e575243a3131e24313d95c0e34ff200ac3d7baae76074b1b",
            "urls": [
                "bzzr://e2dbc118f14d4dd3c543eb610acbb3bce118a8501e9d41a3c1b6749f1b57ec8a",
                "dweb:/ipfs/QmTudJjBGZVYaKHHLb8TTD993GbCH3ydm5ensMakdwjRpS"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.10+commit.10c954fd.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.10",
            "build": "commit.10c954fd",
            "longVersion": "0.8.12-nightly.2022.1.10+commit.10c954fd",
            "keccak256": "0x2e4dde81c1f167188b50f455070869539c9d960dc24b100c245adbfd36108d2a",
            "sha256": "0xeefc61bbb67f130030f46338d9643041c75b515dd4efb48541bd07f3f523708c",
            "urls": [
                "bzzr://7ee769b94570d8318af636590592d4890a9d87c167355e54f68b173c2e067548",
                "dweb:/ipfs/QmaPh8F3atJhKwnxkkCwvAFRHHK11jdcqv7b4f9dC6obRt"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.11+commit.a7119699.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.11",
            "build": "commit.a7119699",
            "longVersion": "0.8.12-nightly.2022.1.11+commit.a7119699",
            "keccak256": "0x8c5c8ae5a53d1a69f8419894fb116c7ea1d3ad3f8fb7ca4526f10537d39a42c4",
            "sha256": "0x603df2323f48f2013e6787cb9b0cbbea3510ec851335b5ad429710c22e18985b",
            "urls": [
                "bzzr://9226267f9ab26f25b815666e7ebdd6098d70f8509c8d33187d4c613df2a32747",
                "dweb:/ipfs/QmWQZ5LBwQb3KYQbuGkNzx5gJEFpbhw8ggyvSFwr4d7ZSP"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.12+commit.bc4436c5.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.12",
            "build": "commit.bc4436c5",
            "longVersion": "0.8.12-nightly.2022.1.12+commit.bc4436c5",
            "keccak256": "0xed4d895cad3d8a332ed1bb7e87e31da0cafab76627237435c258ae181b3ec314",
            "sha256": "0x2933da176deec9c2a662ff935ec2ef5f3a0bbba0e292cf970f38b031bee68697",
            "urls": [
                "bzzr://8711bfb7c94db781442f8ddefca0ee6123d473a0e4616bbd60d4e25c8cdd595c",
                "dweb:/ipfs/QmdDipyyvX6PeY2KeBtAzXjq4cmqGLkibneZiR9Ky5LDzo"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.13+commit.7c1daa50.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.13",
            "build": "commit.7c1daa50",
            "longVersion": "0.8.12-nightly.2022.1.13+commit.7c1daa50",
            "keccak256": "0xb6f2945df383616eac69ed1d66c341f30a74e39c32862b5b5a7e9260c9026baf",
            "sha256": "0xd78dfc2c97facfa685a4052ead48a05d7c9e226eb40854b72520a12d8bbead77",
            "urls": [
                "bzzr://2891b86838b10bb4ff13dedc83e7fd87d52fee9627e313e876beb2af5fee2529",
                "dweb:/ipfs/QmYu4NXPS2vHZRVmMgk59B2pWSkk2FStw3nnLJ36KrgjWJ"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.14+commit.756ae673.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.14",
            "build": "commit.756ae673",
            "longVersion": "0.8.12-nightly.2022.1.14+commit.756ae673",
            "keccak256": "0x9cd759a4db740018b3f74adb75f81e427a7c578582b2bef0162d1970800747bf",
            "sha256": "0x8f8f6c6b4abf67f1fb71a87c10a697e12f736bc321ae3f6e9bea5a59c109f3cf",
            "urls": [
                "bzzr://d7cead5228c371d389c28ce50a0de7f7948d55b773e09e2f913309ca847af4d7",
                "dweb:/ipfs/QmVj8cpddmjmE8yVf613gURsGs7TaHcv2x9ZPRuajPeNqp"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.17+commit.79e9d619.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.17",
            "build": "commit.79e9d619",
            "longVersion": "0.8.12-nightly.2022.1.17+commit.79e9d619",
            "keccak256": "0x2a793ba5a9a14d3b7d66ef192c3013d1992c8b9b5370e0993b09d9b4ddd0354e",
            "sha256": "0x169f41f09ff4268158a0a3053d99a16db4f5891d95067c910050a0f897343ecb",
            "urls": [
                "bzzr://0e3f697e3d83df71205bf0658919217e1bb50e4c02d13cbbaa4ebec5ed0e28ea",
                "dweb:/ipfs/QmeWBdD3fT9iGxvUUngosHSdCmPWxq7A2wfNvt3vZZj5Xp"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.18+commit.a07b3ec7.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.18",
            "build": "commit.a07b3ec7",
            "longVersion": "0.8.12-nightly.2022.1.18+commit.a07b3ec7",
            "keccak256": "0x9f5faa41bca344d286951feb2adb597ba6924f342882ce912a79f3c2c5add36f",
            "sha256": "0xca0a1c8f8b2f1dd4c4d3c650e51b0242daf03ca7175b93e8ee43c749a6930fad",
            "urls": [
                "bzzr://a591d6af94171c19ae08febfaa73ba28b0055c9cdadf97050ce65e5624c25802",
                "dweb:/ipfs/QmWMRj14R6kPxvBuAHGVq2Fzhzs2MtC7Gx9sWVXNd8rUkG"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.19+commit.0b9ab33f.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.19",
            "build": "commit.0b9ab33f",
            "longVersion": "0.8.12-nightly.2022.1.19+commit.0b9ab33f",
            "keccak256": "0xc81e094430d7b645c93a412e632223394a7c715b1e787d8b0d005965d9130db2",
            "sha256": "0x5bf8a6fff698e9eec2bbf86b73d4cae4c22570728312574d7015727479dad204",
            "urls": [
                "bzzr://a88267c93460be388f4a0953c2456347b3a77178ce6769fbe95b53eb22c32f20",
                "dweb:/ipfs/QmSWEam89yDfeA4cKkXTzWGr9A11nkZCKuVCuPy5aEKNVP"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.20+commit.40d3223b.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.20",
            "build": "commit.40d3223b",
            "longVersion": "0.8.12-nightly.2022.1.20+commit.40d3223b",
            "keccak256": "0xf2b241b4bcc78d941a12d7d9ee3973b468a96c1a8846b7ecd34e2dc52e320c9e",
            "sha256": "0x492f9630deb8363bda6892b3394e06f0438a10b063e71ed195c86a6990bdeef9",
            "urls": [
                "bzzr://056d1fc1cd2c7eda1332c053e765583119d68203563f3c3dbf68dba72fce50fe",
                "dweb:/ipfs/QmQBHjxW6HwxHLx6fpLguhbEma4Y9ueEZA6vVPCKANJZY9"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.21+commit.3f401ebd.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.21",
            "build": "commit.3f401ebd",
            "longVersion": "0.8.12-nightly.2022.1.21+commit.3f401ebd",
            "keccak256": "0x345cef81e19c2be5e00ae381e525c22ea289c04fde1b1647efaa0dac9d0e6a2f",
            "sha256": "0x8fb25890eb144848012b9e51425bc550367b066db1e0f34ae46c0e7253bb7b93",
            "urls": [
                "bzzr://a510e7ee5a4190a059303b34c8875fda78f1e55850f169726dbb72cb9cfc1b6a",
                "dweb:/ipfs/QmT85oDcVcgg9NDBAmA4PCApdKUEASLunmFCwGWo9brAcb"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.25+commit.2725788c.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.25",
            "build": "commit.2725788c",
            "longVersion": "0.8.12-nightly.2022.1.25+commit.2725788c",
            "keccak256": "0x1fe137aef54e3d013c7d02d76738bd3589d851d9bd77b3ba1060c086fb4c0744",
            "sha256": "0x1267931c6afbbe5b887f7f7b7ad99fdc7df3c838583a7b6549ceb5cafc79ad20",
            "urls": [
                "bzzr://6b8d43d4d80823e65c8727ad907c12c7aaaad05ec9dc554482ad80b581a30f84",
                "dweb:/ipfs/QmSad4b2AbHd6gbNG1MJfEcPwfJsGqZ6FThkUQ5SWFSWFs"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.26+commit.597426bd.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.26",
            "build": "commit.597426bd",
            "longVersion": "0.8.12-nightly.2022.1.26+commit.597426bd",
            "keccak256": "0x3efcd7317cd52424c90ddb3f1280df89d7939bebdf4bc7c2ca4576ce3e181217",
            "sha256": "0x5d4bc85d9a128736e7a10d2fd9fcb22a3bc1841eaa5e64ac13c65e56552b2609",
            "urls": [
                "bzzr://afdebee729f59e3959c5d258befb0a3cee7a13081f0147c0399e3938b418ad95",
                "dweb:/ipfs/QmcXoqUmFu5gUNYHYx6TV9rD2cZ9bUYQZzF9NfBfp7Whdi"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.27+commit.7a40785b.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.27",
            "build": "commit.7a40785b",
            "longVersion": "0.8.12-nightly.2022.1.27+commit.7a40785b",
            "keccak256": "0x02af6d156729257dd7340331fd09e87dde60f79ef97ebe043ca53fe698bb1674",
            "sha256": "0xe098afe59b030fb534df32a1d5df6d1fe164e2ed3d2871147c958d22d40ad8cc",
            "urls": [
                "bzzr://eb67177287f3b485191e434dbfdee75e29426ecca834ae7bbf1edaac1d08cbcd",
                "dweb:/ipfs/QmYWDPKsftFJhytEPTXwJVooo4LqX5p7oLVwTqCpFqCG2T"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.29+commit.ef8911a6.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.29",
            "build": "commit.ef8911a6",
            "longVersion": "0.8.12-nightly.2022.1.29+commit.ef8911a6",
            "keccak256": "0x5ee59f3ace168a543ff3c366ad9a8bd27b4457157667831d60de9ae96c76e44e",
            "sha256": "0x3a735336098d8bbcf481b7ce1e403e773de07e4e028308bef334ae5b525de528",
            "urls": [
                "bzzr://0215407379ece599f40c883e702c58ebd3ac8ca5ebfcefa1724ff0082bd40bea",
                "dweb:/ipfs/QmcXFBw1sH33JW4Tc8yWSyHtHRGGqPvLEQcirws61qdLap"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.1.31+commit.d839624f.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.1.31",
            "build": "commit.d839624f",
            "longVersion": "0.8.12-nightly.2022.1.31+commit.d839624f",
            "keccak256": "0x908343eb6e3c305fd51c13b969312836b1c0ef7d2bc214915c324ec6f650c217",
            "sha256": "0x28cf3e5232ba7cf7e584e77efa23b5a4296109c46d0796f764a4a5147e36d502",
            "urls": [
                "bzzr://a3aa3f1afa2d1fd3dba6c1fb7bb0f646b77baf569a63a907f5460685c82c96a4",
                "dweb:/ipfs/QmQyhCjn1qKuDMPrXEiggekedcbNLPJN4TEvq77n7juYP7"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.1+commit.a05d2b35.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.1",
            "build": "commit.a05d2b35",
            "longVersion": "0.8.12-nightly.2022.2.1+commit.a05d2b35",
            "keccak256": "0x59a5805c3c9f0bca69d177a9ac0d86b645fffcf0e80ae9f25665dcff5e7909e0",
            "sha256": "0x46d9085a31b15ae936c50426dc42011a1ba1227c4de0ce76ed1bcf65a5e2114f",
            "urls": [
                "bzzr://b9d1974f86ab4d5deef25bd4da93b8ea69ba568d34babc04c1ccd8e8c612bf57",
                "dweb:/ipfs/QmWtVHp85whTkRLz4BtsJEQyXnmkk8VQm3Vqm5G3qDFix2"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.3+commit.2b141c23.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.3",
            "build": "commit.2b141c23",
            "longVersion": "0.8.12-nightly.2022.2.3+commit.2b141c23",
            "keccak256": "0x551898e4a5c848373f7a83153847a295ef419f4b72d5e6f1e2d9cffb9c3ec537",
            "sha256": "0x36a4a5dd56ebc800e94cfd5a9d1b3732e901eda622039993a28d70c464a7a6e9",
            "urls": [
                "bzzr://05d9baef22222b32e89402d790e97c2b5177e69c45283a8205163f318f3de4ee",
                "dweb:/ipfs/QmWDZ7trWUVY7RB7ZdM9Uh57JMNNbo4VKKBtL6DHudmoPB"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.4+commit.32d64ce6.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.4",
            "build": "commit.32d64ce6",
            "longVersion": "0.8.12-nightly.2022.2.4+commit.32d64ce6",
            "keccak256": "0x4cda366a6c2a98a90af8e2efe6a8d29ade7342f060532c453200e2e4f764a242",
            "sha256": "0xfe8fcb189c6c957595da65a686d4c9a932ea21f52385f34d0619ac6b311d2d50",
            "urls": [
                "bzzr://a0ca1c95b216800f5fa9f1f0028b27204df92bd1474e5b20f1a92fd8724421c6",
                "dweb:/ipfs/QmW4TH5SGpHtQAJDMN6GkzjCqxeGPfC4WNtTxM6wy4CikC"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.7+commit.0e93456e.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.7",
            "build": "commit.0e93456e",
            "longVersion": "0.8.12-nightly.2022.2.7+commit.0e93456e",
            "keccak256": "0xc2eb66650a5e17aef6c6800dbc77bf27251f70ab192eb056afc376f906f51258",
            "sha256": "0x1b59813e462bb557f66b16f33cd9d02cbff50905d08053216ff95871b556957c",
            "urls": [
                "bzzr://04ee88227584d12239e7d7d72bcdb7764dab39f816796d21498776e508369903",
                "dweb:/ipfs/QmXh5h5B9xyDLfYzFJBYwaMoEwaRhLCYDz8HWSkdDhd2P8"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.8+commit.5c3bcb6c.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.8",
            "build": "commit.5c3bcb6c",
            "longVersion": "0.8.12-nightly.2022.2.8+commit.5c3bcb6c",
            "keccak256": "0x93845fa1681b4e6da5a916ef75a1514532680c232fad7762735668e7393f1be7",
            "sha256": "0x518de03c2f4157adcb953d5bb0a0c0dc4aa347f812b59aaad56a473387db7e01",
            "urls": [
                "bzzr://e64182e07bef7ab162c8321f2d5071d59abeb0bb90c5d7eeec7b0efb14ceaf0a",
                "dweb:/ipfs/Qmcy5wyCRjhH8mDFnTBmYj5dpgKdnKS4SyFHVUDDLYwYdM"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.9+commit.5539a745.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.9",
            "build": "commit.5539a745",
            "longVersion": "0.8.12-nightly.2022.2.9+commit.5539a745",
            "keccak256": "0xb8ca8b9c7f3ecf8a54cdfbce275cfa3b4fcd3e9cc38445f31fbf963bc35f2fef",
            "sha256": "0x52e7251f4ad50cc29a4edb6253cde8d190c8eb0b5acee6be41ac8ce8b55b12fe",
            "urls": [
                "bzzr://12b453ca481777b0da2a74ff4a0ae7241d135244b1b84c1bfcc16b884df3a721",
                "dweb:/ipfs/QmdJ4xPwTBi2gPgb3gRcf5p1k2GrwLU4GexjFLzHrR3Wzf"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.10+commit.1210c3e6.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.10",
            "build": "commit.1210c3e6",
            "longVersion": "0.8.12-nightly.2022.2.10+commit.1210c3e6",
            "keccak256": "0x39831409f76ebd221d2430d9574a57177232ad3be23bdc582d82a66e729638e7",
            "sha256": "0xc7f2b89ebe441fc78109f3798f248c7fd5744195125f75d856a29274e52c8749",
            "urls": [
                "bzzr://56136f21459e89a383d0af1423577d490131ceb30669119f38f6c1ab8c61d726",
                "dweb:/ipfs/QmdNBDvDQf62dwn3sUQQvC1QJP8zaZXdPxM1HQpdU9kgDj"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.14+commit.b3ccc013.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.14",
            "build": "commit.b3ccc013",
            "longVersion": "0.8.12-nightly.2022.2.14+commit.b3ccc013",
            "keccak256": "0xbe0010ac5ef38559fefc017f4c749ea61fa5f9fe67de5960bac814dc7db18c0a",
            "sha256": "0x4e96df75a878d6c55ffed9cd162c311ee78d6fd360428a9a051c94edffa3347b",
            "urls": [
                "bzzr://2f074cdc68bb0aabfd7f63caf6d42e764afc263595b5da05d5a30361428e54c1",
                "dweb:/ipfs/QmUDx7B9k7aFXc5GRcbngWwEsGNjX7HxyLVUPkuN8u6sAh"
            ]
        },
        {
            "path": "soljson-v0.8.12-nightly.2022.2.15+commit.16983848.js",
            "version": "0.8.12",
            "prerelease": "nightly.2022.2.15",
            "build": "commit.16983848",
            "longVersion": "0.8.12-nightly.2022.2.15+commit.16983848",
            "keccak256": "0xad70ba001fa742d09dc5b825125af8bdbbcadc2b4c39f1fa273cd26f8627212f",
            "sha256": "0x8cee5221d262c3920e2e8e1bf83102ad844f62e101db22bf922af31ce4d8f36e",
            "urls": [
                "bzzr://e68aa9fa4f369784b756c70c6926e0b7e9a2e5ee341b2ee35ed352070f3a28a8",
                "dweb:/ipfs/QmUw6n9FHQX2X8BAqpv5YBJMcaDRp1116RZ8afwHmYDXe8"
            ]
        },
        {
            "path": "soljson-v0.8.12+commit.f00d7308.js",
            "version": "0.8.12",
            "build": "commit.f00d7308",
            "longVersion": "0.8.12+commit.f00d7308",
            "keccak256": "0xdd4ae95607655404b769fab5f949ac95c6a1a506330f512aef0d92974c390431",
            "sha256": "0xc2c4738c96ad329cbb9baea615ed50ffb5a53d93fed8e00785e47242581d3c60",
            "urls": [
                "bzzr://38f396377d5a5a60d0b9d8c4dc1343485517ff31bcd281d531f98534dc79d811",
                "dweb:/ipfs/QmVdW2ygaT2vecoSUog3HUn8hZqXU4XXQZvuRSdpV6DJPL"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.2.16+commit.da50176b.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.2.16",
            "build": "commit.da50176b",
            "longVersion": "0.8.13-nightly.2022.2.16+commit.da50176b",
            "keccak256": "0xecaac8cda77c0be2bb7cd63d874313c559bb37d0cb6452aae4f80d6c9510cc38",
            "sha256": "0xd5537e3e69fc36256931af5bd90332252f3e20ab11adf64f12551f22c1627485",
            "urls": [
                "bzzr://be6c4b18a27a82cd04c3e4d1882d516840d2c211c40e9ea7fcee86613b1379e4",
                "dweb:/ipfs/QmZgHwR7cihMXFbF1jxb2kZ4qNHmPcBzwFqD1ZxYJs1ubH"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.2.17+commit.daad9a42.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.2.17",
            "build": "commit.daad9a42",
            "longVersion": "0.8.13-nightly.2022.2.17+commit.daad9a42",
            "keccak256": "0xe6ff73e8f81b30a095c4f7f7a2efcd514698f7e9d0e996ab912e02a08eee776a",
            "sha256": "0x212dc8b465f759a90279f4d6d209fbebcbaa3100a65ce2cc39c7af7abe4134fe",
            "urls": [
                "bzzr://36f7b297904b3b1a942574431e5dfd1dee5a2b471b1937d66d9a4c0c02b446e4",
                "dweb:/ipfs/QmQXSJNuJ4yeTyXm9HgD4pfhY3YjBuvDgtpU8yKnRNXA6V"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.2.21+commit.5db29076.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.2.21",
            "build": "commit.5db29076",
            "longVersion": "0.8.13-nightly.2022.2.21+commit.5db29076",
            "keccak256": "0xdac490c95b37847fadeb5457e386c1f07fe2fb046af30ae94f376758725f44a6",
            "sha256": "0x6c963259a21064f7a1332c512396f4fcd44b18be9663144d670bc9e3335c6b71",
            "urls": [
                "bzzr://e378df2d5b9c8034273a4a24e6f77a763dca44dc5e8d6eb181b9fbe827e06007",
                "dweb:/ipfs/QmbpoLxgbtcMtrEn6D6tat1xRd7NYg1rNG7Ab7QDPktD3u"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.2.22+commit.47d77931.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.2.22",
            "build": "commit.47d77931",
            "longVersion": "0.8.13-nightly.2022.2.22+commit.47d77931",
            "keccak256": "0x611de5d7848d7e080aa9ef1e52799a6b9e0d4cc39eb8abc5667120c9e4eb57c0",
            "sha256": "0x4c9841bba178703e83e44e2b0b44cf0fc1613570509e48ca56ac2d3ae8c21631",
            "urls": [
                "bzzr://417754b91f5af44ad8a5f57b99ac30e968c53e555ffb45a31735a3c7c1e4c2d8",
                "dweb:/ipfs/QmY3wsjzJFeiaQrRYPxb7Bmf44e5rtoyMTxAbGMoJ2gNem"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.2.23+commit.e7d93f83.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.2.23",
            "build": "commit.e7d93f83",
            "longVersion": "0.8.13-nightly.2022.2.23+commit.e7d93f83",
            "keccak256": "0x0a497744fd60aefd8362e7e24c08a9815c3bc8832bfbc1d2b6f7698af8dd7f6b",
            "sha256": "0xe6ceec77baef73b26138bc61e2b4256b406ed7cfbfcec5c8f10f38de27e1a319",
            "urls": [
                "bzzr://b5ba307a16c1d85410fd92eb9a455436ee2ed540723fd598088629bf9a773a77",
                "dweb:/ipfs/QmUbTeriPybEtMcWqBG4d2BzqPM45Z7JphX2KomVRRxbCL"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.2.24+commit.1aacb67a.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.2.24",
            "build": "commit.1aacb67a",
            "longVersion": "0.8.13-nightly.2022.2.24+commit.1aacb67a",
            "keccak256": "0x6166fc75f585ed24bbcbab7368826e088ca3f3f9d8c56ed2093e824696fbc26f",
            "sha256": "0xc8c1b807d96215693ed787217babb879ea1808dd6d3e1cdcec0d2179e4140d4c",
            "urls": [
                "bzzr://e8bef8bf9beb75f52f9c45b605c45f905c5e6da31ed427dd98e1f682986b94f1",
                "dweb:/ipfs/QmVDMboyEHdjpgqEP1h2jQqk3ap8BYTq2Jt1YZxBWW9FXt"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.2.28+commit.466251b5.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.2.28",
            "build": "commit.466251b5",
            "longVersion": "0.8.13-nightly.2022.2.28+commit.466251b5",
            "keccak256": "0x813bbc2eafa5030783e79facd939da94f70df37e0a8e73386b749e3ff2e4886b",
            "sha256": "0x2af81fa59f810a23610586ddfa1324274fb260be775de6b8b3916dd6e97e8110",
            "urls": [
                "bzzr://68c9478e1f3b913a8d0010851c775e91c65bd724759d0329430fde11f1ede54c",
                "dweb:/ipfs/QmdpTzWAwAiCYhPJzjsBL3BtKBHkuxDPVgWYEMSedpLP9q"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.1+commit.2bcb0275.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.1",
            "build": "commit.2bcb0275",
            "longVersion": "0.8.13-nightly.2022.3.1+commit.2bcb0275",
            "keccak256": "0xcee7a58c77b8b442c8fae45d00adf86e0823963901ab580de8f5e79ae5fb0897",
            "sha256": "0x32b3ad34dd7b286f160b028f87261c01689956246f75fc9faa95dc6fbcdd2de5",
            "urls": [
                "bzzr://61b6c29b7ccbd29c7ff510359ca71c9bd632f80b762193fc6c9e2217ae7bc7fa",
                "dweb:/ipfs/QmSTNeJGpxMdT8gCYhexYeiijnDsC8Bhj4AYj7frJz3Bgs"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.2+commit.ebefb5d9.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.2",
            "build": "commit.ebefb5d9",
            "longVersion": "0.8.13-nightly.2022.3.2+commit.ebefb5d9",
            "keccak256": "0x1579ece15e4ffafaa334ffa1d21fb40580523634569384c4d7687f94b507bd9c",
            "sha256": "0x43699f25712c93b650fe5f83035aec9b553713e3af4c2c4388012b189141fc14",
            "urls": [
                "bzzr://d8b4d41f8889c4499427945ef3df0d3ae3aade6a917b0b4f276d4e02cfd25057",
                "dweb:/ipfs/QmNQkeo7M5J2gVVNxs23mAqyiNdVtJGrJ54sTHVsocaLL8"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.3+commit.999a53c9.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.3",
            "build": "commit.999a53c9",
            "longVersion": "0.8.13-nightly.2022.3.3+commit.999a53c9",
            "keccak256": "0x86c03e57fd00ae7642d83fcb1bc3a190d5554455d7eaa2a459e7fa75b82a968b",
            "sha256": "0x5b6eb47455055ff4bf27ebac425593827270c9c81715e7a2a2b2c7c1931a0c56",
            "urls": [
                "bzzr://762d4c28fff9362750e8ce16cd33cd37a8a2cd9a4fbda98059d548fedcf7edde",
                "dweb:/ipfs/Qmd9zVubMHNgwxKjJPa9JXnPrGJDhLKR8hDSHm62XJeps7"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.4+commit.198b7053.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.4",
            "build": "commit.198b7053",
            "longVersion": "0.8.13-nightly.2022.3.4+commit.198b7053",
            "keccak256": "0x8039699e6aac1065282447f02a68d4ffe8a4fd33e0fde284265120c2b8d96c48",
            "sha256": "0xb8426a2d5e0e32204278f182a4a52f0c28045c22a68f08814782b9e84301763c",
            "urls": [
                "bzzr://a28e6d1b9eb559d3c552075e6df49e4b8bd4e076b026e0a84d6a04e39a20b056",
                "dweb:/ipfs/Qmbks2eTwzzbfpYH5PeuR18YkBgh6ANracogcTg3FWsEtn"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.7+commit.145186f6.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.7",
            "build": "commit.145186f6",
            "longVersion": "0.8.13-nightly.2022.3.7+commit.145186f6",
            "keccak256": "0x055ca78775a4ed722e1a33f54fb4dc51cf291e5742f65b890903769b1faa1fa3",
            "sha256": "0xd5658153fca372e7e46d5b0be67c811e0c84b6703ea4ad79f9910767ef58b589",
            "urls": [
                "bzzr://b8e2646474a277c5317ab668e7930edccfca9069ef5f46a652349c72f8a7861a",
                "dweb:/ipfs/QmbmnYso7NVn3jU3vYRwS1N1kDzHj2NXwULLsrrejYNKxD"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.9+commit.bebdccca.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.9",
            "build": "commit.bebdccca",
            "longVersion": "0.8.13-nightly.2022.3.9+commit.bebdccca",
            "keccak256": "0x1a801a8f326c0c23a83f41ddee4890d38fe810a44da0841079cc058035302202",
            "sha256": "0xc38d65863d2cf75746b0879e45679046bc60092f3f3e35046d7b1f62a2baf781",
            "urls": [
                "bzzr://4507af2093c2a2fad37fa62925c71e3e5c34dec785e0dc77eb0b6be280303d0d",
                "dweb:/ipfs/QmQr3Z5Nhp8gboLXpZiXHgbbJLp4SZDsKTaGfSgVBTDqDp"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.10+commit.4263b893.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.10",
            "build": "commit.4263b893",
            "longVersion": "0.8.13-nightly.2022.3.10+commit.4263b893",
            "keccak256": "0x52418d7a9e879bc2639e6ab22131f8f5747183a2107cc4fffeacf302cc752c88",
            "sha256": "0xd151e994e88cece3fad0d65365159c39621439f309d1d5cfc16f7375599b8f26",
            "urls": [
                "bzzr://9e64ffdf5471f1a37a182c415090e507c9a0bee231a89a27bfeb781e45b47c05",
                "dweb:/ipfs/Qmdqsdf8NeohTKG6vSCFoVRgAQWZHYcrbcxtBnZ4wrvJbT"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.11+commit.26963775.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.11",
            "build": "commit.26963775",
            "longVersion": "0.8.13-nightly.2022.3.11+commit.26963775",
            "keccak256": "0xd6bce66a3cc2378fc5f473468743b1293d46c15bf037e57d8c526ae2849db1cb",
            "sha256": "0x766527f26a80db0e05c52699001771a5e1eec2401c6dc6bbf0cc318a1592819e",
            "urls": [
                "bzzr://380475e5d69d875d0683cfeafc49b1bef516f390b08eef8fc25037d97876d1c7",
                "dweb:/ipfs/QmWngEzH5NE1Xp9nJaGS5Th56wjwJv7br9oKkfFdbiWBf7"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.14+commit.353759c1.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.14",
            "build": "commit.353759c1",
            "longVersion": "0.8.13-nightly.2022.3.14+commit.353759c1",
            "keccak256": "0x7fcfed48e71dde148ec84d0649a2fda99a6de24ea13238cd2bbc4b8e375a59eb",
            "sha256": "0x752298fbaf754f0a3743e02396e57ff0cac19f65c3732388e2559911f4b904b5",
            "urls": [
                "bzzr://2d3285787dac40bc0136f9660ff8818ec9544331770bbc70a4dde7f69e44198e",
                "dweb:/ipfs/QmVQRbfbLDp8Epmp5qAUGL32QpGfj9ggPBuRyUWda3Pk16"
            ]
        },
        {
            "path": "soljson-v0.8.13-nightly.2022.3.15+commit.724af73f.js",
            "version": "0.8.13",
            "prerelease": "nightly.2022.3.15",
            "build": "commit.724af73f",
            "longVersion": "0.8.13-nightly.2022.3.15+commit.724af73f",
            "keccak256": "0x37668c38943c0097fe7dbed8197caccebc36c33e45de2b1ee41a26421490e569",
            "sha256": "0xd1a38e0a9643a1194939714aaf8a547cea8fedc515c1faef05d2e209a1a6354a",
            "urls": [
                "bzzr://8a11488d3525dbe2f9d951b1adae314d62b7a1e387e147ad56259d14b0c98bcb",
                "dweb:/ipfs/QmWbFmqJzCb4NxkjE76NSSfo7BiVB2acFk1LkobkdgbdjE"
            ]
        },
        {
            "path": "soljson-v0.8.13+commit.abaa5c0e.js",
            "version": "0.8.13",
            "build": "commit.abaa5c0e",
            "longVersion": "0.8.13+commit.abaa5c0e",
            "keccak256": "0x9afa714859d1c8f8ed2fded497b83a7a420474282494d25d4c9f592667729f21",
            "sha256": "0x387343bcf8f2b77fe4cdcddcaa84361fabf8e1c3508f874fbbcbb9c313542f56",
            "urls": [
                "bzzr://ade0fd040981c4e8c7adfe366296e452687c7bb6421de8546a0678be4add016a",
                "dweb:/ipfs/Qma9V9dJwmkim98H6DQX4f7RH395vsUuqHCDxbKetcbj18"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.3.16+commit.10b581b8.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.3.16",
            "build": "commit.10b581b8",
            "longVersion": "0.8.14-nightly.2022.3.16+commit.10b581b8",
            "keccak256": "0x6dbd8a838b42cb1bfac19214684d4a5f3ea939b38527020fd44a10da19840a28",
            "sha256": "0xc5f53a4f31a3812ce887ebfb9263e8efa96be92dc44e4240a82a177ebf9ab08a",
            "urls": [
                "bzzr://6e7b0291a56623115a88f6a5079e1ff01f2f14c127d6d28adc642875f03255aa",
                "dweb:/ipfs/QmPH1J6oLna5G2FfCxHjBktaZSNkLqPJVq5hKLZFk8jLzC"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.3.17+commit.430ecb6e.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.3.17",
            "build": "commit.430ecb6e",
            "longVersion": "0.8.14-nightly.2022.3.17+commit.430ecb6e",
            "keccak256": "0x8b12c4446906f76c98d18a0c1229c9b490543a2a25af648e97292c6f1acc95b2",
            "sha256": "0x090b3c2c653510d12f7a41339ce652e98f495a9bf5d0c93f9be1a28f22097f53",
            "urls": [
                "bzzr://9dfc05ee64e89082d46e0d64719f17cccd81557f289aca33eeae5f65c85405e8",
                "dweb:/ipfs/QmbDhHjVrC4bwLQDAKjq3ntQ2aJimiPMvpRex9hdsDsAMo"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.3.21+commit.43f29c00.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.3.21",
            "build": "commit.43f29c00",
            "longVersion": "0.8.14-nightly.2022.3.21+commit.43f29c00",
            "keccak256": "0xc90e062cd07a6c2e7be92c77e7f81cdbb9f237128c2e5fe028d7991c9b5bcefd",
            "sha256": "0x84a03cbfc82ea5cca096adcda1514a0d6df7ac4628a75c5c94789811df0fbc7b",
            "urls": [
                "bzzr://32d5ef4f2557abeea108c0003df711b47225eec2a6a7b1e6436e739e34c5d602",
                "dweb:/ipfs/QmPcbHFCvZkLxFsdhNNVNrtSNrKM48Hud8ZsprPmK4KHfC"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.3.23+commit.b35cda59.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.3.23",
            "build": "commit.b35cda59",
            "longVersion": "0.8.14-nightly.2022.3.23+commit.b35cda59",
            "keccak256": "0x149f48db8c7ce66a3daaa66469f70950c5c262664145a6fa892d285dc12072d2",
            "sha256": "0xfabb8f10c59fe538006ed8fb26f7718716b600796b96da0cd303a4467f5510c3",
            "urls": [
                "bzzr://76b02dae52884b32cb342f09b0630cca808a7a265357b9485e15e238cfdc9dcb",
                "dweb:/ipfs/QmSL1v54Lb9arnqMDQPNUULvaCUXey4c3aWfTNvV2Aaujb"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.3.24+commit.c4909e99.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.3.24",
            "build": "commit.c4909e99",
            "longVersion": "0.8.14-nightly.2022.3.24+commit.c4909e99",
            "keccak256": "0x830d64be2deb4c355cb376e6e5f9049a55559f97059a6b18f44f7c56c52783d4",
            "sha256": "0x1fc60122fa4344ba8d09919bbfa9872dde9ac84a6c33995e611bb58340f19126",
            "urls": [
                "bzzr://50a9e1e001ff11c04d6d645191ea111bfa21788fcae727b31283a47c3e1fa646",
                "dweb:/ipfs/QmZSwucvyJtASCkzPoEyEjr1sRsC7B97J783QWAbT5K5xL"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.4+commit.fd763fa6.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.4",
            "build": "commit.fd763fa6",
            "longVersion": "0.8.14-nightly.2022.4.4+commit.fd763fa6",
            "keccak256": "0x8125a0c07a8fb355555a632535b1ab687d5d82298fe4d363473336314fde3e2b",
            "sha256": "0x72a895d2c5748948d5756a43b5c1fc3c3988e4398660674909a1b3c727c31fb0",
            "urls": [
                "bzzr://aa7788f479ed58a0a66cecc9ee1dcaaaf987eb59f84f519e7a891422cc47fa89",
                "dweb:/ipfs/QmX7DNyxnfHBuyN4mLBqZjMVE5WBnUoUf4VHzs5g9hq6gc"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.5+commit.34dd30d7.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.5",
            "build": "commit.34dd30d7",
            "longVersion": "0.8.14-nightly.2022.4.5+commit.34dd30d7",
            "keccak256": "0xf6c5c48146abfcb4b0a600c4d9d47021e0c620cdc3e84d849bdc7c571da96b00",
            "sha256": "0x4d936e4497d1e816c0eb5acec21fa4ee185e67f224cb1ba9cf4fad499d771601",
            "urls": [
                "bzzr://c78a1a1092aab7e0262adf86b1054d69c255f08e3a13813b0086cb6676ed43e3",
                "dweb:/ipfs/Qme6A4NUV8WBM4igRYf6r8nFG2iwqpbN8TUoFRAkquhv33"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.6+commit.31b54857.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.6",
            "build": "commit.31b54857",
            "longVersion": "0.8.14-nightly.2022.4.6+commit.31b54857",
            "keccak256": "0xb0a8d2d5fdac8ee30bbb2d32caf829cf59f697bef0a25807938c68fea6ba7d91",
            "sha256": "0xe1445d1d26167ad1b3902226786f969fcd024b36c604e570fe1927d08808da80",
            "urls": [
                "bzzr://093ea087a1e9aa0c552ab7054fb6fa606866dacbea2d0d58cf29b821bdef8896",
                "dweb:/ipfs/QmWxs7phpb5SUU1eVQHttq6iELcz51y1817ivZ6uZUp91Q"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.7+commit.15c2a33e.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.7",
            "build": "commit.15c2a33e",
            "longVersion": "0.8.14-nightly.2022.4.7+commit.15c2a33e",
            "keccak256": "0xff3e3dc1163c7705ca21a4a2012a74c4475a66ca8c4c69d95839a0655bd10772",
            "sha256": "0x4419412c214cef1b38f9ff0e0e71c1201e742fd0afd2c4850fd5fb87ee45137c",
            "urls": [
                "bzzr://421dca85897eeec30207937f13a6f133ecc589ce5c89d0614c52ff00b61db63d",
                "dweb:/ipfs/QmPJMa2PLcTCBNMr2ryExb7QaD2JbMivunqXWsG7GexUt5"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.8+commit.d9c6ceca.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.8",
            "build": "commit.d9c6ceca",
            "longVersion": "0.8.14-nightly.2022.4.8+commit.d9c6ceca",
            "keccak256": "0x105821c0eee90c0ada28c929085ec000e78e920430473a475d69d359cfa802b5",
            "sha256": "0x6e41a918af8b0f05a23c0e3e425a240ab87860f59cd1ab86e35340e01e3b92b1",
            "urls": [
                "bzzr://05e169823f9ade2b3c82976f106fe2503e788a6af0458f2f9aa19b0eca677678",
                "dweb:/ipfs/QmZuRrLy5jvK9zFqo8JTiNvvX4DLFmkLmsSjBTakiJyfG6"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.10+commit.0b811943.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.10",
            "build": "commit.0b811943",
            "longVersion": "0.8.14-nightly.2022.4.10+commit.0b811943",
            "keccak256": "0x49ddc497af6ed677e959e876e8e00a7872a6151876f729117a7b4db722767906",
            "sha256": "0x3609eea5e7f3592ba834591fce6971c847015478cd9c2c3619e884d81b05c4b9",
            "urls": [
                "bzzr://c33a449f6da7fdfb1ac4f12ca3f6c55ed9e95c72d7473b35a512d57e87054922",
                "dweb:/ipfs/QmSzSWo4iU2PXCVe7RBmJcAF94w5dCbNFQZuLe5u7FT8NZ"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.11+commit.9e92c7a4.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.11",
            "build": "commit.9e92c7a4",
            "longVersion": "0.8.14-nightly.2022.4.11+commit.9e92c7a4",
            "keccak256": "0x63ebfee323bc6ce00b40b062fa4013b78ad93ef5572eee29e21eeb9c548b8ead",
            "sha256": "0x24dc8b7dc37c204158e746bc6c270f9ef565b6019d66f28270f92425a6c0cae6",
            "urls": [
                "bzzr://321cf8e7cbc9cbaaf72984de9841da1487e74c9066a9f4665c69267f7455b481",
                "dweb:/ipfs/QmPLdKkzeKkpQAs1GuirzzkTJGP7gGYHZSCTTUa1MLPNHN"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.13+commit.25923c1f.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.13",
            "build": "commit.25923c1f",
            "longVersion": "0.8.14-nightly.2022.4.13+commit.25923c1f",
            "keccak256": "0xcf0a3d60e7b0eb0e84c17b4028b8c825d66a34267467df653db4ae025148f301",
            "sha256": "0x1e0c43ca53a31c3aa9c2423319359dc2ca9b4defc1e7986a52d1b9803348f51f",
            "urls": [
                "bzzr://61895a1fdd4e9279e8bf79ec107e9142b040318a565ec202c89df13858748f95",
                "dweb:/ipfs/Qmcfk6RBy5GfKRfFkR6ghPipu497WB5b63PDpyUei6szP6"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.14+commit.55917405.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.14",
            "build": "commit.55917405",
            "longVersion": "0.8.14-nightly.2022.4.14+commit.55917405",
            "keccak256": "0x36c7a71108683413d937a0deabec7cf139f85cb185e50d882c12763212a34902",
            "sha256": "0x8b3929b48934098434470a07f8fb485fe3ec853667b8844ec0494a24207728fc",
            "urls": [
                "bzzr://e352149f5c266a247fe9cdafbac130774554955465de65fa77d87268bd057254",
                "dweb:/ipfs/QmNaNMD7RT9TW9piUdzA7Ga1H4ACmzTLcqiGJnxCQMhjrK"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.25+commit.fbecdbe7.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.25",
            "build": "commit.fbecdbe7",
            "longVersion": "0.8.14-nightly.2022.4.25+commit.fbecdbe7",
            "keccak256": "0xe9e20a79738df947d69a9a2920a328c1af4967eebce4d519552f02d025bfade1",
            "sha256": "0x9ba722e63894c046baeac4abbd9187bba42bfa99f1eb0aa399e02705d5428926",
            "urls": [
                "bzzr://66b310699f12ffe8f1d56070bb072230b7a60fcdeac3fc7c98bd0408638e1b94",
                "dweb:/ipfs/Qma5LLEV2R3et5EjeApJZ8tj4iEKhQ2K3C4S6esjXpU5gx"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.4.28+commit.d55b84ff.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.4.28",
            "build": "commit.d55b84ff",
            "longVersion": "0.8.14-nightly.2022.4.28+commit.d55b84ff",
            "keccak256": "0x39218ac3ad982d23ea41d876f045be0df04acae6a30d6730b12a2fddfd03ec83",
            "sha256": "0x2a580920b2ccaa72b8b759b76dc517d318ace6793d02eff2c35b7261cee506f0",
            "urls": [
                "bzzr://0146abe99c8a1a8490c41b99dd289f043cb7c7e9b82a9cb4174972f774d3694c",
                "dweb:/ipfs/QmZ9MDww1sJdxZdCRfwNKSEwpwbowRc7XcCGKE61cX6NtP"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.2+commit.3e3e73e3.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.2",
            "build": "commit.3e3e73e3",
            "longVersion": "0.8.14-nightly.2022.5.2+commit.3e3e73e3",
            "keccak256": "0x3d527ba1c2c358dc1c7d35dc592e58b1f92f9b7a0ffc64eab87764d8224d1b60",
            "sha256": "0x1f703d0929d04a085612ab6bd074bcc6ed251bb55c1de98018d3fa23a699d7b6",
            "urls": [
                "bzzr://baa589caf703e35c13b69384ba90911437c309c82805cca27b96963b4cefb6f9",
                "dweb:/ipfs/QmPKs15VSfoiBtzqdfjhycKZDs9KtRU9To2JUFiNxL9V9D"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.4+commit.84c64edf.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.4",
            "build": "commit.84c64edf",
            "longVersion": "0.8.14-nightly.2022.5.4+commit.84c64edf",
            "keccak256": "0x7bb747905345eb6f412d713d09cce606b3a62a2e3973712674a42066ff8538d3",
            "sha256": "0x701e45742f545592e3fec35bb6bc00afe5be56c7efa8c4c5c9b6e7309acf6989",
            "urls": [
                "bzzr://15d1afed75f35f5166b28b3e316895db8801981ecbe75f05812190d54f8d0f8c",
                "dweb:/ipfs/Qmc5iTcus6JD6FZiosWvykerxPtbHpp4VhEoHRtqukcz9v"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.5+commit.1dba6aaf.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.5",
            "build": "commit.1dba6aaf",
            "longVersion": "0.8.14-nightly.2022.5.5+commit.1dba6aaf",
            "keccak256": "0x7741b24cb4dad87870ad0b6473c0c03171196b6ee5acdf1543e36ccc0adaeb72",
            "sha256": "0xdea03ea5fdae747820499808e8c7d29511eedab3b1244cfe1ddb7fc9680e6fc5",
            "urls": [
                "bzzr://2a53b0b318fb0b1c6c7696084f81874bf120873d7efc4330b753c54f05ec31ab",
                "dweb:/ipfs/QmP547miTozcE3fWoyER4piQMG5qzo9KAAJS4EaiG2TwKS"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.9+commit.463e4175.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.9",
            "build": "commit.463e4175",
            "longVersion": "0.8.14-nightly.2022.5.9+commit.463e4175",
            "keccak256": "0xe40486666718baa7675ea968030c8c1aa742dc8e60b3e47ed44d36835e9793e5",
            "sha256": "0x19e1709ec73669540ab7629fd81c1a062fdd0193bd4415b3ff49979ed307e3a6",
            "urls": [
                "bzzr://f28f26af14de0ae4de1b5df314ce1dd538758d0447fdc8dac1ff6014a17279af",
                "dweb:/ipfs/QmUGnERKUVJrnoivTGSC34upS4P4LT5LQX9ZZxdy3sdVyg"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.10+commit.9f6d3dea.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.10",
            "build": "commit.9f6d3dea",
            "longVersion": "0.8.14-nightly.2022.5.10+commit.9f6d3dea",
            "keccak256": "0xdb4fcfa0dadca1ce210cadb6ef8159a3f0aa5378b383fc1e061685266dcaa3e9",
            "sha256": "0x01b6ba67ec312cb7a062f0dcbad6f0d4d864214a2189ef01af144d06bfc14a06",
            "urls": [
                "bzzr://ae49fb5d4f533666abd3b5151d5fd519f47c954ffb3a78c193ec0e42af82818c",
                "dweb:/ipfs/QmQkzHBrdUguvewDdzVZsCyEfHDUKj3m2UA1SaQjZR27Ku"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.11+commit.0c0ff4fc.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.11",
            "build": "commit.0c0ff4fc",
            "longVersion": "0.8.14-nightly.2022.5.11+commit.0c0ff4fc",
            "keccak256": "0x67e8a491d9cbb500912cb07c4d6ab97137b03c6ba1a6bd42d87f8681bc3139df",
            "sha256": "0xff05fb235063b77036263a6f7d753b07cb8d9f580672d4c649f5b8ee13e39369",
            "urls": [
                "bzzr://169d02c424f2790087a1110a8f3f6b71615da3dd2e9c4cc0648440d08345fcf3",
                "dweb:/ipfs/QmVst9QSqZTK2avL11RVKYE1UfdGB7D7rX5yoJAmsbfv7b"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.12+commit.aafda389.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.12",
            "build": "commit.aafda389",
            "longVersion": "0.8.14-nightly.2022.5.12+commit.aafda389",
            "keccak256": "0x1ccd09e36318d8a27b80bf71307f7f38db9385cd959daee7c464dec311e3ecba",
            "sha256": "0xed874afa7efc2f8d32cad24831408ea7a5ef9ec91719b9e61491e5f809045c3e",
            "urls": [
                "bzzr://384ecaa2a63ed55337283641828d0e68eecfe44ccd7464e292fbe80ba80ef2b1",
                "dweb:/ipfs/QmXsjx2xxVr968cTrh1vy31TmG4DcMRiAoeRyovh7zqGTF"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.13+commit.a3bd01d9.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.13",
            "build": "commit.a3bd01d9",
            "longVersion": "0.8.14-nightly.2022.5.13+commit.a3bd01d9",
            "keccak256": "0xe8b9245136e80d8e0633ece7f8b99ed713c2ee306f53380b2f9d3fcae59e090f",
            "sha256": "0x28365c73010dbdf3bdbfd1032b414272649a84331e90552d3588b9f69c0f7e34",
            "urls": [
                "bzzr://0384b5cf7901d576c0da96661747e50c3a9c07291c3d2eb4f728ff01d5391df8",
                "dweb:/ipfs/Qmc6GytcQiAWSuhYkniotwXk4bY7AfE21EosivoDfTqxn6"
            ]
        },
        {
            "path": "soljson-v0.8.14-nightly.2022.5.17+commit.80d49f37.js",
            "version": "0.8.14",
            "prerelease": "nightly.2022.5.17",
            "build": "commit.80d49f37",
            "longVersion": "0.8.14-nightly.2022.5.17+commit.80d49f37",
            "keccak256": "0x5557f160e72e13be0be296cb269f3a8e9c9b248db5bfeb93346249a4c1cd988d",
            "sha256": "0x2eb5a700193aa6715665fdce0dc68905a23cc2d4cd4cb416595c8c6854515a43",
            "urls": [
                "bzzr://6a0bb7ef2d4f5dde231276059f19c4e76deb4d2f9311dc57ca0c37ca1f596ce4",
                "dweb:/ipfs/QmX9q39bmepzM12zShAJetptxsH9m3y864o3XC8YKGSxtR"
            ]
        },
        {
            "path": "soljson-v0.8.14+commit.80d49f37.js",
            "version": "0.8.14",
            "build": "commit.80d49f37",
            "longVersion": "0.8.14+commit.80d49f37",
            "keccak256": "0xb0f7f19a8590e5c0aaf779019c1deaafed170d8c26bec9bfd782d212e097619e",
            "sha256": "0x7c3b3d0066fd381283b1d8d9a86153b2ddb5c01da14a1ae015c05cfa484e81b6",
            "urls": [
                "bzzr://fa438d41ed52c9e0cca556efee61486fc77e60df06081921abb0a0f19b602d35",
                "dweb:/ipfs/QmcM1TcDB4ta8ttNLWZ4d24M4Qs35rc91sQkdNmJMNbuvV"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.5.18+commit.de7daaa2.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.5.18",
            "build": "commit.de7daaa2",
            "longVersion": "0.8.15-nightly.2022.5.18+commit.de7daaa2",
            "keccak256": "0xc43a2b2d70fe1cb003440f6380550665ef83fb15ba0807be8f19894f5b5eca17",
            "sha256": "0x2158766b886616ea79896a1ecd3f026078f80c9da5368acf4b954d976f31a221",
            "urls": [
                "bzzr://9e76deea665e6e3d3dbebb764c90c352baf711e96736383765ebc93ee0277eaf",
                "dweb:/ipfs/QmQjaqNHuYMysATX4bHvVsWP5eKfqVHCgdfbcjzi8y2x8L"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.5.19+commit.0cb95902.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.5.19",
            "build": "commit.0cb95902",
            "longVersion": "0.8.15-nightly.2022.5.19+commit.0cb95902",
            "keccak256": "0xb5b3ef6f9c37e669a03a87bb213bbc3e975a0cd59ed212743cceb14ca151b096",
            "sha256": "0x4fc18b63ca392cfebbf61fa602b267c0cc611d1b86435713417b6cdb005efbcb",
            "urls": [
                "bzzr://3ac6c37efbaba619537b425940804c2df75798527ad82505865aceb4d8fb4f28",
                "dweb:/ipfs/QmWZriFtBQ5s82XddcRQKWiqMis1XjH3YAK445HpXrQbig"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.5.20+commit.02567fd3.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.5.20",
            "build": "commit.02567fd3",
            "longVersion": "0.8.15-nightly.2022.5.20+commit.02567fd3",
            "keccak256": "0x1697cd1daf5f5760f6b07b4e3ed015d20345db42a2b64db20702c8c27e97ac90",
            "sha256": "0x4f3ca4952f37a8baaa8375854b7498e795c618ae3186e11f536552ff8769898a",
            "urls": [
                "bzzr://3005ea4f6667360c9e6e2f7db14e9ee8c479b621ede7647b1693c5a5412d3ff4",
                "dweb:/ipfs/QmW5S4Yx5XW5p6gmVjsEo37ssmp5ivNpM8cEjJTtRKZaDN"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.5.23+commit.21591531.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.5.23",
            "build": "commit.21591531",
            "longVersion": "0.8.15-nightly.2022.5.23+commit.21591531",
            "keccak256": "0x992ce515de6c20b39d99a27c715b580dce1eb083d5ca79a4a0affeb43510520c",
            "sha256": "0x183a9ad978c75e407958a6e3974089a1f9d120ec74dbdf0307c5338efb680f64",
            "urls": [
                "bzzr://b43d7346917e18caafe0a29878708bdcc9b411d0b0ffa2f93fd9e38c77b4c9e6",
                "dweb:/ipfs/QmdjSjZ4CZNp59J94UdwKdHKYmWiCKcP3UQi1oLtm3BGNS"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.5.25+commit.fdc3c8ee.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.5.25",
            "build": "commit.fdc3c8ee",
            "longVersion": "0.8.15-nightly.2022.5.25+commit.fdc3c8ee",
            "keccak256": "0x72c4588ec42b6759d5a99a4a0977e06329681333f8cc8623c61c9b97cacbfb19",
            "sha256": "0x1b29dc1102ad77cd6b533f84c18a2321f3b95c3a4c358abc55e8a2016dd78b45",
            "urls": [
                "bzzr://2695e8f4630287a3ffd60e2d7a0769e84c70965769d930d078e9139c25ed69c9",
                "dweb:/ipfs/QmPZUh8NYkjJGiVtgcqrzFk9J3qZ7riKRLfXYYFjWmCzW4"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.5.27+commit.095cc647.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.5.27",
            "build": "commit.095cc647",
            "longVersion": "0.8.15-nightly.2022.5.27+commit.095cc647",
            "keccak256": "0x58d89c45cf4d1d0a7ac2dac6af3b04294dd2845f5fb4802724a76ecbd67fd202",
            "sha256": "0xc132a7540f812eb9b83b95146501da42a4e0a715a3cf65b463990a3f317efae3",
            "urls": [
                "bzzr://aee1845e172ffb9cf25677327d047f14a986f99d4a98356a89644e0e312779bc",
                "dweb:/ipfs/QmcxrBCxyzfrmAwEeaRU9daSMPuwVS34mArX6U5b38JV3f"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.5.31+commit.baf56aff.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.5.31",
            "build": "commit.baf56aff",
            "longVersion": "0.8.15-nightly.2022.5.31+commit.baf56aff",
            "keccak256": "0x8702ac0817f97168d40adb9255c0ae68fffaeef200d12f7c89dc0a7acb3146d3",
            "sha256": "0x11ccac463edb5351716820d29a75b6208d68901c7b76d6ebbbd474ce864fd212",
            "urls": [
                "bzzr://4defe2cfafd509bb4c370c231cdf878eb2fca1fd6548b15b2225e0ffd34e1dfb",
                "dweb:/ipfs/QmPKvLfwZ6DWKwY7hemmVEnPbL9pohTXaGBSwtzWWLFQPE"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.1+commit.3f84837e.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.1",
            "build": "commit.3f84837e",
            "longVersion": "0.8.15-nightly.2022.6.1+commit.3f84837e",
            "keccak256": "0x04c2849fcff214a630335f46d2eab2b4958884508fd0483edabf690169ea0a46",
            "sha256": "0x4fc7375ac9024d05bf1f41d96bcc6157da53a72be4f1b0de0471b8b40c6d1a7d",
            "urls": [
                "bzzr://51be675d1aad2aae2ce1dd529c99f500ba3fe52ec88e229c8fa43ebf7dca86a8",
                "dweb:/ipfs/QmXcGCnq6NekRTJqgx5Fz6FFezMiME6rebtsGNHZCQLN4q"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.2+commit.035f6abb.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.2",
            "build": "commit.035f6abb",
            "longVersion": "0.8.15-nightly.2022.6.2+commit.035f6abb",
            "keccak256": "0xa2f2257fe92ec4ffd0a29a4e2c1b3671385cca9f7e276c036ad21e9b4d00e528",
            "sha256": "0x51b20c3b501f81eb618318cd38a0479392029625f8688d7964f6a9f4e53f228e",
            "urls": [
                "bzzr://3a4f2fc9ab8f17ebb168f8716397449b9528bd381b8065e902f6502724080b25",
                "dweb:/ipfs/QmUxccRivYPYcK1cB7k244WwtjSEZDpFGpUyoXMXJbFHEy"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.6+commit.3948391c.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.6",
            "build": "commit.3948391c",
            "longVersion": "0.8.15-nightly.2022.6.6+commit.3948391c",
            "keccak256": "0xe3794a6bdaf5ded606069589eeb0733a962b3e712b6faabd800a011ae66724de",
            "sha256": "0x44d44eeaa67165b2a80de93960cb6cdcf43f6e1659e1bbc2349e5e0a985a0bad",
            "urls": [
                "bzzr://4ba3ab07c50e06f9cae5a012cf482c3dd2ab6e52f8f21faf1c50a68cc05778b0",
                "dweb:/ipfs/QmNhbeEEkMgfjmWNyxXwvD3pE8kMYbE4G73TFbFwZG5vjS"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.7+commit.8c87f58f.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.7",
            "build": "commit.8c87f58f",
            "longVersion": "0.8.15-nightly.2022.6.7+commit.8c87f58f",
            "keccak256": "0x30901b94854c5093aebe146aa375a960d3d7b0b169245b41c69d1ac9e3401e65",
            "sha256": "0x45f40aeff48fde939a37011c800c37c17fbe90359b621854e0dcd93e033491d7",
            "urls": [
                "bzzr://8f5d29985be0a7b5001ae8a0355d0c1628300e8554b2ec2b77ea06a9bf2125d0",
                "dweb:/ipfs/QmWCfc9cfWhUbQ6jH71r3w8gRUPLi9Lavu4D2AK65aAdje"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.8+commit.9b220a20.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.8",
            "build": "commit.9b220a20",
            "longVersion": "0.8.15-nightly.2022.6.8+commit.9b220a20",
            "keccak256": "0x3a0af2fe548ff5572da66632b520825162aaa6ee33ecf5d80e776e34dd105504",
            "sha256": "0xdb8ce5ea5421924267ef273b4f830c25bdc19d288550576024ba7c3a91c4bdda",
            "urls": [
                "bzzr://35e34202033208b3cf7c1ba4184c7f58375cdde861dc96f49cbd5817b96a58f1",
                "dweb:/ipfs/QmaDx2VxwMnmGDWJKzyrx8RKZah4QCXtVdo7F73MHBSanT"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.9+commit.80f6a13d.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.9",
            "build": "commit.80f6a13d",
            "longVersion": "0.8.15-nightly.2022.6.9+commit.80f6a13d",
            "keccak256": "0x1d8cf10234521204ecf1111f105e8ccfa936129361b3addc20584f0a4229596e",
            "sha256": "0x10723ea95f86cdd50fcfa8acfdf3e6c2eef353fd4239f8448a231c0281b8d075",
            "urls": [
                "bzzr://39ba5fdb98a3ad0bf1fa1123b84211bae747fb084ee6dc242995dde59d049904",
                "dweb:/ipfs/QmYx8pdgs6rpj6hayQZQfsJZr3SCmWXXugyWjFSEiZUH2K"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.10+commit.efcbc79b.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.10",
            "build": "commit.efcbc79b",
            "longVersion": "0.8.15-nightly.2022.6.10+commit.efcbc79b",
            "keccak256": "0xca60b095075d3cc9be717b39dee396475e50086aedff8b76a20ac9cbeedeaf2f",
            "sha256": "0xa6bbb86cdaed748f1878c4b678170ee60b59c9ddf15d0dae5b1f33051f242dbb",
            "urls": [
                "bzzr://ec92765725dd1c01e50999085717c45fbbdfe6947203d3214261422b6f0d0e40",
                "dweb:/ipfs/QmcsBTuYbFxnjAzLsFybx9nh2gTfunw8WvRFLwcmhmoPHp"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.13+commit.82e5339d.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.13",
            "build": "commit.82e5339d",
            "longVersion": "0.8.15-nightly.2022.6.13+commit.82e5339d",
            "keccak256": "0x6c0dd3027ba158afd77e459410e2fe65d27aca100d5615dbfd84a8dc4d8ebaa8",
            "sha256": "0x9956bc6c320e6efdd5d85c5c86054b5276ae0cb5a6627d01046b67601e48fbc0",
            "urls": [
                "bzzr://399d61c1eee761d19e56ac765ee6d7c48c982ff7767589483c425024b0db56ef",
                "dweb:/ipfs/QmScLfZtPwt4T2p1FTvGC1fEHprrEcTjPuQxhzX7axXrMU"
            ]
        },
        {
            "path": "soljson-v0.8.15-nightly.2022.6.14+commit.dccc06cc.js",
            "version": "0.8.15",
            "prerelease": "nightly.2022.6.14",
            "build": "commit.dccc06cc",
            "longVersion": "0.8.15-nightly.2022.6.14+commit.dccc06cc",
            "keccak256": "0x2281ef878f71b388a4b35593721eda836176b982a9553c1ed09f983f2fcdc17c",
            "sha256": "0xd0b29a0d63cc3e84b6721e000f08bb75071409c087147577f0ef146e6734a354",
            "urls": [
                "bzzr://09fdfa69c6ad30446a40c6b3b4cd9034c2af08db43cd12f4c19a526cc0afbcd3",
                "dweb:/ipfs/QmcGQ39xCnexmapxhJFFWPmSJpBT7BdX6Ga3M5ZKbitzF7"
            ]
        },
        {
            "path": "soljson-v0.8.15+commit.e14f2714.js",
            "version": "0.8.15",
            "build": "commit.e14f2714",
            "longVersion": "0.8.15+commit.e14f2714",
            "keccak256": "0x4f6cdc0f25e734bcb977bb6a3e22fa41d8a82cbd5f220a2e4238c2d233526d1a",
            "sha256": "0x71135e459d691767ce3453bab4564ef4a640dd50182da36517cbc1f96c1d4c7c",
            "urls": [
                "bzzr://ac5baefba32f4779a03d1207d9f1ed69365280c702fd73002a729b7a3d52c425",
                "dweb:/ipfs/QmPiBrYZxxpNZPQ98GNyL7Xa1F9Dq7uHtdt9ESwhPNkHhc"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.15+commit.f904bb06.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.15",
            "build": "commit.f904bb06",
            "longVersion": "0.8.16-nightly.2022.6.15+commit.f904bb06",
            "keccak256": "0x29637021d53afe2cba405b1cf88157904d292535d8b4949d6af12abbb67c91f3",
            "sha256": "0x9634f392ebc0ab0e1869a6ede12b194877d72018c32575281aa21c0b943a44b2",
            "urls": [
                "bzzr://3174a27913e7c2a5e7a6873a68c6ab7e43fd6c11826d18130c54095f161c5ccd",
                "dweb:/ipfs/QmRURVBFPeAa8FHnSPQKLTDjtDVerxwyRucCwonvZV9C2q"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.16+commit.b80f4baa.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.16",
            "build": "commit.b80f4baa",
            "longVersion": "0.8.16-nightly.2022.6.16+commit.b80f4baa",
            "keccak256": "0xda13d3441ad331a2b29a0cf30058db716160f5457fb5dcff3f118eb7042fb7d5",
            "sha256": "0x0ff8ec7c1ea8d513e2b06ce3410cf487517599b103e4bc9cc4510df7bcfdaa00",
            "urls": [
                "bzzr://4136c989f5045b1caf311d01687dd503ebccfa843ef1477ea2a1d7dca26e8011",
                "dweb:/ipfs/QmXVworrztYSuMn3rodrEpChDiun1NhsrLMPQ6XgvmW4bW"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.17+commit.be470c16.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.17",
            "build": "commit.be470c16",
            "longVersion": "0.8.16-nightly.2022.6.17+commit.be470c16",
            "keccak256": "0x1dbe4b7d5427dcac9b9a01c449856f74e65dad353f2c10202421ff31ef770182",
            "sha256": "0x7f0a39d3b204d2200db03156fa616f4f5f80bcb52db22e8453efe3c2d8f689ba",
            "urls": [
                "bzzr://e273efb424fc5b4d0d4e299286d58887c9a7e3b02f7800e9c3a35a892973ca67",
                "dweb:/ipfs/QmVZPnnjJ8RS3zvsYb6Q5cd1STeudWdNZmKT6x2wXK6P9X"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.20+commit.c3ea8661.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.20",
            "build": "commit.c3ea8661",
            "longVersion": "0.8.16-nightly.2022.6.20+commit.c3ea8661",
            "keccak256": "0x015a23e4a25158bc29515550b0fb8c10b1cc9ce4d24fe181cdc7ceb4a1c82370",
            "sha256": "0xd61864413386377c7ba2fc94339e377e224017ca923c616749d98216dcacaa70",
            "urls": [
                "bzzr://e93f50e4115cbe4f535149b232481e6790d32c2a3a9dab5057c13bfdd6876f47",
                "dweb:/ipfs/QmVWYLbPNHui1hVfJpNEUDpW3tggmzxJX97gaHtpagy9GY"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.21+commit.75300c32.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.21",
            "build": "commit.75300c32",
            "longVersion": "0.8.16-nightly.2022.6.21+commit.75300c32",
            "keccak256": "0xd13a052aa23997cc5b17ce33c8ae6030d187545d421531e2913b5013a620863b",
            "sha256": "0xce51492d4a1ccb4940168c546a6869c8251934389ce6c94e9766570743ae6adc",
            "urls": [
                "bzzr://1fac48a96bdb1e2949f89efc95ba559492b507a5ef95b5f10ad05a2a84251b28",
                "dweb:/ipfs/QmQLJf2aXQWM4qFvUmH7sBhWhHRAiE54731WkMXmcRKFXx"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.22+commit.a2a88afd.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.22",
            "build": "commit.a2a88afd",
            "longVersion": "0.8.16-nightly.2022.6.22+commit.a2a88afd",
            "keccak256": "0xc8050c8093fcea30603a28b44832d159022eedbe5bb6ff9c79fd89225fa1937a",
            "sha256": "0x4fc5fb137a49e831bcd94ed8762ea58bd0ff5946b33f3ae5273e2022d3e1a608",
            "urls": [
                "bzzr://14527df8d24f61139244d7f3984ba5bfe761ac8017e9758d1572ff899de3d928",
                "dweb:/ipfs/QmYwzbwutMDtY5jWKg1kr1z7BPYD3AoE9GfSrxQH7CUTXS"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.23+commit.3ed9a38a.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.23",
            "build": "commit.3ed9a38a",
            "longVersion": "0.8.16-nightly.2022.6.23+commit.3ed9a38a",
            "keccak256": "0x861818d5bfec59701d61ec5908d676b53150ed619803b3050e53e5ff8331f32f",
            "sha256": "0x199891c84f5515cde91a6abec5b74a41423d700d872b9a321cfd4f88986f8fba",
            "urls": [
                "bzzr://a78684b8ba712fc311671387bc9b04804aaff9d95ad34a47fba17136af162b02",
                "dweb:/ipfs/QmNmf6mL2DFuGai6JN8CmkC87emTu5R8YUu1AeXj6qG94M"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.27+commit.b70e064e.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.27",
            "build": "commit.b70e064e",
            "longVersion": "0.8.16-nightly.2022.6.27+commit.b70e064e",
            "keccak256": "0xdd0ef94dca66c1b6fa164c33a46592bcfa9a2dfafc2392f50a8a84587bd7be99",
            "sha256": "0x3b124626725c92c5b90d33187612aaaa67c5a45fae709e471d952138aea7fc5a",
            "urls": [
                "bzzr://87628f344a6c79cb77ce5a2acd95f595618e19c9bd6adc63f2bd1505f8c843a3",
                "dweb:/ipfs/QmSxn81Hs3BCaLkFAzUFqprm9LQFPYgD2cQzMut8nFx9pm"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.29+commit.05496064.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.29",
            "build": "commit.05496064",
            "longVersion": "0.8.16-nightly.2022.6.29+commit.05496064",
            "keccak256": "0x49dfeb5a73467b155c51700097cb1c620878b32d2e91a4a357dcbc18afc6d172",
            "sha256": "0xda95e48c0c5886ca07a08c7d4cf96e0713f8d2461282d4a5dea8d75bc435b3b8",
            "urls": [
                "bzzr://4039f243767b14c0eb7004a916ca1d4fc616c78cf20da908c0fe248588e5f5fc",
                "dweb:/ipfs/Qmecw9b3LcAnYhpNvaLXd3g6XX63UBo5XLpPFE7Ex2qUjb"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.6.30+commit.48669b4b.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.6.30",
            "build": "commit.48669b4b",
            "longVersion": "0.8.16-nightly.2022.6.30+commit.48669b4b",
            "keccak256": "0xe1fde9791889d3d4ab576a16e1ad358566d812c7d724d2f48dcec99a781c60b1",
            "sha256": "0x47772d59f6ff315e698bb0350d7215d7585abf6b9e2ef56eb52b9a8722261178",
            "urls": [
                "bzzr://3bdb14adb20c7c73226b7b3d954ebcb1071e9b53853b50f1a0bf828d32d3264c",
                "dweb:/ipfs/QmNmySqyeFwwhKdECo1UpYZ73ZJ431h7RZQm57PCPwjkym"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.1+commit.5de51204.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.1",
            "build": "commit.5de51204",
            "longVersion": "0.8.16-nightly.2022.7.1+commit.5de51204",
            "keccak256": "0x8c7ffcee026bb3b7cce70d8e71b27beace879774df5340f40b246389791be4c9",
            "sha256": "0xd0032294fffef113bcc3c02f80798a04968769905e177d7499546208f4df166c",
            "urls": [
                "bzzr://a7b5ecbc9db7bf33e6bc834e40cc4c75eabcf25d997e03750fd9b9f23502667f",
                "dweb:/ipfs/QmNYNDBv5Yt1ZryUhDAxJm9vvv1XCNeKUeLd2A5QNB65Kj"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.4+commit.a53f15f4.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.4",
            "build": "commit.a53f15f4",
            "longVersion": "0.8.16-nightly.2022.7.4+commit.a53f15f4",
            "keccak256": "0x651157ca3c71f854a17d7fc23117da2bfece1c3e6f46fd44f77b860bcdb137b7",
            "sha256": "0x99e766077c974df2721f9dd2b11af20fa06686aaea4e8f625897e733f80010d3",
            "urls": [
                "bzzr://eb0e42f574173e30187567804c21c47f441d8fc6c6c256b9dd473fa4b8eafaa5",
                "dweb:/ipfs/Qmb4CvKV1f2LxFhnzXjMN2H2wxEmy8uYN4CRMQUEUMnDYf"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.5+commit.c8aed8c1.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.5",
            "build": "commit.c8aed8c1",
            "longVersion": "0.8.16-nightly.2022.7.5+commit.c8aed8c1",
            "keccak256": "0x3b2a839f3305b523041bbd7e1178a014fdd981001cfad030f22ac4165ee12bb3",
            "sha256": "0xf888dc3f6a7c1ac034adfc92eb1a3e649a13e712cc4271a5b2f6d53026995203",
            "urls": [
                "bzzr://daf9bfefae8e13e0a9f14b972a24ade8dee6e8b6151012b6c06eb189439de0ee",
                "dweb:/ipfs/QmPvHQDfxVsTnVkjLMMkef8Ea5puNqUHuCUHgqgb6nQgpN"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.6+commit.b6f11b33.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.6",
            "build": "commit.b6f11b33",
            "longVersion": "0.8.16-nightly.2022.7.6+commit.b6f11b33",
            "keccak256": "0x80c274558c882984bac1d65027cea6932a820ada664868fe71e6e9fe8c2a5e47",
            "sha256": "0xb6d47aaff965b081100ac388d6c67d59c03fff7d80c93d7512aa3a0e2c5c02cd",
            "urls": [
                "bzzr://942ef6cbaf4e2d4eb46c63df6871da165e44394c5bbf467adbfd205d8d78d5cf",
                "dweb:/ipfs/QmQcmE1vQSP3wdmcQ8vHa42JLbaeEe3zhT86JPhCajLQ46"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.8+commit.8d6b20f7.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.8",
            "build": "commit.8d6b20f7",
            "longVersion": "0.8.16-nightly.2022.7.8+commit.8d6b20f7",
            "keccak256": "0x4bcce65ef1e1f7d30d39fb70674d287eda800922f3ad57d5c910b4f6187fdedc",
            "sha256": "0x8eafbcae74e27b6c76321742b923cbf3e7ad0fd82cdaeb029f6bbaa3624a44c3",
            "urls": [
                "bzzr://f8964492c0e04a97787eefe3382d47b7e90b1514a28531c7c014a9ee11b7e788",
                "dweb:/ipfs/Qmby7V3fFHBRZGKopSpm3pTgepPmvQA9JPY3bhcbJaHPrf"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.11+commit.e7c5f044.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.11",
            "build": "commit.e7c5f044",
            "longVersion": "0.8.16-nightly.2022.7.11+commit.e7c5f044",
            "keccak256": "0x8acd7600bb937bfba1d17e0826c108618b1a90ff2f34f56d8bc33b896b104c8e",
            "sha256": "0xa0aece00114a63362c6c00c701dfc1c3b92224b275119764d78af2913f513a91",
            "urls": [
                "bzzr://90bfbdf13806f823a0bd6803713cde37fae8bd9b4ea0caf65ee90a55079a5500",
                "dweb:/ipfs/QmefRRS7DZMDg5zYprqaMK754QAF1M3jms9rKYxtzcmXpx"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.12+commit.d003400c.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.12",
            "build": "commit.d003400c",
            "longVersion": "0.8.16-nightly.2022.7.12+commit.d003400c",
            "keccak256": "0xdfe5ebfe4c964a7eea8d33b687752d0448db6062b7757efa288f520f5c4e06b6",
            "sha256": "0x701f69a05ea44758477185181058be695f8d8b4ef6b023e59f495dce77da4ccd",
            "urls": [
                "bzzr://b63b0b0c401c5cdc371bd29f9c1158de228b13e0c3c927f8c8f5ceed78c9bcdd",
                "dweb:/ipfs/Qma5vSq2hHfinWGwXDYtLJ8UPgtTz9y7oxyo8zRc2XtH77"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.13+commit.454603e1.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.13",
            "build": "commit.454603e1",
            "longVersion": "0.8.16-nightly.2022.7.13+commit.454603e1",
            "keccak256": "0x98817178d8a6b5762f196cdb860fdd275a332b0ffdd3a1e238cc45ebe3143a6e",
            "sha256": "0x1f0e0ef6582e46067d5391c9de8167028f0f75c2065fb63654ec5b9408136f60",
            "urls": [
                "bzzr://222e2393d50fdc79b0e1e893ce9f9d8a88a27c10bdfe13532b60ab31d053097c",
                "dweb:/ipfs/QmeWa7BtzWzbnnLR99ftj4Tp1J5Cfe5rddwVtJ3oZmRxWC"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.14+commit.800088e3.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.14",
            "build": "commit.800088e3",
            "longVersion": "0.8.16-nightly.2022.7.14+commit.800088e3",
            "keccak256": "0x39e5388212876deed94e470ac786f3682786acab034c7cd99f847c3c2d3de56e",
            "sha256": "0x926dada7d31261a997f18731b8fcdac65c6a27e4f65880a01d9088f98338e131",
            "urls": [
                "bzzr://9c50bd1cfdef217c24569b0829b0a87346f0ac7172063fef008b7fe1e5c38b42",
                "dweb:/ipfs/QmSfxwD1Xeq3pJdLmxMfntYxhqQVReDSCZx4GJiPhC5GUd"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.25+commit.9f34322f.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.25",
            "build": "commit.9f34322f",
            "longVersion": "0.8.16-nightly.2022.7.25+commit.9f34322f",
            "keccak256": "0x8912f9309b55e1b9b681bf45a1171f093478a0742d18cf92a0797048f03d1929",
            "sha256": "0xc0eb9462477295a9e307601d6cf88b59f8f956b5e9dae34f9f808b920dd7d437",
            "urls": [
                "bzzr://c292434d2d59a00597bd6b7566a4f71994677127221f16bfb9bcbd50554e78b8",
                "dweb:/ipfs/QmPB3D5aRdUTA98Hvno7BbsKfbDGretPLWBCpaKSDMT968"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.26+commit.ce5da7db.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.26",
            "build": "commit.ce5da7db",
            "longVersion": "0.8.16-nightly.2022.7.26+commit.ce5da7db",
            "keccak256": "0x5ce83832e42d13fa08690fdbe6ac64347509bcc18273e799cd44edc24f07385e",
            "sha256": "0x6677734482952ba0efbbfdff502f22c9234b4c34daaabc165866c61d14032edd",
            "urls": [
                "bzzr://2fa77dab85606d0fb6872be02a35b170862c28b575be097965cf7b8f9c18f115",
                "dweb:/ipfs/Qma9j3BJMEQ9YAurL4MK9AvaLLh3V1W7BHBR1kSyKTKrdd"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.27+commit.72f19072.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.27",
            "build": "commit.72f19072",
            "longVersion": "0.8.16-nightly.2022.7.27+commit.72f19072",
            "keccak256": "0xb93b0d10d940596dfa938cdc6054a56a15f198c20209bd5169c947264a36db7b",
            "sha256": "0xcb3cb16eb1bce816b28327a049ccec70dc0970590ceadfb3906fdb9027922b73",
            "urls": [
                "bzzr://32108a095f87cf34a548aac70e516f802d0869f114bdbfd1429d5ae8083fb542",
                "dweb:/ipfs/QmcL3xJe4c1ZjJ46KGo15R1zrzyzHQuaZ3REghdSESP9TM"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.7.28+commit.d5a78b18.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.7.28",
            "build": "commit.d5a78b18",
            "longVersion": "0.8.16-nightly.2022.7.28+commit.d5a78b18",
            "keccak256": "0x5775764b38b5694f8bc9bd48c367f3beadc465dfcde543150c751d05c67ab8fe",
            "sha256": "0x14df4725cb72bc7844a8f27956d5f6af3e74da48708252aa65c7e36489af17f7",
            "urls": [
                "bzzr://83d73950a409f41c5bf167503544d04ac26b68ac578ce522a3ac8809273dbcb0",
                "dweb:/ipfs/Qmd7qSGz42dtMtZeYHnQs2d93fh4cRguv2cAiJk9FRMSLH"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.8.3+commit.82e5a110.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.8.3",
            "build": "commit.82e5a110",
            "longVersion": "0.8.16-nightly.2022.8.3+commit.82e5a110",
            "keccak256": "0x12715057e2e57a8e959941225fa24424e0b9da8e7d263ad7d6bf027b5b0668ae",
            "sha256": "0x6c6d2190a92b8e144ddb916848ee76a6b22f7eceed452bb6e0bfe693c1603419",
            "urls": [
                "bzzr://5f83088dc4f76133db4c07a074b54ec823ddf1cb1adaadc5cf70118247f6b597",
                "dweb:/ipfs/QmcMf1jkfTRbCXQs17eJt5jiD5Nhct1ytn3KEZT23Ua755"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.8.4+commit.19ad8b11.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.8.4",
            "build": "commit.19ad8b11",
            "longVersion": "0.8.16-nightly.2022.8.4+commit.19ad8b11",
            "keccak256": "0xa1f0bb4c1cf2aaf3e8149b28cd6b1227fb9aa5c2945d9701fe1f6ee44fae3de5",
            "sha256": "0x93c6eb74db5d8f3570e705ec43298ed23defe0e181d53899c70868b310091d6d",
            "urls": [
                "bzzr://c22460eeeb6f18463b54aa53fdde84381ecd9abb29464814e595b449a8cf8c01",
                "dweb:/ipfs/QmUHTtN2FCwweT4VBqX6XbZDXZ2DvbfzDvStZ2zkWABVqW"
            ]
        },
        {
            "path": "soljson-v0.8.16-nightly.2022.8.5+commit.49a2db99.js",
            "version": "0.8.16",
            "prerelease": "nightly.2022.8.5",
            "build": "commit.49a2db99",
            "longVersion": "0.8.16-nightly.2022.8.5+commit.49a2db99",
            "keccak256": "0xe292eb581fe861218e5a505b7b55724ccfa89d9c5545e212e779c5238438d217",
            "sha256": "0x12c5cfb004662e3e001463b8949ec0def6834c1aa4db417586e5680c98415abb",
            "urls": [
                "bzzr://79ea19bda17edc0c72696e224309a08f832753ca5be32471694f41edfab3208e",
                "dweb:/ipfs/QmNrnKSvC1f7MDxand5eer9ET7AJLkqEvsiYhKv2LQcqKz"
            ]
        },
        {
            "path": "soljson-v0.8.16+commit.07a7930e.js",
            "version": "0.8.16",
            "build": "commit.07a7930e",
            "longVersion": "0.8.16+commit.07a7930e",
            "keccak256": "0x331f4bc6de3d44d87b68629e83f711105325b482da7e9ca9bdbdd01371fee438",
            "sha256": "0x27b2820ef93805a65c76b7945a49432582d306fd17a28985709a51e6403677c2",
            "urls": [
                "bzzr://af0d70945c85865298732ac2bfdacdf2774fb4daf793c94fafe135b839a60a5c",
                "dweb:/ipfs/QmWzBJ8gdccvRSSB5YsMKiF2qt3RFmAP2X25QEWqqQnR4y"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.8+commit.6a42da8d.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.8",
            "build": "commit.6a42da8d",
            "longVersion": "0.8.17-nightly.2022.8.8+commit.6a42da8d",
            "keccak256": "0xbf44a68879781f61fd5c162aa84a146887f41b22742d1ccd5c55187a7cd44311",
            "sha256": "0x0c26c71c7decf0236049844660c9562a1d52b765d8ad82e39be6da4399787e0d",
            "urls": [
                "bzzr://3ff7726093c5f2778dd07fd08ae20d85f39c2692f52b8e5334b38c00fa2340ae",
                "dweb:/ipfs/QmciZvqBSsj8Hmg48f3AozA2kLm4FWZL57mzZgXER1hZoZ"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.9+commit.6b60524c.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.9",
            "build": "commit.6b60524c",
            "longVersion": "0.8.17-nightly.2022.8.9+commit.6b60524c",
            "keccak256": "0xb4e4b3caae89e11ab3c72c238f7f0dff06f46fcb73384bd1ae7feb0b51dd5d18",
            "sha256": "0x0d05fa01baf096341e6474cb172abdff4b7ab4fc054303369030323ac53a1c0d",
            "urls": [
                "bzzr://7bcec6ca699931c5bb43d36651e337616c150d1c433b4063b471e878abf9891d",
                "dweb:/ipfs/QmTJFVkUjKtKcgbYvAiX2ndBPWf7RRJQXptMP6Z3kjviER"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.10+commit.3c0a7355.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.10",
            "build": "commit.3c0a7355",
            "longVersion": "0.8.17-nightly.2022.8.10+commit.3c0a7355",
            "keccak256": "0x40586329f110ecea10614659ded759bd0bfb49b7886b7687ac6889ba06065669",
            "sha256": "0x3c32af338c276e3b8e157795bead4b6c898beae6f8e7fad98494cd8e820b363e",
            "urls": [
                "bzzr://f6a8c8de71acdc063231dce2de965f6ecbd2fa6ca9c376588d7ef96e0d5f84b0",
                "dweb:/ipfs/QmYvezCNZTxi9d172drrXSn3oP1ppRh5VW2VdeG8rZU3eu"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.12+commit.e27cb025.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.12",
            "build": "commit.e27cb025",
            "longVersion": "0.8.17-nightly.2022.8.12+commit.e27cb025",
            "keccak256": "0x011dbd8f14cea97ba67a51eed4192737ae0a266d65f175d842fc4499cbeca4aa",
            "sha256": "0x2f2d466836d3793d6c3cb9d5b95a5ae4191e2a77f747e44ec47c8924c2c43f2c",
            "urls": [
                "bzzr://d825b9cec6539285aa93461d12c5d04c5028b82230bc71590941bfeee67f0f83",
                "dweb:/ipfs/QmV8YcduyvxZ2pD3BRkmpg99XdE7c3zZ4CVDKmbKoJfpGh"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.13+commit.a78a2bcf.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.13",
            "build": "commit.a78a2bcf",
            "longVersion": "0.8.17-nightly.2022.8.13+commit.a78a2bcf",
            "keccak256": "0x48d60c3997014e04095acb29b232c5f01a4bb994c1f0f47d298366e126fda738",
            "sha256": "0xea0b4c0f6bc2fc24ff63a27e9923e323f7c40c161f73773624e9d13650c3cce3",
            "urls": [
                "bzzr://8f9fd363d77431e211d618a40105869e1ac287790d4b5703400882b28beb368c",
                "dweb:/ipfs/QmPLz87kZG3XdkG7gBGAzgG1u3kJnyEtGodZM5CCjaDDDL"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.15+commit.a0ee14f7.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.15",
            "build": "commit.a0ee14f7",
            "longVersion": "0.8.17-nightly.2022.8.15+commit.a0ee14f7",
            "keccak256": "0x5ee040d8ad943371d3039211c9de0f426b0d048b53f9b6af5f18860a1dbfe2f9",
            "sha256": "0x43eefc40284c5f947ff0172ef4abf1d63c762d99a4d2413c07fb3ee8409e9d29",
            "urls": [
                "bzzr://71ad4849d247ea50fbda17d5e778405ed6b818d5a3ef13cebbc7bee8c59ed24b",
                "dweb:/ipfs/QmZiz2XmetPWSNGccEudg9mvitG7QR4F3YCBRg1LxXDH2m"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.16+commit.bb41ddd7.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.16",
            "build": "commit.bb41ddd7",
            "longVersion": "0.8.17-nightly.2022.8.16+commit.bb41ddd7",
            "keccak256": "0x8c8cf2e3341e7a07fcb8fbe825ed7ef47735924e67ed2556ab9fc2f41005f1fa",
            "sha256": "0x1d56df9e0f3e39105ed1e4d977600236c57c6aec649e5f4903ed993c434cb56e",
            "urls": [
                "bzzr://0fc3ccb024609b486f6e397593329f4f9e6d48e1b709eadcea39a8b068313fb5",
                "dweb:/ipfs/QmQoSsgtBDwxUnQ7csm5y5arcvczkRNpMukMZickPr7ito"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.18+commit.3497e2b2.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.18",
            "build": "commit.3497e2b2",
            "longVersion": "0.8.17-nightly.2022.8.18+commit.3497e2b2",
            "keccak256": "0x865c948f786b7c4d321e05140fe556d537b5d445ea9e9853a3ca6521c2ff64fa",
            "sha256": "0x12d521b1b960d5a0cbf36e49fa7c0636d25240c2098d3b29dd6e207be8fe9f68",
            "urls": [
                "bzzr://6598e3fb90271eb7e803bddd6e8dd13917397f8bbf97e20d7ad1638b22af3368",
                "dweb:/ipfs/QmTCpF2woBG6eQP5fyEdrvWperKZR3m5txBKi7evnwaMJp"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.19+commit.f01a09f8.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.19",
            "build": "commit.f01a09f8",
            "longVersion": "0.8.17-nightly.2022.8.19+commit.f01a09f8",
            "keccak256": "0xc02e75768762e51d0d9e2b00e1ecbb4b99b8db0f132561b740f2801dd8a8ee32",
            "sha256": "0x0150b8efe2263627d4a7db3db181052291e4fa08888b7aed230fa18d351f35c2",
            "urls": [
                "bzzr://468fd7a2b3112017f14b3fd30f2bf7f49cd7742b8e0bcc46c27b16c5973a086b",
                "dweb:/ipfs/QmSRCZ4YbBgvXjixDwHuegecRhe8oFueBJKGQm2S2uDVkt"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.22+commit.a3de6cd6.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.22",
            "build": "commit.a3de6cd6",
            "longVersion": "0.8.17-nightly.2022.8.22+commit.a3de6cd6",
            "keccak256": "0x12a6f75215c6e53f80df96057a6e6a209f6c66079ffe268903db1cbd59de5918",
            "sha256": "0x61d6e144adf0eb78588e9fc98f11dec7b8643d7ef4bb61494938edfe42896ab0",
            "urls": [
                "bzzr://51917340eba34e379b412f19e2cf183b514bdb565a65f09d9e5695a55a8851ab",
                "dweb:/ipfs/QmSq78TJZ94mJSVZhMEN8ateGMKNrYLCe8AKKE7RBZoV6p"
            ]
        },
        {
            "path": "soljson-v0.8.17-nightly.2022.8.24+commit.22a0c46e.js",
            "version": "0.8.17",
            "prerelease": "nightly.2022.8.24",
            "build": "commit.22a0c46e",
            "longVersion": "0.8.17-nightly.2022.8.24+commit.22a0c46e",
            "keccak256": "0x1a08acc78810be5007368fac3e9039af9cef8d847cfb1bdeb3e186aa294efe41",
            "sha256": "0x19b83b484e2360fb7d255661824f442519f6509fab265dde4f24e6ae274f0819",
            "urls": [
                "bzzr://9666ae8d78a853563d732165f02c03cdbfaefe9d803f1f163c571db179e657d2",
                "dweb:/ipfs/QmNSUsmy97YWT5NxhGRK1Kn3aQdWXC8ZDZxaZSw43MBURi"
            ]
        },
        {
            "path": "soljson-v0.8.17+commit.8df45f5f.js",
            "version": "0.8.17",
            "build": "commit.8df45f5f",
            "longVersion": "0.8.17+commit.8df45f5f",
            "keccak256": "0x3f2be218cf4545b4d2e380417c6da1e008fdc4255ab38c9ee12f64c0e3f55ea9",
            "sha256": "0x617828e63be485c7cc2dbcbdd5a22b582b40fafaa41016ad595637b83c90656c",
            "urls": [
                "bzzr://fe8da5b2531d31e4b67acdce09c81eccba1100550a7222722152ffdb16ea85ef",
                "dweb:/ipfs/QmTedx1wBKSUaLatuqXYngjfKQLD2cGqPKjdLYCnbMYwiz"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.10.24+commit.84cdcec2.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.10.24",
            "build": "commit.84cdcec2",
            "longVersion": "0.8.18-nightly.2022.10.24+commit.84cdcec2",
            "keccak256": "0x9c727e97111e88101a20d768a35650443de8d69f3be855fa4faa4fb6f1aa0578",
            "sha256": "0x24ae9c43aa7e70933f97136e5d059c364e9cd9b81ce847a900e950589dd1a5fa",
            "urls": [
                "bzzr://4eab7ce3e6810c7beb8d2a0299532a8fd4c631009daf8e104a403e0931169422",
                "dweb:/ipfs/QmR3ozWKCANdU53EERVtyAwuXQg3qNsUuTCiaF43FbNkuo"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.10.25+commit.799ef0ab.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.10.25",
            "build": "commit.799ef0ab",
            "longVersion": "0.8.18-nightly.2022.10.25+commit.799ef0ab",
            "keccak256": "0xc7e1356dfdbea29b26167aa1b523d109f27a266145b936ca310b4b01ebc80d3c",
            "sha256": "0x38aff48ea3528b505897fb2d7ccb4753350a3acccdc154b8b5631b31115c9723",
            "urls": [
                "bzzr://c346fe9b5f8247b7219bb3fdf13e97d6cde664401e5a4156a6d4db3bd493e63d",
                "dweb:/ipfs/QmcapgLqmPRTvSmacKj46jNTxFgmVfDykXk3fJMMPAUrBW"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.10.26+commit.12f5612c.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.10.26",
            "build": "commit.12f5612c",
            "longVersion": "0.8.18-nightly.2022.10.26+commit.12f5612c",
            "keccak256": "0x9109196db822c45c7729e3a4731219db9975e9eca0d5bb5e8316f383b61f408b",
            "sha256": "0x9c0a6c0687bb6a846b9ba1f9c574011e6e8ef6081cd6c817d15a8b390fdf891d",
            "urls": [
                "bzzr://fbbcc0781aed73a4afd36a6967f6d0e25fdb2a8f79bea1a309698d21fa0434ec",
                "dweb:/ipfs/QmQNWyVZWzK25roEaHpHMpeFUeBqwAuC73AC9zqkDKXj5s"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.10.27+commit.0816b15e.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.10.27",
            "build": "commit.0816b15e",
            "longVersion": "0.8.18-nightly.2022.10.27+commit.0816b15e",
            "keccak256": "0x16dcf498059961802265390bc0aeee25e6b89576ad5727e22c26105bd96d85a5",
            "sha256": "0x5967d551b5e5103490f2af906dacbdf9e7f780bff05672446e82a7584e8975e9",
            "urls": [
                "bzzr://ffa7a252b9ef53a00a2166673d51a933690fc87c105a3cd52d16e75533cb7991",
                "dweb:/ipfs/QmTnCHvMmahDKJ4LkZ52YTfXT3nMqaS39WxQ5Tq6E1hjx5"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.10.28+commit.ff14e408.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.10.28",
            "build": "commit.ff14e408",
            "longVersion": "0.8.18-nightly.2022.10.28+commit.ff14e408",
            "keccak256": "0x47a8ac7e95b02b24f4187fc4c722aa58b3efdbbf1b23426f09505030582cf03c",
            "sha256": "0xebb5eec5b25e7ecf0c4ffbd8d40aaaa362e6bf7a1998d17016d928c1c5e35dc3",
            "urls": [
                "bzzr://dec6e201a844b836fefed86e9f02ded93b627d48ae5d47abb2a2f0587c9d2617",
                "dweb:/ipfs/QmfGjgW3kEwGBDs583m6imuSMDrHYjwHFFfvEbA51aKJPt"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.1+commit.7ac4c70c.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.1",
            "build": "commit.7ac4c70c",
            "longVersion": "0.8.18-nightly.2022.11.1+commit.7ac4c70c",
            "keccak256": "0x967b0084b530abfc57a0426470eced385dab6869d7094969e47b4128bb61f89e",
            "sha256": "0x02f38312c2ad8714faa66641ba03df9bc8336d87254fb2ee15207e3899de40aa",
            "urls": [
                "bzzr://4e14ee30b37ddb2637ed030cb5d5305dc383566096d35e1907165839dc2b9e33",
                "dweb:/ipfs/QmYM1N7E1UY9QYdLehJ8mZ8GMDxqo1XZZH1QU3H9oBwdMb"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.2+commit.46a7ebd5.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.2",
            "build": "commit.46a7ebd5",
            "longVersion": "0.8.18-nightly.2022.11.2+commit.46a7ebd5",
            "keccak256": "0xcb50799d8d4f20d3eeee266f115e2a9d0e0f747e310ea5d2c9a7c292f08e22b0",
            "sha256": "0xd9d1808fb4dcce38c729709268b42aaedcd184f5aa25de16d9401271ebe652a1",
            "urls": [
                "bzzr://b974640ce96b6ec57813f0a3ff1b21e3aece70c314703da5870f5ec61f48ebe3",
                "dweb:/ipfs/QmaEBvff9AqvV43UEkTguBsEL2BGdkKN5wV4GZqB3D4k46"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.3+commit.2cc6610e.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.3",
            "build": "commit.2cc6610e",
            "longVersion": "0.8.18-nightly.2022.11.3+commit.2cc6610e",
            "keccak256": "0xe61c0f43d732357afe5d26347b0e91d538fbc6e9884a9ab90575f6d1d6cb7b32",
            "sha256": "0x62c0b4d4e26076597f6dfe8c575060ff6db080caafcaa5c4476a2c5c18d2842a",
            "urls": [
                "bzzr://7904a086bda16f7f9e685a22c6d9acfffd7885df7f9e4c1e2b3391ca69d969e0",
                "dweb:/ipfs/QmRTs5x6g5z76mz9EEChEEwg8kcGTNqv4MCofPiTHCe6HE"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.7+commit.ce18dddd.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.7",
            "build": "commit.ce18dddd",
            "longVersion": "0.8.18-nightly.2022.11.7+commit.ce18dddd",
            "keccak256": "0x9c2a7812bab492cf18106e6abfc084a15b8840f6ed3b7fa01b8b6797cffc7a7e",
            "sha256": "0x1c655986e9147dc6f5eba9b310554de652375b5f36a57c63b9ee7c04af3e43b6",
            "urls": [
                "bzzr://1116f0d4396c8b6b0cafc2585555219bedb810b173128dfcc629b87027bbec03",
                "dweb:/ipfs/QmenrpSSjENfRQunrC25p3fLsWdRQ4HKE86FYEmVhbEfJF"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.8+commit.9db2da03.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.8",
            "build": "commit.9db2da03",
            "longVersion": "0.8.18-nightly.2022.11.8+commit.9db2da03",
            "keccak256": "0x19fd547e2b3950de2fa4695f01d1be65f5c0da7f20a35f2e39cd63a2a591cd6c",
            "sha256": "0x8ebfdfb5745e786d4c549fe5f675655a5d2074cc7e026fb4a0a938f7f7294983",
            "urls": [
                "bzzr://007c6606fe9e3458ebaa4aae99c6e0481b9170f16b00bac44e28f5c2d308aba6",
                "dweb:/ipfs/QmUsZEPgWk4padVz1bgzE9oycY7NyWsDTipYtygGxvB3mm"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.9+commit.73e7b844.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.9",
            "build": "commit.73e7b844",
            "longVersion": "0.8.18-nightly.2022.11.9+commit.73e7b844",
            "keccak256": "0x21763cde7848f3065ccbeb4f34d36aebdbaa135c91b8999608f491a7a60d9793",
            "sha256": "0xb2f753f59b3682f45069e880e96fbab6a76408b262194a56d8e8a174d25d7d5a",
            "urls": [
                "bzzr://36124bf4c5b8f10402618727e8f935c13cd9e3a70769e212aa404ace3c9e4e34",
                "dweb:/ipfs/QmSsTXDd7tZ3QoWxPN3gt163nKKMKysEVxAjMH5nc4TAh3"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.10+commit.310a58dd.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.10",
            "build": "commit.310a58dd",
            "longVersion": "0.8.18-nightly.2022.11.10+commit.310a58dd",
            "keccak256": "0xc4e51314db4003e34516d52b76a4693d71e0af6afa99f5b39649ba97b3368a37",
            "sha256": "0x647a0d94dd6d4f20ee0cc573e7e21bc391fad09997b897ca89f2582648ba22af",
            "urls": [
                "bzzr://190e4c23fff08e0fb9119d275ecb97cf0a77913918eae1f2091046443959955b",
                "dweb:/ipfs/QmXdSP1TSvhXUYrkUsMwDTtoy3KkaQSFkTcBv4oWhRaTbo"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.14+commit.4100a59c.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.14",
            "build": "commit.4100a59c",
            "longVersion": "0.8.18-nightly.2022.11.14+commit.4100a59c",
            "keccak256": "0xc3b1c30629da15254535e70957f80b2a988817530ce3848ce76c2578b4cb316b",
            "sha256": "0x283d747f911f48a9a8cbc3d3a96f634b8537364e68ff832e561f51b886e63513",
            "urls": [
                "bzzr://660768a2ff7c8ce3316a51ff9c7a5d45788a8f72736cead52f34bef0a73cb440",
                "dweb:/ipfs/Qmf8ffJhS1HcJHNdkrui7UrLHb1Vaz1jhdcfhZgDcskVsi"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.16+commit.75a74cd4.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.16",
            "build": "commit.75a74cd4",
            "longVersion": "0.8.18-nightly.2022.11.16+commit.75a74cd4",
            "keccak256": "0x7419c424f698bfd1c0b419820bebcf22485e8c6df25e4bd376bbd1699ec4fb63",
            "sha256": "0x1b152f07935e7e603698f0ea1bc3b285a84e72b93005296a6d164523381f027a",
            "urls": [
                "bzzr://eb24782a7df2016afe07504f8e5b669109a094c990cf0f9dda87ee1d83643254",
                "dweb:/ipfs/QmdKSdTUPHSNMxPPfHy8UhuEGo36fc19xdaWeQkNYWc67a"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.17+commit.0b4b1045.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.17",
            "build": "commit.0b4b1045",
            "longVersion": "0.8.18-nightly.2022.11.17+commit.0b4b1045",
            "keccak256": "0x96cede8fa634c25bff3d7f0084a9bff2e143a1276cf6d53f6e6bace11236a4dc",
            "sha256": "0xbf10cd59075b6b2e5ec3d095f5dd26b0858dea041a82ff2abd27039fa2fe8e03",
            "urls": [
                "bzzr://db8f0e25f215297df6a30e9a7002f9b2db62e3611f13b93f7a65126f2e56d96b",
                "dweb:/ipfs/QmTJd5D9uyAy8XU3pMQx34dSNCjLnYq8pJPux1PingK6Ay"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.21+commit.5211d3da.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.21",
            "build": "commit.5211d3da",
            "longVersion": "0.8.18-nightly.2022.11.21+commit.5211d3da",
            "keccak256": "0x8bcb64737f158515edf926c3a7d08cef082bf905cb9b54532153d7f92bb42d89",
            "sha256": "0x2722d6a456ab952a0a897988db3397b2b8eed9da560186dacaf82d5f5e9e6ba4",
            "urls": [
                "bzzr://b558d6024d56d8fc2f7e903b86cc0870617107220b31737342f42c1a523f7381",
                "dweb:/ipfs/QmbYu67vJprJvSDBzMzMG2Zarryh7xwY7H1AZu7fkJWmLM"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.22+commit.1dd05e29.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.22",
            "build": "commit.1dd05e29",
            "longVersion": "0.8.18-nightly.2022.11.22+commit.1dd05e29",
            "keccak256": "0xd4f6dd82dc125d6b422aed38115f67dafda32ea7590a4dec5ee62aac901ecc8e",
            "sha256": "0xd1c9a7a1392bd840fb46ea392eee3e7ee8fae8f9c913ef55e31da250b2af1fb2",
            "urls": [
                "bzzr://d57db1bdaba520394027e03ff94b9117b5ffcd6a751f0f8e83f7d7677ca28ee2",
                "dweb:/ipfs/Qmc9rWk2E3bQggcfhLSBfYSD1fbaZJksmJJcrSU3CU8MEK"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.23+commit.eb2f874e.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.23",
            "build": "commit.eb2f874e",
            "longVersion": "0.8.18-nightly.2022.11.23+commit.eb2f874e",
            "keccak256": "0xb4d250747756df7d15e2565a7d81f6b7363a50ab2ab3ecbeb05310800f524884",
            "sha256": "0xf2003de071a4f51093b6f9c1d985ff750003b86b514c78461eea7009b3b7e4c0",
            "urls": [
                "bzzr://504e530aff550c009bd30e235ded41f6923270ec29dd3667ea50ffe04c180703",
                "dweb:/ipfs/QmRB9eaQPrMEGgnwm9E5cga8h9JemMeb3HRMTXwpawFfKc"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.28+commit.7070a172.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.28",
            "build": "commit.7070a172",
            "longVersion": "0.8.18-nightly.2022.11.28+commit.7070a172",
            "keccak256": "0x33c8ff211aa3238ded855bf3a43473ff8960a87a74cde89a0e424ff0076d2eff",
            "sha256": "0xfa4b125f9a78697948adc7d5d2c47595f6ecdc67f0ae263b873f22a9bf617b00",
            "urls": [
                "bzzr://e8ebb26a06d76625706f8d54b2cc9eb0a0a920d7959da3f1bf259964aea265aa",
                "dweb:/ipfs/QmfG7mW2ZiPRuaUCeptVKq1WEjYgMhGwg33RLuALovgsQo"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.29+commit.40b24850.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.29",
            "build": "commit.40b24850",
            "longVersion": "0.8.18-nightly.2022.11.29+commit.40b24850",
            "keccak256": "0x57b2963dd286cbf07670c81f3ae41412e095cb0e08cae230b5c5a66f37a197c5",
            "sha256": "0xf1ab1e7421aaa91ed5003e377580292c362c8b548b3fd875f7a7fe6f31e5edf3",
            "urls": [
                "bzzr://6ded2ea9906e19d3ae1079a40ce878737278a63cc2fce4d3ccfbd4be9f76bbd0",
                "dweb:/ipfs/QmSiE3C4xD3WiNMMVju54o1MMAAgMTZUfRVv4GTsu9woLu"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.11.30+commit.c6ee18a5.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.11.30",
            "build": "commit.c6ee18a5",
            "longVersion": "0.8.18-nightly.2022.11.30+commit.c6ee18a5",
            "keccak256": "0x55807e0ada507b6d9ca35d0da513df3ed7824d60e073e2d8febc369a7cb120fb",
            "sha256": "0xa042581d21978e6e16191a3a1e48face33064e73c3b9bffe211a5a4204aef5da",
            "urls": [
                "bzzr://aabb1979580ad1c3e4fbe9ef4e1fedf52ed6a8eed2c21e81bbdc578b8777a6f5",
                "dweb:/ipfs/QmSJragJfqkFS5uXrSVw98Nyb8NK6cVa5VQpqNxWPWihxS"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.1+commit.056c4593.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.1",
            "build": "commit.056c4593",
            "longVersion": "0.8.18-nightly.2022.12.1+commit.056c4593",
            "keccak256": "0xce1c531d566ca731d2693db3ef05dfa6e7fc179d8358cd5c0c6cdc97f97f5e8c",
            "sha256": "0x0ce36d446648f9fb7206d0419186a44eba67cb425edcf4e69d3b1e45eb76b0fb",
            "urls": [
                "bzzr://9d88f8edee1e039de3ccd15ce6199befb6a36bc751774574ba8c6ff696563633",
                "dweb:/ipfs/QmafyxRk7FpHJvRdcUx2BumxVsgHYmimWfWDMsnKuLnZ4Y"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.2+commit.591df042.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.2",
            "build": "commit.591df042",
            "longVersion": "0.8.18-nightly.2022.12.2+commit.591df042",
            "keccak256": "0xd056db03e22e402f52b6c182109b1ef4eb83f996a83d74d2eb1413e124e62192",
            "sha256": "0x5c8e23732b5a6831dd934c9d3092be32ed24d036087e1d0bfc85b38ddfa5efd5",
            "urls": [
                "bzzr://94ee073646bea43553b8a74c9253e29bc3f5343d215a6842fab370aa932056ea",
                "dweb:/ipfs/QmPrGjb6T4d6MWhkHRxfTw5ckQDcQUgsXYeN6djZxcE2Ex"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.7+commit.1c8745c5.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.7",
            "build": "commit.1c8745c5",
            "longVersion": "0.8.18-nightly.2022.12.7+commit.1c8745c5",
            "keccak256": "0xdbcae13ea6463de4531dcf706beffc70d8a703f1e818f97e132860b33c85beb9",
            "sha256": "0x31c6662805be10c0a77437f2aa230cd9de7ea15ec863120b834cebfdf6c42e82",
            "urls": [
                "bzzr://870b17a51e6e59940a3e79fd2f468c0e8e2f6077bad3c0273df7bc71104e8e47",
                "dweb:/ipfs/QmP8XuguoNbf6G4HRyLUtA8nFR5Zq8fGKX7JKxarfyi92q"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.8+commit.b49dac7a.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.8",
            "build": "commit.b49dac7a",
            "longVersion": "0.8.18-nightly.2022.12.8+commit.b49dac7a",
            "keccak256": "0x0fcd8abfa0157f63795dd782ee7b444a09f234d64e3f71373a1a9e53e8bd1b8d",
            "sha256": "0xccea9185c8552b090b8e2f8c9701579e335fa7b36cad22387419f5fee198c03f",
            "urls": [
                "bzzr://5eeb3ae494a1b77810f992e7be743e3dc3be1fbd16036a9e85b943d16482b534",
                "dweb:/ipfs/QmcZu35we67A7GdGyfKAWud8Tfds998wwd8oGZmEcvBB1i"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.9+commit.a9fe05e8.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.9",
            "build": "commit.a9fe05e8",
            "longVersion": "0.8.18-nightly.2022.12.9+commit.a9fe05e8",
            "keccak256": "0x211db6c562e30919a1a286cddb6d542c872a8d42ec984d3fbbc426cf3e9cbaaf",
            "sha256": "0x9e6c1036f5532735734c14cf0d4090b8b184dff76bda743c6f2e2d99f689386b",
            "urls": [
                "bzzr://bf8f42fd847dee1ef1694d4df1c702166e7f2767902dda5357a0f44d0e805af0",
                "dweb:/ipfs/Qmf4NmumtJEWpsaaRkqfauaYW3H1PHJTU9vvCNfpwFMY4x"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.14+commit.37e935f0.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.14",
            "build": "commit.37e935f0",
            "longVersion": "0.8.18-nightly.2022.12.14+commit.37e935f0",
            "keccak256": "0x7c4957721010f24b4900515221dc35c3aa7bfafa4336094425fc214233763fd8",
            "sha256": "0x382a82c257be9f1afd5dbe80658070bd158216f52e9008fbeb47204758f8312d",
            "urls": [
                "bzzr://1177ea7ea2656d99ca66bc4297ba07b9446f3f806167d0d87d35e8872d764d46",
                "dweb:/ipfs/QmaQjZYmKRiRVuFXqpuXcVUmi64vZ8Ea33RgLJzkKhbcgm"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.15+commit.c1040815.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.15",
            "build": "commit.c1040815",
            "longVersion": "0.8.18-nightly.2022.12.15+commit.c1040815",
            "keccak256": "0x5a80f90abcfdadc55e0d5403edaa679a6314c7bf8a15fd0110035fde9e2c864a",
            "sha256": "0xff579ab307c15f8a7f3e4e0fa30f87779fd74efdf7a8b0fb12d084202c7fe3a9",
            "urls": [
                "bzzr://9362ef87d472a2b437726ee5050c89e30b84495de0b6fd502c33617a30f043b3",
                "dweb:/ipfs/QmRBEE4gvKwJ7HftrYYCFpD1G18UwPzmzMP7fepueeXxuw"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.16+commit.b053359b.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.16",
            "build": "commit.b053359b",
            "longVersion": "0.8.18-nightly.2022.12.16+commit.b053359b",
            "keccak256": "0x263d0ca4e31b79416a161483c52203e551dbbfe7d6ec7419f018ebdf82be2919",
            "sha256": "0x3cd1efcaae3012b8eadda075805ee3d5fc1efef53c1ff8147311aaf9aab1e219",
            "urls": [
                "bzzr://151a9f07f744a84b7620fb54e768cb622237bd32abaf2e77260f9bceec91d520",
                "dweb:/ipfs/QmXYS8dzBgNub3LXiH8eBityfVNkTJxKeZuN6ZvcgJi8aE"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.17+commit.73fcf691.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.17",
            "build": "commit.73fcf691",
            "longVersion": "0.8.18-nightly.2022.12.17+commit.73fcf691",
            "keccak256": "0xa89b52e5047e0d1181b16dfcc06421637b92bcd35f428692d0b04483e871081e",
            "sha256": "0x21b7b0e63e484fb2ddc7bda602f30f455d187b90759d3355565648517ca87ba5",
            "urls": [
                "bzzr://7cc5bf3b79e4ae5895fc6cd4ba330bfea4a19b322c310e9821fac8fb1d49248f",
                "dweb:/ipfs/QmRdVhbZT5x7mhm3jMMBNarN6qmB9gHHiHWUmqmWrNrYnJ"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.20+commit.32f94d45.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.20",
            "build": "commit.32f94d45",
            "longVersion": "0.8.18-nightly.2022.12.20+commit.32f94d45",
            "keccak256": "0x6db09b6d22226dcb61a0e51e523301dbfbc73e4a926753e68c0dd6c64378557d",
            "sha256": "0xde9373c691b608c25c56d2cd740cfd57bde519e6bd14751f1aee0618471d6630",
            "urls": [
                "bzzr://9fa092772180a69c0cab2d4908eec3a554674c3af8bdb5e170a3863bfff39d31",
                "dweb:/ipfs/Qmf6pLCNvvYrB7rTAuPdzhg1zyEMNCB5HZyuGy9w9EN7rF"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.21+commit.71ce291c.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.21",
            "build": "commit.71ce291c",
            "longVersion": "0.8.18-nightly.2022.12.21+commit.71ce291c",
            "keccak256": "0xfaa446b142d323911c9cae34781e597dcaa429dc07dc333fe5ee6488912c9493",
            "sha256": "0x45bab6f3777b203cb754ab30609308ce7c742d8419582b8f43636a735ee07aae",
            "urls": [
                "bzzr://e2ecb3d0e7630067c1d190a508641c60b5470cd37df6477a703d56c3ad57c00b",
                "dweb:/ipfs/QmNzA4V7WgpDromZ9oMq2HDF5qZ1ruALPKZdJ6bQdBy9vt"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2022.12.27+commit.f1d42724.js",
            "version": "0.8.18",
            "prerelease": "nightly.2022.12.27",
            "build": "commit.f1d42724",
            "longVersion": "0.8.18-nightly.2022.12.27+commit.f1d42724",
            "keccak256": "0x07a4902c08ea7a70c11acec312ce9eb2d8a6a7ad3ec925be7f375e5387f41592",
            "sha256": "0x69d325756386c00f2c88acf1696dd0b39fe09534d297a0723619cbdd28d84f29",
            "urls": [
                "bzzr://e2d13e779c202b5603140f7aa99d46c183de050a5f363ba8e7f9f93d9d94231e",
                "dweb:/ipfs/QmWtytH3SfaszX2uzgLKfKHjwSwcHpaaGgnoXNwwmmXtj6"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.4+commit.2ec6a04b.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.4",
            "build": "commit.2ec6a04b",
            "longVersion": "0.8.18-nightly.2023.1.4+commit.2ec6a04b",
            "keccak256": "0xf61e875313a3153e081c7e65a57e32f6f71845446e634c58b1ff39e437e79b80",
            "sha256": "0xfce10db81373f84a28fb24fc291577d833d5f67784f23abea906a76188f7122a",
            "urls": [
                "bzzr://4776fedf92ecdd7fa47bbef374a75148e1d3541a1783cf45d85b919faabae0b4",
                "dweb:/ipfs/Qma1sNZn2Pa5QY6cRKmxQ2F9w92m6X3SZkc9LQA3oob2yC"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.5+commit.2e221022.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.5",
            "build": "commit.2e221022",
            "longVersion": "0.8.18-nightly.2023.1.5+commit.2e221022",
            "keccak256": "0x4afe53c2cf175e0425492bfb08684ee34f987f5c0632eb18780e6a8a9daabe4f",
            "sha256": "0x706a819bc8a9839be03d18995348044edcad79195e1db781af29bb9b12bb6b21",
            "urls": [
                "bzzr://3cc319a8d595554bf943322db3fe3d004cf7699484e230719027b3893121b845",
                "dweb:/ipfs/QmfXmuopgnKRFDxhZAqixKxCPUfYL2F61qDQcpSwAdVx3z"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.9+commit.f441e132.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.9",
            "build": "commit.f441e132",
            "longVersion": "0.8.18-nightly.2023.1.9+commit.f441e132",
            "keccak256": "0xc76ce1cb4c49cffa1e92607a694339c57966473bdb620567a9c1b9718dd9eded",
            "sha256": "0x15b9af5260a18d14d687ea8ca989acbeae4c45c822c90a14604bb6930e3474a4",
            "urls": [
                "bzzr://0a1373102b1575ac3373e5ee04e2461482c6e8c4f5996a8c4f3161abf17cca69",
                "dweb:/ipfs/QmPP6k6aHpWN1eVckxHyYSSgyXCeLm2zn3Hh1FBLTWPvc4"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.12+commit.609f1522.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.12",
            "build": "commit.609f1522",
            "longVersion": "0.8.18-nightly.2023.1.12+commit.609f1522",
            "keccak256": "0x1703c69121acf4f64802afa0948de4e6c21fd485c0f935d2525e8c4c041dc907",
            "sha256": "0x9337bdead9f38d7151788fd32d06ada8c728a4bf61f70a74cdf0f545a2f8e544",
            "urls": [
                "bzzr://07d00bb4d1f466a6d69de7f80c203f1d2c8c88ee547ea4b646c794f69bf77a43",
                "dweb:/ipfs/QmV3pYh6ZUgGJj2RZonkgAJsb78f9NfXFL5bQzAQSs419y"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.16+commit.7b2f8a2e.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.16",
            "build": "commit.7b2f8a2e",
            "longVersion": "0.8.18-nightly.2023.1.16+commit.7b2f8a2e",
            "keccak256": "0xe74266d6da0a00eb43f72a0a6d34e273d06e607c7383e7afacf56f5af97ba815",
            "sha256": "0xe071a28e3f1851efb145a3c5c8c985890b55f4f9ee8cf7cf0164a88fe3066d3e",
            "urls": [
                "bzzr://77b1a303c06464e3fffc0d13befa29542ed6cf9485d6cb0be54aca83bc41edc2",
                "dweb:/ipfs/QmevoAen2E9fyxGATCxATk3QfXDWYP8EQVL53q7ZVtZxkw"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.17+commit.96ddc54f.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.17",
            "build": "commit.96ddc54f",
            "longVersion": "0.8.18-nightly.2023.1.17+commit.96ddc54f",
            "keccak256": "0xf275ac7267475ba0f703b8440d4bef9ed5ab746331c43b5526557263c27d6ff5",
            "sha256": "0xb16c9cca2b801132fdd6b8d87aa57a98bbc60c01f7847ba38ddf40858cefde74",
            "urls": [
                "bzzr://b54998bc5631e78f534898b4f54799317d44547847f21c7ad83bb30c3aa6933b",
                "dweb:/ipfs/QmcPSs4NJmbs3Rpth2Au6mHKMt2grjS6Sp6NgL3zxggnSs"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.18+commit.c195782f.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.18",
            "build": "commit.c195782f",
            "longVersion": "0.8.18-nightly.2023.1.18+commit.c195782f",
            "keccak256": "0x3eb0494571b487cae0f8a76e4d7aeee33c28cfd98d063e7ef516f00cc9d71b6d",
            "sha256": "0xaf3ae62d3eed118d0325ae4d6d22c7c0e7fa8b95594da95aee574c13c3c93ee5",
            "urls": [
                "bzzr://0185d3c1849aeda7e7037e5576c569219277643c6f262724e7e19ad71e1796d4",
                "dweb:/ipfs/QmRAuDVNUzpjiXkKMmbnra8ypJnmrTkYtAsYRSrJDcD7DR"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.20+commit.d70d79af.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.20",
            "build": "commit.d70d79af",
            "longVersion": "0.8.18-nightly.2023.1.20+commit.d70d79af",
            "keccak256": "0x168e6ee344984e57be0552ce5fec9e345c21cec8881c992d32ed8bfe1ff48686",
            "sha256": "0xf464e57a3f197d2656586fd13710a6c6cb8a7627b863b5127844e1a19cffda93",
            "urls": [
                "bzzr://a02c355c9bc3bd402470931186448c7046a755f04f9b8c715bcb71b2645b1064",
                "dweb:/ipfs/QmPb4FqijHCGqdZfAGhr79h3z9sfYypVtHfRttRQFh39CB"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.25+commit.fd9ac9ab.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.25",
            "build": "commit.fd9ac9ab",
            "longVersion": "0.8.18-nightly.2023.1.25+commit.fd9ac9ab",
            "keccak256": "0xa77ba53318fff3dd6c3276460ae7b053fe5eb05421f7c50caeb5c188b05754da",
            "sha256": "0x46c429945da6094a3f543198ba024f33fd402aeb2ce0e8d9ab6d831a739085f4",
            "urls": [
                "bzzr://1f0e3e4db978e9ba37afb5ef05a46f8dd536b5097b43eae6473b080d5bbd72ae",
                "dweb:/ipfs/QmQw3grwuvBZ1RUi6u4HsmrWUUqiT8gtVCbKf5EyNNGEiU"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.26+commit.206e7cf5.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.26",
            "build": "commit.206e7cf5",
            "longVersion": "0.8.18-nightly.2023.1.26+commit.206e7cf5",
            "keccak256": "0x3aed6f1043ada4ac8aaab95b2539afbf325a05945751e8dee1459423d595a523",
            "sha256": "0x54f714639e80036c751e742cce6cd107e497d3a0cbda38d8d3b2b37c670a5818",
            "urls": [
                "bzzr://8a1c6d707f73176b7312630c18dead1664bd7a83b0deea0376e0e359ef2ee22b",
                "dweb:/ipfs/QmciN7Fru2hZTiPZrbksppAQ46SqRgYxTwWRFVDTcvns8T"
            ]
        },
        {
            "path": "soljson-v0.8.18-nightly.2023.1.31+commit.fa4892e6.js",
            "version": "0.8.18",
            "prerelease": "nightly.2023.1.31",
            "build": "commit.fa4892e6",
            "longVersion": "0.8.18-nightly.2023.1.31+commit.fa4892e6",
            "keccak256": "0xa606dbdc7cd450ff6765b534e7610d5ada5b75a73780b6ac2929091f4f18c968",
            "sha256": "0x44967c8b45fbecb237d343d37c6d3eaee49f1e66eb82e97b56f902da499c28c8",
            "urls": [
                "bzzr://330ee319842bc2c604395e62db384468c5607ec47813e1e453baf72276e2b14d",
                "dweb:/ipfs/QmTpXPZUALpL8nGBji77s2YJWvPZN7brbM7centwELu3ew"
            ]
        },
        {
            "path": "soljson-v0.8.18+commit.87f61d96.js",
            "version": "0.8.18",
            "build": "commit.87f61d96",
            "longVersion": "0.8.18+commit.87f61d96",
            "keccak256": "0x9a8fa4183ef95496045189b80dfb39f745db89a903b398e40131f500953e5d57",
            "sha256": "0xd82bdcba2c386d60b33aca148a9cfdf097551f68c5e45d8ec01aebbafacf5075",
            "urls": [
                "bzzr://338117c2130fcb6bce3006330712b6e7ee99875b56ce4bb6182312f76e4a6bac",
                "dweb:/ipfs/QmcKzrqRBy7PeFQxzJDs1AZZzNHKaKbJces6zUDysXZofJ"
            ]
        },
        {
            "path": "soljson-v0.8.19-nightly.2023.2.1+commit.ddbef8f6.js",
            "version": "0.8.19",
            "prerelease": "nightly.2023.2.1",
            "build": "commit.ddbef8f6",
            "longVersion": "0.8.19-nightly.2023.2.1+commit.ddbef8f6",
            "keccak256": "0xa0a17fe184b58e44c06432e121b6f1894107adf3ecdd3cd1e54273d6c7d4dba7",
            "sha256": "0x1cb914b2db68469d184e6b47f712fb505e88decda72aa9071d75a1300604fa97",
            "urls": [
                "bzzr://cc9279c97c6f3b483462db5cd65f4bf931861fa80d3aaee8a15ed63f0a64eb7d",
                "dweb:/ipfs/QmavuBhEgfwqmpi4owJDbQwHemmX9QMCuSKM7AYVdvdy81"
            ]
        },
        {
            "path": "soljson-v0.8.19-nightly.2023.2.3+commit.77640a57.js",
            "version": "0.8.19",
            "prerelease": "nightly.2023.2.3",
            "build": "commit.77640a57",
            "longVersion": "0.8.19-nightly.2023.2.3+commit.77640a57",
            "keccak256": "0xeeea4187a71c99a20a33afb517ff7d8cfb45cd4b4c1d1231b8153cdd7621830b",
            "sha256": "0x942a4713f9065fe59c0f220ea09be740cb24958c30cb4ac753802e452564633e",
            "urls": [
                "bzzr://48f20b5d233f1518651f6c4598bc35d26835fcb95ab9707c04c80424b5e4ad5a",
                "dweb:/ipfs/QmP7WThbsoo2wZab9vCsvZzgH2r2q1sWeL11p2zuQU8Jop"
            ]
        },
        {
            "path": "soljson-v0.8.19-nightly.2023.2.5+commit.f2bf23a0.js",
            "version": "0.8.19",
            "prerelease": "nightly.2023.2.5",
            "build": "commit.f2bf23a0",
            "longVersion": "0.8.19-nightly.2023.2.5+commit.f2bf23a0",
            "keccak256": "0xdcb3082c0e6f6c170f7b83172607ef7d693e7743c1dd3afb17288bccf1789611",
            "sha256": "0x5bcf01188e0f4d5b370f93c641c50f090035fb29dbb70c7c978e90491fb7a117",
            "urls": [
                "bzzr://dabd04e2de4ec8a39a31da89a8de81b17094e18daa4b4e30556a4ef8c954e718",
                "dweb:/ipfs/QmaESASwGvQVXUVw8GYSZ2TotWDAJX4SyrpNmqQqpteYbJ"
            ]
        }
    ],
    "releases": {
        "0.8.18": "soljson-v0.8.18+commit.87f61d96.js",
        "0.8.17": "soljson-v0.8.17+commit.8df45f5f.js",
        "0.8.16": "soljson-v0.8.16+commit.07a7930e.js",
        "0.8.15": "soljson-v0.8.15+commit.e14f2714.js",
        "0.8.14": "soljson-v0.8.14+commit.80d49f37.js",
        "0.8.13": "soljson-v0.8.13+commit.abaa5c0e.js",
        "0.8.12": "soljson-v0.8.12+commit.f00d7308.js",
        "0.8.11": "soljson-v0.8.11+commit.d7f03943.js",
        "0.8.10": "soljson-v0.8.10+commit.fc410830.js",
        "0.8.9": "soljson-v0.8.9+commit.e5eed63a.js",
        "0.8.8": "soljson-v0.8.8+commit.dddeac2f.js",
        "0.8.7": "soljson-v0.8.7+commit.e28d00a7.js",
        "0.8.6": "soljson-v0.8.6+commit.11564f7e.js",
        "0.8.5": "soljson-v0.8.5+commit.a4f2e591.js",
        "0.8.4": "soljson-v0.8.4+commit.c7e474f2.js",
        "0.8.3": "soljson-v0.8.3+commit.8d00100c.js",
        "0.8.2": "soljson-v0.8.2+commit.661d1103.js",
        "0.8.1": "soljson-v0.8.1+commit.df193b15.js",
        "0.8.0": "soljson-v0.8.0+commit.c7dfd78e.js",
        "0.6.12": "soljson-v0.6.12+commit.27d51765.js",
        "0.6.11": "soljson-v0.6.11+commit.5ef660b1.js",
        "0.6.10": "soljson-v0.6.10+commit.00c0fcaf.js",
        "0.6.9": "soljson-v0.6.9+commit.3e3065ac.js",
        "0.6.8": "soljson-v0.6.8+commit.0bbfe453.js",
        "0.6.7": "soljson-v0.6.7+commit.b8d736ae.js",
        "0.6.6": "soljson-v0.6.6+commit.6c089d02.js",
        "0.6.5": "soljson-v0.6.5+commit.f956cc89.js",
        "0.6.4": "soljson-v0.6.4+commit.1dca32f3.js",
        "0.6.3": "soljson-v0.6.3+commit.8dda9521.js",
        "0.6.2": "soljson-v0.6.2+commit.bacdbe57.js",
        "0.6.1": "soljson-v0.6.1+commit.e6f7d5a4.js",
        "0.6.0": "soljson-v0.6.0+commit.26b70077.js",
        "0.1.7": "soljson-v0.1.7+commit.b4e666cc.js",
        "0.1.6": "soljson-v0.1.6+commit.d41f8b7c.js",
        "0.1.5": "soljson-v0.1.5+commit.23865e39.js",
        "0.1.4": "soljson-v0.1.4+commit.5f6c3cdf.js",
        "0.1.3": "soljson-v0.1.3+commit.028f561d.js",
        "0.1.2": "soljson-v0.1.2+commit.d0d36e3.js",
        "0.1.1": "soljson-v0.1.1+commit.6ff4cd6.js"
    },
    "latestRelease": "0.8.18"
}
