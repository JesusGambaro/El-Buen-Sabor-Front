import { API_SPRING } from "@utils/constants";
import axios, { type AxiosResponse } from "axios";

const elbuensabor = axios.create({
  baseURL: API_SPRING,
});

/* elbuensabor.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the response status is within the success range, return the data
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }

    // Otherwise, throw an error with the response status text
    throw new Error(response.statusText);
  },
  (error) => {
    // Handle any request errors or network failures
    throw error;
  }
);
 */
export default elbuensabor;
