import { Component, Vue } from 'vue-property-decorator';
import 'leaflet/dist/leaflet.css';
import L, { LeafletEvent, Marker } from 'leaflet';
import { Coordinate, SpotType, Shape, Bounds } from '@/store/types';
import { mapViewGetters } from '@/store';
import Map from '@/Map/Map.ts';
import EditorToolBar from '@/components/EditorToolBar/index.vue';
import Spot from '@/Spot/Spot';
import SpotMarker from '@/components/MapView/Marker/SpotMarker';
import { getBounds, isPointInPolygon } from 'geolib';

@Component({
    components: {
        EditorToolBar,
    },
})
export default class CreationMapView extends Vue {
    private lMap!: L.Map;
    private defaultZoomLevel: number = 17;
    private tileLayer!: L.TileLayer;
    private rootMap: Map = new Map(0, 'New Map', {
        topL: { lat: 33.596643, lng: 130.215516 },
        botR: { lat: 33.594083, lng: 130.220609 },
    });
    private mapToEdit: Map = this.rootMap;
    // 次にクリックしたときに設置されるスポットタイプ
    private spotTypeToAddNext: SpotType = 'default';
    private outOfMapRangeWarningIsVisible: boolean = false;
    private flyToMapBoundsButtonIsVisible: boolean = false;
    private focusedSpot: Spot | null = null;
    private spotMarkers: SpotMarker[] = [];

    // 詳細マップ生成時に利用
    private currentId: number = 0;

    // 作成中のマップtreeviewで利用
    // private items: any = [];
    // private mapFileTreeDialog: boolean = false;
    private drawer: boolean = false;

    /**
     * とりあえず地図の表示を行なっています．
     */
    public mounted() {
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
    private setEmptyMethodOnMapClick(): void {
        this.onMapClick = (e: any) => undefined;
    }

    /**
     * スポットを作成しマーカーをL.Mapに追加する
     * 作成するスポットのIDは既存のスポットのIDの中から最も大きい数値+1の値
     * @param e Leafletイベント(e.latlngを取得するためにany型にしている)
     */
    private addSpot(e: L.LeafletMouseEvent): void {
        let isPointInMapArea: boolean;
        if (this.rootMap.getId() ===  this.mapToEdit.getId()) {
            const lBouds = new L.LatLngBounds(
                this.rootMap.getBounds().topL as L.LatLng,
                this.rootMap.getBounds().botR as L.LatLng);
            isPointInMapArea = !lBouds.contains(e.latlng);
        } else {
            const parentSpot: Spot = this.mapToEdit.getParentSpot()!;
            const shape: Shape = parentSpot.getShape()!;
            const coods: number[][][] = shape.coordinates as number[][][];
            const latlngs: L.LatLng[] = coods[0].map((c: number[]) => new L.LatLng(c[1], c[0]));
            isPointInMapArea = !isPointInPolygon(e.latlng, latlngs);
        }
        if (isPointInMapArea) {
            this.outOfMapRangeWarningIsVisible = true;
            setTimeout(() => {
                this.outOfMapRangeWarningIsVisible = false;
            }, 3000);
            return;
        }
        const newId = ++this.currentId;
        const newSpot: Spot = new Spot(
            newId, 'スポット ' + newId, e.latlng, undefined, undefined, undefined, undefined, this.spotTypeToAddNext,
        );
        this.mapToEdit.addSpot(newSpot);


        const spotMarker: SpotMarker = this.displaySpotMarker(newSpot);
        this.switchFocusedMarker(spotMarker);
        this.drawer = true;
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

    private initMapView() {
        this.flyToMapBoundsButtonIsVisible = true;
    }

    private flyToMapBounds(): void {
        const bounds: Bounds = this.mapToEdit.getBounds();
        const lBounds: L.LatLngBounds = new L.LatLngBounds(bounds.topL, bounds.botR);
        this.lMap.flyToBounds(lBounds);
    }

    private displaySpotMarker(spot: Spot): SpotMarker {
        const newMarker: SpotMarker = new SpotMarker(spot);
        newMarker.addTo(this.lMap);
        newMarker.on('click', (event) => this.switchFocusedMarker(event.target));
        this.spotMarkers.push(newMarker);
        return newMarker;
    }

    private unfocusedMarker(): void {
        if (this.focusedSpot !== null) {
            const focusedMarker = this.spotMarkers
                .find(((marker) => marker.getSpot().getId() === (this.focusedSpot as Spot).getId()));
            focusedMarker?.setSelected(false);
        }
        this.focusedSpot = null;
    }

    /**
     * 地図上でフォーカスされるマーカーを切り替える
     * @param newMarker 新しくフォーカスされるマーカー
     */
    private switchFocusedMarker(newMarker: SpotMarker): void {
        this.unfocusedMarker();
        newMarker.setSelected(true);
        this.focusedSpot = newMarker.getSpot();
    }

}
