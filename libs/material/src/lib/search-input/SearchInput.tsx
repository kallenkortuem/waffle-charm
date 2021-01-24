import InputBase, { InputBaseProps } from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0, 0.5),
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    searchIcon: {
      display: 'flex',
      padding: theme.spacing(1),
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SearchInputProps extends InputBaseProps {
  actions?: React.ReactNode
}

export function SearchInput(props: SearchInputProps) {
  const { value, onChange, inputProps, actions } = props
  const classes = useStyles(props)
  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={value}
        className={classes.input}
        onChange={onChange}
        inputProps={inputProps}
      />
      {actions}
    </div>
  )
}

export default SearchInput
