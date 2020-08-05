<template>
    <div id="creation-map-view">
      <v-app>
        <div id="map">
        </div>
        <v-container fluid id="toolbar-container">
          <v-row no-gutters>
            <v-col>
              <v-row justify="end" no-gutters>
                <EditorToolBar
                  @clickMove="setEmptyMethodOnMapClick"
                  @clickZoomIn="zoomIn"
                  @clickZoomOut="zoomOut"
                  @clickSelect="setEmptyMethodOnMapClick"
                  @clickSpot="setAddSpotMethodOnMapClick"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <v-btn
          color="secondary"
          fab
          small
          dark
          id="reset-location"
          v-show="flyToMapBoundsButtonIsVisible"
          @clickReset="flyToMapBounds"
        >
          <v-icon>my_location</v-icon>
        </v-btn>
      </v-app>
    </div>
</template>

<script lang='ts' src='./index.ts'/>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body,
#creation-map-view {
  height: 100%;
}
#map {
  position: relative;
  height: 100%;
}
#toolbar-container {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1000;
  pointer-events: none;
}

#reset-location {
  position: absolute;
  z-index: 1100;
  pointer-events: auto;
  bottom: 3%;
  right: 2%;
}

body {
  margin: 0;
  height: 100%;
}
</style>
