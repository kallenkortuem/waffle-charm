import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import React from 'react'

export default function MasteryCard(props: {
  src: string
  alt: string
  subheader: string
  title: string
}): React.ReactElement {
  const { src, alt, title, subheader } = props

  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={alt} src={src} />}
        title={title}
        subheader={subheader}
      />
    </Card>
  )
}
