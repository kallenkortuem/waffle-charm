import { render } from '@testing-library/react'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'
import MasteryGridGroup from './MasteryGridGroup'

describe('MasteryGridGroup', () => {
  const groupedMasteries: Record<number, ChampionMasteryDTO[]> = {}
  const championMap: Record<number, ChampionData> = {}
  it('should render successfully', () => {
    const { baseElement } = render(
      <MasteryGridGroup
        level={'7'}
        tag="Assasin"
        championMap={championMap}
        groupedMasteries={groupedMasteries}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
