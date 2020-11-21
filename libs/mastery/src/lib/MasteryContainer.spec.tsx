import React from 'react'
import { render } from '@testing-library/react'

import MasteryContainer from './MasteryContainer'

describe('MasteryContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryContainer>{}</MasteryContainer>)
    expect(baseElement).toBeTruthy()
  })
})
