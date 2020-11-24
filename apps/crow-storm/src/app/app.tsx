import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { blue, green } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import Snackbar from '@material-ui/core/Snackbar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'
import { ChampionDataDragon } from '@waffle-charm/api-interfaces'
import { PageContainer } from '@waffle-charm/material'
import React, { Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { fetchChampion } from './+store/features/champion.slice'
import { fetchSummoner } from './+store/features/summoner.slice'
import PrimarySearchBar, {
  SUMMONER_NAME_KEY,
  useQuery,
} from './components/PrimarySearchBar'

const Mastery = React.lazy(() => import('./pages/Mastery'))

export const DARK_MODE_PREF = 'darkModePref'

export const App = (): React.ReactElement => {
  const query = useQuery()
  const dispatch = useDispatch()
  const summonerName = query.get(SUMMONER_NAME_KEY)
  const [darkMode, setDarkMode] = React.useState(
    JSON.parse(localStorage.getItem(DARK_MODE_PREF)) ?? true
  )
  const [open, setOpen] = React.useState(false)
  const [err, setErr] = React.useState<{
    statusCode: number
    message: string
  }>()
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

  React.useEffect(() => {
    dispatch(fetchChampion())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(fetchSummoner(summonerName))
  }, [dispatch, summonerName])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Suspense fallback={<CircularProgress />}>
          <PrimarySearchBar
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
              <Mastery summonerName={summonerName} loading={summonerLoading} />
            </Route>
          </Switch>
          <PageContainer maxWidth="md">
            <Typography variant="caption">
              © Copyright 2020 fiddlestats.com. Fiddlestats isn't endorsed by
              Riot Games and doesn't reflect the views or opinions of Riot Games
              or anyone officially involved in producing or managing Riot Games
              properties. Riot Games, and all associated properties are
              trademarks or registered trademarks of Riot Games, Inc.
            </Typography>
          </PageContainer>
        </Suspense>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
