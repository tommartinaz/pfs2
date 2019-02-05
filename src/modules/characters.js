import api from '../api';

const state = {
    characters: [],
    character: {}
};

const getters = {
    allCharacters(state) {
        return state.characters;
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
    editCharacter(character) {
        const resultsToSplice = state.characters;
        const found = resultsToSplice.find(char => char.id === character.id);
        const index = resultsToSplice.indexOf(found);
        resultsToSplice.splice(index, character);
        state.characters = resultsToSplice;
    }
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
        commit('editCharacter', response.data[0])
    },
    async deleteCharacter({ commit }, id) {
        await api.deleteCharacter(id);
        commit('deleteChar', id)
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}