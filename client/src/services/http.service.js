/* eslint-disable react/prop-types */

import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import authServise from "./auth.serves";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: "http://localhost:8080/api/",
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        });

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          accessToken: data.accessToken,
          expiresIn: data.expiresIn,
          userId: data.userId,
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.headers = { ...config.params, auth: accessToken };
      }
    } else {
      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await authServise.refresh();

        localStorageService.setTokens({
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          expiresIn: data.expiresIn,
          userId: data.userId,
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}
http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error("Something was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;