import { Mutations } from 'vuex-smart-module';
import { CreationViewState } from './CreationViewState';
import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';
import { EditMode, EventOnMapCreation, SpotType } from '@/store/types';

export class CreationViewMutations extends Mutations<CreationViewState> {
    /**
     * 新たにrootMapをsetする
     * @param rootMap
     */
    public setRootMap(rootMap: Map) {
        this.state.rootMap = rootMap;
    }

    /**
     * Mapコンポーネント上でフォーカスされているスポットを更新する
     * @param focusedSpot 新しくフォーカスされるスポット
     */
    public setFocusedSpot(focusedSpot: Spot): void {
        // 今まで{id:1}みたいなオブジェクトを毎回生成してsetしていたので変更をwatchできていたが，
        // Spotの全く同じインスタンスをsetしようとすると変更が検知できない．
        // 例:検索でSpotItemをクリック，マップのマーカー以外をクリックする，再び検索で同じSpotItemをクリックする
        // 応急処置としてundefinedをsetしている
        this.state.focusedSpot = undefined;
        this.state.focusedSpot = focusedSpot;
    }

    /**
     * 編集モードを切り替える
     * @param editMode 編集モード
     */
    public setEditMode(editMode: EditMode): void {
        this.state.editMode = editMode;
    }

    /**
     * スポット追加モードへの移行時に選択されたスポットタイプを設定
     * @param spotType スポットタイプ
     */
    public setSelectedSpotTypeToAdd(spotType: SpotType): void {
        this.state.selectedSpotTypeToAdd = spotType;
    }

    /**
     * 新しく発生したイベントを追加
     * @param event イベント
     */
    public addEvent(event: EventOnMapCreation): void {
        this.state.eventList.push(event);
    }
}
