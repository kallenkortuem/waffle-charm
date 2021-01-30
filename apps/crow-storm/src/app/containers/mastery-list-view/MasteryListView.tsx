import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import { getChampionInfoUrl } from '@waffle-charm/champions'
import { MasteryProgress } from '@waffle-charm/mastery'
import {
  createSelectFilteredChampion,
  selectChampionEntities,
  selectChampionVendor,
  selectMasteryEntities,
  selectVisibleChampionIds,
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export interface MasteryViewerItem {
  championId: string
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

  const visibleChampionIds = useSelector(selectVisibleChampionIds)

  const items = React.useMemo(() => {
    return visibleChampionIds?.map((championId) => (
      <MasteryListViewItem key={championId} championId={championId} />
    ))
  }, [visibleChampionIds])

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

export default MasteryListView
