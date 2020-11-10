import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
} from '@waffle-charm/api-interfaces'
import React from 'react'
import MasteryGroup from '../MasteryGroup/MasteryGroup'

export const MasteryGridView = (props: {
  masteryLevels: string[]
  sortAscending: boolean
  championData: ChampionDataDragon
  masteries: ChampionMasteryDTO[]
}): React.ReactElement => {
  const { masteryLevels, sortAscending, championData, masteries } = props

  const mappedData: Record<number, ChampionData> = React.useMemo(
    () =>
      Object.entries(championData?.data || []).reduce(
        (accumulated, [_, entry]) => {
          accumulated[entry.key] = entry
          return accumulated
        },
        {}
      ) || {},
    [championData]
  )

  const groupedMasteries: Record<number, ChampionMasteryDTO[]> = React.useMemo(
    () =>
      masteries.reduce((accum, current) => {
        if (accum[current.championLevel]) {
          accum[current.championLevel].push(current)
        } else {
          accum[current.championLevel] = [current]
        }
        return accum
      }, {}) || {},
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
            <MasteryGroup
              key={level}
              level={level}
              groupedMasteries={groupedMasteries}
              mappedData={mappedData}
            ></MasteryGroup>
          )
        })}
    </>
  )
}

export default MasteryGridView
