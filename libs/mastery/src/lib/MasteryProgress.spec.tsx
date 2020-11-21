import React from 'react'
import { render } from '@testing-library/react'

import MasteryProgress from './MasteryProgress'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'

describe('MasteryProgress', () => {
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
    const { baseElement } = render(<MasteryProgress mastery={mastery} />)
    expect(baseElement).toBeTruthy()
  })
})
