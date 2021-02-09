import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import '../../../i18n'
import SkinPreferenceMenu from './SkinPreferenceMenu'

describe('SkinPreferenceMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <SkinPreferenceMenu championId={''} />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
