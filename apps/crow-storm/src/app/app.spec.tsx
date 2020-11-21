import { render } from '@testing-library/react'
import { enableFetchMocks } from 'jest-fetch-mock'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
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
        <App />
      </BrowserRouter>
    )

    expect(baseElement).toBeTruthy()
  })

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(getByText('Champion Mastery')).toBeTruthy()
  })
})
