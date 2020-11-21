import Container from '@material-ui/core/Container'
import { createStyles, Theme, withStyles } from '@material-ui/core/styles'

export const PageContainer = withStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      paddingTop: theme.spacing(1),
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(2, 0),
        width: '100%',
      },
    },
  })
)(Container)

export default PageContainer
