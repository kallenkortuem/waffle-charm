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

const numberOfChampionColumns = 6

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
  const championIndex = rowIndex * numberOfChampionColumns + columnIndex
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
  const width = theme.spacing(19)
  const height = theme.spacing(15)
  const itemKey = ({ columnIndex, data, rowIndex }) => {
    const championIndex = rowIndex * numberOfChampionColumns + columnIndex
    const item = data[championIndex]
    return item
  }
  return (
    <FixedSizeGrid
      className={classes.root}
      columnCount={numberOfChampionColumns}
      columnWidth={width}
      itemKey={itemKey}
      itemData={championIds}
      height={(height + theme.spacing(1)) * 4.5}
      rowCount={Math.ceil(championIds.length / numberOfChampionColumns)}
      rowHeight={height + theme.spacing(1)}
      width={912}
    >
      {Cell}
    </FixedSizeGrid>
  )
}

export default ChampionGridContainer
