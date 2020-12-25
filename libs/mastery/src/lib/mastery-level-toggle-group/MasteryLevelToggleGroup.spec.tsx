import React from 'react'
import { render } from '@testing-library/react'

import MasteryLevelToggleGroup from './MasteryLevelToggleGroup'

describe('MasteryLevelToggleGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryLevelToggleGroup />)
    expect(baseElement).toBeTruthy()
  })
})
