import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: theme.spacing(2),
      minHeight: theme.spacing(20),
    },
  })
)

/* eslint-disable-next-line */
export interface WelcomeBannerProps {}

export const WelcomeBanner = (
  props: WelcomeBannerProps
): React.ReactElement => {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h2">
        {t('welcomeHeader')}
      </Typography>
      <Typography variant="body1" component="p">
        {t('welcomeSubheader')}
      </Typography>
    </Paper>
  )
}

export default WelcomeBanner
