import React, { useEffect, useState } from 'react'
import { MatchlistDto, SummonerDTO } from '@waffle-charm/api-interfaces'

import styles from './index.module.scss'

export const Index = () => {
  const [summoner, setSummoner] = useState<SummonerDTO>(null)
  const [summonerName, setSummonerName] = useState('')
  const [matchHistory, setMatchHistory] = useState<MatchlistDto>(null)

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

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./${fileName}.${style} file.
   */
  return (
    <div className={styles.page}>
      <form onSubmit={getSummoner}>
        <input
          type="text"
          onChange={(event) => setSummonerName(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <pre>Summoner: {JSON.stringify(summoner, null, 4)}</pre>
      <pre>Match History: {JSON.stringify(matchHistory, null, 4)}</pre>
    </div>
  )
}

export default Index
