import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import ProfileAvatar from './ProfileAvatar'

enablei18nMocks()

describe('ProfileAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileAvatar summoner={null} />)
    expect(baseElement).toBeTruthy()
  })
})
