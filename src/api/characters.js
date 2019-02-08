import axios from 'axios';
import { ROOT_URL } from './constants';

export default {
    fetchCharacters() {
        return axios.get(`${ROOT_URL}/characters`);
    },
    createCharacter(character) {
        return axios.post(`${ROOT_URL}/characters`, character);
    },
    editCharacter(character) {
        const { id } = character;
        return axios.post(`${ROOT_URL}/characters/${id}`, character);
    },
    deleteCharacter(id) {
        return axios.delete(`${ROOT_URL}/characters/${id}`);
    },
}