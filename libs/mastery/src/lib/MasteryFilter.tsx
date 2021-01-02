import { Hidden } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { LayoutToggleGroup } from '@waffle-charm/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MasteryLevelToggleGroup } from './mastery-level-toggle-group/MasteryLevelToggleGroup'

export interface MasteryFilterProps {
  children?: React.ReactNode
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
  const {
    layout,
    selected,
    children,
    onLayoutChange,
    onMasteryLevelChange,
  } = props
  const { t } = useTranslation()

  return (
    <Grid container direction="row" justify="space-between">
      <MasteryLevelToggleGroup
        value={selected}
        onChange={onMasteryLevelChange}
      />
      {children}
      <Hidden only="xs">
        <LayoutToggleGroup value={layout} onChange={onLayoutChange} />
      </Hidden>
    </Grid>
  )
}

export default MasteryFilter
