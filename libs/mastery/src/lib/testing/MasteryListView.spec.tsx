import React from 'react'
import { render } from '@testing-library/react'

import MasteryListView from '../MasteryListView'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'

describe('MasteryListView', () => {
  const masteries: ChampionMasteryDTO[] = []
  const championMap: Record<number, ChampionData> = {}
  it('should render successfully', () => {
    const { baseElement } = render(
      <MasteryListView
        masteryLevels={['7', '6', '5']}
        tag="Assasin"
        masteries={masteries}
        sortAscending={false}
        championMap={championMap}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
