import { Box } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    overflow: 'auto',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}))

export interface CustomChip {
  key: number | string
  label: string
}

/* eslint-disable-next-line */
export interface ChipsArrayProps {
  chips: CustomChip[]
  selected?: CustomChip
  onSelectChip: (selectedChip?: CustomChip) => void
}

export function ChipsArray(props: ChipsArrayProps) {
  const { chips, selected, onSelectChip } = props
  const classes = useStyles()

  const handleClick = React.useCallback(
    (clickedChip: CustomChip) => () => {
      onSelectChip(clickedChip === selected ? null : clickedChip)
    },
    [selected, onSelectChip]
  )

  const chipArray = React.useMemo(() => {
    return chips.map((data) => {
      let icon
      return (
        <li key={data.key}>
          <Chip
            icon={icon}
            label={data.label}
            variant={data === selected ? 'default' : 'outlined'}
            onClick={handleClick(data)}
            className={classes.chip}
          />
        </li>
      )
    })
  }, [chips, selected, handleClick])

  return (
    <Box component="ul" className={classes.root}>
      {chipArray}
    </Box>
  )
}

export default ChipsArray
