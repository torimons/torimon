<template>
	<div id="spot-item">
        <v-card
            tile
            @click="hideSpotList();
                    showSpotInfo();
                    updateFocusedSpot();
                    moveMapViewToThisSpot()"
        >
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title class="headline">{{ (spot.getParentSpot() && spot.getParentSpot().getName() || "") + " " + spot.getName() }}</v-list-item-title>
                    <v-list-item-subtitle>{{ (spot.getFloorName() || "") + " " + distance }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
	</div>
</template>

<script lang="ts" src='./index.ts'>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
