import Vuex from 'vuex';
import map from '@/components/Map/index.vue';
import { Module, createStore } from 'vuex-smart-module';
import { MapViewState } from '@/store/modules/MapViewModule/MapViewState';
import { MapViewGetters } from '@/store/modules/MapViewModule/MapViewGetters';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { GeolocationWrapper } from '@/components/Map/GeolocationWrapper.ts';
import { Map, DisplayLevelType } from '@/store/types';
import { testMaps } from '../../../resources/testMaps';

describe('components/map/index.ts/ selectMapToDisplay()', () => {
    const rootMapId: number = 0;
    const localVue = createLocalVue();
    localVue.use(Vuex);
    let wrapper: any;
    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('表示ズームレベルがdefaultの場合，rootMapIdを返す', () => {
        class MockGetters extends MapViewGetters {
            // override method for mock
            get maps(): Map[] {
                return testMaps;
            }
            get displayLevel(): DisplayLevelType {
                return 'default';
            }
            get idOfCenterSpotInRootMap(): number | null {
                return 0;
            }
        }
        // inject mock
        const mockModule = new Module({
            state: MapViewState,
            getters: MockGetters,
        });
        // create mock store
        const mockStore = createStore(mockModule);

        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount( map, {
            store: mockStore,
            localVue,
            attachToDocument: true,
        });
        wrapper.vm.addRouteToMap = jest.fn();
        const actualMapId = wrapper.vm.selectMapToDisplay();
        expect(actualMapId).toBe(rootMapId);
    });

    it('表示レベルがdetailで，ルートマップ中央にスポットがない場合，rootMapのIDを返す', () => {
        class MockGetters extends MapViewGetters {
            // override method for mock
            get maps(): Map[] {
                return testMaps;
            }
            get displayLevel(): DisplayLevelType {
                return 'detail';
            }
            get idOfCenterSpotInRootMap(): number | null {
                return null;
            }
        }
        // inject mock
        const mockModule = new Module({
            state: MapViewState,
            getters: MockGetters,
        });
        // create mock store
        const mockStore = createStore(mockModule);

        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount( map, {
            store: mockStore,
            localVue,
            attachToDocument: true,
        });
        wrapper.vm.addRouteToMap = jest.fn();
        const actualMapId = wrapper.vm.selectMapToDisplay();
        expect(actualMapId).toBe(rootMapId);
    });

    it('表示レベルがdetailで，centerSpotInRootMapがdetailMapを持っていない時，そのdetailMapIdを返す', () => {
        class MockGetters extends MapViewGetters {
            // override method for mock
            get maps(): Map[] {
                return testMaps;
            }
            get displayLevel(): DisplayLevelType {
                return 'detail';
            }
            get idOfCenterSpotInRootMap(): number | null {
                return 1;
            }
        }
        // inject mock
        const mockModule = new Module({
            state: MapViewState,
            getters: MockGetters,
        });
        // create mock store
        const mockStore = createStore(mockModule);

        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount( map, {
            store: mockStore,
            localVue,
            attachToDocument: true,
        });
        wrapper.vm.addRouteToMap = jest.fn();
        const actualMapId = wrapper.vm.selectMapToDisplay();
        expect(actualMapId).toBe(rootMapId);
    });

    it('表示レベルがdetailで，centerSpotInRootMapがdetailMapを持っており，初めてそのMapが表示される場合，そのdetailMapの中から一つ目のMapのIDを返す', () => {
        class MockGetters extends MapViewGetters {
            // override method for mock
            get maps(): Map[] {
                return testMaps;
            }
            get displayLevel(): DisplayLevelType {
                return 'detail';
            }
            get idOfCenterSpotInRootMap(): number | null {
                return 0;
            }
        }
        // inject mock
        const mockModule = new Module({
            state: MapViewState,
            getters: MockGetters,
        });
        // create mock store
        const mockStore = createStore(mockModule);

        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount( map, {
            store: mockStore,
            localVue,
            attachToDocument: true,
        });
        wrapper.vm.addRouteToMap = jest.fn();
        const expectedMapId: number = 1;
        const actualMapId = wrapper.vm.selectMapToDisplay();
        expect(actualMapId).toBe(expectedMapId);
    });

    it('表示レベルがdetailで，centerSpotInRootMapがdetailMapを持っており，過去に表示されたdetailMapがある場合，そのdetailMapのIdを返す', () => {
        class MockGetters extends MapViewGetters {
            // override method for mock
            get maps(): Map[] {
                return testMaps;
            }
            get displayLevel(): DisplayLevelType {
                return 'detail';
            }
            get idOfCenterSpotInRootMap(): number | null {
                return 2;
            }
        }
        // inject mock
        const mockModule = new Module({
            state: MapViewState,
            getters: MockGetters,
        });
        // create mock store
        const mockStore = createStore(mockModule);

        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount( map, {
            store: mockStore,
            localVue,
            attachToDocument: true,
        });
        wrapper.vm.addRouteToMap = jest.fn();
        const expectedMapId: number = 3;
        const actualMapId = wrapper.vm.selectMapToDisplay();
        expect(actualMapId).toBe(expectedMapId);
    });
});
