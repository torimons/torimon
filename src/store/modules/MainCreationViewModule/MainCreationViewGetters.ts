import { Getters } from 'vuex-smart-module';
import { MainCreationViewState } from './MainCreationViewState';
import { EditMode, EventOnMapCreation, SpotType } from '@/store/types';
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

    get editMode(): EditMode {
        return this.state.editMode;
    }

    get selectedSpotTypeToAdd(): SpotType {
        return this.state.selectedSpotTypeToAdd;
    }

    get eventLog(): EventOnMapCreation[] {
        return this.state.eventLog;
    }
}
