import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

async function refreshToken() {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/auth/refresh`,
      null
    );
    console.log(response);
    const { accessToken } = response.data;
    localStorage.setItem("jwt", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    throw error;
  }
}

const axiosApi = () => {
  const instance = axios.create({
    baseURL: `${BASE_URL}/api`,
  });

  const token = localStorage.getItem("jwt");

  instance.defaults.headers.common["Authorization"] = token;
  // instance.defaults.headers.common["Authorization"] = 1;
  instance.defaults.headers.post["Content-Type"] = "application/json";
  instance.defaults.headers.put["Content-Type"] = "application/json";
  instance.defaults.headers.delete["Content-Type"] = "application/json";

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.data.code === "User_400_4" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          console.log(newToken);
          if (newToken) {
            axios.defaults.headers.common["Authorization"] = newToken;
            originalRequest.headers["Authorization"] = newToken;
            return axios(originalRequest);
          }
        } catch (error) {
          console.log(error);
          // return "Promise.reject(error)";
          throw "logout";
        }
      }
      throw error;
    }
  );

  return instance;
};

const axiosFileApi = () => {
  const instanceFile = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const token = localStorage.getItem("jwt");
  if (token) {
    instanceFile.defaults.headers.common["Authorization"] = token;
  }

  return instanceFile;
};

export { axiosApi, axiosFileApi };
