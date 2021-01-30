import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@waffle-charm/store'
import SettingsDrawer from './SettingsDrawer'
import '../../i18n'
describe('SettingsDrawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <SettingsDrawer />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
