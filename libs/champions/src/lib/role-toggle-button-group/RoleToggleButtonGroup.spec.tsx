import React from 'react'
import { render } from '@testing-library/react'

import RoleToggleButtonGroup from './RoleToggleButtonGroup'

describe('RoleToggleButtonGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RoleToggleButtonGroup />)
    expect(baseElement).toBeTruthy()
  })
})
