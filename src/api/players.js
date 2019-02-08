import axios from 'axios';
import { ROOT_URL } from './constants';

export default {
    fetchPlayers() {
        return axios.get(`${ROOT_URL}/players`);
    },
    fetchOnePlayer(id) {
        return axios.get(`${ROOT_URL}/players/${id}`)
    },
    createPlayer(player) {
        return axios.post(`${ROOT_URL}/players`, player);
    }
}