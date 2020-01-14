import { Map, DisplayLevelType } from '@/store/types';
import { sampleMaps } from '@/store/modules/sampleMaps';

/**
 * マップ中の全スポットに階層情報と親のスポットの名前を登録する
 * 階層や親スポットが存在しない場合は空文字列を代入
 * @return 情報追加後のマップ
 */
function initMap(): Map[] {
    for (const map of sampleMaps) {
        for (const spot of map.spots) {
            spot.parentSpotName = '';
            spot.floorName = '';
        }
    }
    for (const map of sampleMaps) {
        for (const spot of map.spots) {
            for (const detailMapId of spot.detailMapIds) {
                for (const detailMapSpot of sampleMaps[detailMapId].spots) {
                    detailMapSpot.parentSpotName = spot.name;
                    const detailMapIdIndex: number = spot.detailMapIds
                        .findIndex((mapId: number) => mapId === detailMapId);
                    detailMapSpot.floorName = spot.detailMapLevelNames[detailMapIdIndex];
                }
            }
        }
    }
    return sampleMaps;
}

export class MapViewState {
    /**
     * 複数のマップの情報を持つ
     * - 大元の地図と各スポットの持つ
     *   詳細地図(ピンチインで出てくるやつ)など含む
     * - 単体テスト以外の目視テスト等のために
     *   外部モジュールのsampleMapsで初期化
     * 将来的にはvuexのmutationで登録する
     */
    public maps: Map[] = initMap();


    /*
     * 大元の親のMapのID
     */
    public rootMapId: number = 0;

    /**
     * Mapコンポーネントで選択されているMap，およびスポットのID
     */
    public focusedSpot: {mapId: number, spotId: number} = {
        mapId: 0,
        spotId: 0,
    };

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
    public idOfCenterSpotInRootMap: number | null = null;

    /**
     * ズームレベルに応じて切り替わる表示レベルを保持
     */
    public displayLevel: DisplayLevelType = 'default';
}
