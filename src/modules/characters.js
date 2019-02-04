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
    deleteChar(state, data) {
        const filteredCharacters = data.data.filter(character => character.id != data.id)
        state.characters = filteredCharacters;
    }
};

const actions = {
    async fetchCharacters({ commit }) {
        const response = await api.fetchCharacters();
        commit('setCharacters', response.data)
    },
    async deleteCharacter({ commit }, id) {
        const response = await api.deleteCharacter(id);
        commit('deleteChar', {data: response.data, id: id})
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}