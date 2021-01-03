import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { selectChampionVendor, settingsActions } from '@waffle-charm/store'
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
export interface ChampionSettingsProps {}

export function ChampionSettings(
  props: ChampionSettingsProps
): React.ReactElement {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const championVendor = useSelector(selectChampionVendor)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      settingsActions.setChampionVendor(
        (event.target as HTMLInputElement).value
      )
    )
  }

  return (
    <FormControl className={classes.root} component="fieldset" role="form">
      <FormLabel id="championLinkLabel" focused={false} component="legend">
        {t('championSettingsLink')}
      </FormLabel>
      <Typography
        className={classes.description}
        id="championLinkInfo"
        variant="caption"
        component="p"
      >
        {t('championSettingsLinkDescription')}
      </Typography>
      <RadioGroup
        aria-labelledby="championLinkLabel"
        aria-describedby="championLinkInfo"
        name="championLink"
        value={championVendor}
        onChange={handleChange}
      >
        <FormControlLabel value="op.gg" control={<Radio />} label="op.gg" />
        <FormControlLabel
          value="leagueofgraphs.com"
          control={<Radio />}
          label="leagueofgraphs.com"
        />
        <FormControlLabel value="u.gg" control={<Radio />} label="u.gg" />
      </RadioGroup>
    </FormControl>
  )
}

export default ChampionSettings
