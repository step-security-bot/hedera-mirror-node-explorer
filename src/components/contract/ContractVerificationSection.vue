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
      <span class="h-is-secondary-title">Contract Verification</span>
    </template>

    <template v-slot:control>
        {{ status }}
    </template>

    <template v-slot:content>
      <template v-if="verified">
          <Property id="contractName">
              <template v-slot:name>Contract Name</template>
              <template v-slot:value>{{ contractName }}</template>
          </Property>
          <Property id="contractName">
              <template v-slot:name>Contract Source</template>
              <template v-slot:value>{{ sourceFileName }}</template>
          </Property>
      </template><template v-else>
        <div class="has-text-centered">
            <div class="mb-4">Contract is not verified</div>
            <div class="mb-4 has-text-grey">
                If you detain solidity sources of this contract,<br>you may use them to verify the contract.
            </div>
            <button class="button is-white is-small" @click="showVerifyDialog = true">VERIFY…</button>
        </div>
    </template>
    </template>

  </DashboardCard>

  <ContractVerificationDialog
          v-model:show-dialog="showVerifyDialog"
          :contract-id="contractId ?? undefined"
          :byte-code-analyzer="byteCodeAnalyzer"
          v-on:verify-did-complete="verifyDidComplete"/>
    
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, PropType, ref} from 'vue';
import DashboardCard from "@/components/DashboardCard.vue";
import {ContractAnalyzer, GlobalState} from "@/utils/analyzer/ContractAnalyzer";
import ContractVerificationDialog from "@/components/verification/ContractVerificationDialog.vue";
import Property from "@/components/Property.vue";

export default defineComponent({
  name: 'ContractSourceSection',

  components: {ContractVerificationDialog, Property, DashboardCard},

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

    const verified = computed(() => {
        const gs = props.analyzer.globalState.value
        return gs == GlobalState.FullMatch || gs == GlobalState.PartialMatch
    })

    const status = computed(() => {
        let result: string
        switch(props.analyzer.globalState.value) {
            case GlobalState.Unverified:
                result = "Unverified"
                break
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

    const showVerifyDialog = ref(false)

    const verifyDidComplete = () => {
        props.analyzer.verifyDidComplete()
    }

    return {
      isTouchDevice,
      isSmallScreen,
      isMediumScreen,
      contractId: props.analyzer.contractId,
      contractName: props.analyzer.contractName,
      sourceFileName: props.analyzer.sourceFileName,
      byteCodeAnalyzer: props.analyzer.byteCodeAnalyzer,
      verified,
      status,
      showVerifyDialog,
      verifyDidComplete
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
