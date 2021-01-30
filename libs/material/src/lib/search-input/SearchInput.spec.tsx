import React from 'react'
import { render } from '@testing-library/react'

import SearchInput from './SearchInput'
import { enablei18nMocks } from '@waffle-charm/testing-utils'

enablei18nMocks()
describe('SearchInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchInput />)
    expect(baseElement).toBeTruthy()
  })
})
