import axios from 'axios';

export const setupInterceptors = () => {
  axios.interceptors.request.use((config) => {
    // get email from localStorage
    if (config.method === 'get') {
      // get email from localStorage
      const user = localStorage.getItem('_mymoney_user');
      if (user) {
        config.params = {
          ...config.params,
          userEmail: JSON.parse(user).email
        };
      }
    } else if (config.method === 'post' || config.method === 'put' ) {
      // get email from localStorage
      const user = localStorage.getItem('_mymoney_user');
      if (user) {
        config.data = {
          ...config.data,
          userEmail: JSON.parse(user).email
        };
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
};