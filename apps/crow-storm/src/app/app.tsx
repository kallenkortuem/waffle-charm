import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MuiAlert from '@material-ui/lab/Alert'
import Skeleton from '@material-ui/lab/Skeleton'
import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
  SummonerDTO,
} from '@waffle-charm/api-interfaces'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import './app.scss'
import CSSGrid from './CSSGrid/CSSGrid'
import MasteryFilter from './MasteryFilter/MasteryFilter'
import PrimarySearchBar from './PrimarySearchBar/PrimarySearchBar'

const MasteryCard = lazy(() => import('./MasteryCard/MasteryCard'))

const SUMMONER_NAME_KEY = 'summonerName'
const MASTERY_LEVELS = 'masteryLevels'
const initialSummonerName = sessionStorage.getItem(SUMMONER_NAME_KEY) || ''
const initialMasteryLevels: number[] = JSON.parse(
  sessionStorage.getItem(MASTERY_LEVELS) || '[5, 6, 7]'
)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      paddingTop: theme.spacing(1),
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(2, 0),
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
  const [sortAscending, setSortAscending] = useState(false)
  const [err, setErr] = useState<{ statusCode: number; message: string }>()
  const [summoner, setSummoner] = useState<SummonerDTO>()
  const [summonerName, setSummonerName] = useState(initialSummonerName)
  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>([])
  const [championData, setChampionData] = useState<ChampionDataDragon>()
  const [masteryLevels, setMasteryLevels] = useState(() => initialMasteryLevels)

  const classes = useStyles()

  const getSummoner = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    setSummoner(undefined)
    setMasteries([])
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

  const masteryGrid = masteryLevels
    .sort((a, b) => (sortAscending ? a - b : b - a))
    .map((level) => {
      const masteryGroup = groupedMasteries?.[level]
      const numberOfChampions = masteryGroup?.length || 0
      return (
        <div key={level}>
          <Typography variant="h5" component="h2">
            Mastery {level}
          </Typography>
          <Typography variant="caption" component="p">
            {`${numberOfChampions} ${
              numberOfChampions === 1 ? 'Champion' : 'Champions'
            }`}
          </Typography>
          <div className={classes.root}>
            <CSSGrid>
              {masteryGroup?.map((mastery) => (
                <Suspense
                  key={mastery.championId}
                  fallback={
                    <div>
                      <Skeleton variant="circle" width={40} height={40} />
                      <Skeleton variant="text" />
                    </div>
                  }
                >
                  <MasteryCard
                    mastery={mastery}
                    champion={mappedData[mastery.championId]}
                  />
                </Suspense>
              ))}
            </CSSGrid>
          </div>
        </div>
      )
    })

  return (
    <Suspense fallback={<CircularProgress />}>
      <PrimarySearchBar
        query={summonerName}
        onQueryChange={handleSetSummonerName}
        onSearch={getSummoner}
      ></PrimarySearchBar>
      <main>
        <Container maxWidth="md" className={classes.root}>
          <Typography variant="h4" component="h1">
            Champion Mastery
          </Typography>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert
              onClose={handleClose}
              severity="error"
              elevation={6}
              variant="filled"
            >
              {err?.statusCode}: {err?.message}
            </MuiAlert>
          </Snackbar>
          <MasteryFilter
            masteryLevels={masteryLevels}
            onChange={handleSetMasteryLevels}
          />
          {masteryGrid}
        </Container>
      </main>
    </Suspense>
  )
}

export default App
