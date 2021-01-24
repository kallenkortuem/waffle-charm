import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import { enableFetchMocks } from 'jest-fetch-mock'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
enablei18nMocks()
enableFetchMocks()

describe('App', () => {
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
