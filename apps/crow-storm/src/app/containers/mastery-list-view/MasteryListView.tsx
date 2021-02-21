import {
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import BanIcon from '@material-ui/icons/Block'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import { getChampionInfoUrl } from '@waffle-charm/champions'
import { MasteryProgress } from '@waffle-charm/mastery'
import {
  bansActions,
  createSelectBansById,
  createSelectFavoriteById,
  createSelectFilteredChampion,
  favoriteActions,
  selectChampionEntities,
  selectChampionVendor,
  selectMasteryEntities,
  selectVisibleChampionIds
} from '@waffle-charm/store'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export interface MasteryViewerItem {
  championId: string
}

const MasteryListViewItem = (props: MasteryViewerItem) => {
  const { championId } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const champion = useSelector(selectChampionEntities)[championId]
  const mastery = useSelector(selectMasteryEntities)[championId]
  const championVendor = useSelector(selectChampionVendor)
  const selectFilteredChampion = createSelectFilteredChampion()
  const filteredChampion = useSelector((state) =>
    selectFilteredChampion(state, champion)
  )

  const selectBansById = createSelectBansById()
  const isBaned = useSelector((state) => selectBansById(state, champion.key))

  const selectFavoriteById = createSelectFavoriteById()
  const isFavorite = useSelector((state) =>
    selectFavoriteById(state, champion.key)
  )

  const handleBanClick = () => {
    const a = isBaned
      ? bansActions.remove(championId)
      : bansActions.add({ id: championId })

    dispatch(a)
  }

  const handleFavoriteClick = () => {
    const a = isFavorite
      ? favoriteActions.remove(championId)
      : favoriteActions.add({ id: championId })

    dispatch(a)
  }

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
      <TableCell>
        <IconButton
          aria-label={t('championFavoriteCTA')}
          onClick={handleFavoriteClick}
        >
          <FavoriteIcon color={isFavorite ? 'secondary' : 'disabled'} />
        </IconButton>

        <IconButton aria-label={t('championBanCTA')} onClick={handleBanClick}>
          <BanIcon color={isBaned ? 'error' : 'disabled'} />
        </IconButton>
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
            <TableCell></TableCell>
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
