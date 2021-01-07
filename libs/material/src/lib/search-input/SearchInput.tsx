import IconButton from '@material-ui/core/IconButton'
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0, 0.5),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 400,
      },
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: theme.spacing(1),
    },
    searchIcon: {
      display: 'flex',
      padding: theme.spacing(1),
    },
  })
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchInputProps extends InputBaseProps {
  onClearSearch?: () => void
}

export function SearchInput(props: SearchInputProps) {
  const { value, onChange, onClearSearch, inputProps } = props
  const classes = useStyles(props)
  const { t } = useTranslation()

  return (
    <Paper className={classes.root}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={value}
        className={classes.input}
        onChange={onChange}
        inputProps={inputProps}
      />
      <IconButton
        className={classes.iconButton}
        onClick={onClearSearch}
        aria-label={t('championInputSearch')}
      >
        <CloseIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchInput
