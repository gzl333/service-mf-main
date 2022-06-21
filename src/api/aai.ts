// aai login api
import { axiosLogin } from 'boot/axios'

export default {
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
  postCheckToken (payload: {
    query: {
      jwtToken: string
    }
  }) {
    const config = {
      params: payload.query
    }
    return axiosLogin.post('/open/api/AAILogin/checkToken', null, config)
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
  postLoginOutSelf (payload: {
    query: {
      loginOutUrl: string
    }
  }) {
    const config = {
      params: payload.query
    }
    return axiosLogin.post('/open/api/AAILogin/loginOutSelf', null, config)
  },
  postRefreshToken (payload: {
    query: {
      refreshToken: string
    }
  }) {
    const config = {
      params: payload.query
    }
    return axiosLogin.post('/open/api/AAILogin/refreshToken', null, config)
  }
}
