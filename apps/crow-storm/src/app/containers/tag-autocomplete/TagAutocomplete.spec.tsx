import React from 'react'
import { render } from '@testing-library/react'

import TagAutocomplete from './TagAutocomplete'

describe('TagAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TagAutocomplete />)
    expect(baseElement).toBeTruthy()
  })
})
