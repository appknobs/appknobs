# APPKNOBS CLIENT

> Appknobs.io feature flag service client for multiple environments

[Appknobs.io](https://appknobs.io/) is an easy & ergonomic feature flag
solution for your web & mobile apps, including modern libraries, management
console, config delivery & CLI tools.

This package contains the client to fetch configuration for the particular application instance.

# Environments

@appknobs/client supports the following environments:

* Browsers with [Fetch support](https://caniuse.com/#search=fetch)
* Node.js
* React Native
* Electron

> Please use a [fetch polyfill](https://github.com/lquixada/cross-fetch) if you target browsers without Fetch support

# Usage

```
// Pick the client appropriate for your use case:
import {newBrowserClient, newNodeClient, newRNClient} from '@appknobs/client'
import {newElectronClient} from '@appknobs/client/lib/newElectronClient'

const client = newNodeClient({appId: 'YOUR_APP_ID', apiKey: 'YOUR_API_KEY'})
const payload = {username: me@example.com}
const {features} = await client.evaluate(payload)
```

# API

`client.evaluate(payload)`

Send the payload - a plain JS object, matching the conditions set up on the [feature management console](https://console.appknobs.io) - to the evaluation endpoint and get the list of features associated to the application.

The response will contain each feature with a boolean flag indicating if it's enabled or not:

```
{
  features: {
    featureName1: true,
    featureName2: false
  }
}
```

You can either implement your logic based on this map or pass it to a UI library, e.g. into [@appknobs/react](https://www.npmjs.com/package/@appknobs/react):

```
const {features} = await client.evaluate({...})

<Appknobs features={features}>...</Appknobs>
```

# Selective import

If you want to keep the imported module size to a minimum you are welcome to use selective import statements:

```
import {newBrowserClient} from '@appknobs/client/lib/newBrowserClient'
```
