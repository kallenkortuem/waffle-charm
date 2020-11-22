import React from 'react'
import { render } from '@testing-library/react'

import PageContainer from './PageContainer'

describe('MasteryContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageContainer>{<div></div>}</PageContainer>)
    expect(baseElement).toBeTruthy()
  })
})
