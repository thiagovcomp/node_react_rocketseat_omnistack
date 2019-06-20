import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.5:3333' //192.168.15.5
})

export default api;