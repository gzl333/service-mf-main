// exception handler
import { Notify } from 'quasar'
import { AxiosError } from 'axios'

export default function () {
  return (exception: unknown, source?: string) => {
    console.error(exception)
    // axios error
    if (exception instanceof AxiosError) {
      if (exception.response?.data) { // 业务错误
        Notify.create({
          classes: 'notification-negative shadow-15',
          icon: 'mdi-alert',
          textColor: 'negative',
          message: exception?.response?.status + ' - ' + exception?.response?.data?.code + ' - ' + source,
          caption: exception?.response?.data?.message,
          position: 'bottom',
          // closeBtn: true,
          timeout: 5000,
          multiLine: false
        })
      } else {
        // 网络错误
        Notify.create({
          classes: 'notification-negative shadow-15',
          icon: 'mdi-alert',
          textColor: 'negative',
          message: exception?.code + ' - ' + source,
          caption: exception?.message,
          position: 'bottom',
          closeBtn: true,
          timeout: 0,
          multiLine: false
        })
      }
    }
    // other kind of exceptions
  }
}
