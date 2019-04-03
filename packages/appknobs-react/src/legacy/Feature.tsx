import * as propTypes from 'prop-types'
import {Features} from '../AppknobsWrapperLogic'
import {FeatureProps, renderFeature} from '../renderFeature'

interface Context {
  features: Features
}

export const Feature = (props: FeatureProps, {features}: Context) => {
  return renderFeature(props, features)
}

// @ts-ignore
Feature.contextTypes = {
  features: propTypes.any,
}
