import { render } from '@testing-library/react'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import MasteryGridGroup from './MasteryGridGroup'

enablei18nMocks()
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
