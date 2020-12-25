import {
  createStyles,
  fade,
  InputBase,
  InputBaseProps,
  makeStyles,
  Theme,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: (props: SearchInputProps) =>
        props.edge === 'end' ? theme.spacing(0) : theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: (props: SearchInputProps) =>
          props.edge === 'start' ? theme.spacing(0) : theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  })
)

/* eslint-disable-next-line */
export interface SearchInputProps extends InputBaseProps {
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the input with content above or below, without ruining the border
   * size and shape).
   */
  edge?: 'start' | 'end' | false
}

export function SearchInput(props: SearchInputProps) {
  const { value, onChange, edge } = props
  const classes = useStyles(props)
  const { t } = useTranslation()
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchInput
