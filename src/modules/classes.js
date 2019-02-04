import api from '../api';

const state = {
    classes: [],
};

const getters = {
    allClasses(state) {
        return state.classes;
    }
};

const mutations = {
    setClasses(state, classes) {
        state.classes = classes;
    }
};

const actions = {
    async fetchClasses({ commit }) {
        const response = await api.fetchClasses();
        commit('setClasses', response.data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}