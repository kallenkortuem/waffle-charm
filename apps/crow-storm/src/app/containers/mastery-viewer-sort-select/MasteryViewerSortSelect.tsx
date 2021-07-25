import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import {
  masteryViewerActions,
  MasteryViewerSortOptions,
  selectSortBy,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface MasteryViewerSortSelectProps {}

export function MasteryViewerSortSelect(
  props: MasteryViewerSortSelectProps
): React.ReactElement {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const sortBy = useSelector(selectSortBy)
  const handleSetSortBy = React.useMemo(
    () => (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(
        masteryViewerActions.setSortBy(
          event.target.value as MasteryViewerSortOptions
        )
      )
    },
    [dispatch]
  )

  return (
    <FormControl>
      <InputLabel htmlFor="mastery-sort-select">
        {t('championGridFilterSortOrder')}
      </InputLabel>
      <Select
        id="mastery-sort-select"
        value={sortBy}
        onChange={handleSetSortBy}
      >
        <MenuItem value="alphabetical">
          {t('championGridFilterSortByName')}
        </MenuItem>
        <MenuItem value="mastery">
          {t('championGridFilterSortByMastery')}
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default MasteryViewerSortSelect
