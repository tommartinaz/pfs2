import api from '../api';

const state = {
    scenarios: [],
};

const getters = {
    allScenarios(state) {
        return state.scenarios;
    }
};

const mutations = {
    setScenarios(state, scenarios) {
        state.scenarios = scenarios;
    },
    addScenarios(state, scenario) {
        state.scenarios.push(scenario);
    }
};

const actions = {
    async fetchScenarios({ commit }) {
        const response = await api.fetchScenarios();
        const seasonSort = response.data.sort((a, b) => a.season - b.season);
        commit('setScenarios', seasonSort);
    },
    async addScenario({ commit }, scenario) {
        const response = await api.addScenario(scenario);
        commit('addScenarios', response.data[0]);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}