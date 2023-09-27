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

    <div :class="{'is-active': showDialog}" class="modal has-text-white">
        <div class="modal-background"/>
        <div class="modal-content" style="width: 768px; border-radius: 16px">
            <div class="box">
                <div class="is-flex is-justify-content-space-between is-align-items-self-end">
                    <span class="h-is-primary-title">Verify Contract {{ contractId }}</span>
                    <a @click="handleCancel">
                        <img alt="" src="@/assets/close-icon.png" style="max-height: 20px;">
                    </a>
                </div>

                <hr class="h-card-separator"/>

                <div>
                    <div class="mb-4">{{ status }}</div>
                    <div class="mb-4 p-3" style="border: dashed 1px grey" @drop="handleDrop" @dragover="handleDragOver">
                        <template v-if="fileList.length >= 1">
                            <FileList :file-list="fileList"/>
                        </template>
                        <template v-else>
                            <div class="has-text-centered mb-4 has-text-grey">No files</div>
                        </template>
                    </div>
                </div>

                <div class="is-flex is-justify-content-flex-end">
                    <button class="button is-white is-small" @click="handleCancel">CANCEL</button>
                    <button :disabled="!verifyButtonEnabled"
                            class="button is-info is-small ml-4" @click="handleVerify">VERIFY</button>
                </div>

            </div>
        </div>
    </div>

</template>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                      SCRIPT                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<script lang="ts">

import {computed, defineComponent, PropType, ref, watch} from "vue"
import FileList from "@/components/verification/FileList.vue"
import {SolidityFileImporter} from "@/utils/SolidityFileImporter";
import {SolcOutput} from "@/utils/solc/SolcOutput";
import {ContractRecord, SolcUtils} from "@/utils/solc/SolcUtils";
import {ByteCodeAnalyzer} from "@/utils/analyzer/ByteCodeAnalyzer";
import {SolcIndexCache} from "@/utils/cache/SolcIndexCache";
import {SourcifyUtils} from "@/utils/sourcify/SourcifyUtils";

export default defineComponent({
    name: "ContractVerificationDialog",
    components: {FileList},
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        contractId: {
            type: String,
            default: null
        },
        byteCodeAnalyzer: {
            type: Object as PropType<ByteCodeAnalyzer>,
            required: true
        }
    },
    emits: ["update:showDialog", "verifyDidComplete"],
    setup(props, context) {

        //
        // Buttons
        //

        const handleCancel = () => {
            context.emit('update:showDialog', false)
            fileImporter.reset()
        }

        const verifyButtonEnabled = computed(() => {
            return contractRecord.value !== null
        })

        //
        // Drag & drop
        //
        const fileImporter = new SolidityFileImporter()
        const handleDragOver = (e: DragEvent) => {
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = "copy";
            }
            e.preventDefault()
        }

        const handleDrop = (e: DragEvent) => {
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = "copy";
                fileImporter.start(e.dataTransfer.items)
            }
            e.preventDefault()
        }

        const fileList = computed(() => {
            return Array.from(fileImporter.files.value.keys())
        })

        //
        // Compilation
        //

        const compilerVersion = computed(async () => {
            let result: string|null
            if (props.showDialog && props.byteCodeAnalyzer.solcVersion.value !== null) {
                result = await SolcIndexCache.instance.fetchLongVersion(props.byteCodeAnalyzer.solcVersion.value)
            } else {
                result = null
            }
            return Promise.resolve(result)
        })

        const compiling = ref(false)
        const solcOutput = ref<SolcOutput|null>(null)
        const longCompilerVersion = ref<string|null>(null)
        watch([fileImporter.solcInput, compilerVersion], async () => {
            const shortCompilerVersion = props.byteCodeAnalyzer.solcVersion.value
            if (fileImporter.solcInput.value !== null && shortCompilerVersion !== null) {
                compiling.value = true
                try {
                    const v = await SolcIndexCache.instance.fetchLongVersion(shortCompilerVersion)
                    if (v !== null) {
                        longCompilerVersion.value = "v" + v
                        solcOutput.value = await SolcUtils.runAsWorker(longCompilerVersion.value, fileImporter.solcInput.value)
                    } else {
                        longCompilerVersion.value = null
                        solcOutput.value = null
                    }
                } finally {
                    compiling.value = false
                }
            } else {
                longCompilerVersion.value = null
                solcOutput.value = null
            }
        })

        const contractRecord = computed(() => {
            let result: ContractRecord|null
            if (solcOutput.value !== null && props.byteCodeAnalyzer.byteCode.value !== null) {
                result = SolcUtils.findMatchingContract(props.byteCodeAnalyzer.byteCode.value, solcOutput.value)
            } else {
                result = null
            }
            return result
        })


        //
        // Verify
        //

        const verifying = ref(false)
        const handleVerify = async () => {
            const contractName = contractRecord.value?.contractName ?? null
            const compilerVersion = longCompilerVersion.value
            const solcInput = fileImporter.solcInput.value
            if (contractName !== null && compilerVersion != null && solcInput !== null) {
                verifying.value = true
                try {
                    await SourcifyUtils.verify(props.contractId, contractName, compilerVersion, solcInput)
                    context.emit('update:showDialog', false)
                    context.emit("verifyDidComplete")
                    fileImporter.reset()
                } finally {
                    verifying.value = false
                }
            }
        }


        //
        // Status
        //

        const status = computed(() => {
            let result: string
            if (fileImporter.started.value) {
                result = "Importing files…"
            } else if (compiling.value) {
                result = "Compiling…"
            } else if (verifying.value) {
                result = "Verifying…"
            } else if (contractRecord.value !== null) {
                result = "Contract " + contractRecord.value.contractName + " is ready to be verified"
            } else if (solcOutput.value !== null) {
                if (SolcUtils.countErrors(solcOutput.value) >= 1) {
                    const missingFiles = SolcUtils.fetchMissingFiles(solcOutput.value)
                    if (missingFiles.length >= 1) {
                        result = "File '" + missingFiles[0] + "' is missing"
                    } else {
                        result = "Compiler reports error. Check your Solidity files."
                    }
                } else {
                    result = "Contract " + props.contractId + " does not match those files"
                }
            } else {
                result = "Drop Solidity files in the area below"
            }
            return result
        })



        return {
            handleCancel,
            handleVerify,
            handleDragOver,
            handleDrop,
            fileList,
            verifyButtonEnabled,
            status
        }
    }
})

</script>

<!-- --------------------------------------------------------------------------------------------------------------- -->
<!--                                                       STYLE                                                     -->
<!-- --------------------------------------------------------------------------------------------------------------- -->

<style/>
