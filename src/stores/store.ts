import { defineStore } from 'pinia'
import api from 'src/api'
import jwtDecode from 'jwt-decode'
import { baseURLLogin } from 'boot/axios'
import { /*  Dialog, */ Notify } from 'quasar'

export interface DecodedToken {
  id: string
  name: string
  email: string
  orgName: string

  exp: number
  iat: number
  iss: string
}

export const useStore = defineStore('main', {
  state: () => {
    return {
      items: {
        isLogin: false,
        loginType: '' as 'passport' | 'aai' | undefined,
        tokenAccess: '' as string | undefined,
        tokenRefresh: '' as string | undefined,
        tokenDecoded: {} as DecodedToken | undefined
      },
      tables: {}
    }
  },
  getters: {
  },
  actions: {
    async askUrl (loginType: 'passport' | 'aai') {
      // 本函数只负责获取登录页面地址，并跳转。 code及token处理、/login路由跳转逻辑处理，均放在router.beforeEach中
      let respPostLoginUrl
      if (loginType === 'passport') {
        respPostLoginUrl = await api.login.passport.postAskUrl({ query: { clientUrl: window.location.origin + '/login' } })
      } else if (loginType === 'aai') {
        respPostLoginUrl = await api.login.aai.postAskUrl({ query: { clientUrl: window.location.origin + '/login' } })
      }
      // 跳转至获取token的url
      window.location.href = respPostLoginUrl?.data.data
    },
    async userLogin (loginType: 'passport' | 'aai', code: string) {
      // 获取token
      let respPostDealCode
      if (loginType === 'passport') {
        respPostDealCode = await api.login.passport.postDealCode({ query: { code } })
      } else if (loginType === 'aai') {
        respPostDealCode = await api.login.aai.postDealCode({ query: { code } })
      }
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
    },
    userLogout () {
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
      window.location.href = baseURLLogin + loginType === 'passport' ? '/open/api/UMTOauthLogin/loginOut?loginOutUrl=' : '/open/api/AAILogin/loginOut?loginOutUrl=' + window.location.origin
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$router.push('/') // 登出后的路由目标均为首页，其跳转写在这里
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

        const respPostCheckToken = loginType === 'passport' ? await api.login.passport.postCheckToken({ query: { jwtToken: tokenAccess } }) : await api.login.aai.postCheckToken({ query: { jwtToken: tokenAccess } })
        if (respPostCheckToken.data.code === 200 && respPostCheckToken.data.data === true) {
          this.retainToken()
        } else {
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
                    respPostRefreshToken = await api.login.passport.postRefreshToken({ query: { refreshToken: tokenRefresh } })
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
              } catch (error) {
                this.userLogout()
              }
            })()
          }, timeOut)
        }
      }
    }
  }

})
