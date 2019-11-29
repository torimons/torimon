import { mapViewStore } from '@/store/modules/MapViewModule';
import { MapViewState, SpotForMap, Coordinate } from '@/store/types';
import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Map from '@/components/Map.vue';
import 'leaflet/dist/leaflet.css';
import L, { map } from 'leaflet';


const MapViewStoreTestData: MapViewState = {
    // マップのテストデータ
    maps: [
        {
            id: 0,
            name: 'Kyudai',
            spots: [
                {
                    id: 0,
                    name: 'SougouGakusyuPlaza',
                    coordinate: {
                        lat: 33.595502,
                        lng: 130.218238,
                    },
                    floor: 1,
                    shape: {
                        type: 'Polygon',
                        coordinates: [[
                            [
                                130.21780639886853,
                                33.59551018989406,
                            ],
                            [
                                130.21791100502014,
                                33.595199637596735,
                            ],
                            [
                                130.2181014418602,
                                33.59524655564143,
                            ],
                            [
                                130.21809339523315,
                                33.59527783432369,
                            ],
                            [
                                130.21865129470825,
                                33.59543869593907,
                            ],
                            [
                                130.2185171842575,
                                33.595715734684546,
                            ],
                            [
                                130.21780639886853,
                                33.59551018989406,
                            ],
                        ] ],
                    },
                    gateNodeIds: [],
                    detailMapId: 1,
                },
            ],
            bounds: {
                topL: {
                    lat: 33.596643,
                    lng: 130.215516,
                },
                botR: {
                    lat: 33.594083,
                    lng: 130.220609,
                },
            },

        },
        {
            id: 1,
            name: 'SougouGakusyuPlaza',
            spots: [
                {
                    id: 0,
                    name: '101',
                    coordinate: {
                        lat: 33.5954558,
                        lng: 130.2179447,
                    },
                    shape: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [130.217816, 33.595257],
                                [130.217783, 33.595517],
                                [130.217915, 33.595558],
                                [130.217942, 33.595495],
                            ],
                        ],
                    },
                    floor: 1,
                    gateNodeIds: [],
                },
            ],
            bounds: {
                topL: {
                    lat: 33.5954678,
                    lng: 130.2177802,
                },
                botR: {
                    lat: 33.5954678,
                    lng: 130.2177802,
                },
            },
        },
    ],
    rootMapId: 0,
    focusedMapId: 0,
    focusedSpotId: 0,
    spotInfoIsVisible: false,
};


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
            floor: 1,
        },
        {
            id: 1,
            name: 'SougouGakusyuPlaza2',
            coordinate: {
                lat: 33.595503,
                lng: 130.218239,
            },
            floor: 2,
        },
    ];

    beforeEach(() => {
        mapViewStore.setMapViewState(MapViewStoreTestData);
        wrapper = shallowMount(Map, {
            attachToDocument: true,
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('switchMarkersがreplaceMarkersにMapViewStateから取得した情報を渡す', () => {
        /*
        switchMarkersはstoreのfocusedMapIdをみているので，
        getSpotsForMapにも同じ値(今回は初期値0)を与える.
        複数のマップに対してテストする場合，
        mapViewStore.setFocusedSpotなどで強制的にfocusedMapIdを変更する必要がある
        */
        const mapId = MapViewStoreTestData.focusedMapId;
        const expectedSpots: SpotForMap[] = mapViewStore.getSpotsForMap(mapId);
        const actualSpots: SpotForMap[] = [];
        // replaceMarkersのモック
        wrapper.vm.replaceMarkers = jest.fn((spots: SpotForMap[]) => {
            spots.forEach((spot) => actualSpots.push(spot));
        });

        wrapper.vm.switchMarkers();
        expect(actualSpots).toStrictEqual(expectedSpots);
    });

    it('replaceMarkersに空の配列を渡してMap.vueのmarkersが空になる', () => {
        // コールバック関数は本テストに関係ないため空の関数を渡している
        wrapper.vm.replaceMarkers([], () => {
            // do nothing
        });
        const actualMarkers = wrapper.vm.markers;
        expect(actualMarkers).toStrictEqual([]);
    });

    it('replaceMarkersに配列を渡してMap.vueのmarkersに登録される', () => {
        // コールバック関数は本テストに関係ないため空の関数を渡している
        wrapper.vm.replaceMarkers(testSpots, () => {
            // do nothing
        });
        const actualMarkers = wrapper.vm.markers;
        for (let i = 0; i < actualMarkers.length; i++) {
            const testLat: number = testSpots[i].coordinate.lat;
            const testLng: number = testSpots[i].coordinate.lng;
            const actLatLng = actualMarkers[i].getLatLng();
            // testSpotとactualSpotの座標がlatLng型で一致してるか
            expect(actLatLng).toStrictEqual(L.latLng(testLat, testLng));
        }
    });

    it('replaceMarkersに渡したコールバック関数が呼び出されいるか確認', () => {
        let functionCalled: boolean;
        wrapper.vm.replaceMarkers(testSpots, () => {
            functionCalled = true;
        });
        const actualMarkers = wrapper.vm.markers;
        for (const markers of actualMarkers) {
            functionCalled = false;
            // マーカーのクリック発火
            markers.fire('click');
            expect(functionCalled).toBe(true);
        }
    });
});
