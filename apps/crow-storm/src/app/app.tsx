import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Badge from '@material-ui/core/Badge'
import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
  SummonerDTO,
} from '@waffle-charm/api-interfaces'
import React, { useEffect, useState } from 'react'
import './app.scss'
import ImageAvatar from './image-avatar/image-avatar'
import PrimarySearchAppBar from './primary-search-bar/primary-search-bar'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

const SUMMONER_NAME_KEY = 'summonerName'
const initialSummonerName = sessionStorage.getItem(SUMMONER_NAME_KEY)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
      },
    },
  })
)

export const App = (): React.ReactElement => {
  const [summoner, setSummoner] = useState<SummonerDTO>()
  const [summonerName, setSummonerName] = useState(initialSummonerName)
  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>()
  const [championData, setChampionData] = useState<ChampionDataDragon>()

  const classes = useStyles()

  function getSummoner(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (summonerName) {
      fetch(`/api/summoner/${summonerName}`)
        .then((_) => _.json())
        .then((value) => {
          setSummoner(value)
        })
    } else {
      setSummoner(undefined)
      setMasteries([])
    }
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
          if (value.statusCode) {
            return
          }
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

  const mappedData: { [key: number]: ChampionData } =
    Object.entries(championData?.data || []).reduce(
      (accumulated, [_, entry]) => {
        accumulated[entry.key] = entry
        return accumulated
      },
      {}
    ) || {}

  const groupedMasteries: {
    [key: number]: ChampionMasteryDTO[]
  } =
    masteries?.reduce((accum, current) => {
      if (accum[current.championLevel]) {
        accum[current.championLevel].push(current)
      } else {
        accum[current.championLevel] = [current]
      }
      return accum
    }, {}) || {}

  return (
    <>
      <PrimarySearchAppBar
        query={summonerName}
        onQueryChange={handleSetSummonerName}
        onSearch={getSummoner}
      ></PrimarySearchAppBar>
      <Container maxWidth="sm">
        <div>
          <h1>Champion Mastery</h1>
        </div>

        {Object.entries(groupedMasteries)
          .sort(([a], [b]) => parseInt(b) - parseInt(a))
          .map(([key, group]) => (
            <div key={key}>
              <h2>Mastery {key} </h2>
              <p>Count {group?.length}</p>
              <div className={classes.root}>
                <Paper className={'mastery-group'}>
                  {group?.map((mastery) => (
                    <Badge
                      key={mastery.championId}
                      badgeContent={mastery.tokensEarned}
                      color="secondary"
                    >
                      <ImageAvatar
                        src={`http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${
                          mappedData[mastery.championId]?.image?.full
                        }`}
                        alt={mappedData[mastery.championId]?.name}
                      ></ImageAvatar>
                    </Badge>
                  ))}
                </Paper>
              </div>
            </div>
          ))}

        <pre>Summoner: {JSON.stringify(summoner, null, 4)}</pre>
        <pre>Champion Masteries: {JSON.stringify(masteries?.[0], null, 4)}</pre>
        <pre>Champion Data: {JSON.stringify(mappedData?.[9], null, 4)}</pre>
      </Container>
    </>
  )
}

export default App
