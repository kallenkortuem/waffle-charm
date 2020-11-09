import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import Filter4Icon from '@material-ui/icons/Filter4'
import Filter5Icon from '@material-ui/icons/Filter5'
import Filter6Icon from '@material-ui/icons/Filter6'
import Filter7Icon from '@material-ui/icons/Filter7'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import Grid from '@material-ui/core/Grid'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const useStyles = makeStyles((theme) => ({
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
  rightContainer: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}))

export default function ToggleButtonNotEmpty(props: {
  masteryLevels: number[]
  onMasteryLevelsChange: (
    event: React.MouseEvent<HTMLElement>,
    newFormats: number[]
  ) => void
  layout: string
  onLayoutChange: (
    event: React.MouseEvent<HTMLElement>,
    newLayout: string
  ) => void
}): React.ReactElement {
  const { masteryLevels, onMasteryLevelsChange, layout, onLayoutChange } = props

  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            value={masteryLevels}
            onChange={onMasteryLevelsChange}
            aria-label="Champion Mastery Level Filter"
          >
            <ToggleButton value={7} aria-label={`Mastery Level ${7}`}>
              <Tooltip title={`Mastery Level ${7}`}>
                <Filter7Icon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={6} aria-label={`Mastery Level ${6}`}>
              <Tooltip title={`Mastery Level ${6}`}>
                <Filter6Icon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={5} aria-label={`Mastery Level ${5}`}>
              <Tooltip title={`Mastery Level ${5}`}>
                <Filter5Icon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={4} aria-label={`Mastery Level ${4}`}>
              <Tooltip title={`Mastery Level ${4}`}>
                <Filter4Icon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={3} aria-label={`Mastery Level ${3}`}>
              <Tooltip title={`Mastery Level ${3}`}>
                <Filter3Icon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={2} aria-label={`Mastery Level ${2}`}>
              <Tooltip title={`Mastery Level ${2}`}>
                <Filter2Icon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value={1} aria-label={`Mastery Level ${1}`}>
              <Tooltip title={`Mastery Level ${1}`}>
                <Filter1Icon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
      <Grid item sm={12} md={6}>
        <div className={classes.rightContainer}>
          <ToggleButtonGroup
            value={layout}
            exclusive
            onChange={onLayoutChange}
            aria-label="Layout"
          >
            <ToggleButton value="list" aria-label="List">
              <Tooltip title="List">
                <ViewListIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="module" aria-label="Module">
              <Tooltip title="Module">
                <ViewModuleIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid>
  )
}
