<!--
  -
  - Hedera Mirror Node Explorer
  -
  - Copyright (C) 2021 - 2022 Hedera Hashgraph, LLC
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -
  -->

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                     TEMPLATE                                                    -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<template>

  <DashboardCard>
    <template v-slot:title>
      <span class="h-is-secondary-title">Source Code Verification</span>
      <span v-if="contractName" class="icon has-text-success ml-2"><i class="far fa-check-circle"></i></span>
    </template>

    <template v-slot:control>
      <div v-if="sourcifyURL" id="showSource" class="is-inline-block ml-3">
        <a :href="sourcifyURL" target="_blank">View in Sourcify</a>
      </div>
      <div v-else id="showVerifier" class="is-inline-block ml-3">
        <a :href="verifierURL" target="_blank">Verify in Sourcify</a>
      </div>
    </template>

    <template v-slot:content>

        <Property id="code" :full-width="true">
            <template v-slot:name>Runtime Bytecode</template>
            <template v-slot:value>
                <ByteCodeValue :byte-code="byteCode"/>
            </template>
        </Property>

        <Property id="solcVersion" :full-width="true">
            <template v-slot:name>Compiler Version</template>
            <template v-slot:value>
                <StringValue :string-value="solcVersion"/>
            </template>
        </Property>

        <Property id="metadataHash" :full-width="true">
            <template v-slot:name>Metadata Hash</template>
            <template v-slot:value>
                <StringValue :string-value="metadataHash"/>
                <div class="has-text-grey">
                    <div v-if="metadata">
                        <span class="icon fas fa-check-circle has-text-success is-small mt-1 mr-1"/>
                        <span>Metadata available on <a :href="ipfsURL" :target="metadata">IPFS</a></span>
                    </div>
                    <div v-else-if="checkingIPFS">
                        <span class="icon fas fa-circle-notch fa-spin has-text-grey is-small mt-1 mr-1"/>
                        <span>Checking IPFS…</span>
                    </div>
                    <div v-else>
                        <span class="icon fas fa-info-circle has-text-grey is-small mt-1 mr-1"/>
                        <span>Metadata not available on IPFS</span>
                    </div>
                </div>
            </template>
        </Property>

      <Property id="verificationStatus" :full-width="true">
        <template v-slot:name>Verification Status</template>
        <template v-slot:value>
          <span v-if="sourcifyURL"><ContractVerificationStatus :full-match="fullMatch"/></span>
<!--          <span v-else-if="compiling">Verifying contract…</span>-->
          <span v-else>Not yet verified</span>
        </template>
      </Property>

      <Property id="contractName" :full-width="true">
        <template v-slot:name>Contract Name</template>
        <template v-slot:value>
          <StringValue :string-value="contractName"/>
        </template>
      </Property>

<!--      <Property id="sourceFileName" :full-width="true">-->
<!--        <template v-slot:name>Contract Source File</template>-->
<!--        <template v-slot:value>-->
<!--          <a  v-if="sourceFileURL" :href="sourceFileURL" target="_blank">{{ sourceFileName }}</a>-->
<!--          <span v-else class="has-text-grey">None</span>-->
<!--        </template>-->
<!--      </Property>-->

    </template>
  </DashboardCard>

</template>


<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->


<script lang="ts">

import {computed, defineComponent, onBeforeUnmount, onMounted, PropType} from 'vue';
import {ContractAnalyzer} from "@/utils/analyzer/ContractAnalyzer";
import DashboardCard from "@/components/DashboardCard.vue";
import Property from "@/components/Property.vue";
import StringValue from "@/components/values/StringValue.vue";
import ContractVerificationStatus from "@/components/registration/ContractVerificationStatus.vue";
import {routeManager} from "@/router";
import {ByteCodeAnalyzer} from "@/utils/analyzer/ByteCodeAnalyzer";
import {ContractByIdCache} from "@/utils/cache/ContractByIdCache";
import ByteCodeValue from "@/components/values/ByteCodeValue.vue";

export default defineComponent({
    name: 'ContractVerificationSection',
    components: {ByteCodeValue, ContractVerificationStatus, StringValue, Property, DashboardCard},
    props: {
        contractAnalyzer: {
            type: Object as PropType<ContractAnalyzer>,
            required: true
        }
    },

    setup(props) {

        const contractLookup = ContractByIdCache.instance.makeLookup(props.contractAnalyzer.contractId)
        onMounted(() => contractLookup.mount())
        onBeforeUnmount(() => contractLookup.unmount())

        const byteCode = computed(() => contractLookup.entity.value?.runtime_bytecode ?? undefined)
        const byteCodeAnalyzer = new ByteCodeAnalyzer(byteCode)
        onMounted(() => byteCodeAnalyzer.mount())
        onBeforeUnmount(() => byteCodeAnalyzer.unmount())

        return {
            contractId: props.contractAnalyzer.contractId,
            contractName: props.contractAnalyzer.contractName,
            sourceFileName: props.contractAnalyzer.sourceFileName,
            fullMatch: props.contractAnalyzer.fullMatch,
            sourcifyURL: props.contractAnalyzer.sourcifyURL,
            verifierURL: routeManager.currentNetworkEntry.value.sourcifySetup?.verifierURL,
            byteCode: byteCodeAnalyzer.byteCode,
            solcVersion: byteCodeAnalyzer.solcVersion,
            metadataHash: byteCodeAnalyzer.metadataHash,
            metadata: byteCodeAnalyzer.metadata,
            ipfsURL: byteCodeAnalyzer.ipfsURL,
            checkingIPFS: byteCodeAnalyzer.loading
        }
    }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
