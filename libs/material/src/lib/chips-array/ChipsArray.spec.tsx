import React from 'react'
import { render } from '@testing-library/react'

import ChipsArray from './ChipsArray'

describe('ChipsArray', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChipsArray />)
    expect(baseElement).toBeTruthy()
  })
})
