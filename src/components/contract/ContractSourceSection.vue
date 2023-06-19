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

    <template v-slot:content v-if="analyzer">
      <template v-if="analyzer.metadataOrigin">
          <div>
              <div>Metadata Origin: {{ analyzer.metadataOrigin.value }}</div>
              <div>Contract Name: {{ analyzer.contractName.value }}</div>
              <template v-for="f of analyzer.sourceFileNames.value" :key="f">
                  <div>{{ f }}</div>
              </template>
          </div>
      </template><template v-else>
        <span>Contract sources are not available</span>
      </template>
    </template>
  </DashboardCard>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {defineComponent, inject, PropType} from 'vue';
import DashboardCard from "@/components/DashboardCard.vue";
import {ContractAnalyzer} from "@/utils/analyzer/ContractAnalyzer";

export default defineComponent({
  name: 'ContractSourceSection',

  components: {DashboardCard},

  props: {
    analyzer: Object as PropType<ContractAnalyzer>
  },

  setup: function (props) {
    const isTouchDevice = inject('isTouchDevice', false)
    const isSmallScreen = inject('isSmallScreen', true)
    const isMediumScreen = inject('isMediumScreen', true)

    return {
      isTouchDevice,
      isSmallScreen,
      isMediumScreen,
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
