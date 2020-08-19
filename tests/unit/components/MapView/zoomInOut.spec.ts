import { mapViewMutations } from '@/store';
import { shallowMount } from '@vue/test-utils';
import { GeolocationWrapper } from '@/components/MapView/GeolocationWrapper';
import 'leaflet/dist/leaflet.css';
import { testRawMapData } from '../../../resources/testRawMapData';
import MapView from '@/components/MapView';
import Map from '@/Map/Map';


describe('components/MapView', () => {
    let wrapper: any;

    beforeEach(() => {
        mapViewMutations.setRootMapForTest(testRawMapData);
        GeolocationWrapper.watchPosition = jest.fn();
        const initMapDisplay = jest.fn();
        const watchStoreForDisplayMap = jest.fn();
        wrapper = shallowMount(MapView, {
            attachToDocument: true,
            methods: {
                initMapDisplay,
                watchStoreForDisplayMap,
            },
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('zoomInボタンを押すとzoomLevelが大きくなる', () => {
        const defaultZoomlevel: number = wrapper.vm.defaultZoomLevel;
        wrapper.vm.zoomIn();
        const actualZoomLevel: number = wrapper.vm.map.getZoom();
        expect(actualZoomLevel).toBeGreaterThan(defaultZoomlevel);
    });

    it('zoomOutボタンを押すとzoomLevelが小さくなる', () => {
        const defaultZoomlevel: number = wrapper.vm.defaultZoomLevel;
        wrapper.vm.zoomOut();
        const actualZoomLevel: number = wrapper.vm.map.getZoom();
        expect(actualZoomLevel).toBeLessThan(defaultZoomlevel);
    });
});
