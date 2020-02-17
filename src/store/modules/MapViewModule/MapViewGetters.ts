import { Getters } from 'vuex-smart-module';
import { MapViewState } from './MapViewState';
import { Map, Spot, SpotInfo, SpotForMap, Bounds, DisplayLevelType, Coordinate, Node } from '@/store/types';
import { MapNotFoundError } from '@/store/errors/MapNotFoundError';
import { SpotNotFoundError } from '@/store/errors/SpotNotFoundError';

export class MapViewGetters extends Getters<MapViewState> {
    /**
     * 全てのマップを返す
     * @return Map配列
     */
    get maps(): Map[] {
        return this.state.maps;
    }

    /**
     * ルートマップのマップIDを返す
     * @return ルートマップID
     */
    get rootMapId(): number {
        return this.state.rootMapId;
    }

    /**
     * Mapコンポーネントで選択されているSpotのIDを返す
     * @return スポットのIDとそのスポットを持つマップのID
     */
    get focusedSpot(): {mapId: number, spotId: number} {
        return this.state.focusedSpot;
    }

    /**
     * SpotInfoコンポーネントの表示非表示状態を返す
     * @return 表示状態の場合true
     */
    get spotInfoIsVisible(): boolean {
        return this.state.spotInfoIsVisible;
    }

    /**
     * Mapコンポーネントが扱うマップの範囲を返す
     * @return マップの範囲
     */
    get rootMapBounds(): Bounds {
        const rootMapIndex: number = this.state.maps.findIndex((m: Map) => m.id === this.state.rootMapId);
        return this.state.maps[rootMapIndex].bounds;
    }

    /**
     * マップ配列から,マップIdとスポットIdで指定されたスポットを取得する
     * @param maps MapViewModuleのマップ配列
     * @param targetSpot マップIdとスポットIdのオブジェクト
     * @throw MapNotFoundError 指定されたマップが見つからない場合に発生
     * @throw SpotNotFoundError 指定されたスポットが見つからない場合に発生
     */
    public getSpotById(targetSpot: {parentMapId: number, spotId: number}): Spot {
        const map: Map | undefined = this.state.maps.find((m: Map) => m.id === targetSpot.parentMapId);
        if (map === undefined) {
            throw new MapNotFoundError('Map does not found...');
        }
        const spot: Spot | undefined = map.spots.find((s: Spot) => s.id === targetSpot.spotId);
        if (spot === undefined) {
            throw new SpotNotFoundError('Spot does not found...');
        }
        return spot;
    }

    /**
     * ズームレベルによって変化する表示レベルを返す
     * @return 表示レベル('default' or 'detail')
     */
    get displayLevel(): DisplayLevelType {
        return this.state.displayLevel;
    }

    /**
     * - 画面上で表示されている
     * - 半径〇〇内で最も画面中央に近い
     * - 詳細マップを持っている
     * スポットのIDを返す
     * 条件に当てはまるスポットがない状態である場合nullを返す
     * @return スポットIDかnull
     */
    get idOfCenterSpotInRootMap(): number | null {
        return this.state.idOfCenterSpotInRootMap;
    }

    /**
     * マップの中央に表示したいスポットを取得
     * @return スポットのIDとスポットが存在するマップのID
     */
    get spotToDisplayInMapCenter(): { mapId: number, spotId: number } {
        return this.state.spotToDisplayInMapCenter;
    }

    /**
     * 経由するノードidの配列を入力することで経路となるノードの配列を取得
     * @param nodeIds: 経路となるノードidの配列
     * @return nodesForNavigation: 経路となるノードの配列
     */
    public getNodesForNavigation(nodeIds: number[]): Coordinate[][] {
        // getterの中身は経路探索に依存しているため、現状テスト用のものを使用
        // ノードidの配列を入力として必要なノードを検索、配列として返すメソッドが必要
        const testRoutes: Node[][] = [[
            {
                id: 0,
                mapId: 0,
                spotId: 0,
                coordinate: {
                    lat: 33.595502,
                    lng: 130.218238,
                },
            },
            {
                id: 1,
                mapId: 0,
                spotId: 1,
                coordinate: {
                lat: 33.596502,
                lng: 130.218238,
                },
            },
            {
                id: 2,
                mapId: 0,
                spotId: 2,
                coordinate: {
                lat: 33.596502,
                lng: 130.219238,
                },
            },
        ],
        [
            {
                id: 0,
                mapId: 0,
                spotId: 0,
                coordinate: {
                    lat: 33.595502,
                    lng: 130.218238,
                },
            },
            {
                id: 2,
                mapId: 0,
                spotId: 2,
                coordinate: {
                lat: 33.596502,
                lng: 130.219238,
                },
            },
            {
                id: 1,
                mapId: 0,
                spotId: 1,
                coordinate: {
                lat: 33.596502,
                lng: 130.218238,
                },
            },
        ]];
        const nodesForNavigation: Coordinate[][] = [];
        testRoutes.forEach((route: Node[]) => {
            const wayPoints: Coordinate[] = route.map((wayPoint: Node) => wayPoint.coordinate);
            nodesForNavigation.push(wayPoints);
        });
        return nodesForNavigation;
    }
}
