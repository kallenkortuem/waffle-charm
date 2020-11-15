import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import React from 'react'
import MasteryGridGroup from './MasteryGridGroup'

export interface MasteryGridViewProps {
  masteryLevels: string[]
  sortAscending: boolean
  championMap: Record<number, ChampionData>
  masteries: ChampionMasteryDTO[]
  tag: string
}

export const MasteryGridView = (
  props: MasteryGridViewProps
): React.ReactElement => {
  const { masteryLevels, sortAscending, championMap, masteries, tag } = props

  const groupedMasteries: Record<number, ChampionMasteryDTO[]> = React.useMemo(
    () =>
      masteries.reduce((accum, current) => {
        if (accum[current.championLevel]) {
          accum[current.championLevel].push(current)
        } else {
          accum[current.championLevel] = [current]
        }
        return accum
      }, {}),
    [masteries]
  )

  return (
    <>
      {masteryLevels
        .sort((a, b) =>
          sortAscending ? parseInt(a) - parseInt(b) : parseInt(b) - parseInt(a)
        )
        .map((level) => {
          return (
            <MasteryGridGroup
              key={level}
              level={level}
              groupedMasteries={groupedMasteries}
              tag={tag}
              championMap={championMap}
            ></MasteryGridGroup>
          )
        })}
    </>
  )
}

export default MasteryGridView
