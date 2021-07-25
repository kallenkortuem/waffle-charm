import {
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Tooltip,
  withStyles,
} from '@material-ui/core'
import ViewListIcon from '@material-ui/icons/ViewList'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@material-ui/lab'
import {
  masteryViewerActions,
  MasteryViewerSortOptions,
  selectLayout,
  selectSortBy,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export type LayoutOption = 'module' | 'list' | 'compact' | 'portrait'
export const LayoutOption = {
  module: 'module' as LayoutOption,
  list: 'list' as LayoutOption,
  compact: 'compact' as LayoutOption,
  portrait: 'portrait' as LayoutOption,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: 'wrap',
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
  })
)

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup)

/* eslint-disable-next-line */
export interface LayoutToggleGroupProps extends ToggleButtonGroupProps {}

export function LayoutToggleGroup(props: LayoutToggleGroupProps) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()
  const layout = useSelector(selectLayout)
  const sortBy = useSelector(selectSortBy)

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: 'module' | 'list' | 'compact'
  ) => {
    if (value) {
      dispatch(masteryViewerActions.setLayout(value))
    }
  }

  const handleSortByChange = (
    event: React.MouseEvent<HTMLElement>,
    value: MasteryViewerSortOptions
  ) => {
    dispatch(masteryViewerActions.setSortBy(value || 'mastery'))
  }
  return (
    <>
      <Divider flexItem orientation="vertical" className={classes.divider} />
      <StyledToggleButtonGroup
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
        {/* <ToggleButton
          value={LayoutOption.compact}
          aria-label={t('compact')}
          data-cy="layout-selector-compact"
        >
          <Tooltip title={t('compact')}>
            <ViewComfyIcon />
          </Tooltip>
        </ToggleButton> */}
        {/* <ToggleButton
          value={LayoutOption.portrait}
          aria-label={t('layoutPortrait')}
          data-cy="layout-selector-portrait"
        >
          <Tooltip title={t('layoutPortrait')}>
            <ViewColumnIcon />
          </Tooltip>
        </ToggleButton> */}
      </StyledToggleButtonGroup>
    </>
  )
}

export default LayoutToggleGroup
