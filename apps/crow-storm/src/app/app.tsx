import React, { useEffect, useState } from 'react'
import { MatchlistDto, SummonerDTO,ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import './app.scss'

export const App = (): React.ReactElement => {
  const [summoner, setSummoner] = useState<SummonerDTO>(null)
  const [summonerName, setSummonerName] = useState('')
  const [matchHistory, setMatchHistory] = useState<MatchlistDto>(null)
  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>([]);

  function getSummoner(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    fetch(`/api/summoner/${summonerName}`)
      .then((_) => _.json())
      .then((value) => {
        setSummoner(value)
      })
  }

  useEffect(() => {
    if (summoner) {
      fetch(`/api/match/${summoner.accountId}`)
        .then((_) => _.json())
        .then((value) => {
          setMatchHistory(value)
        })
    }
  }, [summoner])

  useEffect(() => {
    if (summoner) {
      fetch(`/api/mastery/by-summoner/${summoner.id}`)
        .then((_) => _.json())
        .then((value) => {
          setMasteries(value)
        })
    }
  }, [summoner])

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
          onChange={(event) => setSummonerName(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <pre>Summoner: {JSON.stringify(summoner, null, 4)}</pre>
      <pre>Champion Masteries: {JSON.stringify(masteries, null, 4)}</pre>
      <pre>Match History: {JSON.stringify(matchHistory, null, 4)}</pre>
    </div>
  )
}

export default App
