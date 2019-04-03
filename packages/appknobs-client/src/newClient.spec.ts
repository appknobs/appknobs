import * as dateMock from 'jest-date-mock'
import {mockApiCall} from './mockApiCall'
import {newClient} from './newClient'

const testEnv = {
  appId: 'test',
  apiKey: 'abc',
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe(`New Client`, () => {
  it(`returns expected shape`, async () => {
    const client = newClient({evaluateApiCall: mockApiCall})(testEnv)

    expect(client).toMatchInlineSnapshot(`
Object {
  "evaluate": [Function],
  "subscribe": [Function],
}
`)
  })

  describe(`Evaluate`, () => {
    it(`passes apikey, projectId and payload to evaluate fn`, async () => {
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      const payload = {a: 1}

      await client.evaluate(payload)

      expect(mockApiCall).toHaveBeenCalledWith({
        projectId: testEnv.appId,
        apikey: testEnv.apiKey,
        payload,
      })
    })

    it(`returns result`, async () => {
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      const payload = {a: 1}

      const result = await client.evaluate(payload)

      expect(result).toEqual({features: {mock: true}})
    })

    it(`does not call the eval function twice in a row with the same payload`, async () => {
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      const payload = {a: 1}

      await client.evaluate(payload)
      await client.evaluate(payload)

      expect(mockApiCall).toHaveBeenCalledTimes(1)
    })

    it(`returns the same result twice in a row for the same payload`, async () => {
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      const payload = {a: 1}

      const result1 = await client.evaluate(payload)
      const result2 = await client.evaluate(payload)

      expect(result1).toEqual(result2)
    })

    it(`does call the eval function multiple times with different payloads`, async () => {
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)

      await client.evaluate({a: 1})
      await client.evaluate({a: 2})
      await client.evaluate({a: 1})

      expect(mockApiCall).toHaveBeenCalledTimes(3)
    })

    it(`response is cached for 1 minute`, async () => {
      dateMock.advanceTo()
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      const payload = {a: 1}

      await client.evaluate(payload)
      dateMock.advanceBy(60 * 1000)
      await client.evaluate(payload)

      expect(mockApiCall).toHaveBeenCalledTimes(1)
    })

    it(`response is not cached after 1 minute`, async () => {
      dateMock.advanceTo()
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      const payload = {a: 1}

      await client.evaluate(payload)
      dateMock.advanceBy(60 * 1000 + 1)
      await client.evaluate(payload)

      expect(mockApiCall).toHaveBeenCalledTimes(2)
    })

    it(`new response adds one minute to cache`, async () => {
      dateMock.advanceTo()
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      const payload = {a: 1}

      await client.evaluate(payload)
      dateMock.advanceBy(2 * 60 * 1000)
      await client.evaluate(payload)
      dateMock.advanceBy(60 * 1000)
      await client.evaluate(payload)

      expect(mockApiCall).toHaveBeenCalledTimes(2)
    })
  })

  describe(`Subscribe`, () => {
    it(`subscriber is called with result`, async () => {
      const subscriber = jest.fn()
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      client.subscribe(subscriber)

      const result = await client.evaluate({})

      expect(subscriber).toHaveBeenCalledWith(result)
    })
  })

  describe(`Unsubscribe`, () => {
    it(`removes callback from subscribers`, async () => {
      const subscriber = jest.fn()
      const client = newClient({evaluateApiCall: mockApiCall})(testEnv)
      const unsubscribe = client.subscribe(subscriber)
      unsubscribe()

      await client.evaluate({})

      expect(subscriber).not.toHaveBeenCalled()
    })
  })
})
