import { render } from '@testing-library/react'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import MasteryToken from './MasteryToken'

enablei18nMocks()
describe('MasteryToken', () => {
  const mastery: ChampionMasteryDTO = {
    championId: 266,
    championLevel: 3,
    championPoints: 7849,
    lastPlayTime: 1559881170000,
    championPointsSinceLastLevel: 1849,
    championPointsUntilNextLevel: 4751,
    chestGranted: false,
    tokensEarned: 0,
    summonerId: '',
  }

  it('should render successfully', () => {
    const { baseElement } = render(
      <MasteryToken mastery={mastery} threshold={0} />
    )
    expect(baseElement).toBeTruthy()
  })
})
