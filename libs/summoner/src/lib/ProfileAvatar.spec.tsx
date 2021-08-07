import { render } from '@testing-library/react'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import * as store from '@waffle-charm/store'
import React from 'react'
import ProfileAvatar from './ProfileAvatar'

enablei18nMocks()

jest
  .spyOn(store, 'useLolVersion')
  .mockImplementation(() => ({ lolVersion: '10.3.1' }))

describe('ProfileAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileAvatar summoner={null} />)
    expect(baseElement).toBeTruthy()
  })
})
