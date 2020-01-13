import { Component, Vue, Watch } from 'vue-property-decorator';
import { DisplayLevelType } from '@/store/types';
import { MapViewModule } from '@/store/modules/MapViewModule';
import { MapViewGetters } from '@/store/modules/MapViewModule/MapViewGetters';
import { MapViewMutations } from '@/store/modules/MapViewModule/MapViewMutations';
import { Committer } from 'vuex-smart-module/lib/assets';

@Component
export default class FloorSwitchButton extends Vue {
    private mapViewMutations!: Committer<MapViewMutations>;
    private mapViewGetters!: MapViewGetters;

    // floorNamesとfloorMapIdsは表示の関係上,要素を逆順で保持する．
    private floorNames: string[] = [];
    private floorMapIds: number[] = [];

    // 階層ボタンの見た目に関するメンバ
    private selectedFloorButtonIndex: number | undefined = 0;
    private isVisible: boolean = false;

    public mounted() {
        this.$nextTick().then(() => {
            this.mapViewMutations = MapViewModule.context(this.$store).mutations;
            this.mapViewGetters = MapViewModule.context(this.$store).getters;
        })
    }

    /**
     * 階層ボタンの内容を初期化する．
     */
    private clearButtonContent(): void {
        this.floorNames = [];
        this.floorMapIds = [];
        this.selectedFloorButtonIndex = undefined;
    }

    /**
     * 階層ボタンを押した時にスポットのlastViewedDetailMapIdを更新する．
     * @param floorName 押された階層ボタンの階層名
     */
    private updateLastViewedDetailMapIdOnClick(floorName: string): void {
        const index: number = this.floorNames.findIndex((name) => name === floorName);
        const lastViewedDetailMapId: number = this.floorMapIds[index];
        const parentMapId: number = this.mapViewGetters.rootMapId;
        const spotId: number | null = this.mapViewGetters.idOfCenterSpotInRootMap;
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
        this.mapViewMutations.setLastViewedDetailMapId(payload);
    }

    /**
     * changeButtonContentで監視するプロパティ
     */
    get idOfCenterSpotInRootMap(): number | null {
        return this.mapViewGetters.idOfCenterSpotInRootMap;
    }

    /**
     * 画面中央の詳細マップ持ちスポットに合わせて階層切り替えボタンの内容を更新する．
     * 下の階が下に表示されるようにセットする．
     */
    @Watch('idOfCenterSpotInRootMap')
    private updateContentOfFloorSwitchButton(newCenterSpotId: number | null, oldCenterSpotId: number | null): void {
        const parentMapId: number = this.mapViewGetters.rootMapId;
        const spotId: number | null = newCenterSpotId;
        if (spotId === null) {
            this.clearButtonContent();
            return;
        }
        const spot = this.mapViewGetters.getSpotById({parentMapId, spotId});
        if (spot.detailMapIds.length === 0) {
            this.clearButtonContent();
            return;
        }
        this.floorMapIds = spot.detailMapIds.slice().reverse();
        this.floorNames = spot.detailMapLevelNames.slice().reverse();
        const lastViewedDetailMapId: number | null = this.mapViewGetters.getLastViewedDetailMapId({parentMapId, spotId});
        // 最後に参照された階層（詳細マップ）が存在する場合，その階層が選択された状態にする．
        // 存在しない場合は初期階にあたる階にセットする．
        if (lastViewedDetailMapId != null) {
            this.selectedFloorButtonIndex =
                spot.detailMapIds.slice().reverse().findIndex((mapId: number) => mapId === lastViewedDetailMapId);
        } else {
            this.selectedFloorButtonIndex = this.floorMapIds.length - 1;
        }
    }

    /**
     * changeButtonIsVisibleで監視するプロパティ
     */
    get displayLevel(): DisplayLevelType {
        return this.mapViewGetters.displayLevel;
    }

    /**
     * displayLevelに合わせて階層切り替えボタンの表示/非表示を切り替える．
     */
    @Watch('displayLevel')
    private changeButtonIsVisible(newDisplayLevel: DisplayLevelType, oldDisplayLevel: DisplayLevelType): void {
        if (newDisplayLevel === 'detail') {
            this.isVisible = true;
        } else {
            this.isVisible = false;
        }
    }
}
