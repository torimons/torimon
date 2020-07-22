<template>
    <div id="main-creation-view">
      <v-app>
        <CreationMapView/>
        <v-container fluid id="toolbar-container">
          <v-row no-gutters>
            <v-col>
              <v-row justify="end" no-gutters>
                <EditorToolBar/>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-app>
    </div>
</template>

<script lang='ts' src='./index.ts'/>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body,
#main-creation-view {
  height: 100%;
}
#toolbar-container {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1000;
  pointer-events: none;
}

body {
  margin: 0;
  height: 100%;
}
</style>
