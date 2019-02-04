import Vue from 'vue';
import Vuex from 'vuex';
import characters from '../modules/characters';
import alignments from '../modules/alignments';
import classes from '../modules/classes';
import races from '../modules/races';
import scenarios from '../modules/scenarios';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        characters,
        alignments,
        classes,
        races,
        scenarios,
    }
})