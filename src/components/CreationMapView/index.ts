import { Component, Vue } from 'vue-property-decorator';
import 'leaflet/dist/leaflet.css';
import { mapViewGetters } from '@/store';
import L, { LeafletEvent, Marker } from 'leaflet';
import { Coordinate, SpotType } from '@/store/types';
import Map from '@/Map/Map.ts';
import EditorToolBar from '@/components/EditorToolBar/index.vue';
import SpotEditor from '@/components/SpotEditor/index.vue';
import Spot from '@/Spot/Spot';
import SpotMarker from '@/components/MapView/Marker/SpotMarker';

@Component({
    components: {
        EditorToolBar,
        SpotEditor,
    },
})
export default class CreationMapView extends Vue {
    private lMap!: L.Map;
    private defaultZoomLevel: number = 17;
    private tileLayer!: L.TileLayer;
    private map: Map = new Map(0, 'New Map', {
        topL: {lat: 0, lng: 0},
        botR: {lat: 0, lng: 0},
    });
    // 次にクリックしたときに設置されるスポットタイプ
    private spotTypeToAddNext: SpotType = 'default';
    private spotEditorIsVisible: boolean = false;
    private focusedSpot: Spot = new Spot(0, '', { lat: 0, lng: 0});
    private spotMarkers: SpotMarker[] = [];

    /**
     * とりあえず地図の表示を行なっています．
     */
    public mounted() {
        // マップの範囲選択機能を実装していないので仮の範囲
        const rootMapCenter: Coordinate = Map.calculateCenter(mapViewGetters.rootMap.getBounds());
        this.lMap = L.map('map', {zoomControl: false})
            .setView([rootMapCenter.lat, rootMapCenter.lng], this.defaultZoomLevel);
        this.tileLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 23,
                maxNativeZoom: 19,
            },
        ).addTo(this.lMap);
        this.lMap.on('click', (e) => this.onMapClick(e));
    }

    /**
     * マップがクリックされた時に実行されるonMapClick(メソッド型の変数)にaddSpotメソッドを代入
     * EditorToolBarコンポーネントでclickSpotイベントが発生した時に実行される
     * @param spotType クリックされたスポットの種類 (clickSpotイベントから送られてくる)
     */
    private setAddSpotMethodOnMapClick(spotType: SpotType): void {
        this.onMapClick = this.addSpot;
        this.spotTypeToAddNext = spotType;
    }

    /**
     * マップがクリックされた時に実行されるonMapClick(メソッド型の変数)に何も行わないundefinedを
     * セットし，クリック時に何も行われないようにする
     * EditorToolBarコンポーネントでclickSpotイベント以外が発生した時に実行される
     */
    public setEmptyMethodOnMapClick(): void {
        this.onMapClick = (e: any) => {
            this.spotEditorIsVisible = false;
        };
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
            newId, 'Spot ' + newId, e.latlng, undefined, undefined, undefined, undefined, this.spotTypeToAddNext,
        );
        this.map.addSpots([newSpot]);

        const newMarker: SpotMarker = new SpotMarker(newSpot);
        newMarker.addTo(this.lMap);
        newMarker.on('click', (event) => this.switchFocusedMarker(event.target));
        this.spotMarkers.push(newMarker);

        this.switchFocusedMarker(newMarker);
    }

    private switchFocusedMarker(newMarker: SpotMarker): void {
        const focusedMarker = this.spotMarkers.find(((marker) => marker.getSpot().getId() === this.focusedSpot.getId()));
        focusedMarker?.setSelected(false);
        newMarker.setSelected(true);
        this.focusedSpot = newMarker.getSpot();
        this.spotEditorIsVisible = true;
    }

    public deleteFocusedSpot() {
        this.spotEditorIsVisible = false;
        this.spotMarkers.find(spotMarker => spotMarker.getSpot().getId() === this.focusedSpot.getId())?.remove();
        this.spotMarkers = this.spotMarkers
            .filter(spotMarker => spotMarker.getSpot().getId() !== this.focusedSpot.getId());
        this.focusedSpot.getParentMap()?.removeSpot(this.focusedSpot.getId());
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
