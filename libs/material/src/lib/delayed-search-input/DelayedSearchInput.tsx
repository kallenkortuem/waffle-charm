import React from 'react'
import { useTranslation } from 'react-i18next'
import { SearchInput, SearchInputProps } from '../search-input/SearchInput'

/* eslint-disable-next-line */
export interface DelayedSearchInputProps extends SearchInputProps {
  delay?: number
  onSearhQueryChange: (query: string) => void
}

export function DelayedSearchInput(props: DelayedSearchInputProps) {
  const { value, delay, onSearhQueryChange, ...otherProps } = props
  const [query, setQuery] = React.useState<string>(value as string)
  const { t } = useTranslation()
  React.useEffect(() => {
    const id = setTimeout(() => {
      onSearhQueryChange(query)
    }, delay ?? 70)
    return () => clearInterval(id)
  }, [delay, query, onSearhQueryChange])

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value || '')
  }

  return (
    <SearchInput
      inputProps={{ 'aria-label': t('searchPlaceholder') }}
      {...otherProps}
      value={query}
      onChange={handleSetQuery}
    />
  )
}

export default DelayedSearchInput
