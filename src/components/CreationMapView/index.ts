import { Component, Vue } from 'vue-property-decorator';
import 'leaflet/dist/leaflet.css';
import L, { LeafletEvent, Marker } from 'leaflet';
import { Coordinate, SpotType, EditMode } from '@/store/types';
import { mainCreationViewGetters, mainCreationViewMutations, mainCreationViewStore } from '@/store';
import Map from '@/Map/Map.ts';
import EditorToolBar from '@/components/EditorToolBar/index.vue';
import Spot from '@/Spot/Spot';
import SpotMarker from '@/components/MapView/Marker/SpotMarker';
import { MainCreationViewGetters } from '@/store/modules/MainCreationViewModule/MainCreationViewGetters';

@Component({
    components: {
        EditorToolBar,
    },
})
export default class CreationMapView extends Vue {
    private lMap!: L.Map;
    private defaultZoomLevel: number = 17;
    private tileLayer!: L.TileLayer;
    private map!: Map;
    // 次にクリックしたときに設置されるスポットタイプ

    /**
     * とりあえず地図の表示を行なっています．
     */
    public mounted() {
        this.map = mainCreationViewGetters.rootMap;
        const rootMapCenter: Coordinate = Map.calculateCenter(mainCreationViewGetters.rootMap.getBounds());
        this.lMap = L.map('map', {zoomControl: false})
            .setView([rootMapCenter.lat, rootMapCenter.lng], this.defaultZoomLevel);
        this.tileLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 23,
                maxNativeZoom: 19,
            },
        ).addTo(this.lMap);
        this.lMap.on('click', (e) => this.onMapClick(e));
        mainCreationViewStore.watch(
            (state, getters: MainCreationViewGetters) => getters.editMode,
            (newSpotType, oldSpotType) => this.onSwitchEditMode(newSpotType),
        );
    }

    private onSwitchEditMode(editMode: EditMode) {
        if (editMode === 'move') {
            this.setEmptyMethodOnMapClick();
        }
        if (editMode === 'addSpot') {
            this.setAddSpotMethodOnMapClick();
        }
    }

    /**
     * マップがクリックされた時に実行されるonMapClick(メソッド型の変数)にaddSpotメソッドを代入
     * EditorToolBarコンポーネントでclickSpotイベントが発生した時に実行される
     * @param spotType クリックされたスポットの種類 (clickSpotイベントから送られてくる)
     */
    private setAddSpotMethodOnMapClick(): void {
        this.onMapClick = this.addSpot;
    }

    /**
     * マップがクリックされた時に実行されるonMapClick(メソッド型の変数)に何も行わないundefinedを
     * セットし，クリック時に何も行われないようにする
     * EditorToolBarコンポーネントでclickSpotイベント以外が発生した時に実行される
     */
    private setEmptyMethodOnMapClick(): void {
        this.onMapClick = (e: any) => undefined;
    }

    /**
     * スポットを作成しマーカーをL.Mapに追加する
     * 作成するスポットのIDは既存のスポットのIDの中から最も大きい数値+1の値
     * @param e Leafletイベント(e.latlngを取得するためにany型にしている)
     */
    private addSpot(e: any): void {
        const maxNumOfId = this.map.getSpots()
            .map((spot) => spot.getId())
            .reduce((accum, newValue) => Math.max(accum, newValue), -1);
        const newId = maxNumOfId + 1;
        const newSpot: Spot = new Spot(
            newId,
            'Spot ' + newId,
            e.latlng,
            undefined, undefined, undefined, undefined,
            mainCreationViewGetters.selectedSpotTypeToAdd,
        );
        this.map.addSpots([newSpot]);
        const newMarker: Marker = new SpotMarker(newSpot);
        newMarker.addTo(this.lMap);
        mainCreationViewMutations.setRootMap(this.map);
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

    /**
     * マップをクリックしたときに実行される
     * EditorToolBarからEmitされるイベントによって中身が切り替わる
     * デフォルトでは何もしない(undefined)
     * @param e Leafletイベント(addSpotメソッドでe.latlngを取得するためにany型にしている)
     */
    private onMapClick: (e: any) => void = (e: any) => undefined;
}
