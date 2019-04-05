# APPKNOBS ANGULAR

> Declarative feature flags in Angular using Appknobs.io

[Appknobs.io](https://appknobs.io/) is an easy & ergonomic feature flag
solution for your web & mobile apps, including modern libraries, management
console, config delivery & CLI tools.

This package contains the Angular helper components.

# Status

Supports Angular 7.x

# Install

Add `@appknobs/angular` and `@appknobs/client`:

```sh
npm install @appknobs/angular @appknobs/client
```

or

```
yarn add @appknobs/angular @appknobs/client
```

# Usage

## Declaring features

You can use the Appknobs helper component to mark certain areas as managed features:

```html
<ak-feature name='polite-greeting'>
  <h1>Pleased to meet you!</h1>
</ak-feature>
```

## Import

In your `app.module.ts`, import the dependencies:

```ts
import { newBrowserClient } from '@appknobs/client';
import { AppknobsModule} from '@appknobs/angular';
```

Read [@appknobs/client README](https://www.npmjs.com/package/@appknobs/client) for the list of clients plus hints on performance and bundle size.

## Create a client instance

Also in `app.module.ts`, add

```ts
// Before @NgModule
const appknobsClient = newBrowserClient({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_API_KEY',
});
```

Go to [console.appknobs.io](https://console.appknobs.io/) to grab your API key and App ID or [read this detailed tutorial](https://appknobs.io/blog/getting-to-know-the-appknobs-console).

## Configure Appknobs

```ts
@NgModule({
  // ...
  imports: [
    // ...
    AppknobsModule.forRoot({client: appknobsClient}),
  ],
  // ...
})
export class AppModule { }
```

## Fetch the feature list

You can fetch the list of enabled features any time. A quick & simple solution is to do it once at startup.

Inject `AppknobsService` into `app.component.ts` and make the call:

```ts
import { Component, OnInit } from '@angular/core';
import {AppknobsService} from '@appknobs/angular';

@Component({
  // ...
})
export class AppComponent implements OnInit {
  private appknobs = null;

  constructor(appknobs: AppknobsService) {
    this.appknobs = appknobs;
  }

  ngOnInit() {
    // If you toggle features by deployment target:
    this.appknobs.evaluate({hostname: document.location.hostname});
  }
}
```

Once configured, you can call `AppknobsService.evaluate(payload)` any time and all features will toggle depending on the response.


---

For more information visit [appknobs.io](https://appknobs.io/) or read in-depth tutorials in [our blog](https://appknobs.io/blog).
You can get reach us at hello@appknobs.io or on [@appknobs](https://twitter.com/Appknobs). We'd appreciate your feedback!

