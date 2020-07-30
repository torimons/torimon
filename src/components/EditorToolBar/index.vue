<template>
  <div id="editor-tool-bar">
    <v-card
        max-width="60"
    >
      <v-container fluid>
        <v-row no-gutters>
          <v-col>
            <v-btn
              icon
              class="mb-2"
              :color="getButtonColor('move')"
              @click="onClickMoveButton"
            >
              <v-icon icon>pan_tool</v-icon>
            </v-btn>
            <v-btn
              icon
              class="mb-2"
              :color="defaultColor"
              @click="onClickZoomIn"
            >
              <v-icon icon>zoom_in</v-icon>
            </v-btn>
            <v-btn
              icon
              class="mb-2"
              :color="defaultColor"
              @click="onClickZoomOut"
            >
              <v-icon icon>zoom_out</v-icon>
            </v-btn>
            <v-speed-dial
              direction="left"
              v-model="speedDialContentsIsVisible"
            >
              <template v-slot:activator>
                <v-btn
                  :color="getButtonColor('addSpot')"
                  v-model="speedDialContentsIsVisible"
                  icon
                >
                  <v-icon v-if="speedDialContentsIsVisible">close</v-icon>
                  <v-icon v-if="!speedDialContentsIsVisible && editMode != 'addSpot'">place</v-icon>
                  <v-icon v-if="!speedDialContentsIsVisible && editMode == 'addSpot'">{{ selectedSpotIcon }}</v-icon>
                </v-btn>
              </template>
              <v-btn 
                color="primary"
                v-for="(spotIconName, index) in spotIconNames"
                v-bind:key="index"
                fab
                small
                @click="onClickSpotAddButton(spotIconName)"
              >
                <v-icon>{{ spotIconName }}</v-icon>
              </v-btn>
            </v-speed-dial>
          </v-col> 
        </v-row> 
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts" src="./index.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-btn-toggle {
  flex-direction: column;
  pointer-events: auto;
}
.v-btn {
  flex-direction: column;
  pointer-events: auto;
}
</style>
