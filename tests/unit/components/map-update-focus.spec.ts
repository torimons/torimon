import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils';
import store from '@/store';
import Map from '@/components/Map.vue';
import { VueConstructor } from 'vue';


describe('components/Map.vue:updateFocusedSpot', () => {
    it('渡されたLeafletイベントのスポットIDを持つスポットが新しいfocuseSpotとしてstoreに登録される', () => {
        const localVue: VueConstructor<any> = createLocalVue();
        const wrapper: Wrapper<Map> = shallowMount( Map, {
            localVue,
            store,
            attachToDocument: true,
        });
    });

    it('SpotInfoコンポーネントの表示状態をtrue(表示)になるようにstoreを更新する', () => {
    });
});
