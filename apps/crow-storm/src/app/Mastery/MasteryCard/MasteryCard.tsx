import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ChampionAvatar, MasteryProgress } from '../Mastery'

export default function MasteryCard(props: {
  mastery: ChampionMasteryDTO
  champion: ChampionData
}): React.ReactElement {
  const { champion, mastery } = props
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader
        avatar={<ChampionAvatar size="small" champion={champion} />}
        title={champion?.name}
        subheader={t('totalMasteryPoints', {
          points: mastery?.championPoints?.toLocaleString() ?? 0,
        })}
      />
      <CardContent>
        <MasteryProgress mastery={mastery} />
      </CardContent>
    </Card>
  )
}
