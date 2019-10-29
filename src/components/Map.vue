<template>
    <div class="map">
        map
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import leaflet from 'leaflet/dist/leaflet.css';
import L from leaflet;
//Vuexからデータを持ってくるためのコンポーネント（名前は仮）
import store from './store';

@Component({
    components: {
        store
    }
})

export default class Map extends Vue {
    display_map(){
        //osmからタイルレイヤーを取得
        const osm_layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

        //Vuexからデータを持ってくる
        //マップのレイヤー
        const over_layer = store.gettres.overlayer
        //マップの端
        const map_bounds = store.getters.bounds
        //spotのid、名前、座標など
        const spot_info = store.getters.spot_info

        //マップの表示
        const map = L.map('map',{
            center: L.latlng(
                (map_bounds.top_l[0] + map_bounds.bot_r[0])/2,
                (map_bounds.top_l[1] + map_bounds.bot_r[1])/2
                ),
                Zoom: 14,
                ZoomControl: true,
                layers: [osm_layer]
                }).addLayer(over_layer)

        //現在地の取得に成功
        function onLocationFound(e){
            //現在地のマーカー的なのが必要であれば
        }
        //エラー処理
        function onLocationError(e){
            alert("現在地が取得できませんでした" +e.message)
        }
        //現在地の取得（"geo api"の実行）
        map.locate({setView: true, maxZoom: 20})

        //spotのマーカーをマップに表示
        for(let i in spot_info.id){
            L.marker(spot_info.location[i]).bindPopup(spot_info.name[i]).addTo(map)
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
