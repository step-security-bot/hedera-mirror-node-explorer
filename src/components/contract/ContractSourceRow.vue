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
        <template v-if="origin">
            <span>{{ origin }}</span>
            <span v-if="fullMatch"> (match) </span>
            <span v-else> (mismatch) </span>
        </template><template v-else>
            <span>Missing </span>
            <FileChooserAction  v-model:file-content="selectedContent"
                                v-model:file-name="selectedName"
                                actionLabel="Set…"
                                fileType=".sol"/>
        </template>
    </div>
</template>


<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, onBeforeUnmount, onMounted, PropType, ref, watch} from "vue";
import {ContractAnalyzer} from "@/utils/analyzer/ContractAnalyzer";
import {ContractSourceAnalyzer} from "@/utils/analyzer/ContractSourceAnalyzer";
import FileChooserAction from "@/components/FileChooserAction.vue";

export default defineComponent({
    name: 'ContractSourceRow',

    components: {FileChooserAction},

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

        const selectedContent = ref<string|null>(null)
        const selectedName = ref<string|null>(null)
        watch(selectedContent, () => {
            if (selectedContent.value !==  null) {
                try {
                    sourceAnalyzer.userDidSelectContent(selectedContent.value)
                } catch {
                    console.log("Failed to parse metadata content")
                }
                selectedContent.value = null
            }
        })

        return {
            isTouchDevice,
            isSmallScreen,
            isMediumScreen,
            origin: sourceAnalyzer.origin,
            fullMatch: sourceAnalyzer.fullMatch,
            selectedContent,
            selectedName,
        }
    }
})

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
