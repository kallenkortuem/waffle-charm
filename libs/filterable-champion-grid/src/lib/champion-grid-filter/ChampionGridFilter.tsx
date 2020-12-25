import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
)

/* eslint-disable-next-line */
export interface ChampionGridFilterProps {
  children: React.ReactNode
}

export function ChampionGridFilter(props: ChampionGridFilterProps) {
  const { children } = props
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default ChampionGridFilter
