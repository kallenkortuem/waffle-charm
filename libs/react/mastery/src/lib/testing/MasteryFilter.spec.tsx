import React from 'react'
import { render } from '@testing-library/react'

import MasteryFilter from '../MasteryFilter'

describe('MasteryFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryFilter />)
    expect(baseElement).toBeTruthy()
  })
})
