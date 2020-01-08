import Vuex from 'vuex';
import map from '@/components/Map/index.vue';
import { FeatureCollection } from 'geojson';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { MockMapViewGetters } from '../../../resources/MockMapViewGetters';
import { testMapViewState } from '../../../resources/testMapViewState';
import { GeolocationWrapper } from '@/components/Map/GeolocationWrapper';
import { createStore, Module } from 'vuex-smart-module';
import { MapViewState } from '@/store/modules/MapViewModule/MapViewState';
import { SpotForMap, Spot } from '@/store/types';


const expectedGeoJsonObject: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
        {
            properties: {},
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [ 130.21780639886853, 33.59551018989406  ],
                    [ 130.21791100502014, 33.595199637596735 ],
                    [ 130.2181014418602,  33.59524655564143  ],
                    [ 130.21809339523315, 33.59527783432369  ],
                    [ 130.21865129470825, 33.59543869593907  ],
                    [ 130.2185171842575,  33.595715734684546 ],
                    [ 130.21780639886853, 33.59551018989406  ],
                ]],
            },
        },
        {
            properties: {},
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[
                    [ 130.21780639886853, 33.59551018989406  ],
                    [ 130.21791100502014, 33.595199637596735 ],
                    [ 130.2181014418602,  33.59524655564143  ],
                    [ 130.21809339523315, 33.59527783432369  ],
                    [ 130.21865129470825, 33.59543869593907  ],
                    [ 130.2185171842575,  33.595715734684546 ],
                    [ 130.21780639886853, 33.59551018989406  ],
                ]],
            },
        },
    ],
};


describe('mapコンポーネントのポリゴン表示', () => {
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
        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount( map, {
            store: mockStore,
            localVue,
            attachToDocument: true,
        });
    });

    it('storeのgetter(getSpotsForMap)で取得したspotのshape情報をgeoJson形式に変換する', () => {
        const spots: Spot[] | undefined = testMapViewState.maps[0].spots;
        const spotsForMaps: SpotForMap[] = [];
        spots.forEach((spot) => {
            spotsForMaps.push({
                id: spot.id,
                name: spot.name,
                coordinate: spot.coordinate,
                shape: spot.shape,
            });
        });
        const actualGeoJsonFormat =  wrapper.vm.spotShapeToGeoJson(spotsForMaps);
        const expectedGeoJsonFormat = expectedGeoJsonObject;
        expect(actualGeoJsonFormat).toStrictEqual(expectedGeoJsonFormat);
    });

});
