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
  <span v-if="isFullMatch">
    Full Match
    <span class="has-text-grey">
      <span class="ml-2">(see</span>
      <a class="ml-1" href="https://docs.hedera.com/hedera/">docs.hedera.com</a>
      <span>)</span>
    </span>

  </span>
  <span v-else-if="isPartialMatch">
    Partial Match
    <span class="has-text-grey">
      <span class="ml-2">(see</span>
      <a class="ml-1 has-text-grey" href="https://docs.hedera.com/hedera/">docs.hedera.com</a>
      <span>)</span>
    </span>
  </span>
  <span v-else>Source code does not match contract bytecode</span>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent} from 'vue';
import {BytecodeComparison} from "@/utils/solc/SolcUtils";

export default defineComponent({
    name: 'ContractVerificationStatus',
    props: {
        bytecodeComparison: String
    },

    setup(props) {

        const isFullMatch = computed(
            () => props.bytecodeComparison && props.bytecodeComparison === BytecodeComparison.fullMatch)

        const isPartialMatch = computed(
            () => props.bytecodeComparison && props.bytecodeComparison === BytecodeComparison.partialMatch)

        return {
            isFullMatch,
            isPartialMatch
        }
    }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
