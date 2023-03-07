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
        <span v-if="registeredContractId">
          <router-link :to="contractRoute">
            <span class="h-is-secondary-text">{{ registeredContractId ?? "" }}</span>
          </router-link>
          <span v-if="contractChecksum" class="has-text-grey" style="font-size: 28px">-{{ contractChecksum }}</span>
        </span>
      </template>
      <template v-slot:content>

        <NotificationBanner v-if="notification" :message="notification"/>

        <Property id="name" :full-width="true">
          <template v-slot:name>Name</template>
          <template v-slot:value>
            <StringValue :string-value="contractName"/>
          </template>
        </Property>
        <Property id="fileId" :full-width="true">
          <template v-slot:name>Verification Time</template>
          <template v-slot:value>
            <TimestampValue :show-none="true" :timestamp="creationTime"/>
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
        <pre class="h-has-box-background-color has-text-grey-light p-0">{{ source }}</pre>
      </template>
    </DashboardCard>

  </section>

  <Footer/>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, inject, onBeforeUnmount, onMounted} from 'vue';
import DashboardCard from "@/components/DashboardCard.vue";
import StringValue from "@/components/values/StringValue.vue";
import TimestampValue from "@/components/values/TimestampValue.vue";
import Property from "@/components/Property.vue";
import Footer from "@/components/Footer.vue";
import {EntityID} from "@/utils/EntityID";
import router, {routeManager} from "@/router";
import NotificationBanner from "@/components/NotificationBanner.vue";
import {ContractAnalyzer} from "@/utils/ContractAnalyzer";
import {ContractLoader} from "@/components/contract/ContractLoader";
import {networkRegistry} from "@/schemas/NetworkRegistry";

export default defineComponent({

  name: 'RegisteredContractDetails',

  components: {
    NotificationBanner,
    Footer,
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

    const validEntityId = computed(() => {
      return props.contractId ? EntityID.parse(props.contractId, true) != null : false
    })
    const normalizedContractId = computed(() => {
      return props.contractId ? EntityID.normalize(props.contractId) : null
    })

    const contractRoute = computed(() => {
      return normalizedContractId.value ?  routeManager.makeRouteToContract(normalizedContractId.value) : null
    })

    const notification = computed(() => {
      let result: string|null

      if (!validEntityId.value) {
        result = "Invalid contract ID: " + props.contractId
      } else {
        result = null
      }
      return result
    })

    const contractId = computed(() => props.contractId ?? null)
    const contractLoader = new ContractLoader(contractId)
    onMounted(() =>  contractLoader.requestLoad())
    onBeforeUnmount(() => contractLoader.clear())

    const contractAnalyzer = new ContractAnalyzer(contractLoader.entity)
    onMounted(() => contractAnalyzer.mount())
    onBeforeUnmount(() => contractAnalyzer.unmount())

    const contractChecksum = computed(() =>
        contractAnalyzer.contractId.value ? networkRegistry.computeChecksum(
            contractAnalyzer.contractId.value,
            router.currentRoute.value.params.network as string
        ) : null)

    const creationTime = computed(() => {
      return null
    })

    return {
      isSmallScreen,
      isTouchDevice,
      contractChecksum,
      notification,
      contractRoute,
      registeredContractId: contractAnalyzer.contractId,
      contractName: contractAnalyzer.contractName,
      creationTime,
      solcVersion: contractAnalyzer.compilerVersion,
      source: contractAnalyzer.contractSource,
    }
  },
});

</script>

<style/>
