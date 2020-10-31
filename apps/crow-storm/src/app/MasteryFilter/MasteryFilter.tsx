import React from 'react'
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import FormatItalicIcon from '@material-ui/icons/FormatItalic'
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

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
    margin: theme.spacing(0.5),
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%'
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

const possibleMasteryLevels = [1, 2, 3, 4, 5, 6, 7]

export default function MasteryFilter(props: {
  masteryLevels: number[]
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newFormats: number[]
  ) => void
}): React.ReactElement {
  const {  masteryLevels, onChange } = props


  const classes = useStyles()

  const masteryLevelToggleButtons = possibleMasteryLevels.map((level) => (
    <ToggleButton
      key={level}
      value={level}
      aria-label={`Mastery level: ${level}`}
    >
      <img src={`/assets/images/Champion_Mastery_Level_${level}_Flair.png`} alt=""></img>
    </ToggleButton>
  ))

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
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
