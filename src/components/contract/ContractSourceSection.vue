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
        <span>{{ contractId }}</span>
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
import {ContractSourceAnalyzer} from "@/utils/analyzer/ContractSourceAnalyzer";

export default defineComponent({
  name: 'ContractSourceSection',

  components: {Property,StringValue, ByteCodeValue, DashboardCard},

  props: {
    contractId: String
  },

  setup: function (props) {
    const isTouchDevice = inject('isTouchDevice', false)
    const isSmallScreen = inject('isSmallScreen', true)
    const isMediumScreen = inject('isMediumScreen', true)

    const contractId = computed(() => props.contractId ?? null)
    const contractLookup = ContractByIdCache.instance.makeLookup(contractId)
    onMounted(() => contractLookup.mount())
    onBeforeUnmount(() => contractLookup.unmount())

    const contractSourceAnalyzer = new ContractSourceAnalyzer(computed(() => contractLookup.entity.value ?? undefined))
    onMounted(() => contractSourceAnalyzer.mount())
    onBeforeUnmount(() => contractSourceAnalyzer.unmount())

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
