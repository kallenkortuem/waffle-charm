import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import LinearProgress from '@material-ui/core/LinearProgress'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'

export default function MasteryCard(props: {
  mastery: ChampionMasteryDTO
  champion: ChampionData
}): React.ReactElement {
  const { champion, mastery } = props

  const src = `http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/${champion?.image?.full}`
  const subheader = `Total Points: ${mastery?.championPoints.toLocaleString()}`
  const totalInLevel =
    mastery?.championPointsSinceLastLevel +
    mastery?.championPointsUntilNextLevel
  const progress = Math.floor(
    (mastery?.championPointsSinceLastLevel / totalInLevel) * 100
  )
  const levelProgress =
    mastery.championLevel < 5 ? (
      <CardContent>
        <LinearProgress value={progress} variant="determinate"></LinearProgress>
      </CardContent>
    ) : null
  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt={champion?.name} src={src} />}
        title={champion?.name}
        subheader={subheader}
      />
      {levelProgress}
    </Card>
  )
}
