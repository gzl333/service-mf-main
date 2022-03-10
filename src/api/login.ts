// login api
import { axiosLogin } from 'boot/axios'

export default {
  passport: {
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
        // eslint-disable-next-line camelcase
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
  },
  aai: {
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
        // eslint-disable-next-line camelcase
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
}
