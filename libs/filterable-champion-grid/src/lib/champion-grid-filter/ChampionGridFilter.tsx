import {
  createStyles,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core'
import { RoleToggleButtonGroup } from '@waffle-charm/champions'
import { SearchInput } from '@waffle-charm/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const sortOptions = ['name', 'mastery', 'favorite', 'dislike']

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: '',
    },
  })
)

/* eslint-disable-next-line */
export interface ChampionGridFilterProps {
  role?: string
  sortBy: string
  searchQuery: string
  onRoleChange: (e: React.MouseEvent<HTMLInputElement>, value: any) => void
  onSortByChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode
  ) => void
  onSearhQueryChange: (e: string) => void
}

export function ChampionGridFilter(props: ChampionGridFilterProps) {
  const {
    role,
    sortBy,
    searchQuery,
    onRoleChange,
    onSortByChange,
    onSearhQueryChange,
  } = props
  const [query, setQuery] = React.useState(searchQuery)
  const { t } = useTranslation()
  const classes = useStyles()

  useEffect(() => {
    const id = setTimeout(() => {
      onSearhQueryChange(query)
    }, 200)
    return () => clearInterval(id)
  }, [query])

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value || '')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <RoleToggleButtonGroup value={role} onChange={onRoleChange} />
      <div style={{}}></div>
      <FormControl>
        <Select
          label={t('championGridFilterSortOrder')}
          value={sortBy}
          onChange={onSortByChange}
        >
          <MenuItem value="name">{t('championGridFilterSortByName')}</MenuItem>
          <MenuItem value="mastery">
            {t('championGridFilterSortByMastery')}
          </MenuItem>
          <MenuItem value="favorite">
            {t('championGridFilterSortByFavorite')}
          </MenuItem>
          <MenuItem value="dislike">
            {t('championGridFilterSortByDislike')}
          </MenuItem>
        </Select>
      </FormControl>
      <SearchInput
        inputProps={{ 'aria-label': t('searchPlaceholder') }}
        value={searchQuery}
        onChange={handleSetQuery}
      />
    </div>
  )
}

export default ChampionGridFilter
