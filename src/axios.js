import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://goodak0x5e.execute-api.us-west-2.amazonaws.com/dev/'

});

export default instance;