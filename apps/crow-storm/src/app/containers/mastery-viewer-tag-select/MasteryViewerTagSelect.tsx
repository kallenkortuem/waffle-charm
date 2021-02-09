import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import {
  masteryViewerActions,
  selectAllChampionTags,
  selectTag,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface MasteryViewerTagSelectProps {}

export function MasteryViewerTagSelect(
  props: MasteryViewerTagSelectProps
): React.ReactElement {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const allTags = useSelector(selectAllChampionTags)
  const tag = useSelector(selectTag)

  return (
    <FormControl>
      <InputLabel htmlFor="mastery-tag-select">
        {t('roleToggleButtonGroup')}
      </InputLabel>
      <Select
        id="mastery-tag-select"
        value={tag || ''}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch(masteryViewerActions.setTag(event.target.value || ''))
        }}
      >
        {allTags.map((x) => {
          return (
            <MenuItem key={x} value={x}>
              {x}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default MasteryViewerTagSelect
