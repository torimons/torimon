import { Module } from 'vuex-smart-module';
import { CreationViewState } from './CreationViewState';
import { CreationViewGetters } from './CreationViewGetters';
import { CreationViewMutations } from './CreationViewMutations';

export const CreationViewModule = new Module({
    state: CreationViewState,
    getters: CreationViewGetters,
    mutations: CreationViewMutations,
});
