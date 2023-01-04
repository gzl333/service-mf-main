// exception handler
import { Notify } from 'quasar'
import { AxiosError } from 'axios'

export default function () {
  return (exception: unknown) => {
    // axios error
    if (exception instanceof AxiosError) {
      Notify.create({
        classes: 'notification-negative shadow-15',
        icon: 'mdi-alert',
        textColor: 'negative',
        message: exception?.response?.status + ' - ' + exception?.response?.data.code,
        caption: exception?.response?.data.message,
        position: 'bottom',
        // closeBtn: true,
        timeout: 5000,
        multiLine: false
      })
    }

    // other kind of exceptions
  }
}
