import api from '../api';

const state = {
    scenarios: [],
    playedScenarios: []
};

const getters = {
    allScenarios(state) {
        return state.scenarios;
    },
    playedScenarios(state) {
        return state.playedScenarios;
    }
};

const mutations = {
    setScenarios(state, scenarios) {
        state.scenarios = scenarios;
    },
    addScenarios(state, scenario) {
        state.scenarios.push(scenario);
    },
    setPlayedScenarios(state, scenarios) {
        state.playedScenarios = scenarios;
    },
    updateScenario(state, scenario) {
        const resultsToSplice = state.scenarios;
        const found = resultsToSplice.find(scen => scen.id === scenario.id);
        const index = resultsToSplice.indexOf(found);
        resultsToSplice.splice(index, 1, scenario);
        state.scenarios = resultsToSplice;
    },
    deleteScenario(state, id) {
        state.scenarios = state.scenarios.filter(scenario => scenario.id != id);
    }
};

const actions = {
    async fetchScenarios({ commit }) {
        const response = await api.fetchScenarios();
        const seasonSort = response.data.sort((a, b) => a.season - b.season);
        commit('setScenarios', seasonSort);
    },
    async createScenario({ commit }, scenario) {
        const response = await api.createScenario(scenario);
        commit('addScenarios', response.data[0]);
    },
    async fetchPlayedScenarios({ commit }) {
        const response = await api.fetchPlayedScenarios();
        commit('setPlayedScenarios', response.data);
    },
    async editScenario({ commit }, scenario) {
        const response = await api.editScenario(scenario);
        commit('updateScenario', response.data[0])
    },
    async deleteScenario({ commit }, id) {
        await api.deleteScenario(id)
            .then(commit('deleteScenario', id))
    },
    async markPlayed({}, playedSession) {
        const sessionDetails = {
            char_id: playedSession.char_id,
            player_id: playedSession.player_id,
            scen_id: playedSession.scen_id
        };
        await api.markPlayed(sessionDetails)
    },
    async updatePlayed({}, session) {
        const sessionDetails = {
            char_id: session.char_id,
            player_id: session.player_id,
            scen_id: session.scen_id
        };
        await api.updatePlayed(sessionDetails);
    },
    async removePlayed({}, session) {
        await api.removePlayed({player_id: session.player_id, scen_id: session.scen_id});
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}