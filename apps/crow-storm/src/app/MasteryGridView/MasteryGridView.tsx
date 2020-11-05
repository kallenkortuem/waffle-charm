import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
} from '@waffle-charm/api-interfaces'
import React from 'react'
import MasteryGroup from '../MasteryGroup/MasteryGroup'

export const MasteryGridView = (props: {
  masteryLevels: number[]
  sortAscending: boolean
  championData: ChampionDataDragon
  masteries: ChampionMasteryDTO[]
}): React.ReactElement => {
  const { masteryLevels, sortAscending, championData, masteries } = props

  const mappedData: Record<number, ChampionData> =
    Object.entries(championData?.data || []).reduce(
      (accumulated, [_, entry]) => {
        accumulated[entry.key] = entry
        return accumulated
      },
      {}
    ) || {}

  const groupedMasteries: Record<number, ChampionMasteryDTO[]> =
    masteries.reduce((accum, current) => {
      if (accum[current.championLevel]) {
        accum[current.championLevel].push(current)
      } else {
        accum[current.championLevel] = [current]
      }
      return accum
    }, {}) || {}

  return (
    <>
      {masteryLevels
        .sort((a, b) => (sortAscending ? a - b : b - a))
        .map((level) => (
          <MasteryGroup
            key={level}
            level={level}
            groupedMasteries={groupedMasteries}
            mappedData={mappedData}
          ></MasteryGroup>
        ))}
    </>
  )
}

export default MasteryGridView
