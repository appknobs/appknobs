import * as React from 'react'
import {AppknobsClient} from './types'

export interface Features {
  [key: string]: boolean
}

interface Payload {
  [key: string]: any
}

interface Props {
  features?: Features
  client: AppknobsClient
  payload?: Payload
}

interface State {
  features: Features
  unsubscribe?: () => void
}

export class AppknobsWrapperLogic extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    const {features} = this.props

    this.state = {
      features,
    }
  }

  public trySubscribe() {
    if (!this.props.client) {
      return
    }

    if (this.state.unsubscribe) {
      return
    }

    const unsubscribe = this.props.client.subscribe(({features}) => {
      this.setState({features})
    })

    this.setState({unsubscribe})
  }

  public tryEvaluate() {
    if (this.props.payload) {
      if (!this.props.client) {
        return
      }

      this.props.client.evaluate(this.props.payload) // tslint:disable-line:no-floating-promises
    }
  }

  public componentDidMount() {
    this.trySubscribe()
    this.tryEvaluate()
  }

  public componentDidUpdate(prevProps) {
    this.trySubscribe()

    const clientChanged = prevProps.client !== this.props.client
    const featuresChanged = prevProps.features !== this.props.features

    if (clientChanged) {
      this.tryEvaluate()
    }

    if (featuresChanged) {
      this.setState({features: this.props.features})
    }
  }

  public componentWillUnmount() {
    if (this.state.unsubscribe) {
      this.state.unsubscribe()
    }
  }
}
