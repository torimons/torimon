import { createLocalVue, mount } from '@vue/test-utils';
import router from '@/router';
import Vuetify from 'vuetify';
import MapSelection from '@/views/MapSelection.vue';

describe('地図選択画面のテスト', () => {
    let localVue: any;
    let wrapper: any;
    let vuetify: any;
    beforeEach(() => {
        vuetify = new Vuetify();
        localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount( MapSelection, {
            localVue,
            vuetify,
            router,
            attachToDocument: true,
        });
    });

    it('Homeボタンを押すとホーム画面に遷移する', () => {
        wrapper.find('.v-btn.home').trigger('click');
        expect(wrapper.vm.$route.path).toBe('/');
    });

});
