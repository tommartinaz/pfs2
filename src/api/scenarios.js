import axios from 'axios';
import { ROOT_URL } from './constants';

export default {
    fetchScenarios() {
        return axios.get(`${ROOT_URL}/scenarios`);
    },
    createScenario(scenario) {
        return axios.post(`${ROOT_URL}/scenarios`, scenario);
    },
    editScenario(scenario) {
        const { id } = scenario;
        return axios.post(`${ROOT_URL}/scenarios/${id}`, scenario);
    },
    deleteScenario(id) {
        return axios.delete(`${ROOT_URL}/scenarios/${id}`);
    },
    fetchPlayedScenarios() {
        return axios.get(`${ROOT_URL}/scenariosplayed`);
    },
    markPlayed(sessionDetails) {
        return axios.post(`${ROOT_URL}/markPlayed`, sessionDetails);
    },
    removePlayed(sessionDetails) {
        console.log("API", sessionDetails)
        const { player_id, scen_id } = sessionDetails;
        return axios.delete(`${ROOT_URL}/scenariosPlayed/${player_id}/${scen_id}`)
    }
}