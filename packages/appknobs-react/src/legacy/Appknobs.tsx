import * as propTypes from 'prop-types'
import * as React from 'react'
import {AppknobsWrapperLogic} from '../AppknobsWrapperLogic'

export class Appknobs extends AppknobsWrapperLogic {
  public getChildContext() {
    return {
      features: this.state.features,
    }
  }

  public render() {
    const {children, features, client, payload, ...rest} = this.props

    return React.cloneElement(children as React.ReactElement<any>, rest)
  }
}

// @ts-ignore
Appknobs.childContextTypes = {
  features: propTypes.object,
}
