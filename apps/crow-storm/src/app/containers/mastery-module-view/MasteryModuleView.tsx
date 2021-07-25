import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { ChampionAvatar, getChampionInfoUrl } from '@waffle-charm/champions'
import { MasteryProgress } from '@waffle-charm/mastery'
import {
  selectChampionEntities,
  selectChampionVendor,
  selectLevel,
  selectLolVersion,
  selectMasteryEntities,
  selectMasteryLoadingStatus,
  selectVisibleChampionIds,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export const MASTERY_LEVEL = 'masteryLevel'
export const MASTERY_LAYOUT = 'masteryLayout'

const useMasteryGridViewStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridGap: theme.spacing(2),
      gridTemplateColumns: `repeat(auto-fill, minmax(300px, 1fr))`,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    masteryProgressContent: {
      paddingTop: 0,
    },
  })
)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MasteryViewProps {}

export const MasteryModuleView = (
  props: MasteryViewProps
): React.ReactElement => {
  const { t } = useTranslation()
  const classes = useMasteryGridViewStyles()
  const level = useSelector(selectLevel)
  const sortedChampionIds = useSelector(selectVisibleChampionIds)

  const items = React.useMemo(() => {
    return sortedChampionIds?.map((championId, index) => (
      <MasteryGridViewItem
        index={index}
        key={championId}
        championId={championId}
      />
    ))
  }, [sortedChampionIds])

  return (
    <div className={classes.root} data-cy={`mastery-grid-group-${level}`}>
      {items}
    </div>
  )
}

export interface MasteryViewerItem {
  championId: string
  index: number
}

const MasteryGridViewItem = (props: MasteryViewerItem): React.ReactElement => {
  const { championId } = props
  const classes = useMasteryGridViewStyles()
  const { t } = useTranslation()
  const champion = useSelector(selectChampionEntities)[championId]
  const mastery = useSelector(selectMasteryEntities)[championId]
  const championVendor = useSelector(selectChampionVendor)
  const lolVersion = useSelector(selectLolVersion)
  const masteryLoadingStatus = useSelector(selectMasteryLoadingStatus)
  const bull = <span className={classes.bullet}>•</span>

  return (
    <div>
      <Card data-cy="mastery-card">
        <CardHeader
          avatar={
            masteryLoadingStatus === 'loading' ||
            masteryLoadingStatus === 'not loaded' ? (
              <Skeleton variant="circle" width={40} height={40} />
            ) : (
              <ChampionAvatar
                version={lolVersion}
                size="small"
                champion={champion}
              />
            )
          }
          title={
            masteryLoadingStatus === 'loading' ||
            masteryLoadingStatus === 'not loaded' ? (
              <Skeleton />
            ) : (
              <Link
                variant="body2"
                href={getChampionInfoUrl(champion, championVendor)}
                underline="hover"
                color="textPrimary"
              >
                {champion.name}
              </Link>
            )
          }
          subheader={
            masteryLoadingStatus === 'loading' ||
            masteryLoadingStatus === 'not loaded' ? (
              <Skeleton />
            ) : (
              <>
                <Typography variant="caption" component="p">
                  {t('masteryLevelNumber', { level: mastery?.championLevel })}
                  {bull}
                  {mastery?.championPoints?.toLocaleString()}
                </Typography>
                <Typography variant="caption" component="p">
                  {champion?.tags?.map((tag, i) => {
                    return i === 0 ? (
                      tag
                    ) : (
                      <span key={tag}>
                        {bull}
                        {tag}
                      </span>
                    )
                  })}
                </Typography>
              </>
            )
          }
        />
        <CardContent className={classes.masteryProgressContent}>
          {mastery ? <MasteryProgress mastery={mastery} /> : null}
        </CardContent>
      </Card>
    </div>
  )
}

export default MasteryModuleView
