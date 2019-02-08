import axios from 'axios';
import { ROOT_URL } from './constants';

export default {
    fetchAlignments() {
        return axios.get(`${ROOT_URL}/alignments`)
    },
}