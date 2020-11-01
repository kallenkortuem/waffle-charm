import React, { ReactElement } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
  })
)

export default function CSSGrid(props: {
  children: Array<ReactElement>
}): React.ReactElement {
  const { children } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {children?.map((element) => (
        <div
          key={element.key}
          style={{
            gridColumnEnd: 'span 4',
          }}
        >
          {element}
        </div>
      ))}
    </div>
  )
}
