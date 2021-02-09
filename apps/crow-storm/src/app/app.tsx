import { LinearProgress, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { blue, green } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { PageContainer } from '@waffle-charm/material'
import {
  fetchChampion,
  fetchLolVersion,
  fetchMasteryViewer,
  selectLolVersion,
  selectLolVersionLoadingStatus,
} from '@waffle-charm/store'
import React, { lazy, Suspense, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PrimarySearchBar, {
  SUMMONER_NAME_KEY,
  useQuery,
} from './containers/PrimarySearchBar'
import { SettingsDrawer } from './containers/SettingsDrawer'

const Mastery = lazy(() => import('./containers/Mastery'))

export const DARK_MODE_PREF = 'darkModePref'

export const App = (): React.ReactElement => {
  const query = useQuery()
  const dispatch = useDispatch()
  const lolVersionLoadingStatus = useSelector(selectLolVersionLoadingStatus)
  const summonerName = query.get(SUMMONER_NAME_KEY)?.trim()
  const [darkMode, setDarkMode] = React.useState(
    JSON.parse(localStorage.getItem(DARK_MODE_PREF)) ?? true
  )
  const lolVersion = useSelector(selectLolVersion)
  const handleToggleDarkTheme = () => {
    const newValue = !darkMode
    setDarkMode(newValue)
    localStorage.setItem(DARK_MODE_PREF, newValue.toString())
  }

  useEffect(() => {
    dispatch(fetchLolVersion())
  }, [dispatch])

  useEffect(() => {
    if (lolVersionLoadingStatus === 'loaded') {
      dispatch(fetchChampion(lolVersion))
    }
  }, [dispatch, lolVersion, lolVersionLoadingStatus])

  useEffect(() => {
    dispatch(fetchMasteryViewer(summonerName))
  }, [dispatch, summonerName])

  const darkTheme = useMemo(
    () =>
      createMuiTheme({
        props: {
          MuiPaper: {},
          MuiCard: {},
        },
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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Suspense fallback={<CircularProgress />}>
          <PrimarySearchBar
            onToggleTheme={handleToggleDarkTheme}
          ></PrimarySearchBar>
          <Suspense fallback={<CircularProgress />}>
            <SettingsDrawer />
          </Suspense>
          {/**
           * Routes
           */}
          <Switch>
            <Route path="/">
              <Suspense fallback={<LinearProgress />}>
                <Mastery summonerName={summonerName} />
              </Suspense>
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
