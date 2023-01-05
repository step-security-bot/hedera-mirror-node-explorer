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

  <FileChooserAction
      v-if="contractAnalyzerState === ContractAnalyzerState.Unregistered"
      v-model:file-content="selectedFileContent"
      v-model:file-name="selectedFileName"
      action-label="Choose file to verify contract…"
      fileType=".sol"/>

  <span v-else class="h-is-property-text has-text-grey">
    <template v-if="contractAnalyzerState === ContractAnalyzerState.Verifying">
        <span class="icon fas fa-circle-notch fa-spin"/>
        <span>Compiling {{ contractName }} ...</span>
    </template>
    <template v-else-if="contractAnalyzerState === ContractAnalyzerState.OK">
        <span class="icon fas fa-check-circle has-text-success"/>
        <span >Conform to {{ contractName }}</span>
    </template>
    <template v-else-if="contractAnalyzerState === ContractAnalyzerState.KO">
        <span class="icon fas fa-exclamation-triangle has-text-danger"/>
        <span >Not conform to {{ contractName }}</span>
    </template>
    <template v-else>
        <span class="icon fas fa-exclamation-triangle-circle has-text-warning"/>
        <span >Conformance to {{ contractName }} cannot be checked</span>
    </template>
    <a v-if="contractAnalyzerState !== ContractAnalyzerState.Verifying" @click="handleForget">
      <span> <span class="icon fas fa-times"/></span>
    </a>
  </span>


</template>


<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->


<script lang="ts">

import {computed, defineComponent, PropType, ref, watch} from 'vue';
import {ContractAnalyzer, ContractAnalyzerState} from "@/utils/ContractAnalyzer";
import FileChooserAction from "@/components/FileChooserAction.vue";
import {customContractRegistry} from "@/schemas/CustomContractRegistry";

export default defineComponent({
  name: 'ContractToolBar',
  components: {FileChooserAction},
  props: {
    analyzer: {
      type: Object as PropType<ContractAnalyzer>,
      required: true
    },
  },

  setup(props) {

    const fileId = computed(() => props.analyzer.contract.value?.file_id ?? null)

    const contractName = computed(() => props.analyzer.contractEntry.value?.description ?? null)

    const selectedFileContent = ref<string|null>(null)
    const selectedFileName = ref<string|null>(null)
    watch(selectedFileContent, () => {
      if (selectedFileContent.value !== null && selectedFileName.value !== null && fileId.value !== null) {
        customContractRegistry.update(fileId.value, selectedFileContent.value, selectedFileName.value)
        props.analyzer.registryDidChange()
      }
    })

    const handleForget = () => {
      if (fileId.value !== null) {
        customContractRegistry.forget(fileId.value)
        props.analyzer.registryDidChange()
      }
    }

    return {
      contractName,
      contractAnalyzerState: props.analyzer.state,
      ContractAnalyzerState,
      selectedFileContent,
      selectedFileName,
      handleForget
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
