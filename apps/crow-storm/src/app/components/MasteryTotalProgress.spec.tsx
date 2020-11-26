import React from 'react'
import { render } from '@testing-library/react'

import MasteryTotalProgress from './MasteryTotalProgress'

describe('MasteryTotalProgress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryTotalProgress />)
    expect(baseElement).toBeTruthy()
  })
})
