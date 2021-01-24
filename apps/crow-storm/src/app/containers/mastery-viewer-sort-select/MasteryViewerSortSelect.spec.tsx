import React from 'react'
import { render } from '@testing-library/react'

import MasteryViewerSortSelect from './MasteryViewerSortSelect'

describe('MasteryViewerSortSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryViewerSortSelect />)
    expect(baseElement).toBeTruthy()
  })
})
