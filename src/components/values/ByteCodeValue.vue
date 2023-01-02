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

  <textarea v-if="textValue"
            v-model="textValue"
            readonly rows="4"
            ref="dropArea"
            style="width:100%; font-family: novamonoregular,monospace"/>

  <span v-else-if="initialLoading"/>

  <span v-else class="has-text-grey">None</span>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, PropType, ref} from 'vue';
import {initialLoadingKey} from "@/AppKeys";
import {InitCodeAnalyzer} from "@/utils/InitCodeAnalyzer";

export default defineComponent({
  name: 'ByteCodeValue',

  props: {
    initCodeAnalyzer: {
      type: Object as PropType<InitCodeAnalyzer>,
      required: true
    },
  },

  setup(props) {
    const initialLoading = inject(initialLoadingKey, ref(false))

    const textValue = computed(() => {
      return props.initCodeAnalyzer.signature.value ?? props.initCodeAnalyzer.byteCode.value ?? ""
    })

    // const textValue = computed(() => {
    //   return sourceCode.value ?? props.byteCode ?? ""
    // })
    // const initialLoading = inject(initialLoadingKey, ref(false))
    //
    // // https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
    //
    // const sourceCode = ref<string|null>(null)
    // const fileReader = new FileReader()
    // fileReader.onload = () => {
    //   if (typeof fileReader.result == "string") {
    //     sourceCode.value = fileReader.result
    //   } else {
    //     sourceCode.value = null
    //   }
    // }
    //
    // watch(sourceCode, async() => {
    //   if (sourceCode.value !== null) {
    //     console.log("Starting compilation")
    //     try {
    //       const compiled = await solidityCompiler({
    //         version: `https://binaries.soliditylang.org/bin/soljson-v0.8.17+commit.8df45f5f.js`,
    //         contractBody: sourceCode.value
    //       })
    //       console.log("Compilation succeeded")
    //       console.log(JSON.stringify(compiled, null, " "))
    //     } catch(error) {
    //       console.log("Compilation failed")
    //       console.log("error=" + error)
    //     }
    //   }
    // })
    //
    //
    const dropArea = ref<HTMLCanvasElement | null>(null)
    // const handleDragOver = (e: DragEvent) => {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }
    // const handleDrop = (e: DragEvent) => {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   const file = e.dataTransfer?.files[0]
    //   if (file) {
    //     fileReader.readAsText(file)
    //   }
    // }
    // watch(dropArea, () => {
    //   if (dropArea.value !== null) {
    //     dropArea.value.addEventListener("dragover", handleDragOver)
    //     dropArea.value.addEventListener("drop", handleDrop)
    //   }
    // })

    return { textValue, initialLoading, dropArea }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>