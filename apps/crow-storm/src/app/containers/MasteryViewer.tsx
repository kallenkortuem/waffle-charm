import {
  Grid,
  Hidden,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { getChampionInfoUrl } from '@waffle-charm/champions'
import {
  MasteryGridGroup,
  MasteryLevelToggleGroup,
  MasteryProgress,
} from '@waffle-charm/mastery'
import { DelayedSearchInput, LayoutToggleGroup } from '@waffle-charm/material'
import {
  MasteryEntity,
  masteryViewerActions,
  selectAllMastery,
  selectAllMasteryLevels,
  selectChampionEntities,
  selectChampionVendor,
  selectFilteredChampionIds,
  selectLayout,
  selectLevel,
  selectLolVersion,
  selectMasteryEntities,
  selectMasteryLoadingStatus,
  selectSearchQuery,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export const MASTERY_LEVEL = 'masteryLevel'
export const MASTERY_LAYOUT = 'masteryLayout'

export interface MasteryViewerProps {
  tag?: string
}

export const MasteryViewer = (
  props: MasteryViewerProps
): React.ReactElement => {
  const { t } = useTranslation()
  const { tag } = props
  const dispatch = useDispatch()
  const layout = useSelector(selectLayout)
  const masteryLevel = useSelector(selectLevel)
  const searchQuery = useSelector(selectSearchQuery)

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

  return (
    <>
      <Grid container direction="row" justify="space-between">
        <MasteryLevelToggleGroup
          value={masteryLevel}
          onChange={handleSetMasteryLevel}
        />
        <DelayedSearchInput
          inputProps={{ 'aria-label': t('searchPlaceholder') }}
          value={searchQuery}
          delay={300}
          onSearhQueryChange={handleSetSearchQuery}
          edge={'start'}
        />
        <Hidden only="xs">
          <LayoutToggleGroup value={layout} onChange={handleLayoutChange} />
        </Hidden>
      </Grid>
      <Hidden only="xs">
        {layout === 'module' ? (
          <MasteryGridView tag={tag} masteryLevel={masteryLevel} />
        ) : (
          <MasteryListView />
        )}
      </Hidden>
      <Hidden smUp>
        <MasteryGridView masteryLevel={masteryLevel} />
      </Hidden>
    </>
  )
}

export interface MasteryViewProps {
  masteryLevel: number | string
  tag?: string
}

export const MasteryGridView = (
  props: MasteryViewProps
): React.ReactElement => {
  const championEntities = useSelector(selectChampionEntities)
  const masteries = useSelector(selectAllMastery)
  const championVendor = useSelector(selectChampionVendor)
  const lolVersion = useSelector(selectLolVersion)
  const allMasteryLevels = useSelector(selectAllMasteryLevels)
  const { masteryLevel, tag } = props

  const groupedMasteries: Record<number, ChampionMasteryDTO[]> = React.useMemo(
    () =>
      masteries.reduce((accum, current) => {
        if (accum[current.championLevel]) {
          accum[current.championLevel].push(current)
        } else {
          accum[current.championLevel] = [current]
        }
        return accum
      }, {}),
    [masteries]
  )

  return (
    <>
      {allMasteryLevels
        .sort((a, b) => b - a)
        .filter((level) => !masteryLevel || level === masteryLevel)
        .map((level) => {
          return (
            <MasteryGridGroup
              key={level}
              level={level}
              masteryGroup={groupedMasteries[level]}
              tag={tag}
              championMap={championEntities}
              version={lolVersion}
              championVendor={championVendor}
            ></MasteryGridGroup>
          )
        })}
    </>
  )
}

const ChampionTableRow = (props: { championId: string }) => {
  const { championId } = props
  const champion = useSelector(selectChampionEntities)[championId]
  const mastery = useSelector(selectMasteryEntities)[championId]
  const championVendor = useSelector(selectChampionVendor)
  return (
    <TableRow key={championId}>
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
  const championIds = useSelector(selectFilteredChampionIds)

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
        <TableBody>
          {championIds.map((championId) => (
            <ChampionTableRow key={championId} championId={championId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MasteryViewer
