import Spot from '@/Spot/Spot.ts'; 
import { Bounds, SpotForMap } from '@/store/types';
import { mapViewGetters, mapViewMutations } from '@/store';

export default class Map {
    constructor(private id: number,
                private name: string,
                private spots: Spot[],
                private bounds: Bounds,
                private parentSpot?: Spot,
                private floorName?: string) {
    }
    
    /**
     * Mapコンポーネントがアイコン表示のために必要なスポットの情報を返す
     * - vuex-module-decoratorsにおいて引数付きgetterはこの書き方になる
     * @return Mapコンポーネントが必要なスポットの情報
     */
    private getSpotsForMap(): SpotForMap[] {
        const spotsForMap: SpotForMap[] = this.spots.map((spot: Spot) => {
            return {
                mapId: this.id,
                spotId: (spot as any).id,
                name: (spot as any).name,
                coordinate: (spot as any).coordinate,
                shape: (spot as any).shape,
            };
        });
        return spotsForMap;
    }
}
