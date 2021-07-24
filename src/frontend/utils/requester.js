import axios from 'axios';

function request(url, method, body = '') {
  const request = axios.request({
    method,
    url,
    timeout: 30000,
    data: body
  });
  return request
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      throw e;
    });
}

export default request
