import Grid from '@material-ui/core/Grid'
import React, { ReactElement } from 'react'

export default function CSSGrid(props: {
  children: Array<ReactElement>
}): React.ReactElement {
  const { children } = props

  return (
    <Grid container direction="row" spacing={2}>
      {children?.map((element) => (
        <Grid item xs={12} sm={6} lg={4} key={element.key}>
          {element}
        </Grid>
      ))}
    </Grid>
  )
}
