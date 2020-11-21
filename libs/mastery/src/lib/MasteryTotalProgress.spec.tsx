import { render } from '@testing-library/react'
import {
  ChampionData,
  ChampionMasteryDTO,
  SummonerDTO,
} from '@waffle-charm/api-interfaces'
import React from 'react'
import MasteryTotalProgress from './MasteryTotalProgress'

describe('MasteryTotalProgress', () => {
  const masteries: ChampionMasteryDTO[] = []
  const championMap: Record<number, ChampionData> = {}
  const summoner: SummonerDTO = {
    accountId: '',
    id: '',
    name: '',
    profileIconId: 1,
    puuid: '',
    revisionDate: 1000,
    summonerLevel: 300,
  }
  const handleTagChange = () => {
    return null
  }
  it('should render successfully', () => {
    const { baseElement } = render(
      <MasteryTotalProgress
        allTags={[]}
        masteries={masteries}
        championMap={championMap}
        summoner={summoner}
        onTagChange={handleTagChange}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
