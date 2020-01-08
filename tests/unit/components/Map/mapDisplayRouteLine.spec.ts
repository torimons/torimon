import Vuex from 'vuex';
import { mapViewGetters } from '@/store';
import map from '@/components/Map/index.vue';
import { Coordinate } from '@/store/types';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { GeolocationWrapper } from '@/components/Map/GeolocationWrapper.ts';
import L, { LatLng } from 'leaflet';
import { createStore, Module } from 'vuex-smart-module';
import { MockMapViewGetters } from '../../../resources/MockMapViewGetters';
import { MapViewState } from '@/store/modules/MapViewModule/MapViewState';

describe('mapコンポーネントの経路表示', () => {
    let wrapper: any;
    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuex);
        // inject mock
        const mockModule = new Module({
            state: MapViewState,
            getters: MockMapViewGetters,
        });
        // create mock store
        const mockStore = createStore(mockModule);
        // テスト用データをstoreにセット
        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount( map, {
            store: mockStore,
            localVue,
            attachToDocument: true,
        });
    });

    // expectで直接比較を行うと'_leaflet_id'が異なりテストが落ちるのでそれぞれの'_latLngs'と'_options'を比較するものに変更
    it('displayRouteLinesはgetNodesForNavigationを呼び出し経路を表示する', () => {
        // '_addLayer' of nullのエラー回避のためaddRouteToMapをmock
        wrapper.vm.addRouteToMap = jest.fn();
        // getterが仮作成のためテスト用データはMapViewStateに直接埋め込んでいる物を使用
        const testData: Coordinate[][] = mapViewGetters.getNodesForNavigation([]);
        const expectedRouteLines: L.Polyline[] = testData.map((waypoint: Coordinate[]) => (L.polyline(waypoint, {
            color: '#555555',
            weight: 5,
            opacity: 0.7,
        })));
        wrapper.vm.displayRouteLines(testData);
        const actualRouteLines: L.Polyline[] = wrapper.vm.routeLines;
        // LatLngsに対してのテスト
        const expectedLatlngs: Array<LatLng[] | LatLng[][] | LatLng[][][]>
            = expectedRouteLines.map((expectedRouteLine: L.Polyline) => expectedRouteLine.getLatLngs());
        const actualLatlngs: Array<LatLng[] | LatLng[][] | LatLng[][][]>
            = actualRouteLines.map((actualRouteLine: L.Polyline) => actualRouteLine.getLatLngs());
        expect(actualLatlngs).toStrictEqual(expectedLatlngs);
        // optionsに対してのテスト
        const expectedOptions = expectedRouteLines.map((expectedRouteLine: L.Polyline) => expectedRouteLine.options);
        const actualOptions = actualRouteLines.map((actualRouteLine: L.Polyline) => actualRouteLine.options);
        expect(actualOptions).toStrictEqual(expectedOptions);
    });
});
