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

    <div v-if="contractName && routeToSource" class="is-flex is-align-items-center">
      <span class="icon has-text-success mr-1" style="font-size: 18px"><i class="far fa-check-circle"></i></span>
      <span>
        <span class="has-text-weight-light mr-1">Conform to contract:</span>
         <router-link :to="routeToSource">{{ contractName }}</router-link>
      </span>
    </div>

    <div v-else-if="compiling" class="is-flex is-align-items-center">
      <span class="icon mr-2" style="font-size: 18px"><i class="fa fa-circle-notch fa-spin"></i></span>
      <a @click="showWizard = true" class="has-text-weight-light">Verifying contract…</a>
    </div>

    <div v-else class="is-flex is-align-items-center">
      <span class="icon mr-2" style="font-size: 18px"><i class="far fa-question-circle"></i></span>
      <a @click="showWizard = true" class="has-text-weight-light">Verify contract…</a>
    </div>

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

export default defineComponent({
  name: 'ContractToolBar',
  components: {RegistrationWizard},
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

    return {
      contractId: props.contractAnalyzer.contractId,
      contractName: props.contractAnalyzer.contractName,
      compiling: props.contractAnalyzer.compiling,
      routeToSource,
      showWizard
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
