import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { masteryViewerActions, selectLevel } from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface MasteryViewerLevelSelectProps {}

export function MasteryViewerLevelSelect(
  props: MasteryViewerLevelSelectProps
): React.ReactElement {
  const dispatch = useDispatch()
  const level = useSelector(selectLevel)
  const { t } = useTranslation()
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(masteryViewerActions.setLevel(parseInt(event.target.value || '')))
  }

  const items = [7, 6, 5, 4, 3, 2, 1, 0].map((level) => (
    <MenuItem key={level} value={level.toString()}>
      {level}
    </MenuItem>
  ))

  return (
    <FormControl>
      <InputLabel htmlFor="mastery-level-select">
        {t('masteryLevel')}
      </InputLabel>
      <Select
        id="mastery-level-select"
        variant="standard"
        value={level?.toString() ?? ''}
        onChange={handleOnChange}
      >
        {items}
      </Select>
    </FormControl>
  )
}

export default MasteryViewerLevelSelect
