import Vuex from 'vuex';
import { SpotForMap } from '@/store/types';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { GeolocationWrapper } from '@/components/Map/GeolocationWrapper';
import Map from '@/components/Map';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MockMapViewGetters } from '../../../resources/MockMapViewGetters';
import { MapViewState } from '@/store/modules/MapViewModule/MapViewState';
import { Module, createStore } from 'vuex-smart-module';


describe('components/Map.vue マーカー切り替えのテスト', () => {
    let wrapper: any;
    // テストデータ
    const testSpots: SpotForMap[] = [
        {
            id: 0,
            name: 'SougouGakusyuPlaza1',
            coordinate: {
                lat: 33.595502,
                lng: 130.218238,
            },
        },
        {
            id: 1,
            name: 'SougouGakusyuPlaza2',
            coordinate: {
                lat: 33.595503,
                lng: 130.218239,
            },
        },
    ];

    beforeEach(() => {
        // storeのモック作成
        const mockModule = new Module({
            state: MapViewState,
            getters: MockMapViewGetters,
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
        wrapper.vm.addMarkersToMap = jest.fn();
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('displaySpotMarkersにspotの配列を渡してMapのspotMarkersに登録', () => {
        wrapper.vm.displaySpotMarkers(testSpots);
        const actualMarkers: L.Marker[] = wrapper.vm.spotMarkers;
        for (let i = 0; i < actualMarkers.length; i++) {
            const testLat: number = testSpots[i].coordinate.lat;
            const testLng: number = testSpots[i].coordinate.lng;
            const actLatLng: L.LatLng = actualMarkers[i].getLatLng();
            // testSpotとactualSpotの座標がlatLng型で一致してるか
            expect(actLatLng).toStrictEqual(L.latLng(testLat, testLng));
        }
    });
});
