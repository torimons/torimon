import { Module } from 'vuex-smart-module';
import { MainCreationViewState } from './MainCreationViewState';
import { MainCreationViewGetters } from './MainCreationViewGetters';
import { MainCreationViewMutations } from './MainCreationMutations';

export const MainCreationViewModule = new Module({
    state: MainCreationViewState,
    getters: MainCreationViewGetters,
    mutations: MainCreationViewMutations,
});
