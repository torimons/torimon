import { shallowMount } from '@vue/test-utils';
import MapList from '@/components/MapList/index.vue';

describe('MapListコンポーネントのテスト', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallowMount(MapList, {
            attachToDocument: true,
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it.skip('現状MapListはEmitの作業しか行っておらずEmitのテストはMapSearchにて行っている為,テストはありません', () => {
        // 機能追加によりテストが発生する可能性があり
    });
});
