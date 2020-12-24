import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core'
import React from 'react'
import { FixedSizeGrid } from 'react-window'
import { ChampionGridItem } from '../champion-grid-item/ChampionGridItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      padding: theme.spacing(1),
      whiteSpace: 'nowrap',
    },
  })
)

const columnCount = 6

interface CellProps {
  columnIndex: number
  rowIndex: number
  data: string[]
  style: any
}

const Cell = (props: CellProps) => {
  const { columnIndex, data, rowIndex, style } = props
  const classes = useStyles()
  const championIds = data
  const championIndex = rowIndex * columnCount + columnIndex
  const championId = championIds[championIndex]
  return (
    <div className={classes.item} style={style} key={championId}>
      {championId ? <ChampionGridItem championId={championId} /> : null}
    </div>
  )
}

/* eslint-disable-next-line */
export interface ChampionGridContainerProps {
  championIds: string[]
}

export function ChampionGridContainer(props: ChampionGridContainerProps) {
  const { championIds } = props
  const classes = useStyles()
  const theme = useTheme()
  const columnWidth = theme.spacing(19)
  const rowHeight = theme.spacing(16)
  const itemKey = ({ columnIndex, data, rowIndex }) => {
    const championIndex = rowIndex * columnCount + columnIndex
    const item = data[championIndex]
    return item
  }

  return (
    <FixedSizeGrid
      className={classes.root}
      columnCount={columnCount}
      columnWidth={columnWidth}
      itemKey={itemKey}
      itemData={championIds}
      height={rowHeight * 4.5}
      rowCount={Math.ceil(championIds.length / columnCount)}
      rowHeight={rowHeight + theme.spacing(1)}
      width={912}
    >
      {Cell}
    </FixedSizeGrid>
  )
}

export default ChampionGridContainer
