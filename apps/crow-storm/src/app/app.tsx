import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
  SummonerDTO,
} from '@waffle-charm/api-interfaces'
import React, { useEffect, useState } from 'react'
import './app.scss'

const SUMMONER_NAME_KEY = 'summonerName'
const initialSummonerName = sessionStorage.getItem(SUMMONER_NAME_KEY)

export const App = (): React.ReactElement => {
  const [summoner, setSummoner] = useState<SummonerDTO>()
  const [summonerName, setSummonerName] = useState(initialSummonerName)
  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>()
  const [championData, setChampionData] = useState<ChampionDataDragon>()

  function getSummoner(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    fetch(`/api/summoner/${summonerName}`)
      .then((_) => _.json())
      .then((value) => {
        setSummoner(value)
      })
  }

  function handleSetSummonerName(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setSummonerName(value)
    sessionStorage.setItem(SUMMONER_NAME_KEY, value)
  }

  useEffect(() => {
    if (summoner) {
      fetch(`/api/mastery/by-summoner/${summoner.id}`)
        .then((_) => _.json())
        .then((value) => {
          setMasteries(value)
        })
    }
  }, [summoner])

  useEffect(() => {
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/champion.json`
    )
      .then((_) => _.json())
      .then((value) => {
        setChampionData(value)
      })
  }, [])

  const mappedData: { [key: number]: ChampionData } = Object.entries(
    championData?.data || []
  ).reduce((accumulated, [_, entry]) => {
    accumulated[entry.key] = entry
    return accumulated
  }, {})

  return (
    <div id="wrapper">
      <div>
        <h1>Welcome to crow-storm!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt=""
        />
      </div>
      <form onSubmit={getSummoner}>
        <input
          type="text"
          value={summonerName}
          onChange={handleSetSummonerName}
        />
        <button type="submit">Search</button>
      </form>
      <pre>Summoner: {JSON.stringify(summoner, null, 4)}</pre>
      <ul>
        {masteries?.map((mastery) => (
          <li key={mastery.championId}>
            {mastery.championLevel} | {mappedData[mastery.championId]?.name} |{' '}
            {mastery.tokensEarned ? mastery.tokensEarned : ''}
          </li>
        ))}
      </ul>
      <pre>Champion Masteries: {JSON.stringify(masteries?.[0], null, 4)}</pre>
      <pre>Champion Data: {JSON.stringify(mappedData?.[9], null, 4)}</pre>
    </div>
  )
}

export default App
