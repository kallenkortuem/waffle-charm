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
  SELECT_ALL_KEY,
} from '@waffle-charm/mastery'
import {
  ChampionEntity,
  selectAllMastery,
  selectAllMasteryLevels,
  selectChampionEntities,
  selectChampionVendor,
  selectLolVersion,
} from '@waffle-charm/store'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export const MASTERY_LEVEL = 'masteryLevel'
export const MASTERY_LAYOUT = 'masteryLayout'

export interface MasteryViewerProps {
  tag?: string
}

export const MasteryViewer = (
  props: MasteryViewerProps
): React.ReactElement => {
  const { tag } = props
  const [layout, setLayout] = useState(
    () => localStorage.getItem(MASTERY_LAYOUT) ?? 'module'
  )
  const [masteryLevel, setVisibleMasteryLevel] = useState(() =>
    JSON.parse(localStorage.getItem(MASTERY_LEVEL) || '1')
  )

  const handleLayoutChange = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ) => {
    if (value) {
      setLayout(value)
      localStorage.setItem(MASTERY_LAYOUT, value ?? 'module')
    }
  }
  const handleSetMasteryLevel = (
    event: React.MouseEvent<HTMLElement>,
    value: number
  ) => {
    if (value) {
      setVisibleMasteryLevel(value)
      localStorage.setItem(MASTERY_LEVEL, JSON.stringify(value))
    }
  }

  return (
    <>
      <MasteryFilter
        layout={layout}
        selected={masteryLevel}
        onLayoutChange={handleLayoutChange}
        onMasteryLevelChange={handleSetMasteryLevel}
      />
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
        .filter(
          (level) => level === masteryLevel || masteryLevel === SELECT_ALL_KEY
        )
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
) => masteryLevel === championLevel || masteryLevel === SELECT_ALL_KEY

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
