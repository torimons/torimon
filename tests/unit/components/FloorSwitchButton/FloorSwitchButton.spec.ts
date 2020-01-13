import Vuex from 'vuex';
import floor from '@/components/FloorSwitchButton/index.vue';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import { GeolocationWrapper } from '@/components/Map/GeolocationWrapper';
import FloorSwitchButton from '@/components/FloorSwitchButton/index.vue';
import 'leaflet/dist/leaflet.css';
import Vuetify from 'vuetify';
import { createStore, Module } from 'vuex-smart-module';
import { MockMapViewGetters } from '../../../resources/MockMapViewGetters';
import { MapViewState } from '@/store/modules/MapViewModule/MapViewState';
import { MapViewMutations } from '@/store/modules/MapViewModule/MapViewMutations';
import { MapViewGetters } from '@/store/modules/MapViewModule/MapViewGetters';


describe('components/FloorSwitchButton.vue 階層ボタンのテスト', () => {
    let wrapper: any;
    let vuetify: any;

    beforeEach(() => {
        // vuetify = new Vuetify();
        // localVue.use(Vuetify);
        const localVue = createLocalVue();
        localVue.use(Vuex);
        // inject mock
        const mockModule = new Module({
            state: MapViewState,
            getters: MockMapViewGetters,
            mutations: MapViewMutations,
        });
        // create mock store
        const mockStore = createStore(mockModule);
        GeolocationWrapper.watchPosition = jest.fn();
        wrapper = shallowMount( floor, {
            store: mockStore,
            localVue,
            // vuetify,
            attachToDocument: true,
        });
        console.log(wrapper);
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('updateLastViewedDetailMapIdOnClickでlastViewedDetailMapIdを更新する', () => {
        // 中心付近にスポットが存在しない場合
        // ボタンが表示されないため実際に実行される予定はないがテスト
        wrapper.vm.mapViewMutations.setNonExistentOfCenterSpotInRootMap();
        wrapper.vm.updateLastViewedDetailMapIdOnClick('1F');
        const actualLastViewedDetailMapIdWithNoSpot: number | null =
            wrapper.vm.mapViewGetters.getLastViewedDetailMapId({
                parentMapId: 0,
                spotId: 0,
            });
        expect(actualLastViewedDetailMapIdWithNoSpot).toBe(null);

        // 中心付近に詳細マップ持ちスポットがある場合
        wrapper.vm.mapViewMutations.setIdOfCenterSpotInRootMap(0);
        const floorName: string = '2F';
        wrapper.vm.updateLastViewedDetailMapIdOnClick(floorName);
        const expectedLastViewedDetailMapId: number = 2;
        const actualLastViewedDetailMapId: number | null =
            wrapper.vm.mapViewGetters.getLastViewedDetailMapId({
                parentMapId: 0,
                spotId: 0,
            });
        expect(actualLastViewedDetailMapId).toBe(expectedLastViewedDetailMapId);
    });

    it('中心付近のスポットの切り替わりに合わせて階層ボタンの内容を切り替える', () => {
        // 中心付近にrootMapの詳細マップ持ちスポットが存在する場合．
        // まだ一度も参照されていないスポットの場合，初期階が選択された状態となる．
        wrapper.vm.mapViewMutations.setIdOfCenterSpotInRootMap(0);
        expect(wrapper.vm.floorNames).toEqual(['2F', '1F']);
        expect(wrapper.vm.floorMapIds).toEqual([2, 1]);
        expect(wrapper.vm.selectedFloorButtonIndex).toBe(1);
        // 中心付近にrootMapのスポットが存在するが，詳細マップを持たない場合．
        wrapper.vm.mapViewMutations.setIdOfCenterSpotInRootMap(1);
        expect(wrapper.vm.floorNames).toEqual([]);
        expect(wrapper.vm.floorMapIds).toEqual([]);
        expect(wrapper.vm.selectedFloorButtonIndex).toBe(undefined);
        // 一度参照したスポットを再度参照する場合．
        // 階層ボタンは最後に参照された階層が選択された状態となる．2階が参照された状態にしてテスト
        const payload = {
            detailMapId: 2,
            parentSpot: {
                parentMapId: 0,
                spotId: 0,
            },
        };
        wrapper.vm.mapViewMutations.setLastViewedDetailMapId(payload);
        wrapper.vm.mapViewMutations.setIdOfCenterSpotInRootMap(0);
        expect(wrapper.vm.floorNames).toEqual(['2F', '1F']);
        expect(wrapper.vm.floorMapIds).toEqual([2, 1]);
        expect(wrapper.vm.selectedFloorButtonIndex).toBe(0);

        // 中心付近にrootMapのスポットが存在しない場合．
        wrapper.vm.mapViewMutations.setNonExistentOfCenterSpotInRootMap();
        expect(wrapper.vm.floorNames).toEqual([]);
        expect(wrapper.vm.floorMapIds).toEqual([]);
        expect(wrapper.vm.selectedFloorButtonIndex).toBe(undefined);
    });

    it('displayLevelに合わせて階層ボタンの表示/非表示を切り替える', () => {
        // displayLevelの初期値はdefaultであるため，先にdetailに切り替えている．
        // displayLevelがdetailのとき
        wrapper.vm.mapViewMutations.setDisplayLevel('detail');
        expect(wrapper.vm.isVisible).toBe(true);
        // displayLevelがdefaultのとき
        wrapper.vm.mapViewMutations.setDisplayLevel('default');
        expect(wrapper.vm.isVisible).toBe(false);
    });

    // it('階層ボタンがhtml上に表示されているかをチェック', () => {
    //     // 初期状態では表示されていない
    //     expect(wrapper.find('.v-btn').exists()).toBe(false);
    //     // 詳細マップレベルかつ，rootMapに属するスポットが中心に近いとき表示される
    //     wrapper.vm.mapViewMutations.setDisplayLevel('detail');
    //     wrapper.vm.mapViewMutations.setIdOfCenterSpotInRootMap(0);
    //     expect(wrapper.find('.v-btn').exists()).toBe(true);
    // });

});
