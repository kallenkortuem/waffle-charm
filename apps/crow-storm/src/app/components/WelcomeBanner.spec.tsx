import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import WelcomeBanner from './WelcomeBanner'

enablei18nMocks()

describe('WelcomeBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WelcomeBanner />)
    expect(baseElement).toBeTruthy()
  })
})
