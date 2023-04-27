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
      <span v-else-if="compiling" class="icon mr-2" style="font-size: 18px">
        <i class="fa fa-circle-notch fa-spin"></i>
      </span>
    </template>

    <template v-slot:content>
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

import {computed, defineComponent, PropType} from 'vue';
import {ContractAnalyzer} from "@/utils/ContractAnalyzer";
import DashboardCard from "@/components/DashboardCard.vue";
import Property from "@/components/Property.vue";
import StringValue from "@/components/values/StringValue.vue";
import ContractVerificationStatus from "@/components/registration/ContractVerificationStatus.vue";

export default defineComponent({
    name: 'ContractVerificationSection',
    components: {ContractVerificationStatus, StringValue, Property, DashboardCard},
    props: {
        contractAnalyzer: {
            type: Object as PropType<ContractAnalyzer>,
            required: true
        }
    },

    setup(props) {

        const compiling = computed(() => false)

        return {
            contractId: props.contractAnalyzer.contractId,
            contractName: props.contractAnalyzer.contractName,
            sourceFileName: props.contractAnalyzer.sourceFileName,
            fullMatch: props.contractAnalyzer.fullMatch,
            sourcifyURL: props.contractAnalyzer.sourcifyURL,
            compiling
        }
    }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
