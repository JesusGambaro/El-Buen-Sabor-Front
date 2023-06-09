// function to prepare the url and method for the generic fetch function
const METHODS = Object.freeze({
    GET: Symbol('GET'),
    POST: Symbol('POST'),
    PUT: Symbol('PUT'),
    DELETE: Symbol('DELETE'),
});

type GenericFetch = {
    url: string;
    method: string;
}

export const prepareFetch = (query: string, params: any): GenericFetch => {
    const method = query.split('|')[0] as keyof typeof METHODS;
    const url = query.split('|')[1];

    if (METHODS[method] === METHODS.GET) {
        let filter = '';
        /*      if (query.includes('GET|categoria/filter')) {
                 console.warn('query->⚠', query);
                 console.log('params', params.page);
             }
      */
        if (params) {
            Object.keys(params).forEach((key) => {
                if (!params[key as keyof typeof params]) return;
                const separator = filter.indexOf("?") !== -1 ? "&" : "?";
                filter += `${separator}${key}=${params[key as keyof typeof params]}`;
            });
        }
        return { url: `${url}${filter}`, method };
    }
    else if (METHODS[method] === METHODS.POST) {
        return { url, method };
    } else if (METHODS[method] === METHODS.PUT) {
        return { url: `${url}/${params.id}`, method };
    } else if (METHODS[method] === METHODS.DELETE) {
        return { url: `${url}/${params.id}`, method };
    }

    return { url, method };
}
