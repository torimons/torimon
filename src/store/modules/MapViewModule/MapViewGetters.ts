import { Getters } from 'vuex-smart-module';
import { MapViewState } from './MapViewState';
import { RawMap, RawSpot, SpotInfo, SpotForMap, Bounds, DisplayLevelType, Coordinate, Node } from '@/store/types';
import { NoDetailMapsError } from '@/store/errors/NoDetailMapsError';
import { MapNotFoundError } from '@/store/errors/MapNotFoundError';
import { SpotNotFoundError } from '@/store/errors/SpotNotFoundError';

export class MapViewGetters extends Getters<MapViewState> {
    /**
     * 全てのマップを返す
     * @return Map配列
     */
    get maps(): RawMap[] {
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
     * SpotInfoコンポーネントが表示する情報を返す
     * @param targetSpot マップIdとスポットIdのオブジェクト
     * @return SpotInfoコンポーネントに必要な情報*
     */
    public getSpotInfo(targetSpot: {mapId: number, spotId: number}): SpotInfo {
        const spot: RawSpot = this.getters.getSpotById({
            parentMapId: targetSpot.mapId,
            spotId: targetSpot.spotId,
        });
        const name: string = spot.name;
        const description: string =
            spot.description !== undefined ? spot.description : '';
        const attachment: [{name: string, url: string}] =
            spot.attachment !== undefined ? spot.attachment : [{name: '', url: ''}];
        return {name, description, attachment};
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
        const rootMapIndex: number = this.state.maps.findIndex((m: RawMap) => m.id === this.state.rootMapId);
        return this.state.maps[rootMapIndex].bounds;
    }

    /**
     * Mapコンポーネントがアイコン表示のために必要なスポットの情報を返す
     * - vuex-module-decoratorsにおいて引数付きgetterはこの書き方になる
     * @param  mapId 必要なスポットが存在するマップのID
     * @return Mapコンポーネントが必要なスポットの情報
     */
    public getSpotsForMap(mapId: number): SpotForMap[] {
        const mapIndex: number = this.state.maps.findIndex((m: RawMap) => m.id === mapId);
        const spots: RawSpot[] = this.state.maps[mapIndex].spots;
        const spotsForMap: SpotForMap[] = spots.map((spot: RawSpot) => {
            return {
                mapId,
                spotId: spot.id,
                name: spot.name,
                coordinate: spot.coordinate,
                shape: spot.shape,
            };
        });
        return spotsForMap;
    }

    /**
     * マップ配列から,マップIdとスポットIdで指定されたスポットを取得する
     * @param maps MapViewModuleのマップ配列
     * @param targetSpot マップIdとスポットIdのオブジェクト
     * @throw MapNotFoundError 指定されたマップが見つからない場合に発生
     * @throw SpotNotFoundError 指定されたスポットが見つからない場合に発生
     */
    public getSpotById(targetSpot: {parentMapId: number, spotId: number}): RawSpot {
        const map: RawMap | undefined = this.state.maps.find((m: RawMap) => m.id === targetSpot.parentMapId);
        if (map === undefined) {
            throw new MapNotFoundError('Map does not found...');
        }
        const spot: RawSpot | undefined = map.spots.find((s: RawSpot) => s.id === targetSpot.spotId);
        if (spot === undefined) {
            throw new SpotNotFoundError('Spot does not found...');
        }
        return spot;
    }

    /**
     * 指定されたスポットが詳細マップを持つかどうかを判定する．
     * @param targetSpot マップのIdとスポットのId
     * @return スポットが詳細マップを持つならばtrue, 持たないならばfalse
     */
    public spotHasDetailMaps(targetSpot: {
        parentMapId: number,
        spotId: number,
    }): boolean {
        const spot = this.getters.getSpotById(targetSpot);
        if (spot.detailMapIds.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * スポットのもつ詳細マップのうち、最後に参照された詳細マップのIdを返す
     * @param parentSpot どのマップのどのスポットかを示す情報.
     * @return lastViewdDetailMapId スポットが持つ詳細マップのうち、最後に参照された詳細マップのId．
     * まだ参照されていない場合はnullを返す．
     * @throw NoDetailMapsError スポットが詳細マップを持っていない場合に発生.
     */
    public getLastViewedDetailMapId(parentSpot: {parentMapId: number, spotId: number}): number | null {
        if (this.getters.spotHasDetailMaps(parentSpot) === false) {
            throw new NoDetailMapsError('This spot has no detail maps...');
        }
        const spot = this.getters.getSpotById(parentSpot);
        const lastViewedDetailMapId: number | null = spot.lastViewedDetailMapId;
        return lastViewedDetailMapId;
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
     * スポットの親スポットを探す
     * 親スポットが存在しない場合はnullを返す
     * @param targetSpot 親スポットを探したいスポット
     * @return 親スポット.存在しない場合null
     */
    public findParentSpotId(targetSpot: { mapId: number, spotId: number} ): number | null {
        for (const map of this.state.maps) {
            for (const spot of map.spots) {
                for (const detailMapId of spot.detailMapIds) {
                    if (detailMapId === targetSpot.mapId) {
                        return spot.id;
                    }
                }
            }
        }
        return null;
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
