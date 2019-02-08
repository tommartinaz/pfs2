import api from '../api';

const state = {
    characters: [],
    scenariosPlayed: [],
    availableScenarios: []
};

const getters = {
    allCharacters(state) {
        return state.characters;
    },
    scenariosPlayed(state) {
        return state.scenariosPlayed;
    }
};

const mutations = {
    setCharacters(state, characters) {
        state.characters = characters;
    },
    deleteChar(state, id) {
        state.characters = state.characters.filter(character => character.id != id)
    },
    addCharacter(state, character) {
        state.characters.push(character);
    },
    editChar(state, character) {
        const resultsToSplice = state.characters;
        const found = resultsToSplice.find(char => char.id === character.id);
        const index = resultsToSplice.indexOf(found);
        resultsToSplice.splice(index, 1, character);
        state.characters = resultsToSplice;
    },
};

const actions = {
    async createCharacter({ commit }, character) {
        const response = await api.createCharacter(character);
        commit('addCharacter', response.data[0])
    },
    async fetchCharacters({ commit }) {
        const response = await api.fetchCharacters();
        commit('setCharacters', response.data)
    },
    async editCharacter({ commit }, character) {
        const response = await api.editCharacter(character);
        commit('editChar', response.data[0])
    },
    async deleteCharacter({ commit }, id) {
        await api.deleteCharacter(id)
            .then(commit('deleteChar', id))
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}