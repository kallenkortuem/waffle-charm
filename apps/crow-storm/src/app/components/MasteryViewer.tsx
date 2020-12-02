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
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectChampionEntities } from '../+store/features/champion.slice'
import { selectLolVersion } from '../+store/features/lol-version.slice'
import { selectAllMastery } from '../+store/features/mastery.slice'
import { selectChampionVendor } from '../+store/features/settings.slice'

export const MASTERY_LEVELS = 'masteryLevels'
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
  const [masteryLevels, setVisibleMasteryLevels] = useState(() =>
    JSON.parse(localStorage.getItem(MASTERY_LEVELS) || '["1"]')
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
  const handleSetMasteryLevels = (
    event: React.MouseEvent<HTMLElement>,
    value: string[]
  ) => {
    if (value?.length >= 1) {
      setVisibleMasteryLevels(value)
      localStorage.setItem(MASTERY_LEVELS, JSON.stringify(value))
    }
  }

  return (
    <>
      <MasteryFilter
        layout={layout}
        masteryLevels={masteryLevels}
        onLayoutChange={handleLayoutChange}
        onMasteryLevelsChange={handleSetMasteryLevels}
      />
      <Hidden only="xs">
        {layout === 'module' ? (
          <MasteryGridView
            tag={tag}
            masteryLevels={masteryLevels}
            sortAscending={false}
          />
        ) : (
          <MasteryListView
            tag={tag}
            masteryLevels={masteryLevels}
            sortAscending={false}
          />
        )}
      </Hidden>
      <Hidden smUp>
        <MasteryGridView masteryLevels={masteryLevels} sortAscending={false} />
      </Hidden>
    </>
  )
}

export interface MasteryViewProps {
  masteryLevels: string[]
  sortAscending: boolean
  tag?: string
}

export const MasteryGridView = (
  props: MasteryViewProps
): React.ReactElement => {
  const championEntities = useSelector(selectChampionEntities)
  const masteries = useSelector(selectAllMastery)
  const championVendor = useSelector(selectChampionVendor)
  const lolVersion = useSelector(selectLolVersion)
  const { masteryLevels, sortAscending, tag } = props

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
      {masteryLevels
        .sort((a, b) =>
          sortAscending ? parseInt(a) - parseInt(b) : parseInt(b) - parseInt(a)
        )
        .map((level) => {
          return (
            <MasteryGridGroup
              key={level}
              level={level}
              groupedMasteries={groupedMasteries}
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

export const MasteryListView = (
  props: MasteryViewProps
): React.ReactElement => {
  const { masteryLevels, sortAscending, tag } = props
  const championEntities = useSelector(selectChampionEntities)
  const masteries = useSelector(selectAllMastery)
  const championVendor = useSelector(selectChampionVendor)

  const { t } = useTranslation()

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
          {masteries
            .sort((a, b) =>
              sortAscending
                ? a.championLevel - b.championLevel
                : b.championLevel - a.championLevel
            )
            .filter(
              (row) =>
                masteryLevels.includes(row.championLevel.toString()) &&
                (!tag || championEntities[row.championId].tags.includes(tag))
            )
            .map((row: ChampionMasteryDTO, i) => (
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
                    {championEntities[row.championId].name}
                  </Link>
                </TableCell>
                <TableCell>{row.championLevel}</TableCell>
                <TableCell>{row.championPoints.toLocaleString()}</TableCell>
                <TableCell>
                  <MasteryProgress mastery={row} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MasteryViewer
