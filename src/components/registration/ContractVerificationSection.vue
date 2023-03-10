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
      <span class="h-is-secondary-title">Contract Verification</span>
      <span v-if="contractName" class="icon has-text-success ml-2"><i class="far fa-check-circle"></i></span>
    </template>

    <template v-slot:control>
      <div v-if="contractName && routeToSource" id="showSource" class="is-inline-block ml-3">
        <router-link :to="routeToSource">
          <span class="h-is-property-text">Show contract source</span>
        </router-link>
      </div>
      <span v-else-if="compiling" class="icon mr-2" style="font-size: 18px">
        <i class="fa fa-circle-notch fa-spin"></i>
      </span>
      <button v-else id="forget-register" class="button is-white is-small"
              @click="showWizard = true">VERIFY</button>
    </template>

    <template v-slot:content>
      <Property id="verificationStatus" :full-width="true">
        <template v-slot:name>Verification Status</template>
        <template v-slot:value>
          <span v-if="contractName">Partial match</span>
          <span v-else-if="compiling">Verifying contract…</span>
          <div v-else class="is-flex is-align-items-center">
            <span v-else-if="compiling">Not yet verified</span>
          </div>
        </template>
      </Property>

      <Property id="contractName" :full-width="true">
        <template v-slot:name>Contract Name</template>
        <template v-slot:value>
          <StringValue :string-value="contractName"/>
        </template>
      </Property>

      <Property id="sourceFileName" :full-width="true">
        <template v-slot:name>Contract Source File</template>
        <template v-slot:value>
          <StringValue :string-value="sourceFileName"/>
        </template>
      </Property>

      <Property id="solcVersion" :full-width="true">
        <template v-slot:name>Compiler Version</template>
        <template v-slot:value>
          <StringValue :string-value="solcVersion"/>
        </template>
      </Property>

      <Property id="verificationTime" :full-width="true">
        <template v-slot:name>Verification Time</template>
        <template v-slot:value>
          <TimestampValue :show-none="true" :timestamp="creationTime"/>
        </template>
      </Property>
    </template>
  </DashboardCard>

  <RegistrationWizard :contract-id="contractId" v-model:show-wizard="showWizard"/>

</template>


<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->


<script lang="ts">

import {computed, defineComponent, PropType, ref, watch} from 'vue';
import {routeManager} from "@/router";
import RegistrationWizard from "@/components/registration/RegistrationWizard.vue";
import {ContractAnalyzer} from "@/utils/ContractAnalyzer";
import DashboardCard from "@/components/DashboardCard.vue";
import Property from "@/components/Property.vue";
import StringValue from "@/components/values/StringValue.vue";
import TimestampValue from "@/components/values/TimestampValue.vue";

export default defineComponent({
  name: 'ContractVerificationSection',
  components: {TimestampValue, StringValue, Property, DashboardCard, RegistrationWizard},
  props: {
    contractAnalyzer: {
      type: Object as PropType<ContractAnalyzer>,
      required: true
    }
  },

  setup(props) {

    const routeToSource = computed(() => {
      const contractId = props.contractAnalyzer.contractId.value
      return contractId ? routeManager.makeRouteToRegisteredContract(contractId) : null
    })

    const showWizard = ref(false)
    watch(showWizard, (newValue, oldValue) => {
      if (oldValue && !newValue) {
        props.contractAnalyzer.reloadContractMetadata()
      }
    })

    const creationTime = computed(() => {
      const time = props.contractAnalyzer.creationTime.value ?? 0
      return time ? (time / 1000).toString() : null
    })

    return {
      contractId: props.contractAnalyzer.contractId,
      contractName: props.contractAnalyzer.contractName,
      compiling: props.contractAnalyzer.compiling,
      sourceFileName: props.contractAnalyzer.sourceFileName,
      solcVersion: props.contractAnalyzer.compilerVersion,
      routeToSource,
      showWizard,
      creationTime
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
