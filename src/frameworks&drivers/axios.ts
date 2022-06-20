import axios from 'axios';

// TODO: add env
const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

export default axiosInstance;
