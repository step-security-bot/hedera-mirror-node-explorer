<!--
  -
  - Hedera Mirror Node Explorer
  -
  - Copyright (C) 2021 - 2024 Hedera Hashgraph, LLC
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

  <DashboardCard v-if="metadataString" class="h-card" collapsible-key="metadataContent">
    <template #title>
      <span class="h-is-secondary-title">Metadata Details</span>
    </template>

    <template #content>
      <template v-for="key in metadataKeys" :key="key">
        <Property :full-width="true">
          <template #name>
            {{ key }}
          </template>
          <template #value>
            <BlobValue :base64="false"
                       :blob-value="typeof metadataContent[key] === 'object'? JSON.stringify(metadataContent[key]) : metadataContent[key].toString()"
                       :pretty="true"
                       :show-none="true"
            />
          </template>
        </Property>
      </template>
    </template>

<!--    <template #rightContent>-->
<!--      <Property>-->
<!--        <template #name>-->
<!--          {{ imageUrl ? 'Image Content' : 'Image not available' }}-->
<!--        </template>-->
<!--        <template #value>-->
<!--          <a v-if="imageUrl" :href="imageUrl">-->
<!--            <figure class="has-text-right mt-1">-->
<!--              <img style="min-width: 250px" :src="imageUrl" alt="">-->
<!--            </figure>-->
<!--          </a>-->
<!--          <figure v-else class="has-text-right mt-1">-->
<!--            <img style="height: 100px" src="@/assets/image-missing.jpg" alt="">-->
<!--          </figure>-->
<!--        </template>-->
<!--      </Property>-->
<!--    </template>-->

  </DashboardCard>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">
import {defineComponent, inject, PropType,} from "vue"
import DashboardCard from "@/components/DashboardCard.vue"
import BlobValue from "@/components/values/BlobValue.vue"
import Property from "@/components/Property.vue"
import {TokenMetadataAnalyzer} from "@/components/token/TokenMetadataAnalyzer";
import SolidityCode from "@/components/SolidityCode.vue";

export default defineComponent({
  name: "MetadataSection",

  components: {
    SolidityCode,
    BlobValue,
    Property,
    DashboardCard,
  },

  props: {
    metadataAnalyzer: {
      type: Object as PropType<TokenMetadataAnalyzer>,
      required: true,
    },
  },

  setup(props) {
    const isMediumScreen = inject('isMediumScreen', true)
    return {
      isMediumScreen,
      metadataString: props.metadataAnalyzer.metadataString,
      metadataContent: props.metadataAnalyzer.metadataContent,
      metadataKeys: props.metadataAnalyzer.metadataKeys,
      imageUrl: props.metadataAnalyzer.imageUrl,
    }
  },
})

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style>
</style>
