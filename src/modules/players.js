import api from '../api';
const state = {
    players: [],
};
const getters = {
    allPlayers(state) {
        return state.players;
    }
};
const mutations = {
    setPlayers(state, players) {
        state.players = players;
    }
};
const actions = {
    async fetchPlayers({ commit }) {
        const response = await api.fetchPlayers();
        commit('setPlayers', response.data)
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}