import React from 'react'
import { render } from '@testing-library/react'

import MasteryModuleView from './MasteryModuleView'
import { Provider } from 'react-redux'
import { store } from '@waffle-charm/store'

describe('MasteryModuleView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryModuleView />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
