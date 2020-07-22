<template>
    <div id="upload-dialog">
        <v-card>
            <v-card-title>
                地図の情報を更新
            </v-card-title>
            <v-card-text>
                <v-container>
                    <div>
                        <v-form v-model='isValidInput'>
                            <v-text-field
                                v-model='mapName'
                                label='地図の名前'
                                outlined
                                :rules='mapNameRules'
                            />
                            <v-textarea
                                v-model='mapDescription'
                                label='地図の説明'
                                rows="1"
                                outlined
                                :rules='mapDescriptionRules'
                                auto-grow
                            />
                        </v-form>
                    </div>
                    <div class="text-center">
                        <v-btn
                            class="ma-2"
                            @click="sendCloseDialog"
                        >
                            編集に戻る
                        </v-btn>
                        <v-btn
                            color="primary"
                            class="ma-2 white--text"
                            @click="upload"
                            :loading="loading"
                            :disabled="loading"
                        >
                            アップロード
                            <v-icon right>mdi-cloud-upload</v-icon>
                        </v-btn>
                    </div>
                </v-container>
            </v-card-text>
        </v-card>
    </div>
</template>

<script lang='ts' src='./index.ts'/>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>