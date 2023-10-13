import type {
  MutationFunction,
  QueryFunctionContext,
} from "@tanstack/react-query";
import api from "../libs/axios";
import { prepareFetch } from "@utils/utils";
import { setTotalPages } from "@store/adminStore";
import { type AxiosRequestConfig } from "axios";
import useMainStore from "@store/mainStore";

// Generic fetch function for GET method
export const getFetch = async <T extends QueryFunctionContext>(
  params?: T
): Promise<any> => {
  // If there are no params, return
  if (params === null) return;

  // queryKey is an array with the path and the filters
  const { queryKey } = params as T;
  const [path, filters] = queryKey as [string, any | undefined];

  // Get the url with the filters from the prepareFetch function
  const { url } = prepareFetch(path, filters);

  // Get the token from the global state
  const { token } = useMainStore.getState();
  
  // Prepare the request options
  const options: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    url,
  };

  // console.log("options", options);

  // Call the api with the options
  return await api(options).then((response) => {
    if ([200, 201, 204].includes(response.status)) {
      // If the response has pagination, set the total pages in the global state and return the content
     

      if ("totalPages" in response.data) {
        // The url has the entity name, so we split it to get the entity name
     

        setTotalPages(
          options.url?.split("/")[0] as string,
          response.data.totalPages
        );
        return response.data.content;
      }
      // If the response doesn't have pagination, return the content
      return response.data;
    }
    // If the response is incorrect, throw an error
    else {
      throw new Error(response.statusText);
    }
  });
};

// Generic fetch function for POST and PUT methods
export const postPutFetch = async <T extends MutationFunction<any, any>>(
  params?: T
): Promise<any> => {
  // Get the query and data from the params
  const { query, data } = params as any;

  // Prepare the request options
  console.log(data);
  
  const { url, method } = prepareFetch(query, data);
  // FormData is used for images upload
  const formData = data && "formData" in data ? data.formData : null;
  console.log("formData ",formData);

  // Get the token from the global state
  const { token } = useMainStore.getState();

  console.log(token);
  
  // Prepare the request options
  const options: AxiosRequestConfig = {
    data: formData ?? data,
    method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    url,
  };


  // Call the api with the options
  return await api(options).then((response) => {
    // If the response is correct, return the content
    if ([200, 201, 204].includes(response.status)) {
      return response.data;
    }
    // If the response is incorrect, throw an error
    else {
      throw new Error(response.statusText);
    }
  });
};

// Deprecated
export const genericFetch = async (
  requestBody: QueryFunctionContext | MutationFunction<any, any>
): Promise<any> => {
  // Recibe un objeto con la queryKey o params y devuelve un objeto con la url, el método y el body
  // Configuración básica de la petición

  const options: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };

  // Si es una query(consulta) se prepara la url y el método
  if (requestBody !== undefined && "queryKey" in requestBody) {
    const [query, filters] = requestBody.queryKey as [string, any | undefined];

    // El método y la url se obtienen de la función prepareFetch
    const { url, method } = prepareFetch(query, filters);

    // Se asignan los valores a la configuración de la petición
    options.url = url;
    options.method = method;
  }
  // Si es una mutación se prepara la url, el método y el body
  else if (requestBody !== undefined && "params" in requestBody) {
    const { query, params: data } = requestBody as any;
  

    // El método y la url se obtienen de la función prepareFetch
    const { url, method } = prepareFetch(query, data);

    // Se asignan los valores a la configuración de la petición
    options.url = url;
    options.method = method;

    if (Object.keys(data).length > 1) {
      if ("categoriaPadre" in data) {
        data.categoriaPadre = {
          id: Number(data.categoriaPadre) ?? -1,
        };
      }
      // options.data = JSON.stringify(data);
    }
  }

  // Función que setea el total de páginas en el estado global para la paginación de las tablas
  // const { setTotalPages } = useAdminStore.getState();

  return await api(options).then((response) => {
    // Si la respuesta es correcta se devuelve el contenido de la respuesta
    if ([200, 201, 204].includes(response.status)) {
      // Si la respuesta tiene paginación se setea el total de páginas en el estado global y se devuelve el contenido
      if ("totalPages" in response.data) {
        /*  setTotalPages(
          response.data.totalPages,
          `${options.url?.split("/")[0] as string}Filter`
        ); */
        return response.data.content;
      }
      // Si la respuesta no tiene paginación se devuelve el contenido
      return response.data;
    }
    // Si la respuesta es incorrecta se devuelve un error
    else {
      throw new Error(response.statusText);
    }
  });
};
