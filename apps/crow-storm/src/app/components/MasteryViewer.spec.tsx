import React from 'react'
import { render } from '@testing-library/react'

import MasteryViewer from './MasteryViewer'

describe('MasteryViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryViewer />)
    expect(baseElement).toBeTruthy()
  })
})
