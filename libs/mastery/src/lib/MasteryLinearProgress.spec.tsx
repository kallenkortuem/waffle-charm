import React from 'react'
import { render } from '@testing-library/react'

import MasteryLinearProgress from './MasteryLinearProgress'

describe('MasteryLinearProgress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MasteryLinearProgress
        current={500}
        total={1000}
        label="500 / 1000 mastery points"
        progress={50}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
