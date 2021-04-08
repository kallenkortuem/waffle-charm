import { IconButton, Link, Paper } from '@material-ui/core'
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from '@material-ui/data-grid'
import BanIcon from '@material-ui/icons/Block'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'
import { createSelector } from '@reduxjs/toolkit'
import { getChampionInfoUrl } from '@waffle-charm/champions'
import { MasteryProgress } from '@waffle-charm/mastery'
import {
  bansActions,
  ChampionEntity,
  createSelectBansById,
  createSelectFavoriteById,
  favoriteActions,
  MasteryEntity,
  selectChampionEntities,
  selectChampionVendor,
  selectFilteredChampionIds,
  selectMasteryEntities,
} from '@waffle-charm/store'
import { formatDistanceToNowStrict } from 'date-fns'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

type NarrowedGridColDef = GridColDef & {
  field: keyof ChampionEntity | keyof MasteryEntity | string
}

const selectRows = createSelector(
  selectFilteredChampionIds,
  selectChampionEntities,
  selectMasteryEntities,
  (championIds, champions, masteries) => {
    return championIds.map((id) => {
      return { championId: id, ...champions[id], ...masteries[id] }
    })
  }
)

const PickBan = (props: { championId: string }): React.ReactElement => {
  const { championId } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const champion = useSelector(selectChampionEntities)[championId]
  const selectBansById = createSelectBansById()
  const isBaned = useSelector((state) => selectBansById(state, champion?.key))
  const selectFavoriteById = createSelectFavoriteById()
  const isFavorite = useSelector((state) =>
    selectFavoriteById(state, champion?.key)
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
    <>
      <IconButton
        aria-label={t('championFavoriteCTA')}
        onClick={handleFavoriteClick}
      >
        <FavoriteIcon color={isFavorite ? 'secondary' : 'disabled'} />
      </IconButton>

      <IconButton aria-label={t('championBanCTA')} onClick={handleBanClick}>
        <BanIcon color={isBaned ? 'error' : 'disabled'} />
      </IconButton>
    </>
  )
}

export default function MasteryListViewV2(): React.ReactElement {
  const { t } = useTranslation()
  const rows = useSelector(selectRows)
  const championVendor = useSelector(selectChampionVendor)

  const columns: NarrowedGridColDef[] = [
    {
      field: 'name',
      headerName: t('champion'),
      width: 169,
      renderCell: ({ row }) => (
        <Link
          variant="body2"
          href={getChampionInfoUrl(row as any, championVendor)}
          underline="hover"
          color="textPrimary"
        >
          {row?.name}
        </Link>
      ),
    },
    {
      field: ' ',
      headerName: ' ',
      disableColumnMenu: true,
      hideSortIcons: true,
      sortable: false,
      width: 130,
      renderCell: ({ row }) => {
        return <PickBan championId={row?.championId || row?.id} />
      },
    },
    { field: 'championLevel', headerName: t('masteryLevel'), width: 100 },
    {
      field: 'championPoints',
      headerName: t('totalPoints'),
      width: 120,
      valueFormatter: ({ value }: GridValueFormatterParams) =>
        value?.toLocaleString(),
    },
    {
      field: 'lastPlayTime',
      headerName: t('lastPlayTime'),
      width: 100,
      valueFormatter: ({ value }: GridValueFormatterParams) =>
        value ? formatDistanceToNowStrict((value as number) || 0) : '',
    },
    {
      field: 'championPointsUntilNextLevel',
      headerName: t('progress'),
      flex: 1,
      renderCell: ({ row }) =>
        row?.championLevel ? (
          <MasteryProgress mastery={row as any} />
        ) : (
          <div></div>
        ),
    },
  ]

  return (
    <Paper style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </Paper>
  )
}
