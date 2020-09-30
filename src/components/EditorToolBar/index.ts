import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import { SpotType, EditMode, spotIconNames, SpotIconName } from '@/store/types';
import { creationViewMutations, creationViewStore } from '@/store';
import { CreationViewGetters } from '@/store/modules/CreationViewModule/CreationViewGetters';

@Component
export default class EditorToolBar extends Vue {
    private selectedColor: string = '#264F45';
    private defaultColor: string = '#76978F';
    private buttonColorMap: Array<{mode: EditMode, color: string}> = [
        { mode: 'move', color: this.selectedColor },
        { mode: 'addSpot', color: this.defaultColor },
    ];
    private spotIconNames = spotIconNames;
    private editMode: EditMode = 'move';
    private selectedSpotIcon: SpotIconName = spotIconNames.general;
    private speedDialContentsIsVisible: boolean = false;

    public mounted() {
        // vuexのeditModeの更新を監視し本コンポーネントに反映
        creationViewStore.watch(
            (state, getters: CreationViewGetters) => getters.editMode,
            (editMode, oldEditMode) => this.editMode = editMode,
        );
    }

    /**
     * editModeの更新を監視し，vuexに反映する
     * @param editMode Watch対象である本クラスのメンバ変数
     */
    @Watch('editMode')
    private updateEditMode(editMode: EditMode): void {
        creationViewMutations.setEditMode(editMode);
    }

    /**
     * ボタンの色を取得する
     * @param editMode 色を取得したいボタンの編集モード
     */
    private getButtonColor(editMode: EditMode): string {
        const color = this.buttonColorMap.find((entry) => entry.mode === editMode)?.color;
        if (color === undefined) {
            throw new Error('The buttonColorMap does not contain ' + editMode);
        }
        return color;
    }

    /**
     * 移動ボタンが押された際に呼び出される
     */
    private onClickMoveButton(): void {
        this.updateStatus('move');
    }

    /**
     * 拡大ボタンが押された際に呼び出される
     */
    private onClickZoomIn(): void {
        creationViewMutations.addEvent('zoomIn');
    }

    /**
     * 縮小ボタンが押された際に呼び出される
     */
    private onClickZoomOut(): void {
        creationViewMutations.addEvent('zoomOut');
    }

    /**
     * スポット追加ボタンが押された際に呼び出される
     * @param クリックされたスポット追加ボタンのスポット名前
     */
    private onClickSpotAddButton(icon: SpotIconName): void {
        const spotType: SpotType | undefined = Object.entries(spotIconNames)
            .filter(([key, value]) => value === icon)
            .map(([key, value]) => key as SpotType)
            .pop();
        if (spotType === undefined) {
            throw new Error('Selected icon name is not found.');
        }
        this.selectedSpotIcon = icon;
        creationViewMutations.setSelectedSpotTypeToAdd(spotType);
        this.updateStatus('addSpot');
    }

    /**
     * 選択されている編集モード情報を更新
     * ボタンの選択情報を色に反映する
     * @param editMode 新しい編集モード
     */
    private updateStatus(editMode: EditMode): void {
        this.editMode = editMode;
        this.buttonColorMap.forEach((entry) => entry.color = this.defaultColor);
        const index = this.buttonColorMap.findIndex((entry) => entry.mode === editMode);
        this.buttonColorMap[index].color = this.selectedColor;
    }
}
