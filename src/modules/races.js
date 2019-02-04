import api from '../api';

const state = {
    races: [],
};

const getters = {
    allRaces(state) {
        return state.races;
    }
};

const mutations = {
    setRaces(state, races) {
        state.races = races;
    }
};

const actions = {
    async fetchRaces({ commit }) {
        const response = await api.fetchRaces();
        commit('setRaces', response.data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}