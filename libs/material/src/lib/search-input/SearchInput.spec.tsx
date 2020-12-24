import React from 'react'
import { render } from '@testing-library/react'

import SearchInput from './SearchInput'

describe('SearchInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchInput />)
    expect(baseElement).toBeTruthy()
  })
})
