import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapViewStore } from '@/store/modules/MapViewModule';
import { DisplayLevelType } from '@/store/types';

@Component
export default class FloorSwitchButton extends Vue {

    // floorNamesとfloorMapIdsは表示の関係上,要素を逆順で保持します．
    private floorNames: string[] = [];
    private floorMapIds: number[] = [];

    // 階層ボタンの見た目に関するメンバ
    private buttonIndex: number = 0;
    private isVisible: boolean = false;

    public mounted() {
        // pass
    }

    /**
     * 階層ボタンの内容を初期化する．
     */
    private clearButtonContent() {
        this.floorNames = [];
        this.floorMapIds = [];
        this.buttonIndex = 0;
    }

    /**
     * 階層ボタンを押した時にスポットのlastViewedDetailMapIdを更新する．
     * @param floorName 押された階層ボタンの階層名
     */
    private updateLastViewedDetailMapIdOnClick(floorName: string): void {
        const index: number = this.floorNames.findIndex((name) => name === floorName);
        const lastViewedDetailMapId: number = this.floorMapIds[index];
        const parentMapId: number = mapViewStore.rootMapId;
        const spotId: number | null = mapViewStore.idOfCenterSpotWithDetailMap;
        if (spotId === null) {
            return;
        }
        const payload = {
            detailMapId: lastViewedDetailMapId,
            parentSpot: {
                parentMapId,
                spotId,
            },
        };
        mapViewStore.setLastViewedDetailMapId(payload);
    }

    /**
     * changeButtonContentで監視するプロパティ
     */
    get idOfCenterSpotWithDetailMap(): number | null {
        return mapViewStore.idOfCenterSpotWithDetailMap;
    }

    /**
     * 画面中央の詳細マップ持ちスポットに合わせて階層切り替えボタンの内容を更新する．
     * 下の階が下に表示されるようにセットする．
     */
    @Watch('idOfCenterSpotWithDetailMap')
    private updateFloorSwitchButtonContent(): void {
        const parentMapId: number = mapViewStore.rootMapId;
        const spotId: number | null = mapViewStore.idOfCenterSpotWithDetailMap;
        if (spotId === null) {
            this.clearButtonContent();
            return;
        }
        const spot = mapViewStore.getSpotById({parentMapId,　spotId});
        if (spot.detailMapIds.length === 0) {
            this.clearButtonContent();
            return;
        }
        this.floorMapIds = spot.detailMapIds.slice().reverse();
        this.floorNames = spot.detailMapLevelNames.slice().reverse();

        const lastViewedDetailMapId = mapViewStore.getLastViewedDetailMapId({parentMapId, spotId});
        // 最後に参照された階層（詳細マップ）が存在する場合，その階層が選択された状態にする．
        // 存在しない場合は初期階にあたる階にセットする．
        if (lastViewedDetailMapId != null) {
            this.buttonIndex =
                spot.detailMapIds.slice().reverse().findIndex((mapId: number) => mapId === lastViewedDetailMapId);
        } else {
            this.buttonIndex = this.floorMapIds.length - 1;
        }
    }

    /**
     * changeButtonIsVisibleで監視するプロパティ
     */
    get displayLevel(): DisplayLevelType {
        return mapViewStore.getDisplayLevel();
    }

    /**
     * displayLevelに合わせて階層切り替えボタンの表示/非表示を切り替える．
     */
    @Watch('displayLevel')
    private changeButtonIsVisible(): void {
        const displayLevel = mapViewStore.getDisplayLevel();
        if (displayLevel === 'default') {
            this.isVisible = false;
        } else {
            this.isVisible = true;
        }
    }
}
