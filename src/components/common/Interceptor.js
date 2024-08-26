import axios from "axios";
import { logout } from '../../redux/features/user';

export default {
  setupInterceptors: (store) => {
    // For GET requests
    axios.interceptors.request.use(
      (req) => {
        return req;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // For POST requests
    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err?.response?.status === 401) {
          store.dispatch(logout());
        }
        return Promise.reject(err);
      }
    );
  },
};
