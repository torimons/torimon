import Vue from 'vue';
import Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';
import { MapViewModule } from '@/store/modules/MapViewModule';
import { MainCreationViewModule } from './modules/MainCreationViewModule';

Vue.use(Vuex);

export const store = createStore(
    MapViewModule,
);
export const mapViewGetters = MapViewModule.context(store).getters;
export const mapViewMutations = MapViewModule.context(store).mutations;

export const mainCreationViewStore = createStore(
    MainCreationViewModule,
);
export const mainCreationViewGetters = MainCreationViewModule.context(mainCreationViewStore).getters;
export const mainCreationViewMutations = MainCreationViewModule.context(mainCreationViewStore).mutations;
