import { Mutation, VuexModule, getModule, Module } from 'vuex-module-decorators';
import store from '@/store';
import { MapViewState, Map, Spot, SpotInfo, SpotForMap, Bounds } from '@/store/types';
import { sampleMaps } from '@/store/modules/sampleMaps';

/**
 * MapViewの状態管理を行うVuexModuleクラス
 */
@Module({ dynamic: true, store, name: 'mapView', namespaced: true })
export class MapViewModule extends VuexModule implements MapViewState {

    /**
     * 複数のマップの情報を持つ
     * - 大元の地図と各スポットの持つ
     *   詳細地図(ピンチインで出てくるやつ)など含む
     * - 単体テスト以外の目視テスト等のために
     *   外部モジュールのsampleMapsで初期化
     * 将来的にはvuexのmutationで登録する
     */
    public maps: Map[] = sampleMaps;

    /**
     * 大元の親のMapのID
     */
    public rootMapId: number = 0;

    /**
     * Mapコンポーネントで選択されているMapのID
     */
    public focusedMapId: number = 0;

    /**
     * Mapコンポーネントで選択されているスポットのID
     */
    public focusedSpotId: number = 0;

    /**
     * SpotInfoコンポーネントの表示非表示状態を保持
     */
    public spotInfoIsVisible: boolean = false;

    /**
     * Mapコンポーネントが扱うマップの範囲を返す
     * @return マップの範囲
     */
    get rootMapBounds(): Bounds {
        return this.maps[this.rootMapId].bounds;
    }

    /**
     * Mapコンポーネントがアイコン表示のために必要なスポットの情報を返す
     * - vuex-module-decoratorsにおいて引数付きgetterはこの書き方になる
     * @param  mapId 必要なスポットが存在するマップのID
     * @return Mapコンポーネントが必要なスポットの情報
     */
    get getSpotsForMap() {
        return (mapId: number): SpotForMap[] =>  {
            const spots: Spot[] = this.maps[mapId].spots;
            const spotsForMap: SpotForMap[] = [];
            spots.forEach((spot) => {
                spotsForMap.push({
                    id:       spot.id,
                    name:     spot.name,
                    coordinate: spot.coordinate,
                    floor:    spot.floor,
                });
            });
            return spotsForMap;
        };
    }

    /**
     * SpotInfoコンポーネントが表示する情報を返す
     * @return SpotInfoコンポーネントに必要な情報
     */
    get infoOfFocusedSpot(): SpotInfo {
        const spot: Spot = this.maps[this.focusedMapId].spots[this.focusedSpotId];
        const spotInfo: SpotInfo = {
            name:  spot.name,
            floor: spot.floor,
        };
        return spotInfo;
    }

    /**
     * Mapコンポーネント上でフォーカスされているマップIDを更新する
     * @param newFocusedMapId 新しくフォーカスされるマップのID
     */
    @Mutation
    public setFocusedMap(newFocusedMapId: number): void {
        this.focusedMapId  = newFocusedMapId;
    }

    /**
     * Mapコンポーネント上でフォーカスされているスポットのIDを更新する
     * @param newFocusedSpotId 新しくフォーカスされるスポットのID
     */
    @Mutation
    public setFocusedSpot(newFocusedSpotId: number): void {
        this.focusedSpotId = newFocusedSpotId;
    }

    /**
     * SpotInfoコンポーネントが表示されているかどうかを更新
     * @param isVisible SpotInfoコンポーネントが表示されているかどうか
     */
    @Mutation
    public setSpotInfoIsVisible(isVisible: boolean): void {
        this.spotInfoIsVisible = isVisible;
    }

    /**
     * MapViewStateの情報を一括でset
     * - 現状は単体テストの入力用の仮メソッド
     * @param mapState マップの状態
     */
    @Mutation
    public setMapViewState(newMapViewState: MapViewState): void {
        this.maps              = newMapViewState.maps;
        this.rootMapId         = newMapViewState.rootMapId;
        this.focusedMapId      = newMapViewState.focusedMapId;
        this.focusedSpotId     = newMapViewState.focusedSpotId;
        this.spotInfoIsVisible = newMapViewState.spotInfoIsVisible;
    }
}

export const mapViewStore = getModule(MapViewModule);
