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

        <div class="is-flex h-is-primary-title is-justify-content-space-between is-align-items-baseline">
          <span>Verify contract {{ contractId }}</span>
          <span v-if="showProgressSpinner" class="loader is-inline-block"/>
        </div>

        <hr class="h-card-separator"/>

        <div class="mt-0" style="min-height: 150px">

          <template v-if="currentStep === 1">
            <div class="columns">
              <div class="column is-two-fifths has-text-weight-light">
                <span>Contract Solidity Source File:</span>
              </div>
              <div class="column">
                <FileChooserAction
                    v-model:file-content="source"
                    v-model:file-name="sourceFileName"
                    :action-label="sourceFileName ?? 'Choose source file…'"
                    fileType=".sol"/>
              </div>
            </div>
          </template>

          <template v-else-if="currentStep === 2">
            <div class="columns">
              <div class="column is-two-fifths has-text-weight-light">
                Solidity Compiler Version:
              </div>
              <div class="column">
                <o-field>
                  <o-select v-model="compilerVersion"
                            class="h-is-text-size-1" style="border-radius: 4px">
                    <option v-for="version in allCompilerVersions" :key="version"
                            style="background-color: var(--h-theme-box-background-color)">
                      {{ version }}
                    </option>
                  </o-select>
                </o-field>
              </div>
            </div>
          </template>

          <template v-else-if="currentStep === 3">
            <div class="columns">
              <div class="column is-two-fifths has-text-weight-light">
                Imported Solidity Files:
              </div>
              <div class="column has-text-grey">
                <span v-if="importSpecs.length === 0">None</span>
              </div>
            </div>
            <div v-if="importSpecs.length">
              <div v-for="(spec, index) in importSpecs" :key="spec.path"
                   :class="{'mb-0': index < (importSpecs.length - 1)}" class="columns">
                <div class="column has-text-right has-text-weight-light mr-1">
                  <span class="is-numeric">{{ spec.path }}:</span>
                </div>
                <div class="column has-text-left ml-1">
                  <FileChooserAction
                      v-model:file-content="spec.source"
                      v-model:file-name="spec.sourceFileName"
                      :action-label="spec.sourceFileName ?? 'Choose imported file…'"
                      fileType=".sol"/>
                </div>
                <br/>
              </div>
            </div>
            <div v-if="false" class="columns">
              <div class="column mr-1"/>
              <div class="column has-text-left has-text-weight-light ml-1">
                Add path
              </div>
            </div>
          </template>

          <template v-else-if="currentStep === 4">
            <div class="columns">
              <div v-if="status" class="column has-text-left h-is-tertiary-text">
                <span class="icon mr-1">
                  <i v-if="isMatch" class="fa fa-check has-text-success"/>
                  <i v-else class="fa fa-exclamation-triangle has-text-danger"/>
                </span>
                <span v-if="isMatch">Source code matches contract bytecode</span>
                <span v-else>Source code verification failed</span>
                <span v-if="rejectReason" class="has-text-grey ml-1">
                  (Reason: {{ rejectReason }})
                </span>
              </div>
            </div>
            <div v-if="isMatch" class="has-text-left has-text-grey">
              You may now register this result and the source code to make them available to the community
            </div>
            <div v-if="errors.length" class="scroll-container mb-5">
              <div v-for="(error) in errors" :key="error" class="has-text-left">
                <pre class="h-has-page-background-color has-text-grey-light p-2">{{ error.formattedMessage }}</pre>
              </div>
            </div>
            </template>

          <template v-else-if="currentStep === 5">
            <div class="columns">
              <div v-if="status" class="column has-text-left h-is-tertiary-text">
                <span class="icon mr-1">
                  <i v-if="isMatch" class="fa fa-check has-text-success"/>
                  <i v-else class="fa fa-exclamation-triangle has-text-danger"/>
                </span>
                <span v-if="isMatch">
                  <span>Contract status and source have been registered</span>
                </span>
                <span v-else>
                  Registration failed
                  <span v-if="rejectReason" class="has-text-grey ml-1">
                    (Reason: {{ rejectReason }})
                  </span>
                </span>
              </div>
            </div>
            <div v-if="registrationTime" class="has-text-left has-text-grey">
              Registration time:
              <TimestampValue :timestamp="registrationTime"/>
            </div>
          </template>
        </div>

        <div class="is-flex is-justify-content-space-between">
          <button :class="{'is-invisible': !isCancelBackShown}" class="button is-white is-small"
                  @click="handleCancel">CANCEL
          </button>
          <div class="is-flex is-justify-content-flex-end">
            <button v-if="isCancelBackShown" :disabled="isBackDisabled" class="button is-info is-small"
                    @click="handleBack()">BACK
            </button>
            <button v-if="isCloseShown" class="button is-info is-small"
                    @click="handleClose()">CLOSE
            </button>
            <button v-if="isNextShown" :disabled="isNextDisabled" class="button is-info is-small ml-4"
                    @click="handleNext()">{{ nextButtonLabel }}
            </button>
          </div>
        </div>


        <div v-if="false">
          <hr class="h-card-separator" style="height: 0.5px"/>
          <div class="block h-is-tertiary-text mt-2">
            <div>currentStep: {{ controller.currentStep }}</div>
            <div>source: {{ controller.sourceHead }}</div>
            <div>sourceFileName: {{ controller.sourceFileName }}</div>
            <div>compilerVersion: {{ controller.compilerVersion }}</div>
            <div>importSpecs: {{ controller.importSpecs }}</div>
          </div>
          <div class="block h-is-tertiary-text mt-2">
            <div>compilerVersions: {{ controller.compilerVersionCount }} version(s)</div>
            <div>guessedCompilerVersion: {{ controller.guessedCompilerVersion }}</div>
            <div>guessedImportSpecs: {{ controller.guessedImportSpecCount }} import spec(s)</div>
            <div>unresolvedSpecCount: {{ controller.unresolvedSpecCount }} import spec(s)</div>
            <div>isBackDisabled: {{ controller.isBackDisabled }}</div>
            <div>isNextDisabled: {{ controller.isNextDisabled }}</div>
          </div>
          <div class="block h-is-tertiary-text mt-2">
            <div>isCancelBackShown: {{ isCancelBackShown }}</div>
            <div>isCloseShown: {{ isCloseShown }}</div>
            <div>isNextShown: {{ isNextShown }}</div>
            <div>nextButtonLabel: {{ nextButtonLabel }}</div>
            <div>isMatch: {{ isMatch }}</div>
            <div>status: {{ status }}</div>
            <div>rejectReason: {{ rejectReason }}</div>
            <div>errors: {{ errors }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, watch} from "vue";
