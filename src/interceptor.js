import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AuthToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => {
    if ([200, 201].includes(response.status)) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  (error) => {
    console.error(error, 'Axios response error');

    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.clear();
          window.location.replace('/');
          break;
      }

      return Promise.reject(
        error.response.data?.error ??
        error.response.data?.err ??
        error.response.data?.msg ??
        'Unknown server error'
      );
    } else if (error.request) {
      console.error('No response received:', error.request);
      return Promise.reject('No response received from server. Please check your network or CORS settings.');
    } else {
      console.error('Axios config error:', error.message);
      return Promise.reject('An error occurred setting up the request.');
    }
  }
);
