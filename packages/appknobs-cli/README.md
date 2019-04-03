# APPKNOBS CLI

> CLI interface for Appknobs.io

Hint: the CLI comes with two aliases: `knobs` and `appknobs`

# Usage

```
npm i -g @appknobs/cli

$ knobs --help
```

```shell

  █████╗  ██████╗  ██████╗  ██╗  ██╗ ███╗   ██╗  ██████╗  ██████╗  ███████╗
 ██╔══██╗ ██╔══██╗ ██╔══██╗ ██║ ██╔╝ ████╗  ██║ ██╔═══██╗ ██╔══██╗ ██╔════╝
 ███████║ ██████╔╝ ██████╔╝ █████╔╝  ██╔██╗ ██║ ██║   ██║ ██████╔╝ ███████╗
 ██╔══██║ ██╔═══╝  ██╔═══╝  ██╔═██╗  ██║╚██╗██║ ██║   ██║ ██╔══██╗ ╚════██║
 ██║  ██║ ██║      ██║      ██║  ██╗ ██║ ╚████║ ╚██████╔╝ ██████╔╝ ███████║
 ╚═╝  ╚═╝ ╚═╝      ╚═╝      ╚═╝  ╚═╝ ╚═╝  ╚═══╝  ╚═════╝  ╚═════╝  ╚══════╝



  Usage: knobs [options] [command]

  Options:

    -V, --version                output the version number
    -h, --help                   output usage information

  Commands:

    parse <path>                 Find & upload feature flags from your project
    app-info                     Retrieve app name and appID
    app-remove [options]         Deletes the current app and all associated records from Appknobs
    apikey                       Retrieve your API key
    console                      Open Appknobs web console at console.appknobs.io
    register [email] [password]  Register on appknobs.io using your email address and password
    login [email] [password]     Log in to the service
    logout                       Log out from the service
    user                         Show current user
```

Note: the auth cache is stored in `YOUR_HOME_DIR/.appknobs/congito.json`.
