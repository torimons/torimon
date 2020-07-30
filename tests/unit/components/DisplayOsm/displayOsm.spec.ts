import { mapViewMutations } from '@/store';
import { shallowMount } from '@vue/test-utils';
import 'leaflet/dist/leaflet.css';
import { testRawMapData } from '../../../resources/testRawMapData';
import DisplayOsm from '@/components/Displayosm';
import Map from '@/Map/Map';


describe('components/DisplayOsm', () => {
    let wrapper: any;

    beforeEach(() => {
        mapViewMutations.setRootMapForTest(testRawMapData);
        wrapper = shallowMount(DisplayOsm, {
            attachToDocument: true,
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('displayOsmをwatchしてonDisplayOsmChangeを呼び出す', () => {
        
    });

});