import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { selectSummonerVendor, settingsActions } from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { display: 'inline' },
    description: {
      margin: theme.spacing(1, 0),
    },
  })
)

/* eslint-disable-next-line */
export interface SummonerSettingsProps {}

export function SummonerSettings(
  props: SummonerSettingsProps
): React.ReactElement {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const summonerVendor = useSelector(selectSummonerVendor)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      settingsActions.setSummonerVendor(
        (event.target as HTMLInputElement).value
      )
    )
  }

  return (
    <FormControl className={classes.root} component="fieldset" role="form">
      <FormLabel id="summonerLinkLabel" focused={false} component="legend">
        {t('summonerSettingsLink')}
      </FormLabel>
      <Typography
        className={classes.description}
        id="summonerLinkInfo"
        variant="caption"
        component="p"
      >
        {t('summonerSettingsLinkDescription')}
      </Typography>
      <RadioGroup
        aria-labelledby="summonerLinkLabel"
        aria-describedby="summonerLinkInfo"
        name="summonerLink"
        value={summonerVendor}
        onChange={handleChange}
      >
        <FormControlLabel value="op.gg" control={<Radio />} label="op.gg" />
        <FormControlLabel
          value="leagueofgraphs.com"
          control={<Radio />}
          label="leagueofgraphs.com"
        />
        <FormControlLabel
          value="porofessor.gg"
          control={<Radio />}
          label="porofessor.gg"
        />
        <FormControlLabel value="u.gg" control={<Radio />} label="u.gg" />
      </RadioGroup>
    </FormControl>
  )
}

export default SummonerSettings
