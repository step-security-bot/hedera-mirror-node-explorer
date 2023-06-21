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

    <template v-slot:control>{{ status }}</template>

    <template v-slot:content v-if="analyzer">
      <template v-if="metadataOrigin">
          <div>
              <div>Contract Name: {{ contractName }}</div>
              <div>Metadata File: {{ metadataOrigin }}</div>
              <template v-for="f of analyzer.sourceFileNames.value" :key="f">
                  <ContractSourceRow :file-name="f" :analyzer="analyzer"/>
              </template>
          </div>
      </template><template v-else>
        <div>Contract sources are not available</div>
        <FileChooserAction  v-model:file-content="selectedMetadataContent"
                            v-model:file-name="selectedMetadataName"
                            actionLabel="Set Metadata JSON File…"
                            fileType=".json"/>
    </template>
    </template>
  </DashboardCard>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, PropType, ref, watch} from 'vue';
import DashboardCard from "@/components/DashboardCard.vue";
import {ContractAnalyzer} from "@/utils/analyzer/ContractAnalyzer";
import ContractSourceRow from "@/components/contract/ContractSourceRow.vue";
import FileChooserAction from "@/components/FileChooserAction.vue";

export default defineComponent({
  name: 'ContractSourceSection',

  components: {FileChooserAction, ContractSourceRow, DashboardCard},

  props: {
    analyzer: {
        type: Object as PropType<ContractAnalyzer>,
        required: true
    }
  },

  setup: function (props) {
    const isTouchDevice = inject('isTouchDevice', false)
    const isSmallScreen = inject('isSmallScreen', true)
    const isMediumScreen = inject('isMediumScreen', true)

    const status = computed(() => {
        let result: string
        if (props.analyzer.fullMatch.value !== null) {
            result = props.analyzer.fullMatch.value ? "Verified (full match)" : "Verified (partial match)"
        } else {
            result = "Unverified"
        }
        return result
    })

    const selectedMetadataContent = ref<string|null>(null)
    const selectedMetadataName = ref<string|null>(null)
    watch(selectedMetadataContent, () => {
        if (selectedMetadataContent.value !==  null) {
            try {
                const metadata = JSON.parse(selectedMetadataContent.value)
                props.analyzer.userDidSelectMetadata(metadata)
            } catch {
                console.log("Failed to parse metadata content")
            }
            selectedMetadataContent.value = null
        }
    })

    return {
      isTouchDevice,
      isSmallScreen,
      isMediumScreen,
      contractName: props.analyzer.contractName,
      metadataOrigin: props.analyzer.metadataOrigin,
      status,
      selectedMetadataContent,
      selectedMetadataName
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
