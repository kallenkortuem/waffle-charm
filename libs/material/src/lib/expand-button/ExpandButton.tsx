import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    icon: {
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
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function ExpandButton(props: ExpandButtonProps) {
  const { expanded, className, onClick } = props
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <IconButton
      className={clsx(classes.root, className)}
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={t('expandIconButton')}
    >
      <ExpandMoreIcon
        className={clsx(classes.icon, { [classes.expandOpen]: expanded })}
      />
    </IconButton>
  )
}

export default ExpandButton
