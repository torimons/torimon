import { Mutations } from 'vuex-smart-module';
import { MainCreationViewState } from './MainCreationViewState';
import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';
import { EditMode, EventOnMapCreation, SpotType } from '@/store/types';

export class MainCreationViewMutations extends Mutations<MainCreationViewState> {
    /**
     * 新たにrootMapをsetする
     * @param newRootMap
     */
    public setRootMap(newRootMap: Map) {
        this.state.rootMap = newRootMap;
    }

    /**
     * Mapコンポーネント上でフォーカスされているスポットを更新する
     * @param newFocusedSpot 新しくフォーカスされるスポット
     */
    public setFocusedSpot(newFocusedSpot: Spot): void {
        // 今まで{id:1}みたいなオブジェクトを毎回生成してsetしていたので変更をwatchできていたが，
        // Spotの全く同じインスタンスをsetしようとすると変更が検知できない．
        // 例:検索でSpotItemをクリック，マップのマーカー以外をクリックする，再び検索で同じSpotItemをクリックする
        // 応急処置としてundefinedをsetしている
        this.state.focusedSpot = undefined;
        this.state.focusedSpot = newFocusedSpot;
    }

    public setEditMode(editMode: EditMode): void {
        this.state.editMode = editMode;
    }

    public setSelectedSpotTypeToAdd(spotType: SpotType): void {
        this.state.selectedSpotTypeToAdd = spotType;
    }

    public addEvent(event: EventOnMapCreation): void {
        this.state.eventLog.push(event);
    }
}
