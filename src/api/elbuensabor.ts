import { MutationFunction, QueryFunctionContext } from "@tanstack/react-query";
import api from "../libs/axios";
import { prepareFetch } from "@utils/utils";
import useAdminStore from "@store/adminStore";
import useMainStore from "@store/mainStore";

type GenericFetch = {
  url: string;
  method: string;
  headers?: any;
  body?: any;
};
// Fetch genérico para usar con los hooks de useApiQuery y useApiMutation
export const genericFetch = async (
  requestBody: QueryFunctionContext | MutationFunction<any, any>
) => {
  // Recibe un objeto con la queryKey o params y devuelve un objeto con la url, el método y el body
  // Configuración básica de la petición

  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  } as GenericFetch;

  // Si es una query(consulta) se prepara la url y el método
  if (requestBody && "queryKey" in requestBody) {
    const [query, filters] = requestBody.queryKey as [string, any | undefined];

    // El método y la url se obtienen de la función prepareFetch
    const { url, method } = prepareFetch(query, filters);

    // Se asignan los valores a la configuración de la petición
    options.url = url;
    options.method = method;
  }
  // Si es una mutación se prepara la url, el método y el body
  else if (requestBody && "params" in requestBody) {
    let { query, params: data } = requestBody as any;
    console.log("data", data);

    // El método y la url se obtienen de la función prepareFetch
    const { url, method } = prepareFetch(query, data);

    // Se asignan los valores a la configuración de la petición
    options.url = url;
    options.method = method;

    if (Object.keys(data).length > 1) {
      if ("categoriaPadre" in data) {
        data.categoriaPadre = {
          id: Number(data.categoriaPadre) || -1,
        };
      }
      //options.data = JSON.stringify(data);
    }
  }

  // Función que setea el total de páginas en el estado global para la paginación de las tablas
  const { setTotalPages } = useAdminStore.getState();

  return api(options).then((response) => {
    // Si la respuesta es correcta se devuelve el contenido de la respuesta
    if ([200, 201, 204].includes(response.status)) {
      // Si la respuesta tiene paginación se setea el total de páginas en el estado global y se devuelve el contenido
      if ("totalPages" in response.data) {
        setTotalPages(
          response.data.totalPages,
          `${options.url.split("/")[0]}Filter`
        );
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

// Generic fetch para método GET
export const getFetch = async <T extends QueryFunctionContext>(params?: T) => {
  if (!params) return;
  const { queryKey } = params;
  const [path, filters] = queryKey as [string, any | undefined];
  const { token } = useMainStore.getState();
  //console.log("Estoy en el token: ",token);
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  } as GenericFetch;

  const { url } = prepareFetch(path, filters);

  options.url = url;
  const { setTotalPages } = useAdminStore.getState();
  //console.log("options", options);
  return api(options).then((response) => {
    // Si la respuesta es correcta se devuelve el contenido de la respuesta
    if ([200, 201, 204].includes(response.status)) {
      // Si la respuesta tiene paginación se setea el total de páginas en el estado global y se devuelve el contenido
      if ("totalPages" in response.data) {
        setTotalPages(
          response.data.totalPages,
          `${options.url.split("/")[0]}Filter`
        );
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

// Generic fetch para método POST y PUT

export const postPutFetch = async <T extends MutationFunction<any, any>>(
  params?: T
) => {
  if (!params) return;

  const { query, data } = params as any;

  const { url, method } = prepareFetch(query, data);
  // this method is used to create or update a resource that contains a file
  const { token } = useMainStore.getState();
  const options = {
    data,
    method: method,
    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },
    url,
  } as GenericFetch;
  console.log("options", options);

  return api(options).then((response) => {
    // Si la respuesta es correcta se devuelve el contenido de la respuesta
    if ([200, 201, 204].includes(response.status)) {
      return response.data;
    }
    // Si la respuesta es incorrecta se devuelve un error
    else {
      throw new Error(response.statusText);
    }
  });
};
