import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton'
import React, { lazy, Suspense } from 'react'
import CSSGrid from '../CSSGrid/CSSGrid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'

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

  const classes = useStyles()

  const masteryGroup = groupedMasteries?.[level]
  const numberOfChampions = masteryGroup?.length || 0

  return (
    <div key={level}>
      <Typography variant="h5" component="h2">
        Mastery {level}
      </Typography>
      <Typography variant="caption" component="p">
        {`${numberOfChampions} ${
          numberOfChampions === 1 ? 'Champion' : 'Champions'
        }`}
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
