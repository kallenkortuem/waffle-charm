import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded'
import { ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'

export interface MasteryTokenProps {
  mastery: ChampionMasteryDTO
  threshold: number
  color?: 'primary' | 'secondary'
  fontSize?: 'small' | 'inherit' | 'default' | 'large'
}

export const MasteryToken = (props: MasteryTokenProps): React.ReactElement => (
  <CheckCircleRoundedIcon
    fontSize={props.fontSize || 'small'}
    color={
      props.mastery.tokensEarned >= props.threshold
        ? props.color || 'primary'
        : 'disabled'
    }
  />
)

export default MasteryToken
