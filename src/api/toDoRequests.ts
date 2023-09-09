import { axiosInstance } from "./base";

export default {
  post(url: string, data: object) {
    return axiosInstance.post(url, data);
  },
  get(url: string) {
    return axiosInstance.get(url);
  },
  put(url: string, data: object) {
    return axiosInstance.put(url, data);
  },
  patch(url: string, data: object) {
    return axiosInstance.patch(url, data);
  },
  delete(url: string) {
    return axiosInstance.delete(url);
  },
};
