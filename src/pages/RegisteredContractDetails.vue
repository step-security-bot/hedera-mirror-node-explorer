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
            <a :href="'#'+contractName">
              <StringValue :string-value="contractName"/>
            </a>
          </template>
        </Property>

        <Property v-if="imports" id="imports" :full-width="true">
          <template v-slot:name>Imports</template>
          <template v-slot:value>
            <div v-for="k of Object.keys(imports)" :key="k">
              <a :href="'#'+k">
                <StringValue :string-value="k"/>
              </a>
            </div>
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
        <p :id="contractName"  class="h-is-secondary-title">Contract Source</p>
      </template>

      <template v-slot:content>
        <div class="has-text-right has-text-weight-normal">{{ contractName }}</div>
        <pre class="h-has-box-background-color has-text-grey-light p-0">{{ source }}</pre>
        <div v-if="imports">
          <div v-for="k of Object.keys(imports)" :key="k">
            <hr :id="k" class="h-card-separator mt-4 mb-1" style="height: 0.5px"/>
            <div class="has-text-right has-text-weight-normal">{{ k }}</div>
            <pre class="h-has-box-background-color has-text-grey-light p-0">{{ imports[k] }}</pre>
          </div>
        </div>
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

    const imports = computed(() => {
      const result = contractAnalyzer.importSources.value
      if (result) {
        for (const k of Object.keys(result))
        console.log("key: " + k)
      }
      return result
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
      imports,
      // imports: contractAnalyzer.importSources,
    }
  },
});

</script>

<style/>
