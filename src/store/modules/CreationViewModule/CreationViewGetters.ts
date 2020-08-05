import { Getters } from 'vuex-smart-module';
import { CreationViewState } from './CreationViewState';
import { EditMode, EventOnMapCreation, SpotType } from '@/store/types';
import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';

export class CreationViewGetters extends Getters<CreationViewState> {
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

    /**
     * 主に編集ツールバーで切り替えられる編集モードを返す
     * @return 現在の編集モード
     */
    get editMode(): EditMode {
        return this.state.editMode;
    }

    /**
     * スポット追加ボタンで押されたスポットがどの種類のスポットなのかを返す
     * @return スポットの種類
     */
    get selectedSpotTypeToAdd(): SpotType {
        return this.state.selectedSpotTypeToAdd;
    }

    /**
     * 発生したイベントのリスト
     * イベントの処理を実行したいコンポーネントではこの返り値を監視することで新しいイベントを取得し発火する
     * @return イベントのリスト
     */
    get eventList(): EventOnMapCreation[] {
        return this.state.eventList;
    }
}
