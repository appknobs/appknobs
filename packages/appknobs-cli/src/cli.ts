#!/usr/bin/env node
import * as cli from 'commander'
import {banner} from './banner'
import {openChangePasswordAction} from './openChangePasswordAction'
import {openConsoleAction} from './openConsoleAction'
import {openForgotPasswordAction} from './openForgotPasswordAction'
import {setupRuntime} from './setupRuntime'
import './swallowUnhandledRejections'
import {version} from './version'

const run = () => {
  banner()

  const {
    apiKeyAction,
    loginAction,
    logoutAction,
    projectInfoAction,
    registerAction,
    removeProjectAction,
    showUserAction,
    uploadKnobsAction,
  } = setupRuntime()

  cli.version(version)

  cli
    .command('parse <path>')
    .option(
      '-t --type <framework>',
      'Specify the framework type: "angular" or "react"',
      /^(angular|react)$/i,
    )
    .description(
      'Find & upload feature flags from your project. Will auto-guess the framework type if not specified.',
    )
    .action(uploadKnobsAction)

  cli
    .command('app-info')
    .description('Retrieve app name and appID')
    .action(projectInfoAction)

  cli
    .command('app-remove')
    .option('-y --yes', 'App will be removed without confirmation')
    .description(
      'Deletes the current app and all associated records from Appknobs',
    )
    .action(removeProjectAction)

  cli
    .command('apikey')
    .description('Retrieve your API key')
    .action(apiKeyAction)

  cli
    .command('console')
    .description('Open Appknobs web console at console.appknobs.io')
    .action(openConsoleAction)

  cli
    .command('register [email] [password]')
    .description(
      'Register on appknobs.io using your email address and password',
    )
    .action(registerAction)

  cli
    .command('login [email] [password]')
    .description('Log in to the service')
    .action(loginAction)

  cli
    .command('reset-pass')
    .description('Open reset password flow')
    .action(openForgotPasswordAction)

  cli
    .command('change-pass')
    .description('Open change password flow')
    .action(openChangePasswordAction)

  cli
    .command('logout')
    .description('Log out from the service')
    .action(logoutAction)

  cli
    .command('user')
    .description('Show current user')
    .action(showUserAction)

  cli.parse(process.argv)

  if (!cli.args.length) {
    cli.help()
  }
}

run()
