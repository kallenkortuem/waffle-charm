import React from 'react'
import { render } from '@testing-library/react'

import ExpandButton from './ExpandButton'
import { enablei18nMocks } from '@waffle-charm/testing-utils'

enablei18nMocks()
describe('ExpandButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExpandButton />)
    expect(baseElement).toBeTruthy()
  })
})
