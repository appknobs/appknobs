import * as React from 'react'
import {AppknobsWrapperLogic} from './AppknobsWrapperLogic'
import {Context} from './Context'

export class Appknobs extends AppknobsWrapperLogic {
  public render() {
    const {features, client, payload, ...rest} = this.props

    return (
      <Context.Provider value={this.state.features}>
        {React.cloneElement(
          this.props.children as React.ReactElement<any>,
          rest,
        )}
      </Context.Provider>
    )
  }
}
