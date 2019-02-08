import axios from 'axios';
import { ROOT_URL } from './constants';

export default {
    fetchClasses() {
        return axios.get(`${ROOT_URL}/classes`);
    },
}