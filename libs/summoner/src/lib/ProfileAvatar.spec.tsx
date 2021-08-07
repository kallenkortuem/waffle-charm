import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import ProfileAvatar from './ProfileAvatar'

enablei18nMocks()

jest.mock('@waffle-charm/store', () => {
  return {
    useLolVersion: jest
      .fn(() => ({ lolVersion: '10.3.1' }))
      .mockName('useLolVersion'),
  }
})
describe('ProfileAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileAvatar summoner={null} />)
    expect(baseElement).toBeTruthy()
  })
})
