import { creationViewGetters, creationViewMutations } from '@/store';
import { shallowMount } from '@vue/test-utils';
import 'leaflet/dist/leaflet.css';
import EditorToolBar from '@/components/EditorToolBar';
import { EditMode, spotIconNames } from '@/store/types';


describe('components/EditorToolVar', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallowMount(EditorToolBar, {
            attachToDocument: true,
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('VuexのeditModeの値とEditorToolBarのeditModeが同期している', () => {
        const initialEditMode: EditMode = wrapper.vm.editMode;
        expect(initialEditMode).toBe('move');

        creationViewMutations.setEditMode('addSpot');
        const acutualUpdatedEditMode: EditMode = wrapper.vm.editMode;
        expect(acutualUpdatedEditMode).toBe('addSpot');

        wrapper.vm.editMode = 'move';
        expect(creationViewGetters.editMode).toBe('move');
    });

    it('getButtonColorがボタンの色を取得できる', () => {
        const selectedColor: string = wrapper.vm.selectedColor;
        const defaultColor: string = wrapper.vm.defaultColor;
        const actualMoveButtonColor: string = wrapper.vm.getButtonColor('move');
        expect(actualMoveButtonColor).toBe(selectedColor);
        const actualAddSpotButtonColor: string = wrapper.vm.getButtonColor('addSpot');
        expect(actualAddSpotButtonColor).toBe(defaultColor);
    });

    it('onCLickSpotAddButtonによってselectedSpotIconとvuexのselectedSpotTypeToAddが更新され，updateStatusが呼び出される', () => {
        const mockedFn = jest.fn((editMode: EditMode) => undefined);
        wrapper.vm.updateStatus = mockedFn;
        wrapper.vm.onClickSpotAddButton(spotIconNames.restroom);

        expect(wrapper.vm.selectedSpotIcon).toBe(spotIconNames.restroom);
        expect(creationViewGetters.selectedSpotTypeToAdd).toBe('restroom');
        expect(mockedFn.mock.calls.length).toBe(1);
    });

    it('updateStatusに"addSpot"アクションが渡された場合にSpotボタンの色を表すフィールドのみがselectedColorになる', () => {
        const selectedColor: string = wrapper.vm.selectedColor;
        const defaultColor: string = wrapper.vm.defaultColor;

        wrapper.vm.updateStatus('addSpot');
        const acutualButtonColorMap: Array<{ mode: EditMode, color: string }> = wrapper.vm.buttonColorMap;
        const acutualColorsWithoutSpot = acutualButtonColorMap
            .filter((entry) => entry.mode !== 'addSpot')
            .map((entry) => entry.color);
        acutualColorsWithoutSpot.forEach((acutualColor) => {
            expect(acutualColor).toBe(defaultColor);
        });
        const actualSpotButtonColor = acutualButtonColorMap
            .filter((entry) => entry.mode === 'addSpot')
            .map((entry) => entry.color);
        actualSpotButtonColor.forEach((acutualColor) => {
            expect(acutualColor).toBe(selectedColor);
        });
        expect(wrapper.vm.editMode).toBe('addSpot');
    });

});
