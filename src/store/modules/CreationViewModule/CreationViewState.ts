import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';
import { EditMode, EventOnMapCreation, SpotType } from '@/store/types';

export class CreationViewState {
    /**
     * 作成対象のマップデータがここで保持される
     * 初期状態では伊都キャン周辺
     */
    public rootMap: Map = new Map(0, 'New Map', {
        topL: { lat: 33.596643, lng: 130.215516 },
        botR: { lat: 33.594083, lng: 130.220609 },
    });

    /**
     * 選択されているスポット
     */
    public focusedSpot: Spot | undefined = undefined;

    /**
     * 主に編集ツールバーで切り替えられる編集モード
     */
    public editMode: EditMode = 'move';

    /**
     * スポット追加モード時にどのスポットタイプを追加するモードなのかを保持
     */
    public selectedSpotTypeToAdd: SpotType = 'general';

    /**
     * イベントのリスト
     * ここに追加されたイベントが順次発火される
     */
    public eventList: EventOnMapCreation[] = [];
}
