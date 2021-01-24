import React from 'react'
import { render } from '@testing-library/react'

import { MasteryCompactView } from './MasteryCompactView'

describe('MasteryCompactView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryCompactView />)
    expect(baseElement).toBeTruthy()
  })
})
