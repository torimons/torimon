import { creationViewGetters, creationViewMutations } from '@/store';
import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';
import { EditMode, SpotType, EventOnMapCreation } from '@/store/types';

describe('store/modules/CreationViewModule', () => {
    it('mutationでセットされたrootMapがgetterで取得される', () => {
        const testMap: Map = new Map(0, 'testMap', {topL: {lat: 0, lng: 0}, botR: {lat: 0, lng: 0}});
        creationViewMutations.setRootMap(testMap);
        const actualRootMap: Map = creationViewGetters.rootMap;
        expect(actualRootMap).toEqual(testMap);
    });

    it('mutationでセットされたfocusedSpotがgetterで取得される', () => {
        const testSpot: Spot = new Spot(0, 'testSpot', { lat: 0, lng: 0 });
        creationViewMutations.setFocusedSpot(testSpot);
        const actualFocusedSpot: Spot | undefined = creationViewGetters.focusedSpot;
        expect(actualFocusedSpot).toEqual(testSpot);
    });

    it('mutationでセットされたeditModeがgetterで取得される', () => {
        const moveMode: EditMode = 'move';
        creationViewMutations.setEditMode(moveMode);
        const actualEditMode: EditMode = creationViewGetters.editMode;
        expect(actualEditMode).toEqual(moveMode);
    });

    it('mutationでセットされたselectedSpotTypeToAddがgetterで取得される', () => {
        const generalSpot: SpotType = 'general';
        creationViewMutations.setSelectedSpotTypeToAdd(generalSpot);
        const actualSelectedSpotType: SpotType = creationViewGetters.selectedSpotTypeToAdd;
        expect(actualSelectedSpotType).toEqual(generalSpot);
    });

    it('mutationで追加されたeventがgetterで取得される', () => {
        const zoomInEvent: EventOnMapCreation = 'zoomIn';
        creationViewMutations.addEvent(zoomInEvent);
        const actualEventList: EventOnMapCreation[] = creationViewGetters.eventList;
        expect(actualEventList).toEqual([zoomInEvent]);
    });
});
