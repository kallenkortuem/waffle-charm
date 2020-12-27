import React from 'react'
import { render } from '@testing-library/react'

import ChipsArray from './ChipsArray'

describe('ChipsArray', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ChipsArray chips={[]} onSelectChip={() => ({})} />
    )
    expect(baseElement).toBeTruthy()
  })
})
