import { createLocalVue, mount } from '@vue/test-utils';
import MapDetailCard from '@/components/MapDetailCard/index.vue';
import router from '@/router';
import Vuetify from 'vuetify';


describe('MapDetailCardコンポーネントのテスト', () => {
    let localVue: any;
    let wrapper: any;
    let vuetify: any;
    beforeEach(() => {
        vuetify = new Vuetify();
        localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount( MapDetailCard, {
            localVue,
            vuetify,
            router,
            attachToDocument: true,
        });
    });

    it('closeボタンを押すとポップアップが閉じる', () => {
        wrapper.setData({dialog: true});
        expect(wrapper.vm.dialog).toBe(true);
        wrapper.find('.v-dialog').find('.v-btn#close').trigger('click');
        expect(wrapper.vm.dialog).toBe(false);
    });

    it('openMapボタンを押すと/MainViewに画面遷移する', () => {
        wrapper.setData({dialog: true});
        expect(wrapper.vm.dialog).toBe(true);
        wrapper.find('.v-dialog').find('.v-btn#openMap').trigger('click');
        expect(wrapper.vm.$route.path).toBe('/MainView');
    });
});
