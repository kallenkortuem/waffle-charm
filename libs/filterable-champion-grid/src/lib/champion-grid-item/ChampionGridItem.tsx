import { MasteryCard } from '@waffle-charm/mastery'
import {
  selectChampionEntities,
  selectChampionVendor,
  selectLolVersion,
  selectMasteryEntities,
} from '@waffle-charm/store'
import React from 'react'
import { useSelector } from 'react-redux'

/* eslint-disable-next-line */
export interface ChampionGridItemProps {
  championId: string
}
export function ChampionGridItem(props: ChampionGridItemProps) {
  const { championId } = props
  const champion = useSelector(selectChampionEntities)[championId]
  const version = useSelector(selectLolVersion)
  const championVendor = useSelector(selectChampionVendor)
  const masteries = useSelector(selectMasteryEntities)
  const mastery = masteries[parseInt(championId)]

  if (!mastery || !champion) {
    return null
  }

  return (
    <MasteryCard
      champion={champion}
      mastery={mastery}
      version={version}
      championVendor={championVendor}
      hideFullImg
    />
  )
}

export default ChampionGridItem
