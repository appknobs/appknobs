import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'
import {withAppknobs} from './withAppknobs'

enzyme.configure({adapter: new Adapter()})

describe('With Appknobs', () => {
  it('generated component passes extra props to children', async () => {
    const extras = {
      a: 1,
      b: 2,
    }

    const Comp = () => <span>1</span>
    const CompWithAppknobs = withAppknobs(null, {})(Comp)

    const wrapper = enzyme.shallow(<CompWithAppknobs {...extras} />)

    expect(wrapper.children().props()).toEqual(
      expect.objectContaining({
        a: 1,
        b: 2,
      }),
    )
  })
})
