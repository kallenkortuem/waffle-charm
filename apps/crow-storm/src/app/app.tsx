import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
  SummonerDTO,
} from '@waffle-charm/api-interfaces'
import React, { useEffect, useState } from 'react'
import './app.scss'
import CSSGrid from './CSSGrid/CSSGrid'
import MasteryCard from './MasteryCard/MasteryCard'
import MasteryFilter from './MasteryFilter/MasteryFilter'
import PrimarySearchBar from './PrimarySearchBar/PrimarySearchBar'

const SUMMONER_NAME_KEY = 'summonerName'
const MASTERY_LEVELS = 'masteryLevels'
const initialSummonerName = sessionStorage.getItem(SUMMONER_NAME_KEY) || ''
const initialMasteryLevels = JSON.parse(
  sessionStorage.getItem(MASTERY_LEVELS) || '[5, 6, 7]'
)

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
    paper: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    },
  })
)

export const App = (): React.ReactElement => {
  const [open, setOpen] = useState(false)
  const [err, setErr] = useState<{ statusCode: number; message: string }>()
  const [summoner, setSummoner] = useState<SummonerDTO>()
  const [summonerName, setSummonerName] = useState(initialSummonerName)
  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>([])
  const [championData, setChampionData] = useState<ChampionDataDragon>()
  const [masteryLevels, setMasteryLevels] = useState(() => initialMasteryLevels)

  const classes = useStyles()

  const getSummoner = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (summonerName) {
      fetch(`/api/summoner/${summonerName}`)
        .then((_) => _.json())
        .then((value) => {
          if (value && !value.statusCode) {
            setSummoner(value)
          } else {
            setOpen(true)
            setErr(value)
          }
        })
    } else {
      setSummoner(undefined)
      setMasteries([])
    }
  }

  const handleSetSummonerName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target
    setSummonerName(value)
    sessionStorage.setItem(SUMMONER_NAME_KEY, value)
  }

  const handleSetMasteryLevels = (
    event: React.MouseEvent<HTMLElement>,
    value: number[]
  ) => {
    setMasteryLevels(value)
    sessionStorage.setItem(MASTERY_LEVELS, JSON.stringify(value))
  }

  useEffect(() => {
    if (summoner) {
      fetch(`/api/mastery/by-summoner/${summoner.id}`)
        .then((_) => _.json())
        .then((value) => {
          if (value && !value.statusCode && Array.isArray(value)) {
            setMasteries(value)
          } else {
            setOpen(true)
            setErr(value)
          }
        })
    }
  }, [summoner])

  useEffect(() => {
    getSummoner()
  }, [])

  useEffect(() => {
    fetch(
      `http://ddragon.leagueoflegends.com/cdn/10.22.1/data/en_US/champion.json`
    )
      .then((_) => _.json())
      .then((value) => {
        if (value && !value.statusCode) {
          setChampionData(value)
        } else {
          setOpen(true)
          setErr(value)
        }
      })
  }, [])

  const mappedData: Record<number, ChampionData> =
    Object.entries(championData?.data || []).reduce(
      (accumulated, [_, entry]) => {
        accumulated[entry.key] = entry
        return accumulated
      },
      {}
    ) || {}

  const groupedMasteries: Record<number, ChampionMasteryDTO[]> =
    masteries.reduce((accum, current) => {
      if (accum[current.championLevel]) {
        accum[current.championLevel].push(current)
      } else {
        accum[current.championLevel] = [current]
      }
      return accum
    }, {}) || {}

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <PrimarySearchBar
        query={summonerName}
        onQueryChange={handleSetSummonerName}
        onSearch={getSummoner}
      ></PrimarySearchBar>
      <Container maxWidth="md">
        <div>
          <h1>Champion Mastery</h1>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {err?.statusCode}: {err?.message}
          </Alert>
        </Snackbar>
        <MasteryFilter
          masteryLevels={masteryLevels}
          onChange={handleSetMasteryLevels}
        />
        {Object.entries(groupedMasteries)
          .sort(([a], [b]) => parseInt(b) - parseInt(a))
          .map(([key, group]) => {
            return masteryLevels.includes(parseInt(key)) ? (
              <div key={key}>
                <h2>Mastery {key}</h2>
                <p>{group?.length} Champions</p>
                <div className={classes.root}>
                  <CSSGrid>
                    {group?.map((mastery) => (
                      <MasteryCard
                        key={mastery.championId}
                        mastery={mastery}
                        champion={mappedData[mastery.championId]}
                      />
                    ))}
                  </CSSGrid>
                </div>
              </div>
            ) : null
          })}
      </Container>
    </>
  )
}

export default App
