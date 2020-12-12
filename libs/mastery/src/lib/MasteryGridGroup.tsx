import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import {
  ChampionData,
  ChampionMasteryDTO,
  Vendors,
} from '@waffle-charm/api-interfaces'
import React, { ReactElement, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import MasteryCard from './MasteryCard'

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
  level: number
  tag: string
  masteryGroup: ChampionMasteryDTO[]
  championMap: Record<number, ChampionData>
  version: string
  championVendor: Vendors
}

export const MasteryGridGroup = (
  props: MasteryGridGroupProps
): React.ReactElement => {
  const {
    level,
    masteryGroup,
    championMap,
    tag,
    version,
    championVendor,
  } = props
  const { t } = useTranslation()
  const classes = useStyles()
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
                version={version}
                championVendor={championVendor}
                champion={championMap[mastery.championId]}
              />
            </div>
          </Suspense>
        )),
    [tag, championMap, masteryGroup, version, championVendor]
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
