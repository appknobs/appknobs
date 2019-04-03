import * as opn from 'opn'

export const openForgotPasswordAction = () => {
  opn('https://console.appknobs.io/forgotpassword', {wait: false}).then(() => {
    // tslint:disable-next-line: no-console
    console.log('✔ https://console.appknobs.io/forgotpassword opened')
  })
}
