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

    <template v-slot:control>
        <template v-if="showVerifyAction">
            <button id="verifyButton"
                    class="button is-white is-small"
                    :disabled="verifyRunning"
                    @click="startVerification">VERIFY</button>
        </template><template v-else>
            {{ status }}
        </template>
    </template>

    <template v-slot:content>
      <template v-if="globalState">
          <div>
              <div>Contract Name: {{ contractName }}</div>
              <div>Metadata File: {{ metadataOrigin }}</div>
              <template v-for="a of analyzer.sourceAnalyzers.value" :key="a.sourceFileName">
                  <ContractSourceRow :source-analyzer="a" :contract-analyzer="analyzer"/>
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
import {ContractAnalyzer, GlobalState} from "@/utils/analyzer/ContractAnalyzer";
import ContractSourceRow from "@/components/contract/ContractSourceRow.vue";
import FileChooserAction from "@/components/FileChooserAction.vue";
import {VerifyRequest} from "@/utils/VerifyRequest";

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
        switch(props.analyzer.globalState.value) {
            case GlobalState.Unknown:
                result = "Unverified"
                break
            case GlobalState.MissingSources: {
                const sourceFileCount = props.analyzer.sourceFileNames.value.length
                const missingSourceFileCount = props.analyzer.missingSourceCount.value
                if (missingSourceFileCount < sourceFileCount) {
                    result = "Some source files are missing"
                } else {
                    result = "Source files are missing"
                }
                break
            }
            case GlobalState.ReadyToVerifiy:
                result = "Ready to Verify"
                break;
            case GlobalState.PartialMatch:
                result = "Verified (partial match)"
                break
            case GlobalState.FullMatch:
                result = "Verified (full match)"
                break
            case null:
                result = ""
                break
        }
        return result
    })

    const showVerifyAction = computed(() => {
        return props.analyzer.globalState.value == GlobalState.ReadyToVerifiy
    })
    const verifyRequest = new VerifyRequest()
    const startVerification = () => {
        const contractId = props.analyzer.contractId.value
        const metadata = props.analyzer.metadata.value
        const sources = props.analyzer.sourceContents.value
        if (contractId !== null && metadata !== null) {
            verifyRequest.start(contractId, metadata, sources)
        }
    }
    watch(verifyRequest.running, (newValue, oldValue: boolean) => {
        if (oldValue && !newValue) {
            props.analyzer.verifyDidComplete()
        }
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
      globalState: props.analyzer.globalState,
      contractName: props.analyzer.contractName,
      metadataOrigin: props.analyzer.metadataOrigin,
      status,
      showVerifyAction,
      verifyRunning: verifyRequest.running,
      startVerification,
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
