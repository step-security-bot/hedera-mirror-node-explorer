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

import router from "@/router";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {customContractRegistry} from "@/schemas/CustomContractRegistry";

describe("CustomContractRegistry", () => {

    test("lookup", async () => {

        await router.push("/") // To avoid "missing required param 'network'" error

        const mock = new MockAdapter(axios);
        const matcher1 = "https://registry.simonvienot.fr/query/mainnet/" + SAMPLE_CONTRACT_ID
        mock.onGet(matcher1).reply(200, SAMPLE_REGISTRY_ENTRY)

        const entry = await customContractRegistry.lookup(SAMPLE_CONTRACT_ID)
        expect(entry.registryEntry).toStrictEqual(SAMPLE_REGISTRY_ENTRY)

        const transactionDescription = await entry.parseTransaction(SAMPLE_INPUT)
        expect(transactionDescription?.signature).toBe("setMobileNumber(string,uint256)")
    })


})

const SAMPLE_CONTRACT_ID = "0.0.17888"

const SAMPLE_REGISTRY_ENTRY = {
    "fileId": "0.0.17886",
    "compilationRequest": {
        "solcVersion": "v0.8.17+commit.8df45f5f",
        "source": "// SPDX-License-Identifier: GPL-3.0\npragma solidity >=0.7.0 <0.9.0;\n\n\ncontract LookupContract {\n\n    mapping (string => uint) public myDirectory;\n\n    constructor (string memory _name, uint _mobileNumber) {\n        myDirectory[_name] = _mobileNumber;\n    }\n\n    function setMobileNumber(string memory _name, uint _mobileNumber) public {\n        myDirectory[_name] = _mobileNumber;\n    }\n\n    function getMobileNumber(string memory _name) public view returns (uint) {\n        return myDirectory[_name];\n    }\n}\n",
        "targetContract": "LookupContract",
        "importSources": {}
    },
    "bytecode": "608060405234801561001057600080fd5b50600436106100415760003560e01c806314b3ee68146100465780639f11592114610076578063fd8111e914610092575b600080fd5b610060600480360381019061005b9190610298565b6100c2565b60405161006d91906102fa565b60405180910390f35b610090600480360381019061008b9190610341565b6100e9565b005b6100ac60048036038101906100a79190610298565b610110565b6040516100b991906102fa565b60405180910390f35b600080826040516100d3919061040e565b9081526020016040518091039020549050919050565b806000836040516100fa919061040e565b9081526020016040518091039020819055505050565b6000818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6101a58261015c565b810181811067ffffffffffffffff821117156101c4576101c361016d565b5b80604052505050565b60006101d761013e565b90506101e3828261019c565b919050565b600067ffffffffffffffff8211156102035761020261016d565b5b61020c8261015c565b9050602081019050919050565b82818337600083830152505050565b600061023b610236846101e8565b6101cd565b90508281526020810184848401111561025757610256610157565b5b610262848285610219565b509392505050565b600082601f83011261027f5761027e610152565b5b813561028f848260208601610228565b91505092915050565b6000602082840312156102ae576102ad610148565b5b600082013567ffffffffffffffff8111156102cc576102cb61014d565b5b6102d88482850161026a565b91505092915050565b6000819050919050565b6102f4816102e1565b82525050565b600060208201905061030f60008301846102eb565b92915050565b61031e816102e1565b811461032957600080fd5b50565b60008135905061033b81610315565b92915050565b6000806040838503121561035857610357610148565b5b600083013567ffffffffffffffff8111156103765761037561014d565b5b6103828582860161026a565b92505060206103938582860161032c565b9150509250929050565b600081519050919050565b600081905092915050565b60005b838110156103d15780820151818401526020810190506103b6565b60008484015250505050565b60006103e88261039d565b6103f281856103a8565b93506104028185602086016103b3565b80840191505092915050565b600061041a82846103dd565b91508190509291505056fea26469706673582212207f3e110924ebc034f2caeaece8fa6375e4d95958b82430b463b331e74f54560c64736f6c63430008110033",
    "abi": [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_mobileNumber",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "getMobileNumber",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "myDirectory",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_mobileNumber",
                    "type": "uint256"
                }
            ],
            "name": "setMobileNumber",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    "creationTime": 1675350396377
}

const SAMPLE_INPUT = "0x9f1159210000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000003640e0000000000000000000000000000000000000000000000000000000000000003426f620000000000000000000000000000000000000000000000000000000000"
