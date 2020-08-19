import { mapViewMutations } from '@/store';
import { shallowMount } from '@vue/test-utils';
import 'leaflet/dist/leaflet.css';
import { testRawMapData } from '../../../resources/testRawMapData';
import OSMToggleButton from '@/components/OSMToggleButton';
import Map from '@/Map/Map';


describe('components/OSMToggleButton', () => {
    let wrapper: any;

    beforeEach(() => {
        mapViewMutations.setRootMapForTest(testRawMapData);
        wrapper = shallowMount(OSMToggleButton, {
            attachToDocument: true,
        });
    });

    afterEach(() => {
        // Map components already initialized防止
        wrapper.destroy();
    });

    it('displayOsmの変更を検知してON/OFFを切り替える', () => {
        // 初めはTrue
        wrapper.vm.displayOSM = false;
        expect(wrapper.emitted().osmOff).toBeTruthy();
        wrapper.vm.displayOSM = true;
        expect(wrapper.emitted().osmOn).toBeTruthy();
    });
});
