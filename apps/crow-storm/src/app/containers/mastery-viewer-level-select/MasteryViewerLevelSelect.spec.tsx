import React from 'react'
import { render } from '@testing-library/react'

import MasteryViewerLevelSelect from './MasteryViewerLevelSelect'

describe('MasteryViewerLevelSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryViewerLevelSelect />)
    expect(baseElement).toBeTruthy()
  })
})
