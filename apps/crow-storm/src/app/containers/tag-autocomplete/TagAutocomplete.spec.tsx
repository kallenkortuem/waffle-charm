import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import '../../../i18n'
import TagAutocomplete from './TagAutocomplete'

describe('TagAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <TagAutocomplete />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
