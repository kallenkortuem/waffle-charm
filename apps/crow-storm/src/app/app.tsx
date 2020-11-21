import CircularProgress from '@material-ui/core/CircularProgress'
import { blue, green } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import Snackbar from '@material-ui/core/Snackbar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'
import { ChampionDataDragon, SummonerDTO } from '@waffle-charm/api-interfaces'
import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PrimarySearchBar from './components/PrimarySearchBar'
import Landing from './pages/Landing'

const Mastery = React.lazy(() => import('./pages/Mastery'))

export const DARK_MODE_PREF = 'darkModePref'

export const App = (): React.ReactElement => {
  const [darkMode, setDarkMode] = React.useState(
    JSON.parse(localStorage.getItem(DARK_MODE_PREF)) ?? true
  )
  const [open, setOpen] = React.useState(false)
  const [err, setErr] = React.useState<{
    statusCode: number
    message: string
  }>()
  const [summoner, setSummoner] = React.useState<SummonerDTO>()
  const [championData, setChampionData] = React.useState<ChampionDataDragon>()
  const [summonerLoading, setSummonerLoading] = React.useState(false)

  const handleToggleDarkTheme = () => {
    const newValue = !darkMode
    setDarkMode(newValue)
    localStorage.setItem(DARK_MODE_PREF, newValue.toString())
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleApiError = (value: { statusCode: number; message: string }) => {
    setOpen(true)
    setErr(value)
  }

  const darkTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
          primary: {
            main: blue[800],
          },
          secondary: {
            main: green.A700,
          },
        },
      }),
    [darkMode]
  )

  const handleSearchSummoner = (
    event: React.FormEvent<HTMLFormElement>,
    summonerName: string
  ) => {
    event?.preventDefault()
    setSummoner(undefined)
    if (summonerName) {
      setSummonerLoading(true)
      fetch(`/api/summoner/${summonerName}`)
        .then((_) => _.json())
        .then((value) => {
          setSummonerLoading(false)
          if (value && !value.statusCode) {
            setSummoner(value)
          } else {
            handleApiError(value)
          }
        })
        .catch((error) => {
          setSummonerLoading(false)
          if (error?.statusCode) {
            handleApiError(error)
          }
        })
    }
  }

  React.useEffect(() => {
    fetch(`/cdn/10.22.1/data/en_US/champion.json`)
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Suspense fallback={<CircularProgress />}>
          <PrimarySearchBar
            onSearch={handleSearchSummoner}
            onToggleTheme={handleToggleDarkTheme}
          ></PrimarySearchBar>
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
          {/**
           * Routes
           */}
          <Switch>
            <Route path="/">
              <Mastery
                loading={summonerLoading}
                championData={championData}
                summoner={summoner}
                onError={handleApiError}
              />
            </Route>
          </Switch>
        </Suspense>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
