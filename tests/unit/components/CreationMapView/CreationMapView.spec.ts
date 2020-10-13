import { creationViewGetters, creationViewMutations } from '@/store';
import { shallowMount } from '@vue/test-utils';
import 'leaflet/dist/leaflet.css';
import CreationMapView from '@/components/CreationMapView';
import Map from '@/Map/Map';
import { EventOnMapCreation } from '@/store/types';


describe('components/CreationMapView', () => {
    let wrapper: any;

    beforeEach(() => {
        wrapper = shallowMount(CreationMapView, {
            attachToDocument: true,
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('fireEventメソッドにて引数に応じて各イベントが実行される', () => {
        const mockedZoomInFn = jest.fn();
        wrapper.vm.zoomIn = mockedZoomInFn;
        const zoomInEvent: EventOnMapCreation = 'zoomIn';
        wrapper.vm.fireEvent(zoomInEvent);
        expect(mockedZoomInFn.mock.calls.length).toBe(1);

        const mockedZoomOutFn = jest.fn();
        wrapper.vm.zoomOut = mockedZoomOutFn;
        const zoomOutEvent: EventOnMapCreation = 'zoomOut';
        wrapper.vm.fireEvent(zoomOutEvent);
        expect(mockedZoomOutFn.mock.calls.length).toBe(1);
    });

    it('onMapClickにてeditModeによって各処理が実行される', () => {
        const mockedAddSpotFn = jest.fn((e: any = null) => undefined);
        wrapper.vm.addSpot = mockedAddSpotFn;
        creationViewMutations.setEditMode('move');
        wrapper.vm.onMapClick(null);
        // moveでは何も実行されない
        expect(mockedAddSpotFn.mock.calls.length).toBe(0);

        creationViewMutations.setEditMode('addSpot');
        wrapper.vm.onMapClick(null);
        expect(mockedAddSpotFn.mock.calls.length).toBe(1);
    });

    it('addSpotにより新しいスポットがmapに追加される', () => {
        const map: Map = wrapper.vm.rootMap;
        expect(map.getSpots().length).toBe(0);
        const e = { latlng: { lat: 0, lng: 0 } };
        wrapper.vm.addSpot(e);
        expect(map.getSpots().length).toBe(1);
    });
});
