import CircularProgress from '@material-ui/core/CircularProgress'
import CssBaseline from '@material-ui/core/CssBaseline'
import Snackbar from '@material-ui/core/Snackbar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'
import { ChampionDataDragon, SummonerDTO } from '@waffle-charm/api-interfaces'
import React, { Suspense } from 'react'
import './app.scss'
import PrimarySearchBar from './PrimarySearchBar/PrimarySearchBar'
const Mastery = React.lazy(() => import('./Mastery/Mastery'))

export const App = (): React.ReactElement => {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  })

  const [open, setOpen] = React.useState(false)
  const [err, setErr] = React.useState<{ statusCode: number; message: string }>()
  const [summoner, setSummoner] = React.useState<SummonerDTO>()
  const [championData, setChampionData] = React.useState<ChampionDataDragon>()

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

  const handleApiError = (value: { statusCode: number; message: string }) => {
    setOpen(true)
    setErr(value)
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
          <PrimarySearchBar onSearch={handleSearchSummoner}></PrimarySearchBar>
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

            <Mastery
              championData={championData}
              summonerId={summoner?.id}
              onError={handleApiError}
            />
     
        </Suspense>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
