import axios from 'axios';

const ROOT_URL = "http://localhost:8000";

export default {
    fetchCharacters() {
        return axios.get(`${ROOT_URL}/characters`);
    },
    fetchAlignments() {
        return axios.get(`${ROOT_URL}/alignments`);
    },
    fetchClasses() {
        return axios.get(`${ROOT_URL}/classes`);
    },
    fetchRaces() {
        return axios.get(`${ROOT_URL}/races`);
    },
    fetchScenarios() {
        return axios.get(`${ROOT_URL}/scenarios`);
    },
    fetchScenariosPlayedByCharacter(id) {
        return axios.get(`${ROOT_URL}/characters/${id}/scenarios`)
    },
    deleteCharacter(id) {
        return axios.delete(`${ROOT_URL}/characters/${id}`)
    },
    addScenario(scenario) {
        return axios.post(`${ROOT_URL}/scenarios`, scenario);
    }
};