import React from 'react'
import { render } from '@testing-library/react'

import MasteryListView from './MasteryListView'

describe('MasteryListView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MasteryListView />)
    expect(baseElement).toBeTruthy()
  })
})
