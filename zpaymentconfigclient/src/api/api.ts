import axios from "axios";
import { login } from "utils/zgs-helpder";
import Config from "../utils/config";

export interface TAPIResponse<T> {
  data: T;
  err: number;
  msg: string;
}
axios.interceptors.request.use(
  async (config) => {
    let zgsk = localStorage.getItem("zgsk");
    if (!zgsk) {
      await login();
    }
    zgsk = localStorage.getItem("zgsk");

    config.headers.authorization = `Bearer ${zgsk}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function get<T>(url, params = {}) {
  const apiUrl = Config.API + url;

  try {
    const res = await axios.get<TAPIResponse<T>>(apiUrl, {
      params,
      // headers: {
      //   // zgsk,
      //   Authorization: "Bearer " + zgsk,

      //   // referer: "http://localhost:3000/",
      // },
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      console.log("error.response.data", error.response.data);
      console.log("error.response.status", error.response.status);
      console.log("error.response.headers", error.response.headers);
      if (error.response.status >= 500) {
        throw new Error("Lỗi hệ thống");
      }
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    throw error;
  }
}

export async function post<T>(url, data: Object, params = {}) {
  const apiUrl = Config.API + url;
  
  try {
    const res = await axios.post<TAPIResponse<T>>(apiUrl, data, {
      params,
    });

    return res.data;
  } catch (error) {
    console.log('==== ~ error', error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response?.data?.error?.details);
      console.log(error.response.status);
      console.log(error.response.headers);
      if (error.response.status >= 500) {
        throw new Error("Lỗi hệ thống");
      }
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
    throw error.response.data;
  }
}
