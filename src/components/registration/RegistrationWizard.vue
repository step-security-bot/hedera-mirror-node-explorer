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
  <div :class="{'is-active': showWizard}" class="modal has-text-white">
    <div class="modal-background"/>
    <div class="modal-content" style="width: 768px; border-radius: 16px">
      <div class="box">

        <div class="h-is-primary-title">
          Verify contract {{ contractId }}
        </div>

        <hr class="h-card-separator"/>

        <div class="block h-is-tertiary-text mt-2">
          <div>currentStep: {{ controller.currentStep }}</div>
          <div>source: {{ controller.sourceHead }}</div>
          <div>sourceFileName: {{ controller.sourceFileName }}</div>
          <div>compilerVersion: {{ controller.compilerVersion }}</div>
          <div>importSpecs: {{ controller.importSpecs }}</div>
        </div>
        <div class="block h-is-tertiary-text mt-2">
          <div>compilerVersions: {{ controller.compilerVersionCount}} version(s)</div>
          <div>guessedCompilerVersion: {{ controller.guessedCompilerVersion}}</div>
          <div>guessedImportSpecs: {{ controller.guessedImportSpecCount}} import spec(s)</div>
          <div>unresolvedSpecCount: {{ controller.unresolvedSpecCount}} import spec(s)</div>
          <div>isBackDisabled: {{ controller.isBackDisabled}}</div>
          <div>isNextDisabled: {{ controller.isNextDisabled}}</div>
        </div>
        <div class="block h-is-tertiary-text mt-2">
          <div v-if="controller.currentStep.value === 1">
            <FileChooserAction
                v-model:file-content="controller.source.value"
                v-model:file-name="controller.sourceFileName.value"
                action-label="Choose contract source file…"
                fileType=".sol"/>
          </div>
        </div>
        <div>
          <div><button @click="controller.handleBack()"
                       :disabled="isBackDisabled">Back</button></div>
          <div><button @click="controller.handleNext()"
                       :disabled="isNextDisabled">Next</button></div>
        </div>

        <div class="is-flex is-justify-content-flex-end">
          <button class="button is-white is-small" @click="handleCancel">CANCEL</button>
        </div>

      </div>
    </div>
  </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {defineComponent, watch} from "vue";
import {RegistrationController} from "@/components/registration/RegistrationController";
import FileChooserAction from "@/components/FileChooserAction.vue";

export default defineComponent({
  name: "RegistrationWizard",
  components: {FileChooserAction},
  props: {
    contractId: {
      type: String,
      required: true
    },
    showWizard: {
      type: Boolean,
      default: false
    },
  },
  emits: ["update:showWizard"],

  setup(props, context) {

    const controller = new RegistrationController(props.contractId)
    watch(() => props.showWizard, () => {
      if (props.showWizard)
        controller.activate()
      else
        controller.inactivate()
    })

    const handleCancel = () => {
      console.log("handleCancel")
      context.emit('update:showWizard', false)
    }

    return {
      handleCancel,
      isBackDisabled: controller.isBackDisabled,
      isNextDisabled: controller.isNextDisabled,
      controller: controller
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>

