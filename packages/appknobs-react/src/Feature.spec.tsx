import * as React from 'react'
import * as testRenderer from 'react-test-renderer'
import {Appknobs as AppknobsCurrent} from './Appknobs'
import {Feature as FeatureCurrent} from './Feature'
import {Appknobs as AppknobsLegacy} from './legacy/Appknobs'
import {Feature as FeatureLegacy} from './legacy/Feature'

const runTest = (version, Appknobs, Feature) => {
  describe(`Feature (${version})`, () => {
    describe('Node Child', () => {
      it('is rendered if feature is true', async () => {
        expect(
          testRenderer
            .create(
              <Appknobs client={null} payload={null} features={{f1: true}}>
                <Feature name='f1'>
                  <span>f1 is enabled</span>
                </Feature>
              </Appknobs>,
            )
            .toJSON(),
        ).toMatchInlineSnapshot(`
<span>
  f1 is enabled
</span>
`)
      })

      it('is not rendered if feature is false', async () => {
        expect(
          testRenderer
            .create(
              <Appknobs client={null} payload={null} features={{f2: false}}>
                <Feature name='f2'>
                  <span>f1 is enabled</span>
                </Feature>
              </Appknobs>,
            )
            .toJSON(),
        ).toMatchInlineSnapshot(`null`)
      })
    })

    describe('Function Child', () => {
      it('passes enabled status "true" to function', async () => {
        expect.assertions(1)

        expect(
          testRenderer.create(
            <Appknobs client={null} payload={null} features={{f1: true}}>
              <Feature
                name='f1'
                render={(enabled: boolean) => {
                  expect(enabled).toBe(true)

                  return null
                }}
              />
            </Appknobs>,
          ),
        )
      })

      it('passes enabled status "false" to function', async () => {
        expect.assertions(1)

        expect(
          testRenderer.create(
            <Appknobs client={null} payload={null} features={{f1: false}}>
              <Feature
                name='f1'
                render={(enabled: boolean) => {
                  expect(enabled).toBe(false)

                  return null
                }}
              />
            </Appknobs>,
          ),
        )
      })
    })
  })
}

runTest('current', AppknobsCurrent, FeatureCurrent)
runTest('legacy', AppknobsLegacy, FeatureLegacy)
