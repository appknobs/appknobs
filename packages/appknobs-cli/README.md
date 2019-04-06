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

    parse [options] <path>       Find & upload feature flags from your project
    app-info                     Retrieve app name and appID
    app-remove [options]         Deletes the current app and all associated records from Appknobs
    apikey                       Retrieve your API key
    console                      Open Appknobs web console at console.appknobs.io
    register [email] [password]  Register on appknobs.io using your email address and password
    login [email] [password]     Log in to the service
    logout                       Log out from the service
    user                         Show current user
```

## `$ appknobs parse`

```
Find & upload feature flags from your project. Will auto-guess the framework type if not specified.

Options:
  -t --type <framework>  Specify the framework type: "angular" or "react"
  -h, --help             output usage information
```

Auto feature-discovery by `appknobs parse` is supported in Angular and React. In Angular only `.html` files are considered at the moment.

You can run the command multiple times, flags are recorded only once.

About project types: usually, the framework/library is correctly guessed, so you don't need to specify anything. Pass `--type Angular` if your flags are not found as the default/fallback is React.

### Examples

To find flags in `./src` in your React app:

```
$ appknobs parse src/
```

To discover flags in an Angular app the same command works just fine:

```
$ appknobs parse src/
```

In case you're file names don't follow the Angular convention try

```
$ appknobs parse src/ --type angular
```


---

Note: the authentication cache is stored in `YOUR_HOME_DIR/.appknobs/congito.json`.
