import * as opn from 'opn'

export const openConsoleAction = () => {
  opn('https://console.appknobs.io', {wait: false}).then(() => {
    // tslint:disable-next-line: no-console
    console.log('✔ https://console.appknobs.io/ opened')
  })
}
