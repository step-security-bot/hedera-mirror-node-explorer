<!--
  -
  - Hedera Mirror Node Explorer
  -
  - Copyright (C) 2021 - 2023 Hedera Hashgraph, LLC
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
      <span class="h-is-secondary-title">Contract Code</span>
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

        <Property id="ipfsHash" :full-width="true">
            <template v-slot:name>IPFS Hash</template>
            <template v-slot:value>
                <StringValue :string-value="ipfsHash"/>
                <div v-if="ipfsHash" class="has-text-grey">
                    <div v-if="ipfsMetadata">
                        <span class="icon fas fa-check-circle has-text-success is-small mt-1 mr-1"/>
                        <span>Metadata file is available on <a :href="ipfsURL" :target="ipfsMetadata">IPFS</a></span>
                    </div>
                    <div v-else-if="ipfsLoading">
                        <span class="icon fas fa-circle-notch fa-spin has-text-grey is-small mt-1 mr-1"/>
                        <span>Checking IPFS…</span>
                    </div>
                    <div v-else>
                        <span class="icon fas fa-info-circle has-text-grey is-small mt-1 mr-1"/>
                        <span>Metadata file is not available on IPFS</span>
                    </div>
                </div>
            </template>
        </Property>

        <Property id="swarmHash" :full-width="true">
            <template v-slot:name>SWARM Hash</template>
            <template v-slot:value>
                <StringValue :string-value="swarmHash"/>
            </template>
        </Property>

        <Property id="verificationStatus" :full-width="true">
            <template v-slot:name>Verification Status</template>
            <template v-slot:value>
                <span v-if="sourcifyURL"><ContractVerificationStatus :full-match="fullMatch ?? undefined"/></span>
                <!--          <span v-else-if="compiling">Verifying contract…</span>-->
                <span v-else>Not yet verified</span>
            </template>
        </Property>

        <Property id="contractName" :full-width="true">
            <template v-slot:name>Contract Name</template>
            <template v-slot:value>
                <StringValue :string-value="contractName ?? undefined"/>
            </template>
        </Property>

    </template>
  </DashboardCard>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, onBeforeUnmount, onMounted} from 'vue';
import DashboardCard from "@/components/DashboardCard.vue";
import ByteCodeValue from "@/components/values/ByteCodeValue.vue";
import StringValue from "@/components/values/StringValue.vue";
import Property from "@/components/Property.vue";
import {ContractByIdCache} from "@/utils/cache/ContractByIdCache";
import {ByteCodeAnalyzer} from "@/utils/analyzer/ByteCodeAnalyzer";
import {ContractAnalyzer} from "@/utils/analyzer/ContractAnalyzer";
import {routeManager} from "@/router";
import ContractVerificationStatus from "@/components/registration/ContractVerificationStatus.vue";

export default defineComponent({
  name: 'ContractByteCodeSection',

  components: {ContractVerificationStatus, Property, StringValue, ByteCodeValue, DashboardCard},

  props: {
    contractId: String,
  },

  setup: function (props) {
    const isTouchDevice = inject('isTouchDevice', false)
    const isSmallScreen = inject('isSmallScreen', true)
    const isMediumScreen = inject('isMediumScreen', true)

    const contractId = computed(() => props.contractId ?? null)
    const contractLookup = ContractByIdCache.instance.makeLookup(contractId)
    onMounted(() => contractLookup.mount())
    onBeforeUnmount(() => contractLookup.unmount())

    const byteCode = computed(() => contractLookup.entity.value?.runtime_bytecode ?? undefined)
    const byteCodeAnalyzer = new ByteCodeAnalyzer(byteCode)
    onMounted(() => byteCodeAnalyzer.mount())
    onBeforeUnmount(() => byteCodeAnalyzer.unmount())

    const contractAnalyzer = new ContractAnalyzer(contractId)
    onMounted(() => contractAnalyzer.mount())
    onBeforeUnmount(() => contractAnalyzer.unmount())

    return {
      isTouchDevice,
      isSmallScreen,
      isMediumScreen,
      byteCode: byteCodeAnalyzer.byteCode,
      solcVersion: byteCodeAnalyzer.solcVersion,
      ipfsHash: byteCodeAnalyzer.ipfsHash,
      ipfsMetadata: byteCodeAnalyzer.ipfsMetadata,
      ipfsURL: byteCodeAnalyzer.ipfsURL,
      ipfsLoading: byteCodeAnalyzer.ipfsLoading,
      swarmHash: byteCodeAnalyzer.swarmHash,
      contractName: contractAnalyzer.contractName,
      fullMatch: contractAnalyzer.fullMatch,
      sourcifyURL: contractAnalyzer.sourcifyURL,
      verifierURL: routeManager.currentNetworkEntry.value.sourcifySetup?.verifierURL,

    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
