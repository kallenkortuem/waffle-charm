import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MuiAlert from '@material-ui/lab/Alert'
import {
  ChampionDataDragon,
  ChampionMasteryDTO,
  SummonerDTO,
} from '@waffle-charm/api-interfaces'
import React, { Suspense, useEffect, useState } from 'react'
import './app.scss'
import MasteryFilter from './MasteryFilter/MasterFilter'
import MasteryGridView from './MasteryGridView/MasteryGridView'
import MasteryListView from './MasteryListView/MasteryListView'
import PrimarySearchBar from './PrimarySearchBar/PrimarySearchBar'

/**
 * Sessions storage keys
 */
const MASTERY_LEVELS = 'masteryLevels'
const LAYOUT = 'layout'

/**
 * Load initial values
 */
const initialMasteryLevels: number[] = JSON.parse(
  sessionStorage.getItem(MASTERY_LEVELS) || '[5, 6, 7]'
)
const initialLayout = sessionStorage.getItem(LAYOUT) || 'module'

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
  const [layout, setLayout] = useState(initialLayout)
  const [sortAscending, setSortAscending] = useState(false)
  const [err, setErr] = useState<{ statusCode: number; message: string }>()
  const [summoner, setSummoner] = useState<SummonerDTO>()

  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>([])
  const [championData, setChampionData] = useState<ChampionDataDragon>()
  const [masteryLevels, setMasteryLevels] = useState(() => initialMasteryLevels)

  const classes = useStyles()

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setLayout(value)
    sessionStorage.setItem(LAYOUT, value)
  }

  const handleSetMasteryLevels = (
    event: React.MouseEvent<HTMLElement>,
    value: number[]
  ) => {
    setMasteryLevels(value)
    sessionStorage.setItem(MASTERY_LEVELS, JSON.stringify(value))
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSearchSummoner = (
    event: React.FormEvent<HTMLFormElement>,
    summonerName: string
  ) => {
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

  return (
    <Suspense fallback={<CircularProgress />}>
      <PrimarySearchBar onSearch={handleSearchSummoner}></PrimarySearchBar>
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
            onMasteryLevelsChange={handleSetMasteryLevels}
            layout={layout}
            onLayoutChange={handleLayoutChange}
          />
          {layout === 'module' ? (
            <MasteryGridView
              masteries={masteries}
              masteryLevels={masteryLevels}
              championData={championData}
              sortAscending={sortAscending}
            />
          ) : <MasteryListView />}
        </Container>
      </main>
    </Suspense>
  )
}

export default App
