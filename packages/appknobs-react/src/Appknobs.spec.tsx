import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import * as testRenderer from 'react-test-renderer'
import {Appknobs as AppknobsCurrent} from './Appknobs'
import {Appknobs as AppknobsLegacy} from './legacy/Appknobs'

enzyme.configure({adapter: new Adapter()})

const runTest = (version, Appknobs) => {
  describe(`Appknobs ${version}`, () => {
    it('renders children', async () => {
      const Comp = () => <span>12</span>

      const tree = testRenderer
        .create(
          <Appknobs client={null}>
            <Comp />
          </Appknobs>,
        )
        .toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
}

runTest('current', AppknobsCurrent)
runTest('legacy', AppknobsLegacy)
