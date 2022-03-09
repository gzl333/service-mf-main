import { defineStore } from 'pinia'
import api from 'src/api'
import jwtDecode from 'jwt-decode'
import { baseURLLogin } from 'boot/axios'

export interface DecodedToken {
  id: string
  name: string
  email: string
  orgName: string

  exp: number
  iat: number
  iss: string
}

const useStore = defineStore('mainStore', {
  state: () => {
    return {
      counter: 0,
      items: {
        isLogin: false,
        loginType: 'passport' || 'aai' || undefined,
        tokenAccess: '' || undefined,
        tokenRefresh: '' || undefined,
        tokenDecoded: {} as DecodedToken
      },
      tables: {}
    }
  },
  getters: {
    getCounter: state => state.counter
  },
  actions: {
    increment () {
      this.counter++
    },
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
      this.items.tokenAccess = respPostDealCode?.data.data.accessToken
      this.items.tokenRefresh = respPostDealCode?.data.data.refreshToken
      this.items.tokenDecoded = jwtDecode(respPostDealCode?.data.data.accessToken as string)

      // localStorage todo
      localStorage.setItem('usp_access', this.items.tokenAccess)
      localStorage.setItem('usp_refresh', this.items.tokenRefresh)
      localStorage.setItem('usp_loginType', this.items.tokenDecoded)
    },
    userLogout (loginType: 'passport' | 'aai') {
      // del store todo
      this.items.isLogin = false
      delete this.items.loginType
      delete this.items.tokenAccess
      delete this.items.tokenRefresh
      delete this.items.tokenDecoded
      // localStorage
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      localStorage.removeItem('loginType')

      // logout remote
      window.location.href = baseURLLogin + loginType === 'passport' ? '/open/api/UMTOauthLogin/loginOut?loginOutUrl=' : '/open/api/AAILogin/loginOut?loginOutUrl=' + window.location.origin

      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      this.$router.push('/') // 登出后的路由目标均为首页，其跳转写在这里
    },
    retainToken () {
      if (this.items.tokenAccess && this.items.tokenRefresh && this.items.loginType) { // store中的token状态
        const {
          tokenRefresh,
          tokenDecoded
        } = this.items
        if (tokenDecoded.exp) {
          // const timeOut = decodedToken.exp * 1000 - Date.now() - 3595000 // 测试用，快速refresh
          const timeOut = tokenDecoded.exp * 1000 - Date.now() - 5000 // 到期时间前5秒钟更新token,到期时间小于5秒时立即尝试更新token
          console.log('retain timeout', timeOut)
          setTimeout(() => {
            // https://stackoverflow.com/questions/63488141/promise-returned-in-function-argument-where-a-void-return-was-expected/63488201
            void (async () => {
              try {
                if (this.items.tokenAccess && this.items.tokenRefresh && this.items.loginType) { // 定时器注册后，仅在用户保持登录时更新token，登出则定时器不执行，不再更新
                  // 获取更新到的access token
                  let respPostRefreshToken
                  if (this.items.loginType === 'passport') {
                    respPostRefreshToken = await api.login.passport.postRefreshToken({ query: { tokenRefresh } })
                  } else if (this.items.loginType === 'aai') {
                    respPostRefreshToken = await api.login.passport.postRefreshToken({ query: { tokenRefresh } })
                  }

                  if (respPostRefreshToken?.data.code === 200) {
                    // update store
                    this.items.tokenAccess = respPostRefreshToken?.data.data.accessToken
                    this.items.tokenRefresh = respPostRefreshToken?.data.data.refreshToken
                    this.items.tokenDecoded = jwtDecode(respPostRefreshToken?.data.data.accessToken as string)
                    // localStorage
                    localStorage.setItem('usp_access', this.items.tokenAccess)
                    localStorage.setItem('usp_refresh', this.items.tokenRefresh)
                    localStorage.setItem('usp_loginType', this.items.tokenDecoded)
                    // retain again
                    this.retainToken()
                  } else {
                    void await context.dispatch('cstLogout')
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
                void await context.dispatch('cstLogout')
              }
            })()
          }, timeOut)
        }
      }
    }
  }

})

export default useStore
