import Vuex from 'vuex';
import { mapViewMutations } from '@/store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { GeolocationWrapper } from '@/components/Map/GeolocationWrapper';
import Map from '@/components/Map/index.vue';
import 'leaflet/dist/leaflet.css';
import { cloneDeep } from 'lodash';
import { MapViewState } from '@/store/modules/MapViewModule/MapViewState';
import { MockMapViewGetters } from '../../../resources/MockMapViewGetters';
import { Module, createStore } from 'vuex-smart-module';
import { testMapViewState } from '../../../resources/testMapViewState';
import { MapViewMutations } from '@/store/modules/MapViewModule/MapViewMutations';

const mapViewStoreTestData: MapViewState = cloneDeep(testMapViewState);

describe('components/Map.vue zoomlevel切り替えのテスト', () => {
    let wrapper: any;

    beforeEach(() => {
        // storeのモック作成
        const mockModule = new Module({
            state: MapViewState,
            getters: MockMapViewGetters,
            mutations: MapViewMutations,
        });
        const mockStore = createStore(mockModule);

        const localVue = createLocalVue();
        localVue.use(Vuex);
        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount(Map, {
            store: mockStore,
            localVue,
            attachToDocument: true,
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('zoomlevelの値によってstateのdisplayLevelを変更する', () => {
        // updateDisplayLevel内部で呼んでいるgetZoom()のモック
        wrapper.vm.map.getZoom = jest.fn().mockReturnValue(18);
        // 閾値(19)未満の場合，displayLevelはdefault
        wrapper.vm.updateDisplayLevel();
        const currentDisplayLevelZoomOut = wrapper.vm.mapViewGetters.displayLevel;
        expect(currentDisplayLevelZoomOut).toBe('default');

        // 閾値(19)以上の場合，displayLevelはdetail
        wrapper.vm.map.getZoom = jest.fn().mockReturnValue(19);
        wrapper.vm.updateDisplayLevel();
        wrapper.vm.mapViewMutations.setDisplayLevel('detail');
        const currentDisplayLevelZoomIn = wrapper.vm.mapViewGetters.displayLevel;
        expect(currentDisplayLevelZoomIn).toBe('detail');
    });
});
