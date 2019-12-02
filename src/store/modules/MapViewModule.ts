import { Mutation, VuexModule, getModule, Module } from 'vuex-module-decorators';
import store from '@/store';
import { MapViewState, Map, Spot, SpotInfo, SpotForMap, Bounds } from '@/store/types';
import { SpotNotFoundError } from '@/store/errors';
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
     * - 画面上で表示されている
     * - 半径〇〇内で最も画面中央に近い
     * - 詳細マップを持っている
     * スポットのIDを保持する変数
     * 条件に当てはまるスポットがない場合nullを持つ
     */
    public idOfCenterSpotWithDetailMap: number | null = null;


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
                    shape:    spot.shape,
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
        };
        return spotInfo;
    }

    /**
     * - 画面上で表示されている
     * - 半径〇〇内で最も画面中央に近い
     * - 詳細マップを持っている
     * スポットのIDを返す
     * @return スポットID
     * @throws {SpotNotFoundError} 条件に該当するスポットが存在しない場合送出
     */
    get getIdOfCenterSpotWithDetailMap() {
        return (): number => {
            if (this.idOfCenterSpotWithDetailMap === null) {
                throw new SpotNotFoundError();
            }
            return this.idOfCenterSpotWithDetailMap;
        };
    }

    /**
     * Mapコンポーネント上でフォーカスされているスポットのIDを更新する
     * @param newFocusedMapId 新しくフォーカスされるマップのID
     * @param newFocusedSpotId 新しいフォーカスされるスポットのID
     */
    @Mutation
    public setFocusedSpot(newFocusedSpot: {mapId: number, spotId: number}): void {
        this.focusedMapId  = newFocusedSpot.mapId;
        this.focusedSpotId = newFocusedSpot.spotId;
    }

    /**
     * - 画面上で表示されている
     * - 半径〇〇内で最も画面中央に近い
     * - 詳細マップを持っている
     * スポットのIDを更新する
     * @param idOfCenterSpotWithDetailMap 上記のスポットのID
     */
    @Mutation
    public setIdOfCenterSpotWithDetailMap(idOfCenterSpotWithDetailMap: number): void {
        this.idOfCenterSpotWithDetailMap = idOfCenterSpotWithDetailMap;
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
        this.idOfCenterSpotWithDetailMap = newMapViewState.idOfCenterSpotWithDetailMap;
    }
}

export const mapViewStore = getModule(MapViewModule);
