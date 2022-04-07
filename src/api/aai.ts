// login api
import { axiosLogin } from 'boot/axios'

export default {
  // ...
  postAskUrl (payload: {
    query: {
      clientUrl: string;
      type?: string;
    }
  }) {
    const config = {
      params: payload.query
    }
    return axiosLogin.post('/open/api/AAILogin/askUrl', null, config)
  },
  postDealCode (payload: {
    query: {
      code: string;
      error?: string;
      error_description?: string;
    }
  }) {
    const config = {
      params: payload.query
    }
    return axiosLogin.post('/open/api/AAILogin/dealCode', null, config)
  },
  postCheckToken (payload: {
    query: {
      jwtToken: string
    }
  }) {
    const config = {
      params: payload.query
    }
    return axiosLogin.post('/open/api/AAILogin/checkToken', null, config)
  }
}
