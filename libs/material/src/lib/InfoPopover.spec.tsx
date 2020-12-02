import React from 'react'
import { render } from '@testing-library/react'

import InfoPopover from './InfoPopover'

describe('InfoPopover', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfoPopover text="Hello" />)
    expect(baseElement).toBeTruthy()
  })
})
