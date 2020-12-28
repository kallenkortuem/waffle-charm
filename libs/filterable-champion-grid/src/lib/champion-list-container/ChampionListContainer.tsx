import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core'
import React from 'react'
import { FixedSizeList } from 'react-window'
import { ChampionGridItem } from '../champion-grid-item/ChampionGridItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      padding: theme.spacing(1),
      '&:first-child': {
        padding: theme.spacing(1),
      },
      whiteSpace: 'nowrap',
      '& > *': {
        height: '100%',
      },
    },
  })
)

const itemKey = (index: number, data: string[]) => {
  const item = data[index] ?? `row-${index}`
  return item
}

interface CellProps {
  index: number
  data: string[]
  style: any
}

const Cell = React.memo((props: CellProps) => {
  const { data, index, style } = props
  const classes = useStyles()
  const championId = data[index]

  return (
    <div className={classes.item} style={style}>
      {championId ? <ChampionGridItem championId={championId} compact /> : null}
    </div>
  )
})

/* eslint-disable-next-line */
export interface ChampionGridContainerProps {
  championIds: string[]
}

export function ChampionGridContainer(props: ChampionGridContainerProps) {
  const { championIds } = props
  const classes = useStyles()
  const theme = useTheme()
  const rowHeight = theme.spacing(9)

  // https://react-window.now.sh/#/api/FixedSizeList
  return (
    <FixedSizeList
      className={classes.root}
      itemKey={itemKey}
      itemData={championIds}
      height={rowHeight * 10}
      itemCount={Math.ceil(championIds.length)}
      itemSize={rowHeight + theme.spacing(1)}
      overscanRowCount={10}
      width={912}
    >
      {Cell}
    </FixedSizeList>
  )
}

export default ChampionGridContainer
