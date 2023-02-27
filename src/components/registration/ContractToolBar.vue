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

    <div v-if="contractName" class="is-flex is-align-items-center">
      <span class="icon has-text-success mr-1" style="font-size: 18px"><i class="far fa-check-circle"></i></span>
      <span>
        <span class="has-text-weight-light mr-1">Conform to contract:</span>
         <router-link :to="routeToSource">{{ contractName }}</router-link>
      </span>
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

import {computed, defineComponent, onMounted, ref, watch} from 'vue';
import {routeManager} from "@/router";
import RegistrationWizard from "@/components/registration/RegistrationWizard.vue";

export default defineComponent({
  name: 'ContractToolBar',
  components: {RegistrationWizard},
  props: {
    contractId: String
  },

  setup(props) {

    const updateCustomContractEntry = () => {
    }
    onMounted(() => {
      updateCustomContractEntry()
    })
    watch(() => props.contractId, () => {
      updateCustomContractEntry()
    })

    const contractName = computed(() => {
      return null
    })

    const routeToSource = computed(() => {
      return routeManager.makeRouteToRegisteredContract(props.contractId ?? "")
    })

    const showWizard = ref(false)
    watch(showWizard, (newValue, oldValue) => {
      if (oldValue && !newValue) {
        updateCustomContractEntry()
      }
    })

    return {
      contractName,
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
