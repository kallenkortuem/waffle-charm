import LinearProgress from '@material-ui/core/LinearProgress'
import { createStyles, Theme, withStyles } from '@material-ui/core/styles'

export const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(1),
      borderRadius: theme.spacing(0.5),
    },
    bar: {
      borderRadius: theme.spacing(0.5),
    },
  })
)(LinearProgress)

export default BorderLinearProgress
