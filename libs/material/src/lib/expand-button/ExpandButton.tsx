import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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

/* eslint-disable-next-line */
export interface ExpandButtonProps {
  expanded?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function ExpandButton(props: ExpandButtonProps) {
  const { expanded, onClick } = props
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <IconButton
      className={clsx(classes.root, {
        [classes.expandOpen]: expanded,
      })}
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={t('expandIconButton')}
    >
      <ExpandMoreIcon />
    </IconButton>
  )
}

export default ExpandButton
