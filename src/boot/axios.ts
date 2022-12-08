import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance, AxiosError } from 'axios'
import * as qs from 'qs'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' })

// axios instance with base url configured
export const baseURLLogin = window.location.protocol + '//gosc-login.cstcloud.cn'
const axiosLogin = axios.create({
  baseURL: baseURLLogin,
  // 序列化器，没有这个无法在query里发送数组参数。body里的数组不需要序列化器。
  // https://github.com/axios/axios/issues/604#issuecomment-321460450
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'comma' })
  }
})

/* 原生axios的拦截器 */
axios.interceptors.request.use(config => {
  return config
}, (error: AxiosError) => {
  return Promise.reject(error)
})
axios.interceptors.response.use(config => {
  return config
}, (error: AxiosError) => {
  return Promise.reject(error)
})
/* 原生axios的拦截器 */

/* axiosLogin的拦截器 */
axiosLogin.interceptors.request.use(config => {
  return config
}, (error: AxiosError) => {
  return Promise.reject(error)
})
axiosLogin.interceptors.response.use(config => {
  return config
}, (error: AxiosError) => {
  return Promise.reject(error)
})
/* axiosLogin的拦截器 */

export default boot((/* { app } */) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  // app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axiosLogin }
