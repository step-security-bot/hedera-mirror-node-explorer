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
      <span class="h-is-secondary-title">Contract Source</span>
    </template>

    <template v-slot:content>
      <template v-if="isUnknownContract">
        <span>Contract sources are not available</span>
      </template><template v-if="isSystemContract">
        <span>This is a system contract</span>
      </template><template v-if="isContractOnSourcify">
        <span>Contract is verified on Sourcify</span>
      </template><template v-if="isContractOnIPFS">
        <span>Contract is available on IPFS</span>
      </template>
    </template>
  </DashboardCard>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, onBeforeUnmount, onMounted} from 'vue';
import DashboardCard from "@/components/DashboardCard.vue";
import {ContractAnalyzer} from "@/utils/analyzer/ContractAnalyzer";

export default defineComponent({
  name: 'ContractSourceSection',

  components: {DashboardCard},

  props: {
    contractId: String
  },

  setup: function (props) {
    const isTouchDevice = inject('isTouchDevice', false)
    const isSmallScreen = inject('isSmallScreen', true)
    const isMediumScreen = inject('isMediumScreen', true)

    const contractId = computed(() => props.contractId ?? null)
    const contractAnalyzer = new ContractAnalyzer(contractId)
    onMounted(() => contractAnalyzer.mount())
    onBeforeUnmount(() => contractAnalyzer.unmount())

    return {
      isTouchDevice,
      isSmallScreen,
      isMediumScreen,
      isUnknownContract: contractAnalyzer.isUnknownContract,
      isSystemContract: contractAnalyzer.isSystemContract,
      isContractOnSourcify: contractAnalyzer.isContractOnSourcify,
      isContractOnIPFS: contractAnalyzer.isContractOnIPFS,
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
