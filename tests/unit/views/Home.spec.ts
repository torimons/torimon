import { createLocalVue, mount } from '@vue/test-utils';
import router from '@/router';
import Vuetify from 'vuetify';
import Home from '@/views/home.vue';

describe('ホーム画面のテスト', () => {
    let localVue: any;
    let wrapper: any;
    let vuetify: any;
    beforeEach(() => {
        vuetify = new Vuetify();
        localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount( Home, {
            localVue,
            vuetify,
            router,
            attachToDocument: true,
        });
    });

    it('Let\'s try!ボタンを押すと地図選択画面に遷移する', () => {
        wrapper.find('.v-btn.use').trigger('click');
        expect(wrapper.vm.$route.path).toBe('/map-select');
    });

});
