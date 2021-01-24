import React from 'react'
import { render } from '@testing-library/react'

import ExpandButton from './ExpandButton'

describe('ExpandButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExpandButton />)
    expect(baseElement).toBeTruthy()
  })
})
