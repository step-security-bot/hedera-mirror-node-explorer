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

    <template v-if="contractName">
      <span >Conform to {{ contractName }}</span>
    </template>


</template>


<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->


<script lang="ts">

import {computed, defineComponent, onMounted, Ref, ref, watch} from 'vue';
import {CustomContractEntry, customContractRegistry} from "@/schemas/CustomContractRegistry";

export default defineComponent({
  name: 'ContractToolBar',
  components: {},
  props: {
    contractId: String
  },

  setup(props) {

    const customContractEntry: Ref<CustomContractEntry|null> = ref(null)
    const updateCustomContractEntry = () => {
      if (props.contractId) {
        customContractRegistry.lookup(props.contractId)
            .then((e: CustomContractEntry) => {
              customContractEntry.value = e
            })
            .catch(() => {
              customContractEntry.value = null
            })
      } else {
        customContractEntry.value = null
      }
    }
    onMounted(() => {
      updateCustomContractEntry()
    })
    watch(() => props.contractId, () => {
      updateCustomContractEntry()
    })

    const contractName = computed(() => {
      return customContractEntry.value?.registryEntry.compilationRequest.targetContract ?? null
    })

    return {
      contractName,
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
