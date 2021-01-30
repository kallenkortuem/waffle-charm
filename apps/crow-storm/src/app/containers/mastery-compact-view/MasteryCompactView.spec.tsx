import { render } from '@testing-library/react'
import { store } from '@waffle-charm/store'
import React from 'react'
import { Provider } from 'react-redux'
import { MasteryCompactView } from './MasteryCompactView'
import '../../../i18n'
describe('MasteryCompactView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryCompactView />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
