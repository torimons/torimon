import Vue from 'vue';
import Vuex from 'vuex';
import { MapViewModule } from '@/store/modules/MapViewModule';
import { MapViewState } from './types';

export interface StoreType {
    mapView: MapViewState;
}
Vue.use(Vuex);

export default new Vuex.Store<StoreType>({});
