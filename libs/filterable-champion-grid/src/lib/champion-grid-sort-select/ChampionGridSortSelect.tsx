import {
  createStyles,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  SelectProps,
  Theme,
} from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type ChampionGridFilterSortOption =
  | 'name'
  | 'mastery'
  | 'favorite'
  | 'ban'
export const sortOptions: ChampionGridFilterSortOption[] = [
  'name',
  'mastery',
  'favorite',
  'ban',
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiFilledInput-input': {
        paddingTop: theme.spacing(1),
      },
    },
  })
)

/* eslint-disable-next-line */
export interface ChampionGridSortSelectProps extends SelectProps {}

export function ChampionGridSortSelect(props: ChampionGridSortSelectProps) {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <FormControl variant={'filled'} className={classes.root}>
      <Select label={t('championGridFilterSortOrder')} {...props}>
        <MenuItem value="name">{t('championGridFilterSortByName')}</MenuItem>
        <MenuItem value="mastery">
          {t('championGridFilterSortByMastery')}
        </MenuItem>
        <MenuItem value="favorite">
          {t('championGridFilterSortByFavorite')}
        </MenuItem>
        <MenuItem value="dislike">
          {t('championGridFilterSortByDislike')}
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ChampionGridSortSelect
