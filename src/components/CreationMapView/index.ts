import { Component, Vue, Watch } from 'vue-property-decorator';
import 'leaflet/dist/leaflet.css';
import L, { LeafletEvent, Marker } from 'leaflet';
import { Coordinate, SpotType, EditMode, EventOnMapCreation } from '@/store/types';
import { creationViewGetters, creationViewMutations, creationViewStore } from '@/store';
import Map from '@/Map/Map.ts';
import EditorToolBar from '@/components/EditorToolBar/index.vue';
import Spot from '@/Spot/Spot';
import SpotMarker from '@/components/MapView/Marker/SpotMarker';
import { CreationViewGetters } from '@/store/modules/MainCreationViewModule/MainCreationViewGetters';

@Component({
    components: {
        EditorToolBar,
    },
})
export default class CreationMapView extends Vue {
    private lMap!: L.Map;
    private defaultZoomLevel: number = 17;
    private tileLayer!: L.TileLayer;
    private rootMap!: Map;

    /**
     * vuexの地図データを元に表示
     * vuexで管理されているイベントの発生状態や地図データの監視を行う
     */
    public mounted() {
        this.rootMap = creationViewGetters.rootMap;
        const rootMapCenter: Coordinate = Map.calculateCenter(creationViewGetters.rootMap.getBounds());
        this.lMap = L.map('map', {zoomControl: false})
            .setView([rootMapCenter.lat, rootMapCenter.lng], this.defaultZoomLevel);
        this.tileLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 23,
                maxNativeZoom: 19,
            },
        ).addTo(this.lMap);
        this.lMap.on('click', (e: L.LeafletMouseEvent) => this.onMapClick(e));

        creationViewStore.watch(
            (state, getters: CreationViewGetters) => getters.eventList,
            (eventList, oldEventList) => {
                if (eventList.length > 0) {
                    this.fireEvent(eventList[eventList.length - 1]);
                }
            },
        );
        creationViewStore.watch(
            (state, getters: CreationViewGetters) => getters.rootMap,
            (rootMap, oldRootMap) => this.rootMap = rootMap,
        );
    }

    /**
     * 地図データの変更をvuexに反映
     */
    @Watch('rootMap', {deep: true})
    private updateMapTreeView(): void {
        creationViewMutations.setRootMap(this.rootMap);
    }

    /**
     * イベントを実行
     * - zoomIn  マップ表示の拡大
     * - zoomOut マップ表示の縮小
     * @param event イベント
     */
    private fireEvent(event: EventOnMapCreation): void {
        if (event === 'zoomIn') {
            this.zoomIn();
        }
        if (event === 'zoomOut') {
            this.zoomOut();
        }
    }

    /**
     * マップをクリックしたときに実行される
     * vuexで管理されている現在の編集モードによって中身が切り替わる
     * - move: 移動モード
     * - addSpot: スポット追加モード
     * @param e Leafletマウスイベント
     */
    private onMapClick = (e: L.LeafletMouseEvent) => {
        const editMode: EditMode  = creationViewGetters.editMode;
        if (editMode === 'move') {
            return;
        }
        if (editMode === 'addSpot') {
            this.addSpot(e);
        }
    }

    /**
     * スポットを作成しマーカーをL.Mapに追加する
     * 作成するスポットのIDは既存のスポットのIDの中から最も大きい数値+1の値
     * @param e Leafletマウスイベント
     */
    private addSpot(e: L.LeafletMouseEvent): void {
        const maxNumOfId = this.rootMap.getSpots()
            .map((spot) => spot.getId())
            .reduce((accum, newValue) => Math.max(accum, newValue), -1);
        const newId = maxNumOfId + 1;
        const newSpot: Spot = new Spot(
            newId,
            'Spot ' + newId,
            e.latlng,
            undefined, undefined, undefined, undefined,
            creationViewGetters.selectedSpotTypeToAdd,
        );
        this.rootMap.addSpots([newSpot]);
        const newMarker: Marker = new SpotMarker(newSpot);
        newMarker.addTo(this.lMap);
    }

    /**
     * マップを拡大する
     * EditorToolBarコンポーネントがclickZoomInイベントを発生させた時に実行される
     */
    private zoomIn() {
        this.lMap.zoomIn();
    }

    /**
     * マップを縮小する
     * EditorToolBarコンポーネントがclickZoomOutイベントを発生させた時に実行される
     */
    private zoomOut() {
        this.lMap.zoomOut();
    }
}
