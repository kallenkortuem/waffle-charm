import Paper from '@material-ui/core/Paper'
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Tooltip from '@material-ui/core/Tooltip'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: 'wrap',
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
  })
)

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    margin: theme.spacing(1),
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%',
    },
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup)

const possibleMasteryLevels = [7, 6, 5, 4, 3, 2, 1]

export default function MasteryFilter(props: {
  masteryLevels: number[]
  onChange: (event: React.MouseEvent<HTMLElement>, newFormats: number[]) => void
}): React.ReactElement {
  const { masteryLevels, onChange } = props

  const classes = useStyles()

  const masteryLevelToggleButtons = possibleMasteryLevels.map((level) => (
    <ToggleButton key={level} value={level}>
      <Tooltip title={`Mastery Level ${level}`}>
        <img
          src={`/assets/images/Champion_Mastery_Level_${level}_Flair.png`}
          alt=""
        ></img>
      </Tooltip>
    </ToggleButton>
  ))

  return (
    <div style={{ display: 'flex' }}>
      <Paper elevation={1} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          value={masteryLevels}
          onChange={onChange}
          aria-label="text alignment"
        >
          {masteryLevelToggleButtons}
        </StyledToggleButtonGroup>
      </Paper>
    </div>
  )
}
