import { mapViewMutations } from '@/store';
import { shallowMount } from '@vue/test-utils';
import 'leaflet/dist/leaflet.css';
import { testRawMapData } from '../../../resources/testRawMapData';
import EditorToolBar from '@/components/EditorToolBar';
import CreationMapView from '@/components/CreationMapView';
import Map from '@/Map/Map';
import { Coordinate, SpotType, Shape, Bounds } from '@/store/types';


describe('components/CreationMapView', () => {
    let wrapper: any;

    beforeEach(() => {
        mapViewMutations.setRootMapForTest(testRawMapData);
        wrapper = shallowMount(CreationMapView, {
            attachToDocument: true,
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('setAddSpotMethodOnMapClickによってonMapClickにaddSpot関数が代入される', () => {
        const mockedAddSpot = jest.fn();
        wrapper.vm.addSpot = mockedAddSpot;
        wrapper.vm.setAddSpotMethodOnMapClick('default');
        wrapper.vm.onMapClick();
        expect(mockedAddSpot.mock.calls.length).toBe(1);
    });

    it('setAddSpotMethodOnMapClickに渡した引数がspotTypeToAddNextフィールドにセットされる', () => {
        wrapper.vm.setAddSpotMethodOnMapClick('restroom');
        expect(wrapper.vm.spotTypeToAddNext).toBe('restroom');
    });

    it('addSpotにより新しいスポットがmapに追加される', () => {
        const map: Map = wrapper.vm.map;
        expect(map.getSpots().length).toBe(0);
        const e = { latlng: { lat: 0, lng: 0 } };
        wrapper.vm.addSpot(e);
        expect(map.getSpots().length).toBe(1);
    });

    it('zoomInによってzoomLevelが大きくなる', () => {
        // ZoomInボタンのclickイベント発火
        wrapper.find(EditorToolBar).vm.$emit('clickZoomIn');
        const actualZoomLevel: number = wrapper.vm.lMap.getZoom();
        expect(actualZoomLevel).toBeGreaterThan(17);
    });

    it('zoomOutによってzoomLevelが小さくなる', () => {
        // ZoomOutボタンのclickイベント発火
        wrapper.find(EditorToolBar).vm.$emit('clickZoomOut');
        const actualZoomLevel: number = wrapper.vm.lMap.getZoom();
        expect(actualZoomLevel).toBeLessThan(17);
    });

    it('リセットボタンによってzoomLevelとBoundsが初期値に戻る', () => {
        // Boundsは最初に期待値取得->適当に移動->リセットボタンの発火->発火後のBoundsを取得
        // という手順でテストする．
        const expectBounds: Bounds = wrapper.vm.lMap.getBounds();
        // 適当に移動を行う
        wrapper.vm.map.fire('move');
        // リセットボタンのclickイベント発火
        wrapper.find(EditorToolBar).vm.$emit('clickReset');
        const actualZoomLevel: number = wrapper.vm.lMap.getZoom();
        expect(actualZoomLevel).toBe(17);
        // リセット後のBoundsを取得
        const actualBounds: Bounds = wrapper.vm.lMap.getBounds();
        expect(actualBounds).toEqual(expectBounds);

    });
});
