import React from 'react'
import { render } from '@testing-library/react'

import PageContainer from './PageContainer'

describe('MasteryContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageContainer>{}</PageContainer>)
    expect(baseElement).toBeTruthy()
  })
})
