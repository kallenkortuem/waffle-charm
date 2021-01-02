import { render } from '@testing-library/react'
import React from 'react'
import DelayedSearchInput from './DelayedSearchInput'

describe('DelayedSeachInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DelayedSearchInput onSearhQueryChange={() => null} />
    )
    expect(baseElement).toBeTruthy()
  })
})
