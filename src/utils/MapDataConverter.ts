import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';
import { initMap } from '@/store/modules/MapViewModule/MapViewState.ts';
import { Coordinate, Shape, Bounds } from '@/store/types';

export default class MapDataConverter {
    /**
     * jsonをMap, Spot型の木構造に変換する
     * @param json
     * @retutn 木構造の根のMapインスタンス
     */
    public static json2tree(json: any): Map {
        // JSON型にしたいがjson.idとかでアクセスできなくなるのでany型に
        return this.createMap(json);
    }

    /**
     * Map, Spot型の木構造からjsonに変換する
     * @param rootMap 根のMapインスタンス
     * @return 木構造に変換したjson
     */
    public static tree2json(rootMap: Map): any {
        return rootMap.toJSON();
    }

    /**
     * 再帰的にjsonからインスタンスを復元する
     * 引数のjsonからMapを作成し，spotsをrecCreateSpotに投げる
     * @param json jsonのstring
     * @return Mapインスタンス
     */
    private static createMap(json: any): Map {
        // jsonの根っこからマップインスタンスを作成，
        // spotsはrecCreateSpotに投げる
        const map = new Map(
            json.id as number,
            json.name as string,
            json.bounds as Bounds,
            json.floorName as string,
        );
        if (json.spots !== undefined) {
            // spotsはこの時点ではまだjson
            const spots: any = json.spots;
            const spotInstances: Spot[] = spots.map(
                (spot: any) => this.createSpot(spot),
            );
            // spotが存在する場合のみ登録処理
            if (spotInstances.length > 0) {
                map.addSpots(spotInstances);
            }
        }
        return map;
    }

    /**
     * 再帰的にjsonからインスタンスを復元する
     * 引数のjsonからSpotを作成し，detailMapsをrecCreateMapに投げる
     * @param json jsonのstring
     * @return Spotインスタンス
     */
    private static createSpot(json: any): Spot {
        // jsonの根っこからマップインスタンスを作成，
        // detailMapsはrecCreateMapに投げる
        const spot = new Spot(
            json.id as number,
            json.name as string,
            json.coordinate as Coordinate,
            json.shape as Shape,
            json.floorName as string,
            json.description as string,
            json.attachment as [{name: string, url: string}],
        );
        if (json.detailMaps !== undefined) {
            // detailMapsはこの時点ではjson
            const detailMaps: any = json.detailMaps;
            const mapInstances: Map[] = detailMaps.map(
                (m: any) => this.createMap(m),
            );
            // detailMapsがある場合のみ登録処理を行う
            if (mapInstances.length > 0) {
                spot.addDetailMaps(mapInstances);
            }
        }
        return spot;
    }

}