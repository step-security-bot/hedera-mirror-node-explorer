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
  <a @click="showFileChooser">
    <span class="h-is-property-text has-text-grey">{{ actionLabel }}</span>
  </a>
  <input type="file" :accept="fileType" ref="inputFile"
         @change="handleFileSelection" style="display: none"/>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "FileChooserAction",

  props: {
    actionLabel: String,
    fileType: String,
    fileContent: String,
    fileName: String,
    reading: Boolean
  },

  emits: [ "update:fileContent", "update:fileName", "update:reading"],

  setup(props, context) {

    const inputFile = ref<HTMLInputElement | null>(null)
    const showFileChooser = () => {
      if (inputFile.value !== null) {
        inputFile.value.click()
      }
    }
    const handleFileSelection = () => {
      const selectedFiles = inputFile.value?.files ?? null
      if (selectedFiles && selectedFiles.length >= 1) {
        context.emit("update:reading", true)
        const selectedFile = selectedFiles[0]
        selectedFile.text()
            .then((content: string) => {
              context.emit("update:fileContent", content)
              context.emit("update:fileName", selectedFile.name)
            })
            .catch(() => {
              context.emit("update:fileContent", undefined)
              context.emit("update:fileName", undefined)
            })
            .finally(() => {
              context.emit("update:reading", false)
            })
      } else {
        console.log("Selected files is undefined")
      }
    }

    return {
      inputFile,
      showFileChooser,
      handleFileSelection,
    }
  }
})

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      STYLE                                                      -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
