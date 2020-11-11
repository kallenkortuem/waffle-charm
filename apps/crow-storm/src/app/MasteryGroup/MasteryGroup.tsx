import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { lazy, Suspense } from 'react'
import CSSGrid from '../CSSGrid/CSSGrid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { useTranslation } from 'react-i18next'

const MasteryCard = lazy(() => import('../MasteryCard/MasteryCard'))

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
    paper: {
      margin: theme.spacing(1),
      padding: theme.spacing(2),
    },
  })
)

export const MasteryGroup = (props: {
  level: string
  groupedMasteries: Record<number, ChampionMasteryDTO[]>
  mappedData: Record<number, ChampionData>
}): React.ReactElement => {
  const { level, groupedMasteries, mappedData } = props
  const { t } = useTranslation()
  const classes = useStyles()

  const masteryGroup = groupedMasteries?.[level]
  const numberOfChampions = masteryGroup?.length || 0

  return (
    <div key={level}>
      <Typography variant="h5" component="h2">
        {t("mastery")} {level}
      </Typography>
      <Typography variant="caption" component="p">
        {t('championWithCount', { count: numberOfChampions ?? 0 })}
      </Typography>
      <div className={classes.root}>
        <CSSGrid>
          {masteryGroup?.map((mastery) => (
            <Suspense
              key={mastery.championId}
              fallback={
                <div>
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton variant="text" />
                </div>
              }
            >
              <MasteryCard
                mastery={mastery}
                champion={mappedData[mastery.championId]}
              />
            </Suspense>
          ))}
        </CSSGrid>
      </div>
    </div>
  )
}

export default MasteryGroup
