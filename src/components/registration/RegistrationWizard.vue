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

        <div class="block h-is-tertiary-text mt-2">A few UI elements…</div>

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

import {defineComponent} from "vue";

export default defineComponent({
  name: "RegistrationWizard",
  components: {},
  props: {
    contractId: String,
    showWizard: {
      type: Boolean,
      default: false
    },
  },
  emits: ["update:showWizard"],

  setup(props, context) {

    const handleCancel = () => {
      console.log("handleCancel")
      context.emit('update:showWizard', false)
    }

    return {
      handleCancel,
    }
  }
});

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>

