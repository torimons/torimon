import Vue from 'vue';
import Vuex from 'vuex';
import { MapViewModule } from '@/store/modules/MapViewModule';

interface StoreType {
    mapView: MapViewModule;
}
Vue.use(Vuex);

export default new Vuex.Store<StoreType>({});
