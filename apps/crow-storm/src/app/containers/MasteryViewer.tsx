import {
  createStyles,
  Grid,
  Hidden,
  Link,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import { getChampionInfoUrl } from '@waffle-charm/champions'
import {
  MasteryCard,
  MasteryLevelToggleGroup,
  MasteryProgress,
} from '@waffle-charm/mastery'
import { DelayedSearchInput, LayoutToggleGroup } from '@waffle-charm/material'
import {
  createSelectFilteredChampion,
  masteryViewerActions,
  selectChampionEntities,
  selectChampionVendor,
  selectFilteredChampionIds,
  selectLayout,
  selectLevel,
  selectLolVersion,
  selectMasteryEntities,
  selectMasteryLoadingStatus,
  selectSearchQuery,
  selectSortedMasteryChampionIds,
  selectTag,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export const MASTERY_LEVEL = 'masteryLevel'
export const MASTERY_LAYOUT = 'masteryLayout'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    filterItem: {
      padding: theme.spacing(1, 0),
    },
  })
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MasteryViewerProps {}

export const MasteryViewer = (
  props: MasteryViewerProps
): React.ReactElement => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const classes = useStyles()
  const layout = useSelector(selectLayout)
  const searchQuery = useSelector(selectSearchQuery)
  const level = useSelector(selectLevel)
  const tag = useSelector(selectTag)
  const filteredChampionIds = useSelector(selectFilteredChampionIds)

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: 'module' | 'list'
  ) => {
    dispatch(masteryViewerActions.setLayout(value))
  }

  const handleSetMasteryLevel = (
    event: React.MouseEvent<HTMLElement>,
    value: number
  ) => {
    dispatch(masteryViewerActions.setLevel(value))
  }

  const handleSetSearchQuery = React.useMemo(
    () => (query: string) => {
      dispatch(masteryViewerActions.setSearchQuery(query))
    },
    [dispatch]
  )

  const title = React.useMemo(() => {
    if (searchQuery) {
      return searchQuery
    }

    if ((level === null || level === undefined) && !tag) {
      return t('masteryLevelFilterAll')
    }

    const results = []
    if (level || level === 0) {
      results.push(t('mastery') + ' ' + level)
    }

    if (tag) {
      results.push(tag)
    }

    return results.join(' + ')
  }, [searchQuery, level, tag, t])

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <MasteryLevelToggleGroup
          className={classes.filterItem}
          value={level}
          onChange={handleSetMasteryLevel}
        />
        <Hidden only="xs">
          <LayoutToggleGroup
            className={classes.filterItem}
            value={layout}
            onChange={handleLayoutChange}
          />
        </Hidden>
        <DelayedSearchInput
          inputProps={{
            'aria-label': t('championSearchFilter'),
            placeholder: t('championSearchFilter'),
          }}
          value={searchQuery}
          delay={300}
          onSearhQueryChange={handleSetSearchQuery}
        />
      </Grid>
      <div>
        <Typography
          variant="h5"
          component="h2"
          style={{ textTransform: 'capitalize' }}
        >
          {title}
        </Typography>
        <Typography variant="caption" component="p">
          {t('championWithCount', { count: filteredChampionIds?.length ?? 0 })}
        </Typography>
      </div>
      <Hidden only="xs">
        {layout === 'module' ? <MasteryGridView /> : <MasteryListView />}
      </Hidden>
      <Hidden smUp>
        <MasteryGridView />
      </Hidden>
    </>
  )
}

export interface MasteryViewerItem {
  championId: string
}
export const MasteryGridViewItem = (
  props: MasteryViewerItem
): React.ReactElement => {
  const { championId } = props
  const { t } = useTranslation()
  const champion = useSelector(selectChampionEntities)[championId]
  const mastery = useSelector(selectMasteryEntities)[championId]
  const championVendor = useSelector(selectChampionVendor)
  const lolVersion = useSelector(selectLolVersion)
  const masteryLoadingStatus = useSelector(selectMasteryLoadingStatus)
  const selectFilteredChampion = createSelectFilteredChampion()
  const filteredChampion = useSelector((state) =>
    selectFilteredChampion(state, champion)
  )

  return (
    <Grid
      item
      lg={4}
      md={4}
      sm={6}
      xs={12}
      style={{
        display: filteredChampion ? 'block' : 'none',
      }}
    >
      <MasteryCard
        mastery={mastery}
        loading={
          masteryLoadingStatus === 'loading' ||
          masteryLoadingStatus === 'not loaded'
        }
        version={lolVersion}
        championVendor={championVendor}
        champion={champion}
        hideFullImg
      />
    </Grid>
  )
}

const useMasteryGridViewStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      paddingTop: theme.spacing(1),
      flexGrow: 1,
    },
  })
)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MasteryViewProps {}

export const MasteryGridView = (
  props: MasteryViewProps
): React.ReactElement => {
  const { t } = useTranslation()
  const classes = useMasteryGridViewStyles()
  const level = useSelector(selectLevel)
  const sortedChampionIds = useSelector(selectSortedMasteryChampionIds)

  const items = React.useMemo(() => {
    return sortedChampionIds?.map((championId) => (
      <MasteryGridViewItem key={championId} championId={championId} />
    ))
  }, [sortedChampionIds])

  return (
    <div className={classes.root} data-cy={`mastery-grid-group-${level}`}>
      <Grid container direction="row" spacing={2}>
        {items}
      </Grid>
    </div>
  )
}

const MasteryListViewItem = (props: MasteryViewerItem) => {
  const { championId } = props
  const champion = useSelector(selectChampionEntities)[championId]
  const mastery = useSelector(selectMasteryEntities)[championId]
  const championVendor = useSelector(selectChampionVendor)
  const selectFilteredChampion = createSelectFilteredChampion()
  const filteredChampion = useSelector((state) =>
    selectFilteredChampion(state, champion)
  )

  return (
    <TableRow
      key={championId}
      style={{
        display: filteredChampion ? 'table-row' : 'none',
      }}
    >
      <TableCell>
        <Link
          variant="body2"
          href={getChampionInfoUrl(champion, championVendor)}
          underline="hover"
          color="textPrimary"
        >
          {champion.name}
        </Link>
      </TableCell>
      <TableCell>{mastery?.championLevel || 0}</TableCell>
      <TableCell>{mastery?.championPoints.toLocaleString() || 0}</TableCell>
      <TableCell>
        {mastery ? <MasteryProgress mastery={mastery} /> : null}
      </TableCell>
    </TableRow>
  )
}

export const MasteryListView = (): React.ReactElement => {
  const { t } = useTranslation()

  const sortedChampionIds = useSelector(selectSortedMasteryChampionIds)

  const items = React.useMemo(() => {
    return sortedChampionIds?.map((championId) => (
      <MasteryListViewItem key={championId} championId={championId} />
    ))
  }, [sortedChampionIds])

  return (
    <TableContainer component={Paper} data-cy="mastery-list">
      <Table aria-label={t('masteryTable')}>
        <TableHead>
          <TableRow>
            <TableCell>{t('champion')}</TableCell>
            <TableCell>{t('masteryLevel')}</TableCell>
            <TableCell>{t('totalPoints')}</TableCell>
            <TableCell>{t('progress')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{items}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default MasteryViewer
