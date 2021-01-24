import { Tooltip } from '@material-ui/core'
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import Filter4Icon from '@material-ui/icons/Filter4'
import Filter5Icon from '@material-ui/icons/Filter5'
import Filter6Icon from '@material-ui/icons/Filter6'
import Filter7Icon from '@material-ui/icons/Filter7'
import Filter0Icon from '@material-ui/icons/FilterNone'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@material-ui/lab/ToggleButtonGroup'
import { masteryViewerActions, selectLevel } from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const filterIcons = {
  7: <Filter7Icon />,
  6: <Filter6Icon />,
  5: <Filter5Icon />,
  4: <Filter4Icon />,
  3: <Filter3Icon />,
  2: <Filter2Icon />,
  1: <Filter1Icon />,
  0: <Filter0Icon />,
}

/* eslint-disable-next-line */
export interface MasteryLevelToggleGroupProps extends ToggleButtonGroupProps {}

export function MasteryLevelToggleGroup(props: MasteryLevelToggleGroupProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const level = useSelector(selectLevel)
  const handleSetMasteryLevel = (
    event: React.MouseEvent<HTMLElement>,
    value: number
  ) => {
    dispatch(masteryViewerActions.setLevel(value))
  }

  const masterLevelButtons = React.useMemo(
    () =>
      [7, 6, 5, 4, 3, 2, 1, 0].map((level) => {
        const label = t('masteryLevelNumber', { level })
        const icon = filterIcons[level]
        return (
          <ToggleButton
            key={level}
            value={level}
            aria-label={label}
            data-cy={`mastery-level-filter-${level}`}
          >
            <Tooltip title={label}>{icon}</Tooltip>
          </ToggleButton>
        )
      }),
    [t]
  )

  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      aria-label={t('masteryLevelFilter')}
      value={level}
      onChange={handleSetMasteryLevel}
    >
      {masterLevelButtons}
    </ToggleButtonGroup>
  )
}

export default MasteryLevelToggleGroup
