import api from '../api';
const state = {
    players: [],
    player: {}
};
const getters = {
    allPlayers(state) {
        return state.players;
    },
    onePlayer(state) {
        return state.player;
    }
};
const mutations = {
    setPlayers(state, players) {
        state.players = players;
    },
    addPlayer(state, player) {
        state.players.push(player);
    },
    setOnePlayer(state, player) {
        state.player = player;
    }
};
const actions = {
    async fetchPlayers({ commit }) {
        const response = await api.fetchPlayers();
        commit('setPlayers', response.data)
    },
    async createPlayer({ commit }, player) {
        const response = await api.createPlayer(player);
        commit('addPlayer', response.data[0]);
    },
    async fetchOnePlayer({ commit }, id) {
        const response = await api.fetchOnePlayer(id);
        commit('setOnePlayer', response.data[0]);
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}