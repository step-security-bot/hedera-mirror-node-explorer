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
    <div>
        <span>{{ fileName }}: </span>
        <span>{{ status }}</span>
    </div>
</template>


<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, onBeforeUnmount, onMounted, PropType} from "vue";
import {ContractAnalyzer} from "@/utils/analyzer/ContractAnalyzer";
import {ContractSourceAnalyzer} from "@/utils/analyzer/ContractSourceAnalyzer";

export default defineComponent({
    name: 'ContractSourceRow',

    components: {},

    props: {
        fileName: String,
        analyzer: {
            type: Object as PropType<ContractAnalyzer>,
            required: true
        }
    },

    setup: function (props) {
        const isTouchDevice = inject('isTouchDevice', false)
        const isSmallScreen = inject('isSmallScreen', true)
        const isMediumScreen = inject('isMediumScreen', true)

        const sourceAnalyzer = new ContractSourceAnalyzer(computed(() => props.fileName ?? null), props.analyzer)
        onMounted(() => sourceAnalyzer.mount())
        onBeforeUnmount(() => sourceAnalyzer.unmount())

        return {
            isTouchDevice,
            isSmallScreen,
            isMediumScreen,
            status: sourceAnalyzer.status,
        }
    }
})

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
