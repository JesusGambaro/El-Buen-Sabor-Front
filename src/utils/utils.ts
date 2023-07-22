// function to prepare the url and method for the generic fetch function
const METHODS = Object.freeze({
  GET: Symbol("GET"),
  POST: Symbol("POST"),
  PUT: Symbol("PUT"),
  DELETE: Symbol("DELETE"),
});

interface GenericFetch {
  url: string;
  method: string;
}

export const prepareFetch = (query: string, params?: any): GenericFetch => {
  const method = query.split("|")[0] as keyof typeof METHODS;
  const url = query.split("|")[1];

  console.log("method", method, "url", url, "params", params);

  if (METHODS[method] === METHODS.GET) {
    let filter = "";
    if (params !== undefined && params !== null) {
      const urlParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined) urlParams.append(key, params[key]);
      });
      filter = `?${urlParams.toString()}`;
    }

    return { url: `${url}${filter}`, method };
  } else if (METHODS[method] === METHODS.POST) {
    return { url, method };
  } else if (
    METHODS[method] === METHODS.PUT &&
    params !== undefined &&
    params !== null
  ) {
    return { url: `${url}/${params.id as string}`, method };
  } else if (
    METHODS[method] === METHODS.DELETE &&
    params !== undefined &&
    params !== null
  ) {
    return { url: `${url}/${params.id as string}`, method };
  }

  return { url, method };
};
