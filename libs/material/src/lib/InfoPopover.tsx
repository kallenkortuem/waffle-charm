import { ClickAwayListener, IconButton } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InfoIcon from '@material-ui/icons/Info'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { display: 'inline' },
    typography: {
      padding: theme.spacing(2),
    },
    popper: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InfoPopoverProps {
  text: string
}

export function InfoPopover(props: InfoPopoverProps) {
  const { text } = props
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const id = open ? 'info-popover' : undefined

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  return (
    <div className={classes.root} aria-hidden>
      <Popper
        className={classes.popper}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        id={id}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Typography className={classes.typography}>{text}</Typography>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? id : undefined}
        aria-haspopup="true"
        aria-label={text}
        onClick={handleToggle}
      >
        <InfoIcon></InfoIcon>
      </IconButton>
    </div>
  )
}

export default InfoPopover
