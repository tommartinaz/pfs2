import axios from 'axios';
import { ROOT_URL } from './constants';

export default {
    fetchRaces() {
        return axios.get(`${ROOT_URL}/races`)
    },
}