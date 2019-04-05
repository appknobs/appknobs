import {InjectionToken} from '@angular/core'
import {AppknobsClient} from '@appknobs/client'

export interface AppknobsConfig {
  client: AppknobsClient
}

export const AppknobsConfigService = new InjectionToken<AppknobsConfig>('AppknobsConfig')
