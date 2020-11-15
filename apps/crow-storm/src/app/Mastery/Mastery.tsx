import { Tooltip } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import { createStyles, Theme, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
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

export const getChampionImageSrc = (champion: ChampionData): string =>
  `/cdn/10.22.1/img/champion/${champion?.image?.full}`

export const getMasteryLevelProgress = (
  mastery: ChampionMasteryDTO
): number => {
  const totalInLevel =
    mastery?.championPointsSinceLastLevel +
    mastery?.championPointsUntilNextLevel
  return Math.floor(
    (mastery?.championPointsSinceLastLevel / totalInLevel) * 100
  )
}

export const MasteryToken = (props: {
  mastery: ChampionMasteryDTO
  threshold: number
  color?: 'primary' | 'secondary'
}): React.ReactElement => (
  <CheckCircleRoundedIcon
    fontSize="small"
    color={
      props.mastery.tokensEarned >= props.threshold
        ? props.color || 'primary'
        : 'disabled'
    }
  />
)

export const MasteryProgress = (props: {
  mastery: ChampionMasteryDTO
}): React.ReactElement => {
  const { t } = useTranslation()
  const { mastery } = props
  const progress = getMasteryLevelProgress(mastery)
  switch (props.mastery.championLevel) {
    case 7:
      return (
        <Tooltip
          title={t('tokenMasteryProgress', {
            earned: 3,
            total: 3,
          })}
        >
          <span>
            <MasteryToken mastery={mastery} threshold={0} />
            <MasteryToken mastery={mastery} threshold={0} />
            <MasteryToken mastery={mastery} threshold={0} />
          </span>
        </Tooltip>
      )
    case 6:
      return (
        <Tooltip
          title={t('tokenMasteryProgress', {
            earned: mastery.tokensEarned,
            total: 3,
          })}
        >
          <span>
            <MasteryToken mastery={mastery} threshold={1} />
            <MasteryToken mastery={mastery} threshold={2} />
            <MasteryToken mastery={mastery} threshold={3} />
          </span>
        </Tooltip>
      )
    case 5:
      return (
        <Tooltip
          title={t('tokenMasteryProgress', {
            earned: mastery.tokensEarned,
            total: 2,
          })}
        >
          <span>
            <MasteryToken mastery={mastery} threshold={1} />
            <MasteryToken mastery={mastery} threshold={2} />
          </span>
        </Tooltip>
      )
    default:
      return (
        <Tooltip
          title={t('percentMasteryProgress', {
            percent: progress ?? 0,
            level: mastery.championLevel + 1,
          })}
        >
          <BorderLinearProgress
            value={progress}
            variant="determinate"
          ></BorderLinearProgress>
        </Tooltip>
      )
  }
}

export const ChampionAvatar = (props: {
  size: 'small' | 'large'
  champion: ChampionData
}): React.ReactElement => (
  <Avatar
    alt=""
    imgProps={{ width: '40px', height: '40px' }}
    src={getChampionImageSrc(props.champion)}
  />
)

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
    },
    bar: {
      borderRadius: theme.spacing(0.5),
    },
  })
)(LinearProgress)

const MasteryContainer = withStyles((theme: Theme) =>
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
)(Container)

export const Mastery = (props: {
  summonerId: string
  championData: ChampionDataDragon
  onError: (value: { statusCode: number; message: string }) => void
}): React.ReactElement => {
  const { summonerId, championData, onError } = props

  const { t } = useTranslation()

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
      <MasteryContainer maxWidth="md">
        <Typography variant="h4" component="h1">
          {t('championMastery')}
        </Typography>
        <MasteryFilter
          allTags={allTags}
          tag={tag}
          layout={layout}
          masteryLevels={masteryLevels}
          onTagChange={handleSetTag}
          onLayoutChange={handleLayoutChange}
          onMasteryLevelsChange={handleSetMasteryLevels}
        />
        {layout === 'module' ? (
          <MasteryGridView
            championMap={championMap}
            tag={tag}
            masteries={masteries}
            masteryLevels={masteryLevels}
            sortAscending={sortAscending}
          />
        ) : (
          <MasteryListView
            championMap={championMap}
            tag={tag}
            masteries={masteries}
            masteryLevels={masteryLevels}
            sortAscending={sortAscending}
          />
        )}
      </MasteryContainer>
    </main>
  )
}

export default Mastery
