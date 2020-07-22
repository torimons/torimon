<template>
  <div class="map-selection">
    <v-app>
      <v-card
          flat
          tile
      >
        <v-toolbar>
          <v-toolbar-title>Selection Page</v-toolbar-title>
          <v-spacer/>
          <v-btn
            to="/"
            text
          >
            <v-icon left>home</v-icon>home
          </v-btn>
        </v-toolbar>
        <v-container id="search-bar" class="pt-0" fluid>
          <v-row>
            <v-col
              cols="12"
            >
              <MapSearch/>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MapSearch from '@/components/MapSearch/index.vue';

@Component({
    components: {
        MapSearch,
    },
})
export default class MapSelection extends Vue {
}
</script>

<style scoped>
#search-bar {
  pointer-events: none;
}
</style>
