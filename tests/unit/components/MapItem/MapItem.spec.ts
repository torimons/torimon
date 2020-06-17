import { createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import MapItem from '@/components/MapItem/index.vue';

describe('MapItemコンポーネントのテスト', () => {
    let localVue: any;
    let wrapper: any;
    let vuetify: any;
    beforeEach(() => {
        vuetify = new Vuetify();
        localVue = createLocalVue();
        localVue.use(Vuex);
        localVue.use(Vuetify);
        wrapper = mount( MapItem, {
            localVue,
            vuetify,
            attachToDocument: true,
            propsData: {
                mapName: 'kyudai',
                description: 'description of kyudai',
            },
        });
    });

    it('親スポットがない場合，スポットの名前と距離が表示される', () => {
        expect(wrapper.find('.v-list-item__title').text()).toBe('kyudai');
        expect(wrapper.find('.v-list-item__subtitle').text()).toBe('description of kyudai');
    });
});
