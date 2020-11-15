import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
} from '@waffle-charm/api-interfaces'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MasteryFilter from './MasteryFilter/MasteryFilter'
import MasteryGridView from './MasteryGridView/MasteryGridView'
import MasteryListView from './MasteryListView/MasteryListView'

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

export const Mastery = (props: {
  summonerId: string
  championData: ChampionDataDragon
  onError: (value: { statusCode: number; message: string }) => void
}): React.ReactElement => {
  const { summonerId, championData, onError } = props

  const { t } = useTranslation()
  const classes = useStyles()

  const championMap: Record<number, ChampionData> = React.useMemo(
    () =>
      Object.entries(championData?.data || []).reduce(
        (accumulated, [_, entry]) => {
          accumulated[entry.key] = entry
          return accumulated
        },
        {}
      ) || {},
    [championData]
  )

  const allTags: string[] = React.useMemo(
    () =>
      Object.values(championData?.data || []).reduce((totalTags, champion) => {
        champion.tags.forEach((t) => {
          if (!totalTags.includes(t)) {
            totalTags.push(t)
          }
        })
        return totalTags
      }, []),
    [championData]
  )

  const [masteryLevels, setVisibleMasteryLevels] = useState(() => [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
  ])
  const [tag, setTag] = useState('')
  const [masteries, setMasteries] = useState<ChampionMasteryDTO[]>([])
  const [layout, setLayout] = useState('module')
  const [sortAscending] = useState(false)

  const handleSetMasteryLevels = (
    event: React.MouseEvent<HTMLElement>,
    value: string[]
  ) => {
    if (value?.length >= 1) {
      setVisibleMasteryLevels(value)
    }
  }

  const handleSetTag = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    setTag(value)
  }

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    if (value) {
      setLayout(value)
    }
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
          allTags={allTags}
          tag={tag}
          onTagChange={handleSetTag}
          layout={layout}
          onLayoutChange={handleLayoutChange}
        />
        {layout === 'module' ? (
          <MasteryGridView
            masteries={masteries}
            masteryLevels={masteryLevels}
            championMap={championMap}
            tag={tag}
            sortAscending={sortAscending}
          />
        ) : (
          <MasteryListView
            masteries={masteries}
            masteryLevels={masteryLevels}
            championMap={championMap}
            tag={tag}
            sortAscending={sortAscending}
          />
        )}
      </Container>
    </main>
  )
}

export default Mastery
