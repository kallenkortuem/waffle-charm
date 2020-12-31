import { Tooltip } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import { getSettingsState, settingsActions } from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import ChampionSettings from '../containers/ChampionSettings'
import SummonerSettings from './SummonerSettings'

const drawerWidth = 300

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    championSettings: {
      padding: theme.spacing(3),
    },
    summonerSettings: {
      padding: theme.spacing(3),
    },
  })
)

/* eslint-disable-next-line */
export interface SettingsDrawerProps {}

export function SettingsDrawer(props: SettingsDrawerProps): React.ReactElement {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const state = useSelector(getSettingsState)

  const handleDrawerClose = () => {
    dispatch(settingsActions.close())
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={state.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Tooltip title={t('settingsClose')}>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Divider />
      <div className={classes.championSettings}>
        <ChampionSettings />
      </div>
      <Divider />
      <div className={classes.summonerSettings}>
        <SummonerSettings />
      </div>
    </Drawer>
  )
}

export default SettingsDrawer
