<template>
    <Menu>
        <v-main>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col class="text-center">
                        <div class="">
                            Torimon
                        </div>
                        <div class="">
                            Map for everyone.
                        </div>
                        <div class="my-2">
                            <router-link to="map-select">
                                <v-btn color="#3F8373" large>
                                    <span class="white--text">地図利用</span>
                                </v-btn>
                            </router-link>
                        </div>
                        <div class="my-2">
                            <v-btn color="#3F8373" large href="CreationMapView">
                                <span class="white--text">地図作成</span>
                            </v-btn>
                        </div>
                        <!-- <div>
                             <v-btn
                                icon
                                @click="dialog = true"
                                >
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <v-dialog
                                v-model="dialog"
                                width="500"
                            >
                            <delete-confirmation-dialog
                                class="delete-confirmation"
                                :name="' '"
                                @del="dialog = false"
                                @cancel="dialog = false"
                            ></delete-confirmation-dialog>
                            </v-dialog>
                        </div> -->
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </Menu>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import Menu from '@/components/Menu/index.vue';
// import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog/index.vue';

@Component({
    components: {
        Menu,
        // DeleteConfirmationDialog,
    },
})
export default class Home extends Vue {
    // private dialog: boolean = false;
}
</script>
