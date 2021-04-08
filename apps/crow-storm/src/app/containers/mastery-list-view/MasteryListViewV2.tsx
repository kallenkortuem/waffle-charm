import { Link, Paper } from '@material-ui/core'
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
} from '@material-ui/data-grid'
import { createSelector } from '@reduxjs/toolkit'
import { getChampionInfoUrl } from '@waffle-charm/champions'
import { MasteryProgress } from '@waffle-charm/mastery'
import {
  ChampionEntity,
  MasteryEntity,
  selectChampionEntities,
  selectChampionVendor,
  selectFilteredChampionIds,
  selectMasteryEntities,
} from '@waffle-charm/store'
import { formatDistanceToNowStrict } from 'date-fns'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

type NarrowedGridColDef = GridColDef & {
  field: keyof ChampionEntity | keyof MasteryEntity
}

const selectRows = createSelector(
  selectFilteredChampionIds,
  selectChampionEntities,
  selectMasteryEntities,
  (championIds, champions, masteries) => {
    return championIds.map((id) => {
      return { id, ...champions[id], ...masteries[id] }
    })
  }
)

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
    { field: 'championLevel', headerName: t('masteryLevel'), width: 158 },
    {
      field: 'championPoints',
      headerName: t('totalPoints'),
      width: 140,
      valueFormatter: ({ value }: GridValueFormatterParams) =>
        value?.toLocaleString(),
    },
    {
      field: 'lastPlayTime',
      headerName: t('lastPlayTime'),
      width: 180,
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
