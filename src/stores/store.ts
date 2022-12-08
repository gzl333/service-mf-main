import { defineStore } from 'pinia'
import api from 'src/api'
import jwtDecode from 'jwt-decode'
import { baseURLLogin } from 'boot/axios'
import { /*  Dialog, */ Notify } from 'quasar'

import useExceptionNotifier from 'src/hooks/useExceptionNotifier'

export interface DecodedToken {
  id: string
  name: string
  email: string
  orgName: string

  exp: number
  iat: number
  iss: string
}

const exceptionNotifier = useExceptionNotifier()

export const useStore = defineStore('main', {
  state: () => {
    return {
      items: {
        currentApp: '' as string, // 当前挂载的微服务， 被main的header使用。更新机制在router/index内部
        isLogin: false,
        loginType: '' as 'passport' | 'aai' | undefined,
        tokenAccess: '' as string | undefined,
        tokenRefresh: '' as string | undefined,
        tokenDecoded: {} as DecodedToken | undefined
      },
      tables: {}
    }
  },
  getters: {},
  actions: {
    async askUrl (loginType: 'passport' | 'aai') {
      // 本函数只负责获取登录页面地址，并跳转。 code及token处理、/login路由跳转逻辑处理，均放在router.beforeEach中
      try {
        let respPostLoginUrl
        if (loginType === 'passport') {
          respPostLoginUrl = await api.login.passport.postAskUrl({ query: { clientUrl: window.location.origin + '/login-passport' } })
        } else if (loginType === 'aai') {
          respPostLoginUrl = await api.login.aai.postAskUrl({ query: { clientUrl: window.location.origin + '/login-aai' } })
        }
        console.log(respPostLoginUrl?.data.data)
        // https://gosc-login.cstcloud.cn/oidc/openid_connect_login?identifier=https://aai.cstcloud.net/oidc/&clientUrl=http://servicedev.cstcloud.cn/login-aai

        // 跳转至获取token的url
        window.location.href = respPostLoginUrl?.data.data
      } catch (exception) {
        exceptionNotifier(exception)
      }
    },
    async userLogin (loginType: 'passport' | 'aai', code: string) {
      try {
        // 获取token
        let respPostDealCode
        if (loginType === 'passport') {
          respPostDealCode = await api.login.passport.postDealCode({ query: { code } })
        } else if (loginType === 'aai') {
          respPostDealCode = await api.login.aai.postDealCode({ query: { code } })
        }

        // 登录接口的风格是http请求成功即为200，内容状态放在response.data.code
        // {
        //   "success": false,
        //   "code": 500,
        //   "message": "系统异常,提供的code无效或者已过期.获取accessToken错误urlhttps://passport.escience.cn/oauth2/token",
        //   "data": false,
        //   "exceptionClazz": null
        // }

        // 登录成功
        if (respPostDealCode?.data.code === 200) {
          // 保存token并改变用户登录状态,保存用户信息
          this.items.isLogin = true
          this.items.loginType = loginType
          this.items.tokenAccess = respPostDealCode?.data.data.accessToken as string
          this.items.tokenRefresh = respPostDealCode?.data.data.refreshToken as string
          this.items.tokenDecoded = jwtDecode(respPostDealCode?.data.data.accessToken as string)

          // localStorage
          localStorage.setItem('usp_access', this.items.tokenAccess)
          localStorage.setItem('usp_refresh', this.items.tokenRefresh)
          localStorage.setItem('usp_loginType', this.items.loginType)

          // dispatch global token event. Listened at micro-app's boot/axios
          window.dispatchEvent(new CustomEvent('token', {
            detail: {
              tokenAccess: this.items.tokenAccess,
              tokenDecoded: this.items.tokenDecoded
            }
          }))

          // retain token
          this.retainToken()
        } else {
          // 登录失败
          console.log(respPostDealCode?.data)
          Notify.create({
            classes: 'notification-negative shadow-15',
            icon: 'mdi-alert',
            textColor: 'negative',
            message: respPostDealCode?.data.code,
            caption: respPostDealCode?.data.message,
            position: 'bottom',
            closeBtn: true,
            timeout: 60000,
            multiLine: false
          })
        }
      } catch (exception) {
        exceptionNotifier(exception)
      }
    },
    userLogout () {
      try {
        // temp loginType
        const loginType = this.items.loginType
        // del store
        this.items.isLogin = false
        delete this.items.loginType
        delete this.items.tokenAccess
        delete this.items.tokenRefresh
        delete this.items.tokenDecoded
        // localStorage
        localStorage.removeItem('usp_access')
        localStorage.removeItem('usp_refresh')
        localStorage.removeItem('usp_loginType')
        // logout remote
        let logoutUrl = ''
        if (loginType === 'passport') {
          logoutUrl = baseURLLogin + '/open/api/UMTOauthLogin/loginOut?loginOutUrl=' + window.location.origin
        } else if (loginType === 'aai') {
          logoutUrl = baseURLLogin + '/open/api/AAILogin/loginOut?loginOutUrl=' + window.location.origin
        }
        window.location.href = logoutUrl
      } catch (exception) {
        exceptionNotifier(exception)
      }
    },
    // 页面刷新时从浏览器localStorage里读取token
    async reloadToken () {
      if (localStorage.getItem('usp_access') && localStorage.getItem('usp_refresh') && localStorage.getItem('usp_loginType')) {
        const tokenAccess = localStorage.getItem('usp_access') as string
        const tokenRefresh = localStorage.getItem('usp_refresh') as string
        const loginType = localStorage.getItem('usp_loginType') as 'passport' | 'aai'

        // const respPostCheckToken = loginType === 'passport' ? await api.login.passport.postCheckToken({ query: { jwtToken: tokenAccess } }) : await api.login.aai.postCheckToken({ query: { jwtToken: tokenAccess } })
        //
        // if (respPostCheckToken.data.code === 200 && respPostCheckToken.data.data === true) {
        //   // 保存token并改变用户登录状态,保存用户信息
        //   this.items.isLogin = true
        //   this.items.loginType = loginType
        //   this.items.tokenAccess = tokenAccess
        //   this.items.tokenRefresh = tokenRefresh
        //   this.items.tokenDecoded = jwtDecode(tokenAccess)
        //
        //   // localStorage
        //   localStorage.setItem('usp_access', this.items.tokenAccess)
        //   localStorage.setItem('usp_refresh', this.items.tokenRefresh)
        //   localStorage.setItem('usp_loginType', this.items.loginType)
        //
        //   // retain token
        //   this.retainToken()
        // } else {
        //   this.userLogout()
        // }

        /* 避免刷新页面体验不好，先信任本地存储，再去核实，不通过再登出 */
        // 保存token并改变用户登录状态,保存用户信息
        this.items.isLogin = true
        this.items.loginType = loginType
        this.items.tokenAccess = tokenAccess
        this.items.tokenRefresh = tokenRefresh
        this.items.tokenDecoded = jwtDecode(tokenAccess)

        // localStorage
        localStorage.setItem('usp_access', this.items.tokenAccess)
        localStorage.setItem('usp_refresh', this.items.tokenRefresh)
        localStorage.setItem('usp_loginType', this.items.loginType)

        // dispatch global token event. Listened at micro-app's boot/axios
        window.dispatchEvent(new CustomEvent('token', {
          detail: {
            tokenAccess: this.items.tokenAccess,
            tokenDecoded: this.items.tokenDecoded
          }
        }))

        try {
          let respPostCheckToken
          if (loginType === 'passport') {
            respPostCheckToken = await api.login.passport.postCheckToken({ query: { jwtToken: tokenAccess } })
          } else if (loginType === 'aai') {
            respPostCheckToken = await api.login.aai.postCheckToken({ query: { jwtToken: tokenAccess } })
          }
          if (respPostCheckToken?.data.code === 200 && respPostCheckToken?.data.data === true) {
            this.retainToken()
          } else {
            this.userLogout()
          }
        } catch (exception) {
          exceptionNotifier(exception)
          this.userLogout()
        }

        /* 避免刷新页面体验不好，先信任本地存储，再去核实，不通过再登出 */
      }
    },
    retainToken () {
      if (this.items.tokenAccess && this.items.tokenRefresh && this.items.loginType) { // store中的token状态
        const {
          tokenRefresh,
          tokenDecoded
        } = this.items
        if (tokenDecoded?.exp) {
          // const timeOut = decodedToken.exp * 1000 - Date.now() - 3595000 // 测试用，快速refresh
          const timeOut = tokenDecoded.exp * 1000 - Date.now() - 5000 // 到期时间前5秒钟更新token,到期时间小于5秒时立即尝试更新token
          console.log('@cnic/main retain timeout: ', timeOut)
          setTimeout(() => {
            // https://stackoverflow.com/questions/63488141/promise-returned-in-function-argument-where-a-void-return-was-expected/63488201
            void (async () => {
              try {
                if (this.items.tokenAccess && this.items.tokenRefresh && this.items.loginType) { // 定时器注册后，仅在用户保持登录时更新token，登出则定时器不执行，不再更新
                  // 获取更新到的access token
                  let respPostRefreshToken
                  if (this.items.loginType === 'passport') {
                    respPostRefreshToken = await api.login.passport.postRefreshToken({ query: { refreshToken: tokenRefresh } })
                  } else if (this.items.loginType === 'aai') {
                    respPostRefreshToken = await api.login.aai.postRefreshToken({ query: { refreshToken: tokenRefresh } })
                  }

                  if (respPostRefreshToken?.data.code === 200) {
                    // update store
                    this.items.tokenAccess = respPostRefreshToken?.data.data.accessToken as string
                    this.items.tokenRefresh = respPostRefreshToken?.data.data.refreshToken as string
                    this.items.tokenDecoded = jwtDecode(respPostRefreshToken?.data.data.accessToken as string)

                    // localStorage
                    localStorage.setItem('usp_access', this.items.tokenAccess)
                    localStorage.setItem('usp_refresh', this.items.tokenRefresh)
                    localStorage.setItem('usp_loginType', this.items.loginType)

                    // dispatch global token event. Listened at micro-app's boot/axios
                    window.dispatchEvent(new CustomEvent('token', {
                      detail: {
                        tokenAccess: this.items.tokenAccess,
                        tokenDecoded: this.items.tokenDecoded
                      }
                    }))

                    // retain again
                    this.retainToken()
                  } else {
                    this.userLogout()
                    Notify.create({
                      classes: 'notification-negative shadow-15',
                      icon: 'mdi-alert',
                      textColor: 'negative',
                      message: '登录失效，请重新登录',
                      position: 'bottom',
                      closeBtn: true,
                      timeout: 5000,
                      multiLine: false
                    })
                  }
                }
              } catch (exception) {
                exceptionNotifier(exception)
                this.userLogout()
              }
            })()
          }, timeOut)
        }
      }
    }
  }

})
