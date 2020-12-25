import { SearchInput, SearchInputProps } from '@waffle-charm/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

/* eslint-disable-next-line */
export interface ChampionGridSearchProps extends SearchInputProps {
  onSearhQueryChange: (query: string) => void
}

export function ChampionGridSearch(props: ChampionGridSearchProps) {
  const { value, onSearhQueryChange } = props
  const [query, setQuery] = React.useState<string>(value as string)
  const { t } = useTranslation()
  React.useEffect(() => {
    const id = setTimeout(() => {
      onSearhQueryChange(query)
    }, 200)
    return () => clearInterval(id)
  }, [query])

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value || '')
  }

  return (
    <SearchInput
      inputProps={{ 'aria-label': t('searchPlaceholder') }}
      {...props}
      value={query}
      onChange={handleSetQuery}
    />
  )
}

export default ChampionGridSearch
