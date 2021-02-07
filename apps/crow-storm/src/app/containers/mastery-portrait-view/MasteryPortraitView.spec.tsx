import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import '../../i18n'
import { MasteryPortraitView } from './MasteryPortraitView'

describe('MasteryPortraitView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryPortraitView />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
