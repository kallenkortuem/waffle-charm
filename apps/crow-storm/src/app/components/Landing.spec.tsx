import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import Landing from './Landing'

enablei18nMocks()

describe('Landing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Landing />)
    expect(baseElement).toBeTruthy()
  })
})
