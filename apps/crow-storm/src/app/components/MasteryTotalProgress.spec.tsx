import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../+store'
import MasteryTotalProgress from './MasteryTotalProgress'

describe('MasteryTotalProgress', () => {
  const onTagChange = (event: React.MouseEvent<HTMLElement>, tag: string) => {
    return null
  }
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <MasteryTotalProgress
          summonerName="fiddlesucx"
          onTagChange={onTagChange}
        />
      </Provider>
    )
    expect(baseElement).toBeTruthy()
  })
})
