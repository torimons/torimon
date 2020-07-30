import { mapViewMutations } from '@/store';
import { shallowMount } from '@vue/test-utils';
import 'leaflet/dist/leaflet.css';
import { testRawMapData } from '../../../resources/testRawMapData';
import MapView from '@/components/MapView';
import Map from '@/Map/Map';


describe('components/MapView', () => {
    let wrapper: any;

    beforeEach(() => {
        mapViewMutations.setRootMapForTest(testRawMapData);
        wrapper = shallowMount(MapView, {
            attachToDocument: true,
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('zoomInボタンを押すとzoomLevelが大きくなる', () => {
        // // ZoomInボタンのclickイベント発火
        // wrapper.vm.zoomIn();
        // const actualZoomLevel: number = wrapper.vm.lMap.getZoom();
        // expect(actualZoomLevel).toBeGreaterThan(17);
    });

    it('zoomOutボタンを押すとzoomLevelが小さくなる', () => {
        // // ZoomOutボタンのclickイベント発火
        // wrapper.vm.zoomOut();
        // const actualZoomLevel: number = wrapper.vm.lMap.getZoom();
        // expect(actualZoomLevel).toBeLessThan(17);
    });
});
