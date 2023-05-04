const mainColor: string = "#dd6b20";
//const API_URL = 'https://apimocha.com/elbuensabor/';
const API_URL: string = 'http://localhost:3000/api/v1/';
const API_SPRING: string = 'http://localhost:9000/api/v1/clients';

import axios from "axios";

const elbuensabor = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

elbuensabor.interceptors.response.use(
    (config) => {
        config.headers = {
            ...config.headers,
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        };
        return config;
    }
);

export { mainColor, API_URL, API_SPRING }
export default elbuensabor;