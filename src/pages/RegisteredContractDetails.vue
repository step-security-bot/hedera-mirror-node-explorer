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
        <span class="h-is-primary-title">Verified Contract </span>
        <div class="h-is-tertiary-text mt-3" id="entityId">
          <div class="is-inline-block h-is-property-text has-text-weight-light" style="min-width: 115px">Contract ID:</div>
          <router-link :to="contractRoute">
            <span>{{ registeredContractId ?? "" }}</span>
          </router-link>
          <span v-if="contractChecksum" class="has-text-grey">-{{ contractChecksum }}</span>
        </div>
        <div v-if="ethereumAddress" id="evmAddress" class="h-is-tertiary-text mt-2" style="word-break: keep-all">
          <div class="is-inline-block h-is-property-text has-text-weight-light" style="min-width: 115px">EVM Address:</div>
          <div class="is-inline-block">
            <EVMAddress :show-id="false" :has-custom-font="true" :address="ethereumAddress"/>
          </div>
        </div>
      </template>

      <template v-slot:control>
        <div class="is-flex is-justify-content-flex-end is-align-items-center">
          <button id="forget-register" class="button is-white is-small"
                  :disabled="disableForgetButton" @click="handleForget">FORGET</button>
        </div>
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

        <Property v-if="imports" id="imports" :full-width="true">
          <template v-slot:name>Imports</template>
          <template v-slot:value>
            <div v-for="(k, index) of Object.keys(imports)" :key="k">
              <a :href="'#'+index">
                <StringValue :string-value="k"/>
              </a>
            </div>
          </template>
        </Property>

      </template>
    </DashboardCard>

    <DashboardCard>
      <template v-slot:title>
        <p :id="contractName"  class="h-is-secondary-title">Contract Source</p>
      </template>

      <template v-slot:content>
        <div class="has-text-right has-text-weight-normal">{{ sourceFileName }}</div>
        <pre class="h-has-box-background-color has-text-grey-light p-0">{{ source }}</pre>
      </template>
    </DashboardCard>

    <DashboardCard v-if="imports">
      <template v-slot:title>
        <p :id="contractName"  class="h-is-secondary-title">Imports</p>
      </template>

      <template v-slot:content>
          <div v-for="(k, index) of Object.keys(imports)" :key="k">
            <hr v-if="index > 0" class="h-card-separator mt-4 mb-1" style="height: 1px"/>
            <div :id="index" class="has-text-right has-text-weight-normal">{{ k }}</div>
            <pre class="h-has-box-background-color has-text-grey-light p-0">{{ imports[k] }}</pre>
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
import {AppStorage} from "@/AppStorage";
import {HederaNetwork} from "@bladelabs/blade-web3.js/lib/src/models/blade";
import {CompilationCache} from "@/utils/cache/CompilationCache";
import EVMAddress from "@/components/values/EVMAddress.vue";

export default defineComponent({

  name: 'RegisteredContractDetails',

  components: {
    EVMAddress,
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

    const contractLoader = new ContractLoader(normalizedContractId)
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
      const time = contractAnalyzer.creationTime.value ?? 0
      return time ? (time / 1000).toString() : null
    })

    const handleForget = () => {
      if (normalizedContractId.value !== null) {
        const network = routeManager.currentNetwork.value as HederaNetwork
        AppStorage.setContractMetadata(network, normalizedContractId.value, null)
        CompilationCache.instance.forget(normalizedContractId.value)
        router.replace(routeManager.makeRouteToContract(normalizedContractId.value))
      }
    }

    const disableForgetButton =computed( () => normalizedContractId.value == null )

    return {
      isSmallScreen,
      isTouchDevice,
      contractChecksum,
      notification,
      contractRoute,
      ethereumAddress: contractLoader.evmAddress,
      registeredContractId: contractAnalyzer.contractId,
      contractName: contractAnalyzer.contractName,
      sourceFileName: contractAnalyzer.sourceFileName,
      creationTime,
      solcVersion: contractAnalyzer.compilerVersion,
      source: contractAnalyzer.contractSource,
      imports: contractAnalyzer.importSources,
      handleForget,
      disableForgetButton
    }
  },
});

</script>

<style/>
