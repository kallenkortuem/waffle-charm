import { Hidden } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MasteryLevelToggleGroup } from './mastery-level-toggle-group/MasteryLevelToggleGroup'

export const SELECT_ALL_KEY = 'selectAll'

export interface MasteryFilterProps {
  selected: number
  onMasteryLevelChange: (
    event: React.MouseEvent<HTMLElement>,
    newLevel: number
  ) => void
  layout: string
  onLayoutChange: (
    event: React.MouseEvent<HTMLElement>,
    newLayout: string
  ) => void
}

export function MasteryFilter(props: MasteryFilterProps): React.ReactElement {
  const { layout, selected, onLayoutChange, onMasteryLevelChange } = props
  const { t } = useTranslation()

  return (
    <Grid container direction="row" justify="space-between">
      <Grid item xs={10} sm={6} md={4}>
        <MasteryLevelToggleGroup
          value={selected}
          onChange={onMasteryLevelChange}
        />
      </Grid>
      <Grid
        item
        container
        style={{ display: 'flex' }}
        justify="flex-end"
        direction="row"
        xs={2}
        sm={2}
        md={2}
      >
        <Hidden only="xs">
          <ToggleButtonGroup
            size="small"
            value={layout}
            exclusive
            aria-label={t('layout')}
            onChange={onLayoutChange}
          >
            <ToggleButton
              value="list"
              aria-label={t('list')}
              data-cy="layout-selector-list"
            >
              <Tooltip title={t('list')}>
                <ViewListIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton
              value="module"
              aria-label={t('module')}
              data-cy="layout-selector-module"
            >
              <Tooltip title={t('module')}>
                <ViewModuleIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Hidden>
      </Grid>
    </Grid>
  )
}

export default MasteryFilter
