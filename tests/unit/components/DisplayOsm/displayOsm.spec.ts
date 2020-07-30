import { mapViewMutations } from '@/store';
import { shallowMount } from '@vue/test-utils';
import 'leaflet/dist/leaflet.css';
import { testRawMapData } from '../../../resources/testRawMapData';
import DisplayOSM from '@/components/DisplayOSM';
import Map from '@/Map/Map';


describe('components/DisplayOsm', () => {
    let wrapper: any;

    beforeEach(() => {
        mapViewMutations.setRootMapForTest(testRawMapData);
        wrapper = shallowMount(DisplayOSM, {
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
