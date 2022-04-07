/* 标准api调用函数库,严格与后端接口一致 */

import passport from 'src/api/passport'
import aai from 'src/api/aai'

export default {
  login: {
    aai,
    passport
  }
}
