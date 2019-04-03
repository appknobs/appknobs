import * as React from 'react'
import {Appknobs} from './Appknobs'
import {AppknobsClient, FeaturesAsProps} from './types'

export const withAppknobs = (
  client: AppknobsClient,
  features: FeaturesAsProps,
) => (WrappedComponent: React.ComponentType) => {
  return ({payload = null, ...rest}) => (
    <Appknobs client={client} features={features} payload={payload}>
      <WrappedComponent {...rest} />
    </Appknobs>
  )
}
