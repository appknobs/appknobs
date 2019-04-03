import * as opn from 'opn'

export const openChangePasswordAction = () => {
  opn('https://console.appknobs.io/profile', {wait: false}).then(() => {
    // tslint:disable-next-line: no-console
    console.log('✔ https://console.appknobs.io/profile opened')
  })
}
