import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface ChampionRoleFilterProps {
  allTags: string[]
  tag: string
  onTagChange: (event: React.MouseEvent<HTMLElement>, tag: string) => void
}

export const ChampionRoleFilter = (props: ChampionRoleFilterProps) => {
  const { allTags, tag, onTagChange } = props
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
      onChange={onTagChange}
      aria-label={t('rolesFilter')}
    >
      {roleButtons}
    </ToggleButtonGroup>
  )
}

export default ChampionRoleFilter
