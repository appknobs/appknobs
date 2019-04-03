import * as React from 'react'
import {Context} from './Context'
import {FeatureProps, renderFeature} from './renderFeature'

export const Feature = (props: FeatureProps) => (
  <Context.Consumer>
    {(features) => {
      return renderFeature(props, features)
    }}
  </Context.Consumer>
)
