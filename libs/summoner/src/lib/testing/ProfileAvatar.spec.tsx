import React from 'react'
import { render } from '@testing-library/react'

import ProfileAvatar from '../ProfileAvatar'

describe('ProfileAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileAvatar summoner={null} />)
    expect(baseElement).toBeTruthy()
  })
})
