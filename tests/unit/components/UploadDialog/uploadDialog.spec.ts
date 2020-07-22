import { createLocalVue, mount } from '@vue/test-utils';
import router from '@/router';
import Vuetify from 'vuetify';
import UploadDialog from '@/components/UploadDialog/index.vue';
import Map from '@/Map/Map.ts';

describe('UploadDialogのテスト', () => {
    let localVue: any;
    let wrapper: any;
    let vuetify: any;
    const testMap: Map = new Map(
        0,
        'testMap',
        {topL: {lat: 0, lng: 0}, botR: {lat: 0, lng: 0}},
        undefined,
        'test description',
    );

    beforeEach(() => {
        vuetify = new Vuetify();
        localVue = createLocalVue();
        localVue.use(Vuetify);
        wrapper = mount(UploadDialog, {
            localVue,
            vuetify,
            router,
            attachToDocument: true,
            propsData: {
                map: testMap,
            },
        });
    });

    it('編集に戻るボタンを押すとcloseDialogイベントが発火する', () => {
        // wrapper.find('.v-btn.openMap').trigger('click');
    });

    it.skip('アップロードボタンを押すと...', () => {
        // TODO:
        // サーバーとの昨日作成後に実装
        // wrapper.find('.v-btn.openMap').trigger('click');
    });
});
