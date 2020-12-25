import { FormControl, MenuItem, Select, SelectProps } from '@material-ui/core'
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

/* eslint-disable-next-line */
export interface ChampionGridSortSelectProps extends SelectProps {}

export function ChampionGridSortSelect(props: ChampionGridSortSelectProps) {
  const { t } = useTranslation()

  return (
    <FormControl>
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
