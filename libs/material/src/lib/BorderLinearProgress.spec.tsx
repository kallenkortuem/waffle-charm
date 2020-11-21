import React from 'react'
import { render } from '@testing-library/react'

import BorderLinearProgress from './BorderLinearProgress'

describe('BorderLinearProgress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BorderLinearProgress />)
    expect(baseElement).toBeTruthy()
  })
})
