import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils';
import store from '@/store';
import Map from '@/components/Map.vue';
import { VueConstructor } from 'vue';


describe('components/Map.vue:updateFocusedSpot', () => {
    const localVue: VueConstructor<any> = createLocalVue();
    const wrapper: any = shallowMount( Map, {
        localVue,
        store,
        attachToDocument: true,
    });
    it('渡されたLeafletイベントのスポットIDを持つスポットが新しいfocuseSpotとしてstoreに登録される', () => {
        wrapper.vm.updateFocusedSpot({target: {options: {spotId: 1}}});
        expect(store.state.mapView.focusedSpotId).toBe(1);
    });

    it('SpotInfoコンポーネントの表示状態をtrue(表示)になるようにstoreを更新する', () => {
        wrapper.vm.updateFocusedSpot({target: {options: {spotId: 1}}});
        expect(store.state.mapView.spotInfoIsVisible).toBe(true);
    });
});
