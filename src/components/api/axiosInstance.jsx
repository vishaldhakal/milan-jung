import axios from 'axios';

export const fontendBaseURL = 'https://www.milankatuwal.com';

export const baseURL = 'https://admin.milankatuwal.com';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem('access_jung')
      ? 'JWT ' + localStorage.getItem('access_jung')
      : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export const axiosImageInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: localStorage.getItem('access_jung')
      ? 'JWT ' + localStorage.getItem('access_jung')
      : null,
    'Content-Type': 'multipart/form-data',
    accept: 'application/json',
  },
});

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + '/auth/login/refresh/'
    ) {
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401
      // &&
      // error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem('refresh');

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axios
            .post(`${baseURL}/auth/login/refresh/`, { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem('access_jung', response.data.access);
              localStorage.setItem('refresh_jung', response.data.refresh);

              axiosInstance.defaults.headers['Authorization'] =
                'Bearer ' + response.data.access;
              originalRequest.headers['Authorization'] =
                'Bearer ' + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {});
        } else {
          window.location.href = '/';
        }
      } else {
        window.location.href = '/';
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
