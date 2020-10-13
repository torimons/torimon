<template>
    <v-btn
        absolute
        bottom
        right
        fab
        small
        @click="displayOSM = !displayOSM"
        @dblclick.stop=";"
    >
        <v-icon
            v-if="displayOSM"
        >
            visibility_off
        </v-icon>
        <v-icon
            v-else
        >
            visibility
        </v-icon>
    </v-btn>
</template>

<script lang='ts' src='./index.ts'/>


<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>