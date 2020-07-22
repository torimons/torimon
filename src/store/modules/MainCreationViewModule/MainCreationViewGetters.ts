import { Getters } from 'vuex-smart-module';
import { MainCreationViewState } from './MainCreationViewState';
import { RawMap, RawSpot, SpotInfo, SpotForMap, Bounds, DisplayLevelType, Coordinate, Node } from '@/store/types';
import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';

export class MainCreationViewGetters extends Getters<MainCreationViewState> {
    /**
     * ルートマップを返す
     * @return ルートマップのインスタンス
     */
    get rootMap(): Map {
        return this.state.rootMap;
    }

    /**
     * Mapコンポーネントで選択されているSpotのインスタンスを返す
     * @return スポットのインスタンス
     */
    get focusedSpot(): Spot | undefined {
        return this.state.focusedSpot;
    }

}
