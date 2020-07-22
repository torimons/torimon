import { Module } from 'vuex-smart-module';
import { CreationViewState } from './MainCreationViewState';
import { CreationViewGetters } from './MainCreationViewGetters';
import { CreationViewMutations } from './MainCreationMutations';

export const CreationViewModule = new Module({
    state: CreationViewState,
    getters: CreationViewGetters,
    mutations: CreationViewMutations,
});
