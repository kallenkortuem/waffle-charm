import React from 'react'
import { render } from '@testing-library/react'

import ClashTeam from './clash-team'

describe('ClashTeam', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClashTeam />)
    expect(baseElement).toBeTruthy()
  })
})
