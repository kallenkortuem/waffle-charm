import React from 'react'
import { render } from '@testing-library/react'

import WelcomeBanner from '../WelcomeBanner'

describe('WelcomeBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WelcomeBanner />)
    expect(baseElement).toBeTruthy()
  })
})
