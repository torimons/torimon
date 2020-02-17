import { Coordinate, Shape, SpotInfo } from '@/store/types.ts';
import Map from '@/Map/Map.ts';
]import { mapViewGetters, mapViewMutations } from '@/store';
import { NoDetailMapsError } from '@/store/errors/NoDetailMapsError';

export default class Spot {
    constructor(private id: number,
                private name: string,
                private coordinate: Coordinate,
                private parentMap: Map,
                private detailMaps: Map[],
                private shape?: Shape,
                private floorName?: string,
                private description?: string,
                private attachment?: [{name: string, url: string}]) {
    }

    /**
     * 指定されたスポットが詳細マップを持つかどうかを判定する．
     * @param targetSpot マップのIdとスポットのId
     * @return スポットが詳細マップを持つならばtrue, 持たないならばfalse
     */
    private spotHasDetailMaps(): boolean {
        const spot = mapViewGetters.getSpotById({parentMapId: (this.parentMap as any).id, spotId: this.id});
        if (spot.detailMapIds.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * スポットのもつ詳細マップのうち、最後に参照された詳細マップのIdを返す
     * @return lastViewdDetailMapId スポットが持つ詳細マップのうち、最後に参照された詳細マップのId．
     * まだ参照されていない場合はnullを返す．
     * @throw NoDetailMapsError スポットが詳細マップを持っていない場合に発生.
     */
    private getLastViewedDetailMapId(): number | null {
        if (this.spotHasDetailMaps() === false) {
            throw new NoDetailMapsError('This spot has no detail maps...');
        }
        const spot = mapViewGetters.getSpotById({parentMapId: (this.parentMap as any).id, spotId: this.id});
        const lastViewedDetailMapId: number | null = spot.lastViewedDetailMapId;
        return lastViewedDetailMapId;
    }

    /**
     * SpotInfoコンポーネントが表示する情報を返す
     * @param targetSpot マップIdとスポットIdのオブジェクト
     * @return SpotInfoコンポーネントに必要な情報*
     */
    private getSpotInfo(): SpotInfo {
        const description: string =
            this.description !== undefined ? this.description : '';
        const attachment: [{name: string, url: string}] =
            this.attachment !== undefined ? this.attachment : [{name: '', url: ''}];
        return {name: this.name, description, attachment};
    }

    /**
     * スポットの親スポットを探す
     * 親スポットが存在しない場合はnullを返す
     * @return 親スポット.存在しない場合null
     */
    private findParentSpotId(): number | null {
        if ((this.parentMap as any).parentSpot.id !== undefined) {
            return (this.parentMap as any).parentSpot.id;
        }
        return null;
    }
}
