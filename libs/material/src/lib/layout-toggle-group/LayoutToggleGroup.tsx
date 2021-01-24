import { Tooltip } from '@material-ui/core'
import ViewComfyIcon from '@material-ui/icons/ViewComfy'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@material-ui/lab'
import { masteryViewerActions, selectLayout } from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export type LayoutOption = 'module' | 'list' | 'compact'
export const LayoutOption = {
  module: 'module' as LayoutOption,
  list: 'list' as LayoutOption,
  compact: 'compact' as LayoutOption,
}

/* eslint-disable-next-line */
export interface LayoutToggleGroupProps extends ToggleButtonGroupProps {}

export function LayoutToggleGroup(props: LayoutToggleGroupProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const layout = useSelector(selectLayout)
  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: 'module' | 'list' | 'compact'
  ) => {
    if (value) {
      dispatch(masteryViewerActions.setLayout(value))
    }
  }
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      aria-label={t('layout')}
      value={layout}
      onChange={handleLayoutChange}
    >
      <ToggleButton
        value={LayoutOption.list}
        aria-label={t('list')}
        data-cy="layout-selector-list"
      >
        <Tooltip title={t('list')}>
          <ViewListIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value={LayoutOption.module}
        aria-label={t('module')}
        data-cy="layout-selector-module"
      >
        <Tooltip title={t('module')}>
          <ViewModuleIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value={LayoutOption.compact}
        aria-label={t('compact')}
        data-cy="layout-selector-compact"
      >
        <Tooltip title={t('compact')}>
          <ViewComfyIcon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default LayoutToggleGroup
