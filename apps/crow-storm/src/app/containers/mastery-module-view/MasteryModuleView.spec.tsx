import React from 'react'
import { render } from '@testing-library/react'

import MasteryModuleView from './MasteryModuleView'

describe('MasteryModuleView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryModuleView />)
    expect(baseElement).toBeTruthy()
  })
})
