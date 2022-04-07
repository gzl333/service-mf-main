// login api
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
    return axiosLogin.post('/open/api/UMTOauthLogin/askUrl', null, config)
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
    return axiosLogin.post('/open/api/UMTOauthLogin/dealCode', null, config)
  },
  postCheckToken (payload: {
    query: {
      jwtToken: string
    }
  }) {
    const config = {
      params: payload.query
    }
    return axiosLogin.post('/open/api/UMTOauthLogin/checkToken', null, config)
  },
  postRefreshToken (payload: {
    query: {
      refreshToken: string
    }
  }) {
    const config = {
      params: payload.query
    }
    return axiosLogin.post('/open/api/UMTOauthLogin/refreshToken', null, config)
  }
}
