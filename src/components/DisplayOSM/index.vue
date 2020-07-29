<template>
    <div id='map'>
        <v-btn id="osm"
            absolute
            bottom
            right
            fab
            small
            @click="displayOsm = !displayOsm"
        >
            <v-icon
                v-if="displayOsm"
            >
                visibility_off
            </v-icon>
            <v-icon
                v-else
            >
                visibility
            </v-icon>
        </v-btn>
    </div>
</template>

<script lang='ts' src='./index.ts'/>


<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
html,
body,
#map {
    height: 100%;
}
#osm {
    bottom: 120px;
    z-index: 1000;
}
body {
    margin: 0;
    height: 100%;
}
</style>
