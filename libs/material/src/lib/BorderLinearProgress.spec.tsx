import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import BorderLinearProgress from './BorderLinearProgress'

enablei18nMocks()

describe('BorderLinearProgress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BorderLinearProgress />)
    expect(baseElement).toBeTruthy()
  })
})
