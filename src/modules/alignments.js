import api from '../api';

const state = {
    alignments: [],
};

const getters = {
    allAlignments(state) {
        return state.alignments;
    }
};

const mutations = {
    setAlignments(state, alignments) {
        state.alignments = alignments;
    }
};

const actions = {
    async fetchAlignments({ commit }) {
        const response = await api.fetchAlignments();
        commit('setAlignments', response.data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}