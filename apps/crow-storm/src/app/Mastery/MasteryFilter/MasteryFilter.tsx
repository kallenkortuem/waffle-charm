import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import Filter3Icon from '@material-ui/icons/Filter3'
import Filter4Icon from '@material-ui/icons/Filter4'
import Filter5Icon from '@material-ui/icons/Filter5'
import Filter6Icon from '@material-ui/icons/Filter6'
import Filter7Icon from '@material-ui/icons/Filter7'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import React from 'react'
import { useTranslation } from 'react-i18next'

const filterIcons = {
  7: <Filter7Icon />,
  6: <Filter6Icon />,
  5: <Filter5Icon />,
  4: <Filter4Icon />,
  3: <Filter3Icon />,
  2: <Filter2Icon />,
  1: <Filter1Icon />,
}

export default function ToggleButtonNotEmpty(props: {
  masteryLevels: string[]
  onMasteryLevelsChange: (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[]
  ) => void
  layout: string
  onLayoutChange: (
    event: React.MouseEvent<HTMLElement>,
    newLayout: string
  ) => void
}): React.ReactElement {
  const { masteryLevels, onMasteryLevelsChange, layout, onLayoutChange } = props
  const { t } = useTranslation()
  const buttons = React.useMemo(
    () =>
      Object.entries(filterIcons)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([level, icon]) => {
          const disabled =
            masteryLevels.includes(level) && masteryLevels.length === 1
          const label = t('masteryLevelNumber', { level })
          return (
            <ToggleButton
              key={level}
              value={level}
              aria-label={label}
              disabled={disabled}
              data-cy={`mastery-level-filter-${level}`}
            >
              <Tooltip title={label}>{icon}</Tooltip>
            </ToggleButton>
          )
        }),
    [masteryLevels, t]
  )

  return (
    <Grid container spacing={2} direction="row" justify="space-between">
      <Grid item sm={6} md={6}>
        <ToggleButtonGroup
          value={masteryLevels}
          onChange={onMasteryLevelsChange}
          aria-label={t('masteryLevelFilter')}
        >
          {buttons}
        </ToggleButtonGroup>
      </Grid>
      <Grid
        item
        container
        style={{ display: 'flex' }}
        justify="flex-end"
        direction="row"
        sm={6}
        md={3}
      >
        <ToggleButtonGroup
          value={layout}
          exclusive
          onChange={onLayoutChange}
          aria-label={t('layout')}
        >
          <ToggleButton value="list" aria-label={t('list')} data-cy="layout-selector-list">
            <Tooltip title={t('list')}>
              <ViewListIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="module" aria-label={t('module')} data-cy="layout-selector-module">
            <Tooltip title={t('module')}>
              <ViewModuleIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  )
}
