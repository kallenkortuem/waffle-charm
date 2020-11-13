import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
  ChampionDataDragon,
  ChampionMasteryDTO,
} from '@waffle-charm/api-interfaces'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MasteryFilter from './MasteryFilter/MasterFilter'
import MasteryGridView from './MasteryGridView/MasteryGridView'

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
  })
)

const MASTERY_LEVELS = 'masteryLevels'
const LAYOUT = 'layout'

const initialMasteryLevels: string[] = JSON.parse(
  sessionStorage.getItem(MASTERY_LEVELS) || '["5", "6", "7"]'
)
const initialLayout = sessionStorage.getItem(LAYOUT) || 'module'

export const Mastery = (props: {
  summonerId: string
  championData: ChampionDataDragon
  onError: (value: { statusCode: number; message: string }) => void
}): React.ReactElement => {
  const { summonerId, championData, onError } = props

  const { t } = useTranslation()
  const classes = useStyles()

  const [masteryLevels, setMasteryLevels] = useState(() => initialMasteryLevels)
  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>([])
  const [layout, setLayout] = useState(initialLayout)
  const [sortAscending] = useState(false)

  const handleSetMasteryLevels = (
    event: React.MouseEvent<HTMLElement>,
    value: string[]
  ) => {
    setMasteryLevels(value)
    sessionStorage.setItem(MASTERY_LEVELS, JSON.stringify(value))
  }

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setLayout(value)
    sessionStorage.setItem(LAYOUT, value)
  }

  useEffect(() => {
    if (!summonerId) {
      setMasteries([])
      return
    }

    fetch(`/api/mastery/by-summoner/${summonerId}`)
      .then((_) => _.json())
      .then((value) => {
        if (value && !value.statusCode && Array.isArray(value)) {
          setMasteries(value)
        } else {
          onError(value)
        }
      })
      .catch((error) => {
        if (error?.statusCode) {
          onError(error)
        }
      })
  }, [summonerId])

  return (
    <main>
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h4" component="h1">
          {t('championMastery')}
        </Typography>

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
        ) : (
          t('inProgress')
          // <MasteryListView />
        )}
      </Container>
    </main>
  )
}

export default Mastery
