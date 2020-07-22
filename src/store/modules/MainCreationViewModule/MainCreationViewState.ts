import Map from '@/Map/Map.ts';
import Spot from '@/Spot/Spot.ts';

export class MainCreationViewState {
    public rootMap: Map = new Map(0, 'New Map', {topL: {lat: 0, lng: 0}, botR: {lat: 0, lng: 0}});

    public focusedSpot: Spot | undefined = undefined;

}
