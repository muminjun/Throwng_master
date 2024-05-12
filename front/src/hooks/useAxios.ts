import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAxios = () => {
  const navigate = useNavigate();

  useEffect((): any => {
    const instance = axios.create({
      baseURL: `${BASE_URL}/api`,
    });

    const token = localStorage.getItem("jwt");
    instance.defaults.headers.common["Authorization"] = token;
    instance.defaults.headers.post["Content-Type"] = "application/json";
    instance.defaults.headers.put["Content-Type"] = "application/json";
    instance.defaults.headers.delete["Content-Type"] = "application/json";

    const refreshToken = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/users/auth/refresh`,
          null
        );
        const { accessToken } = response.data;
        localStorage.setItem("jwt", accessToken);
        return accessToken;
      } catch (error) {
        console.error("Refresh token failed", error);
        localStorage.removeItem("jwt");
        navigate("/login");
        return null;
      }
    };

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.data.code === "User_400_4" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const newToken = await refreshToken();
          if (newToken) {
            axios.defaults.headers.common["Authorization"] = newToken;
            originalRequest.headers["Authorization"] = newToken;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [navigate]);

  return axios;
};

export default useAxios;
