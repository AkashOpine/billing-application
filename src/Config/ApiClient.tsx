import axios from 'axios';
import { ClearSession, GetToken } from '../Lib/Session';
import { ApiURL, BaseName } from './BaseUrl';


export const loginAPI = axios.create({
  baseURL: ApiURL+"billing-app-test-0.0.1-SNAPSHOT/master/api/public/v1/",
  headers: { Accept: "application/json" },
});

export const masterAPI = axios.create({
  baseURL: ApiURL+"billing-app-test-0.0.1-SNAPSHOT/master/api/v1/",
  headers: { Accept: "application/json" },
});

export const billingAPI = axios.create({
  baseURL: ApiURL+"billing-app-test-0.0.1-SNAPSHOT/api/v1/",
  headers: { Accept: "application/json" },
});
// https://tomcat.opine.co.in/billing-app-test-0.0.1-SNAPSHOT/
const setupInterceptors = (instance : any) => {
  instance.interceptors.request.use(
    (config : any) => {
      const token = GetToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    },
    (error : any) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response : any) => response,
    (error : any) => {
      if (error.response && error.response.status === 401) {
        ClearSession();
        window.location.href = BaseName;
      }
      return Promise.reject(error);
    }
  );
};

// Apply interceptors to both instances
setupInterceptors(masterAPI);
setupInterceptors(billingAPI);

export default {loginAPI, masterAPI, billingAPI };
