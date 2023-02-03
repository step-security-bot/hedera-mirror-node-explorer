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

  <section :class="{'h-mobile-background': isTouchDevice || !isSmallScreen}" class="section">

    <DashboardCard>
      <template v-slot:title>
        <span class="h-is-primary-title">Registered Contract </span>
        <span class="h-is-secondary-text">{{ contractId ?? "" }}</span>
      </template>
      <template v-slot:content>
        <Property id="name" :full-width="true">
          <template v-slot:name>Name</template>
          <template v-slot:value>
            <StringValue :string-value="contractName"/>
          </template>
        </Property>
        <Property id="fileId" :full-width="true">
          <template v-slot:name>Creation Time</template>
          <template v-slot:value>
            <TimestampValue :show-none="true" :timestamp="creationTime"/>
          </template>
        </Property>
        <Property id="fileId" :full-width="true">
          <template v-slot:name>File ID</template>
          <template v-slot:value>
            <StringValue :string-value="fileId"/>
          </template>
        </Property>
        <Property id="solcVersion" :full-width="true">
          <template v-slot:name>Compiler Version</template>
          <template v-slot:value>
            <StringValue :string-value="solcVersion"/>
          </template>
        </Property>
      </template>
    </DashboardCard>

    <DashboardCard>
      <template v-slot:title>
        <p class="h-is-secondary-title">Contract Source</p>
      </template>

      <template v-slot:content>
        <pre class="h-has-box-background-color has-text-grey-light">
          {{ source }}
        </pre>
      </template>
    </DashboardCard>

  </section>

  <Footer/>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, onMounted, ref, Ref, watch} from 'vue';
import DashboardCard from "@/components/DashboardCard.vue";
import {CustomContractEntry, customContractRegistry} from "@/schemas/CustomContractRegistry";
import StringValue from "@/components/values/StringValue.vue";
import TimestampValue from "@/components/values/TimestampValue.vue";
import Property from "@/components/Property.vue";

export default defineComponent({

  name: 'RegisteredContractDetails',

  components: {
    Property,
    TimestampValue,
    StringValue,
    DashboardCard
  },

  props: {
    contractId: String,
    network: String
  },

  setup(props) {
    const isSmallScreen = inject('isSmallScreen', true)
    const isTouchDevice = inject('isTouchDevice', false)

    const contractEntry: Ref<CustomContractEntry | null> = ref(null)
    const updateContractEntry = () => {
      if (props.contractId) {
        customContractRegistry.lookup(props.contractId)
            .then((e: CustomContractEntry) => {
              contractEntry.value = e
            })
            .catch(() => {
              contractEntry.value = null
            })
      } else {
        contractEntry.value = null
      }
    }
    onMounted(() => {
      updateContractEntry()
    })
    watch(() => props.contractId, () => {
      updateContractEntry()
    })

    const contractName = computed(() => {
      return contractEntry.value?.registryEntry.compilationRequest.targetContract ?? null
    })

    const creationTime = computed(() => {
      const time = contractEntry.value?.registryEntry.creationTime ?? 0
      return time ? (time / 1000).toString() : null
    })

    const fileId = computed(() => {
      return contractEntry.value?.registryEntry.fileId ?? null
    })

    const solcVersion = computed(() => {
      return contractEntry.value?.registryEntry.compilationRequest.solcVersion ?? null
    })

    const source = computed(() => {
      return contractEntry.value?.registryEntry.compilationRequest.source ?? null
    })

    return {
      isSmallScreen,
      isTouchDevice,
      contractName,
      creationTime,
      fileId,
      solcVersion,
      source,
    }
  },
});

</script>

<style/>
