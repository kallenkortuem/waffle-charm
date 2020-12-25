import { Hidden } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { LayoutToggleGroup } from '@waffle-charm/material'
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
          <LayoutToggleGroup value={layout} onChange={onLayoutChange} />
        </Hidden>
      </Grid>
    </Grid>
  )
}

export default MasteryFilter
