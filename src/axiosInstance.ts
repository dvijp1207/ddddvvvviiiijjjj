import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  timeoutErrorMessage: "Try After sometime",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("token");
    if (token) {
      const parseToken = JSON.parse(token);
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${parseToken.accessToken}`,
      };
    }
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
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const message = error?.response?.data;
    if (message) {
      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
