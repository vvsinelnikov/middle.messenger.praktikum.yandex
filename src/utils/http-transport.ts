const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const PROTOCOL = 'https';
const BASE_URL = '';
// const BASE_URL = 'ya-praktikum.tech/api/v2'

function queryStringify(data: number[]) {
  let a = '?';
  for (const i in data) {
    a += `${i}=${data[i]}&`;
  }
  return a.slice(0, -1);
}

class HTTPTransport {
  get = (url: string, options: any = {}) => {
    url = `${PROTOCOL}://${BASE_URL}${url}`;
    if (options.hasOwnProperty('data')) {
      url += queryStringify(options.data);
    }

    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = (url: string, options: any = {}) => {
    url = `${PROTOCOL}://${BASE_URL}${url}`;
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = (url: string, options: any = {}) => {
    url = `${PROTOCOL}://${BASE_URL}${url}`;
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = (url: string, options: any = {}) => {
    url = `${PROTOCOL}://${BASE_URL}${url}`;
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: any, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
