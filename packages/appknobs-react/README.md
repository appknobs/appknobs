# APPKNOBS REACT

> Declarative feature flags in React using Appknobs.io

[Appknobs.io](https://appknobs.io/) is an easy & ergonomic feature flag
solution for your web & mobile apps, including modern libraries, management
console, config delivery & CLI tools.

This package contains the React helper components.

# Setup

Add `@appknobs/react` and `@appknobs/client` as a dependency:

For NPM:

```sh
npm install @appknobs/react @appknobs/client
// or
yarn add @appknobs/react @appknobs/client
```

> The [@appknobs/client](https://www.npmjs.com/package/@appknobs/client) README has a few hints on performance and bundle size

# Usage

## React versions

For React 16.3.0 and above use the top level `@appknobs/react` modules:

```js
import {Appknobs, Feature} from '@appknobs/react'
// or
const {Appknobs, Feature} = require('@appknobs/react')
```

For React 15.0.0+ use `@appknobs/react/lib/legacy`:

```js
import {Appknobs, Feature} from '@appknobs/react/lib/legacy'
// or
const {Appknobs, Feature} = require('@appknobs/react/lib/legacy')
```

## Browser only example

The simplest way to make a feature manageable by Appknobs is to wrap it in a `<Feature>` tag.

```jsx
import * as React from 'react'
import {render} from 'react-dom'
import {Appknobs, Feature} from '@appknobs/react'
import {newBrowserClient} from '@appknobs/client'
// for smaller client bundle size you can use
// import {newBrowserClient} from '@appknobs/client/lib/newBrowserClient'

class App extends React.Component {
   public render() {
    return (
      <Appknobs client={this.props.client} payload={{email: 'foo@example.com'}}>
          <Feature name='first-feature'>
            <p>This feature is hidden behind a feature toggle!</p>
          </Feature>
      </Appknobs>
    )
  }
}

const client = newBrowserClient({apiKey: 'YOUR_API_KEY', appId: 'YOUR_APP_ID'})

render(<App client={client} />, document.querySelector('#root'))
```

If you use [@appknobs/cli](https://www.npmjs.com/package/@appknobs/cli) for feature discovery, the feature name must be a string literal and not a variable.

For performance reasons we recommend using render props though - see below

See the "Application Setup" section for getting your `appId` and `apiKey`

## Function as children aka render props

`<Feature>` supports the technique called [render props](https://reactjs.org/docs/render-props.html) allowing you to implement any custom rendering logic. It is especially useful in the following cases:

### Prevent mounting the child component

Components wrapped in `<Feature>` are still mounted. To prevent this, you can use a similar condition to avoid performance penalty or unwanted side effects:

```jsx
<Feature
  name='cats'
  render={(enabled) => enabled && <Cats />)}
/>
```

### Wrapping breaks styling

Some libraries dictate strict component hierarchy hence you can't directly wrap components in `<Feature>`.
One solution to this problem is the following:

```jsx
<Feature name='cats' render={(enabled) => (
  <Menu>
    <Menu.Item>Dogs</Menu.Item>
    {enabled && <Menu.Item>Cats</Menu.Item>}
  </Menu>
)} />
```

## Server-side Rendering (SSR) example

```js
import {Feature, withAppknobs} from '@appknobs/react'
import {newNodeClient} from '@appknobs/client'

server.get('/', async (req, res) => {
    const payload = {environment: 'QA'}
    const client = newNodeClient({apiKey: 'YOUR API KEY', appId: 'YOUR APP ID'})
    const {features} = await client.evaluate(payload)
    const App = withAppknobs(client, features)(MyApp)
    const markup = renderToString(<App />)

    res.status(200).send(
      `<!doctype html>
    <html lang="">
      <head>
          <title>Appknobs Example</title>
      </head>
      <body>
          <div>${markup}</div>
      </body>
    </html>`,
    )
  })
```

## React Native & Electron

Besides Node and browsers, `@appknobs/client` supports React Native and Electron runtimes too so the `<Appknobs>`, `<Feature>` and other modules work as expected. For more details, check out [@appknobs/client](https://www.npmjs.com/package/@appknobs/client)

# Application Setup

To take advantage of the Appknobs ecosystem, you will need to

* Register a user
* Grab an API key
* Register one or more applications (website or mobile app).

You can either use the [Appknobs web Console](http://console.appknobs.io/) or the [`@appknobs/cli`](https://www.npmjs.com/package/@appknobs/cli)  CLI tool.

To use the Console, visit http://console.appknobs.io/.

To use the CLI tool, install it with

```sh
npm install -g @appknobs/react
// or
yarn global add @appknobs/react
```

## Register a user

You can [register online](https://console.appknobs.io/register) or inside your project folder run

```sh
knobs register
```

You will be asked for an email address and a password.
**Note your API key**.

## Parse your codebase

Let Appknobs look up the feature flags in your codebase and register an app for you, e.g.:

```sh
knobs parse src/
```

Example output, assuming you've implemented two `<Feature>` components:

```sh
App name: my-shop
App ID: H~6Jil_RTt~PT2BGjR~ZU
Found the following flags:
👉 new-section
👉 delete-button
Saving flags...
👍 new-section saved
👍 delete-button saved
```

**You will need to copy-paste the App ID** seen above to the Appknobs client implementation, so for the above example:

```js
const appknobsClient = newClient({apiKey: 'ASDJI1mY3uW29bO50MA2q', appId: 'H~6Jil_RTt~PT2BGjR~ZU'})
```

Your app name will be picked up from `package.json` and this is only for your reference.

# Feature management

You'll now be able to log in with your username and password and see your apps and corresponding feature flags on the web console:

https://console.appknobs.io/

## Conditions

The rules for enabling or disabling certain feature flags can be set using *conditions*.

Conditions are evaluated based on two things:

- the **payload** coming from your client-side code
- the **conditions** you set on the console that must be true for the feature to be enabled

## Simple example

### Feature

Consider the following basic feature flag:

```jsx
<Feature name='foo'>
  <h1>Hello</h1>
</Feature>
```

Note: features are disabled by default.

### Condition

Imagine a simple condition, with the following, single rule:

Property: `email`

Predicate: `startsWith`

Argument: `foo`

### Payload

Now, assuming your client-side code sends the following payload using `@appknobs/react`:

```js
await client.evaluate({email: 'foo@example.com'})
```

the feature will be enabled, while in the following case

```js
await client.evaluate({email: 'bar@example.com'})
```

the feature will not be visible to the end user.

Visit https://console.appknobs.io/ to implement your own use cases.

---

We appreciate your feedback! Get in touch at hello@appknobs.io or [@appknobs](https://twitter.com/Appknobs)
