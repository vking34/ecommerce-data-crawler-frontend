import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import * as Config from "../contants/config";
import storageService from "./storageService";

type response = {
  result: {
    data: any,
    status: number
  }
  error: any
}

// @ts-ignore
const refreshAuthLogic = failedRequest => axios.post(Constants.API_URL + '/v1/auth/refreshToken', {'refreshToken': StorageService.getRefreshToken()}).then(tokenRefreshResponse => {
  storageService.setToken(tokenRefreshResponse.data.refreshToken);
  failedRequest.response.config.headers["Authorization"] = tokenRefreshResponse.data.refreshToken;
  return Promise.resolve();

}).catch(function (error) {
  storageService.removeToken();
  storageService.removeRefreshToken()
  window.location.href = "/"
  return Promise.reject();
});

export const callApi = async (endpoint: string, method: any, body: any, isNeedAuth: boolean = true) => {
  var response: response = {
    result: {
      data: null,
      status: 500,
    },
    error: null
  }
  var newHeaders: any = {'Content-Type': 'application/json'};
  if (isNeedAuth && storageService.isTokenExits()) {
    newHeaders["Authorization"] = 'Bearer ' + storageService.getToken();
    createAuthRefreshInterceptor(axios, refreshAuthLogic, {
        pauseInstanceWhileRefreshing: true
    });
  }
  try {
    const result = await axios({
      method: method,
      url: Config.API_URL + endpoint,
      // url: `${Config.API_URL}${endpoint}`,
      headers: newHeaders,
      data: body,
    })
    response.result.data = result.data;
    response.result.status = result.status;
  } catch (error) {
    // console.log("error : ", error); 
    response.error = error.response?.data.message;
    response.result.status = error.response?.status
  }

  return response;
}

// export const getShopStates = async () => {
//   try {
//     const shopStateResponse = await axios.get('http://192.168.1.56:3003/v1/crawlers/shopee/shops');
//     console.log(shopStateResponse.data);
//     return shopStateResponse.data;
//   }
//   catch (e) {
//     console.log('e:', e);
//   }
// }