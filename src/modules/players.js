import api from '../api';
import { router } from '../router';
const state = {
    players: [],
    player: {},
    player_id: window.localStorage.getItem('player_id'),
};
const getters = {
    allPlayers(state) {
        return state.players;
    },
    onePlayer(state) {
        return state.player;
    },
    playerId(state) {
        return state.player_id;
    },
    isLoggedIn: state => !!state.player_id
};
const mutations = {
    setPlayers(state, players) {
        state.players = players;
    },
    addPlayer(state, player) {
        state.players.push(player);
    },
    setPlayer(state, player) {
        state.player = player;
        state.player_id = player.id
    },
    logoutPlayer(state) {
        state.player = {};
        state.player_id = ''
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
    },
    async loginPlayer({ commit }, credentials) {
        const response = await api.loginPlayer(credentials);
        commit('setPlayer', response.data);
        window.localStorage.setItem('player_id', response.data.id);
        router.push('/characters')
    },
    logoutPlayer({ commit }) {
        commit('logoutPlayer');
        window.localStorage.removeItem('player_id')
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}