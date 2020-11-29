import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React, { lazy, ReactElement, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

const MasteryCard = lazy(() => import('./MasteryCard'))

function CSSGrid(props: { children: Array<ReactElement> }): React.ReactElement {
  const { children } = props

  return (
    <Grid container direction="row" spacing={2}>
      {children?.map((element) => (
        <Grid item lg={4} md={4} sm={6} xs={12} key={element.key}>
          {element}
        </Grid>
      ))}
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      paddingTop: theme.spacing(1),
      flexGrow: 1,
    },
  })
)

/* eslint-disable-next-line */
export interface MasteryGridGroupProps {
  level: string
  tag: string
  groupedMasteries: Record<number, ChampionMasteryDTO[]>
  championMap: Record<number, ChampionData>
}

export const MasteryGridGroup = (
  props: MasteryGridGroupProps
): React.ReactElement => {
  const { level, groupedMasteries, championMap, tag } = props
  const { t } = useTranslation()
  const classes = useStyles()

  const masteryGroup = groupedMasteries?.[level]
  const numberOfChampions = masteryGroup?.length || 0

  const items = React.useMemo(
    () =>
      masteryGroup &&
      masteryGroup
        .filter(
          (mastery: ChampionMasteryDTO) =>
            !tag || championMap[mastery.championId].tags.includes(tag)
        )
        .map((mastery: ChampionMasteryDTO) => (
          <Suspense
            key={mastery.championId}
            fallback={
              <div>
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="text" />
              </div>
            }
          >
            <div data-cy="mastery-card">
              <MasteryCard
                mastery={mastery}
                champion={championMap[mastery.championId]}
              />
            </div>
          </Suspense>
        )),
    [tag, championMap, masteryGroup]
  )

  return (
    <div key={level} data-cy={`mastery-grid-group-${level}`}>
      <Typography variant="h5" component="h2">
        {t('mastery')} {level}
      </Typography>
      <Typography variant="caption" component="p">
        {t('championWithCount', { count: numberOfChampions ?? 0 })}
      </Typography>
      <div className={classes.root}>
        <CSSGrid>{items}</CSSGrid>
      </div>
    </div>
  )
}

export default MasteryGridGroup
