import Vue from 'vue';
import Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';
import { MapViewModule } from '@/store/modules/MapViewModule';
import { CreationViewModule } from './modules/MainCreationViewModule';

Vue.use(Vuex);

export const store = createStore(
    MapViewModule,
);
export const mapViewGetters = MapViewModule.context(store).getters;
export const mapViewMutations = MapViewModule.context(store).mutations;

export const creationViewStore = createStore(
    CreationViewModule,
);
export const creationViewGetters = CreationViewModule.context(creationViewStore).getters;
export const creationViewMutations = CreationViewModule.context(creationViewStore).mutations;
