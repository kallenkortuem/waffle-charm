import { render } from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '@waffle-charm/store'
import App from './app'
import './i18n'

enableFetchMocks()

describe('App', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }))
  })

  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    )

    expect(baseElement).toBeTruthy()
  })
})
