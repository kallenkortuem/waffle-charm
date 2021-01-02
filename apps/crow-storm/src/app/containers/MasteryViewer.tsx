import {
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
  MasteryFilter,
  MasteryGridGroup,
  MasteryProgress,
} from '@waffle-charm/mastery'
import { DelayedSearchInput } from '@waffle-charm/material'
import {
  ChampionEntity,
  masteryViewerActions,
  selectAllMastery,
  selectAllMasteryLevels,
  selectChampionEntities,
  selectChampionVendor,
  selectLayout,
  selectLevel,
  selectLolVersion,
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
      <MasteryFilter
        layout={layout}
        selected={masteryLevel}
        onLayoutChange={handleLayoutChange}
        onMasteryLevelChange={handleSetMasteryLevel}
      >
        <DelayedSearchInput
          inputProps={{ 'aria-label': t('searchPlaceholder') }}
          value={searchQuery}
          onSearhQueryChange={handleSetSearchQuery}
          edge="start"
        />
      </MasteryFilter>
      <Hidden only="xs">
        {layout === 'module' ? (
          <MasteryGridView tag={tag} masteryLevel={masteryLevel} />
        ) : (
          <MasteryListView tag={tag} masteryLevel={masteryLevel} />
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

const ChamptionTableRow = (props: { row: ChampionMasteryDTO }) => {
  const { row } = props
  const championEntities = useSelector(selectChampionEntities)
  const championVendor = useSelector(selectChampionVendor)
  return (
    <TableRow key={row.championId}>
      <TableCell>
        <Link
          variant="body2"
          href={getChampionInfoUrl(
            championEntities[row.championId],
            championVendor
          )}
          underline="hover"
          color="textPrimary"
        >
          {championEntities[row.championId]?.name}
        </Link>
      </TableCell>
      <TableCell>{row.championLevel}</TableCell>
      <TableCell>{row.championPoints.toLocaleString()}</TableCell>
      <TableCell>
        <MasteryProgress mastery={row} />
      </TableCell>
    </TableRow>
  )
}

const filterByMastery = (
  masteryLevel: number | string,
  championLevel: number
) => !masteryLevel || masteryLevel === championLevel

const filterByTag = (champion: ChampionEntity, tag?: string) =>
  !tag || champion.tags.includes(tag)

export const MasteryListView = (
  props: MasteryViewProps
): React.ReactElement => {
  const { masteryLevel, tag } = props
  const championEntities = useSelector(selectChampionEntities)
  const masteries = useSelector(selectAllMastery)

  const { t } = useTranslation()

  const rows = React.useMemo(
    () =>
      masteries
        .sort((a, b) => b.championLevel - a.championLevel)
        .filter(
          (row) =>
            filterByMastery(masteryLevel, row.championLevel) &&
            filterByTag(championEntities[row.championId], tag)
        )
        .map((row: ChampionMasteryDTO, i) => (
          <ChamptionTableRow key={row.championId} row={row} />
        )),
    [championEntities, masteryLevel, masteries, tag]
  )

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
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default MasteryViewer
