import { Component, Vue, Emit } from 'vue-property-decorator';
import { SpotType } from '@/store/types';
import { creationViewMutations } from '@/store';

@Component
export default class EditorToolBar extends Vue {
    // 色は仮
    private selectedColor: string = 'indigo darken-4';
    private defaultColor: string = 'light-blue lighten-1';
    private buttons: Array<{ action: Action, icon: string, color: string }> = [
        {action: 'move',    icon: 'pan_tool', color: this.selectedColor},
        {action: 'zoomIn',  icon: 'zoom_in',  color: this.defaultColor},
        {action: 'zoomOut', icon: 'zoom_out', color: this.defaultColor},
    ];
    private spotButtonColor: string = this.defaultColor;
    private spotIconMaps: Array<{iconName: string, spotType: SpotType}> = [
        { iconName: 'place',        spotType: 'default' },
        { iconName: 'add_location', spotType: 'withDetailMap' },
        { iconName: 'wc',           spotType: 'restroom' },
    ];
    private selectedMode: Action = 'move';
    private selectedSpotIcon: string = '';
    private fabVisible: boolean = false;

    /**
     * スポットボタンがクリックされた時にCreationMapViewにスポットの
     * SpotTypeをEmitするメソッド
     * @param selectedSpotIcon クリックで選ばれたスポットのSpotType
     */
    @Emit('clickSpot')
    private emitSpotType(selectedSpotIconName: string): SpotType {
        const spotType = this.spotIconMaps.find((map) => map.iconName === selectedSpotIconName);
        if (spotType === undefined) {
            throw new Error('Selected icon name is not found in icon name maps.');
        }
        creationViewMutations.setSelectedSpotTypeToAdd(spotType.spotType);
        return spotType.spotType;
    }

    /**
     * ツールバーの各ボタンがクリックされた場合に実行される
     * CreationMapViewに選択されたボタンの種類をemitする
     * また現在選択されているボタンをモードとして保持する
     * @param action 選択されたボタンの種類
     */
    private onButtonClick(action: Action): void {
        if (action === 'zoomIn') {
            creationViewMutations.addEvent('zoomIn');
            return;
        }
        if (action === 'zoomOut') {
            creationViewMutations.addEvent('zoomOut');
            return;
        }
        this.switchMode(action);
        if (action === 'spot') {
            this.emitSpotType(this.selectedSpotIcon);
            creationViewMutations.setEditMode('addSpot');
        }
        if (action === 'move') {
            creationViewMutations.setEditMode('move');
        }
    }

    /**
     * 選択されているボタンの情報をモードとしてメンバ変数に反映する
     * ボタンの選択情報を色に反映する
     */
    private switchMode(action: Action): void {
        this.selectedMode = action;
        this.spotButtonColor = this.defaultColor;
        this.buttons.forEach((b) => b.color = this.defaultColor);
        if (action === 'spot') {
            this.spotButtonColor = this.selectedColor;
        } else {
            const index = this.buttons.findIndex((b) => b.action === action);
            this.buttons[index].color = this.selectedColor;
        }
    }

    /**
     * 選択されているスポットアイコンがどのスポットかをセットする
     */
    private setSelectedSpotIcon(icon: string): void {
        this.selectedSpotIcon = icon;
    }

}

export type Action = 'move' | 'zoomIn' | 'zoomOut' | 'select' | 'spot';
