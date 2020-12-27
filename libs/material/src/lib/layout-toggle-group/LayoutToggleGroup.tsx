import { Tooltip } from '@material-ui/core'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@material-ui/lab'
import React from 'react'
import { useTranslation } from 'react-i18next'

export type LayoutOption = 'module' | 'list'
export const LayoutOption = {
  module: 'module' as LayoutOption,
  list: 'list' as LayoutOption,
}

/* eslint-disable-next-line */
export interface LayoutToggleGroupProps extends ToggleButtonGroupProps {}

export function LayoutToggleGroup(props: LayoutToggleGroupProps) {
  const { t } = useTranslation()
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      aria-label={t('layout')}
      {...props}
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
    </ToggleButtonGroup>
  )
}

export default LayoutToggleGroup
