import React from 'react'
import { render } from '@testing-library/react'

import MasteryViewerTagSelect from './MasteryViewerTagSelect'

describe('MasteryViewerTagSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryViewerTagSelect />)
    expect(baseElement).toBeTruthy()
  })
})
