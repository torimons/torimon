<template>
    <div id='zoomInOut'>
        <v-btn id="zoom-in"
            absolute
            bottom
            right
            fab
            small
            @click="zoomIn"
            @dblclick.stop=";"
        >
            <v-icon>zoom_in</v-icon>
        </v-btn>
        <v-btn id="zoom-out"
            absolute
            bottom
            right
            fab
            small
            @click="zoomOut"
            @dblclick.stop=";"
        >
            <v-icon>zoom_out</v-icon>
        </v-btn>
    </div>
</template>

<script lang='ts' src='./index.ts'/>


<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
html,
body,
#zoom-in {
    bottom: 120px;
    z-index: 1000;
}
#zoom-out {
    bottom: 120px;
    z-index: 1000;
}
</style>