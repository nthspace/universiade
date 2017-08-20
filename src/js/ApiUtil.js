import 'whatwg-fetch';

export const get = (url, headers = {}) => {
  const options = {
    method: 'GET',
    headers,
  };
  return fetch(url, options);
};