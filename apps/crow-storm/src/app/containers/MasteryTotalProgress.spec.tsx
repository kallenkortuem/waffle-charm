import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@waffle-charm/store'
import MasteryTotalProgress from './MasteryTotalProgress'
import '../../i18n'

describe('MasteryTotalProgress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryTotalProgress summonerName="fiddlesucx" />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
