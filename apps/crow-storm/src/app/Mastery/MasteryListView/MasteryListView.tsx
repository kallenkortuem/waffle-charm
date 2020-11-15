import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MasteryProgress } from '../Mastery'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

export const MasteryListView = (props: {
  masteryLevels: string[]
  sortAscending: boolean
  championMap: Record<number, ChampionData>
  masteries: ChampionMasteryDTO[]
  tag: string
}): React.ReactElement => {
  const { masteryLevels, sortAscending, championMap, masteries, tag } = props
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <TableContainer component={Paper} data-cy="mastery-list">
      <Table className={classes.table} aria-label={t('masteryTable')}>
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
                (!tag || championMap[row.championId].tags.includes(tag))
            )
            .map((row: ChampionMasteryDTO, i) => (
              <TableRow key={row.championId}>
                <TableCell>{championMap[row.championId].name}</TableCell>
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

export default MasteryListView
