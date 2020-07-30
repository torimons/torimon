import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';
import { EditMode, EventOnMapCreation, SpotType } from '@/store/types';

export class CreationViewState {
    public rootMap: Map = new Map(0, 'New Map', {
        topL: { lat: 33.596643, lng: 130.215516 },
        botR: { lat: 33.594083, lng: 130.220609 },
    });

    public focusedSpot: Spot | undefined = undefined;

    public editMode: EditMode = 'move';

    public selectedSpotTypeToAdd: SpotType = 'general';

    public eventList: EventOnMapCreation[] = [];
}