import {RegistrationController} from "@/components/registration/RegistrationController";
import FileChooserAction from "@/components/FileChooserAction.vue";
import {RegistrationStatus} from "@/utils/contract-registry/RegistrySchema";
import TimestampValue from "@/components/values/TimestampValue.vue";

export default defineComponent({
  name: "RegistrationWizard",
  components: {TimestampValue, FileChooserAction},
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

    const isCancelBackShown = computed(
        () => controller.currentStep.value < 4
            || controller.registerResponse.value?.status == RegistrationStatus.rejected)

    const isCloseShown = computed(() => isMatch.value)

    const isNextShown = computed(() => controller.currentStep.value <= 4)

    const nextButtonLabel = computed(() =>
        controller.currentStep.value == 4 && isMatch.value
            ? "REGISTER"
            : "CONTINUE"
    )

    const isMatch = computed(() => controller.registerResponse.value?.status === RegistrationStatus.accepted)
    const status = computed(() => controller.registerResponse.value?.status ?? null)
    const rejectReason = computed(() => controller.registerResponse.value?.rejectReason ?? null)
    const errors = computed(() => controller.compilationErrors.value)

    const registrationTime = computed(() => {
      const time = controller.registerResponse.value?.entry?.creationTime ?? null
      return time ? (time / 1000).toString() : null
    })

    const handleCancel = () => {
      console.log("handleCancel")
      context.emit('update:showWizard', false)
    }

    const handleClose = () => {
      console.log("handleClose")
      context.emit('update:showWizard', false)
    }

    const handleBack = () => controller.handleBack()

    const handleNext = () => {
      controller.handleNext()
      if (controller.currentStep.value == 4 && isMatch.value) {
        context.emit('update:showWizard', false)
      }
    }

    return {
      isCancelBackShown,
      isCloseShown,
      isNextShown,
      nextButtonLabel,
      isMatch,
      status,
      rejectReason,
      errors,
      registrationTime,
      handleCancel,
      handleClose,
      handleNext,
      handleBack,
      controller: controller,
      currentStep: controller.currentStep,
      isBackDisabled: controller.isBackDisabled,
      isNextDisabled: controller.isNextDisabled,
      sourceFileName: controller.sourceFileName,
      source: controller.source,
      importSpecs: controller.importSpecs,
      allCompilerVersions: controller.allCompilerVersions,
      compilerVersion: controller.compilerVersion,
      showProgressSpinner: controller.busy,
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style>
.scroll-container {
  max-height: 200px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-color: blue black;
}
</style>
