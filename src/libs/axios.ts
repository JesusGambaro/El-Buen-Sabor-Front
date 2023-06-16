const mainColor: string = "#dd6b20";
//const API_URL = 'https://apimocha.com/elbuensabor/';
const API_URL: string = 'http://localhost:3000/api/v1/';
const API_SPRING: string = 'http://localhost:9000/v1/api/';
import axios from "axios";
//import useMainStore from "@store/mainStore";
//const { token } = useMainStore.getState();
const elbuensabor = axios.create({
    baseURL: API_SPRING,
    // headers: {
    //     Authorization: `Bearer ${token}`
    // },
    //,withCredentials: true
})

// elbuensabor.interceptors.response.use(
//     (config) => {
//         console.log("Estoy en el token: ",token);
//         config.headers = {
//             ...config.headers,
//             "Authorization": `Bearer ${token}`,
//         };
//         return config;
//     }
// );

export { mainColor, API_URL, API_SPRING }
export default elbuensabor;