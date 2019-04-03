import * as React from 'react'
import {Features} from './AppknobsWrapperLogic'

type RenderFunction = (enabled: boolean) => React.ReactElement<any>

export interface FeatureProps {
  children?: React.ReactElement<any>
  name: string
  render?: RenderFunction
}

export const renderFeature = (
  props: FeatureProps,
  features: Features,
): React.ReactElement<any> => {
  const {render, children, name} = props

  if (typeof features !== 'object') {
    return null
  }

  if (render instanceof Function) {
    return render(features[name])
  }

  return features[name] ? children : null
}
