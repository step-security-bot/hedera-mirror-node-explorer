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
    <Property>
        <template v-slot:name>{{ fileName }}</template>
        <template v-slot:value>
            <template v-if="origin">
                <span v-if="fullMatch">{{ origin }}</span>
                <span v-else>{{ origin }} (mismatch) </span>
                <span v-if="isLocalStorageOrigin"><button @click="clearFromLocalStorage">Forget</button></span>
            </template><template v-else>
            <span>Missing </span>
            <FileChooserAction  v-model:file-content="selectedContent"
                                v-model:file-name="selectedName"
                                actionLabel="Set…"
                                fileType=".sol"/>
        </template>
        </template>
    </Property>
</template>


<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, onBeforeUnmount, onMounted, PropType, ref, watch} from "vue";
import {ContractAnalyzer, MetadataOrigin} from "@/utils/analyzer/ContractAnalyzer";
import {ContractSourceAnalyzer} from "@/utils/analyzer/ContractSourceAnalyzer";
import FileChooserAction from "@/components/FileChooserAction.vue";
import Property from "@/components/Property.vue";

export default defineComponent({
    name: 'ContractSourceRow',

    components: {Property, FileChooserAction},

    props: {
        sourceAnalyzer: {
            type: Object as PropType<ContractSourceAnalyzer>,
            required: true
        },
        contractAnalyzer: {
            type: Object as PropType<ContractAnalyzer>,
            required: true
        }
    },

    setup: function (props) {
        const isTouchDevice = inject('isTouchDevice', false)
        const isSmallScreen = inject('isSmallScreen', true)
        const isMediumScreen = inject('isMediumScreen', true)

        onMounted(() => props.sourceAnalyzer.mount())
        onBeforeUnmount(() => props.sourceAnalyzer.unmount())

        const selectedContent = ref<string|null>(null)
        const selectedName = ref<string|null>(null)
        watch(selectedContent, () => {
            const content = selectedContent.value
            if (content !== null) {
                try {
                    props.sourceAnalyzer.userDidSelectContent(content)
                } catch {
                    console.log("Failed to parse metadata content")
                }
                selectedContent.value = null
            }
        })

        const isLocalStorageOrigin = computed(() =>
            props.sourceAnalyzer.origin.value === MetadataOrigin.LocalStorage)

        const clearFromLocalStorage = () => {
            props.sourceAnalyzer.userRequestClear()
        }

        return {
            isTouchDevice,
            isSmallScreen,
            isMediumScreen,
            fileName: props.sourceAnalyzer.sourceFileName,
            origin: props.sourceAnalyzer.origin,
            isLocalStorageOrigin,
            fullMatch: props.sourceAnalyzer.fullMatch,
            clearFromLocalStorage,
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
