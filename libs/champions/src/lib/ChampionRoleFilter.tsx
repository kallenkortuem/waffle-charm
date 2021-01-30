import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@material-ui/lab/ToggleButtonGroup'
import {
  masteryViewerActions,
  selectAllChampionTags,
  selectTag,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChampionRoleFilterProps extends ToggleButtonGroupProps {}

export const ChampionRoleFilter = (props: ChampionRoleFilterProps) => {
  const dispatch = useDispatch()
  const tag = useSelector(selectTag)
  const allTags = useSelector(selectAllChampionTags)
  const handleSetTag = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    dispatch(masteryViewerActions.setTag(value))
  }

  const { t } = useTranslation()
  const roleButtons = React.useMemo(
    () =>
      allTags?.map((role) => (
        <ToggleButton
          key={role}
          value={role}
          aria-label={role}
          data-cy={`role-filter-${role}`}
        >
          {role}
        </ToggleButton>
      )),
    [allTags]
  )
  return (
    <ToggleButtonGroup
      size="small"
      value={tag}
      exclusive
      onChange={handleSetTag}
      aria-label={t('rolesFilter')}
      data-cy="champion-role-filter"
    >
      {roleButtons}
    </ToggleButtonGroup>
  )
}

export default ChampionRoleFilter
