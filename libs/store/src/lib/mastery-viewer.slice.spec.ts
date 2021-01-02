import { ChampionEntity } from './champion.slice'
import {
  masteryViewerActions,
  masteryViewerReducer,
  selectFilteredChampionIds,
} from './mastery-viewer.slice'
import { MasteryEntity } from './mastery.slice'

const annie = {
  id: 'Annie',
  key: '1',
  name: 'Annie',
  tags: ['Mage'],
  partype: 'Mana',
}
const olaf = {
  id: 'Olaf',
  key: '2',
  name: 'Olaf',
  tags: ['Fighter', 'Tank'],
}
const galio = {
  id: 'Galio',
  key: '3',
  name: 'Galio',
  tags: ['Tank', 'Mage'],
}

const allChampions = [annie, olaf, galio] as ChampionEntity[]

const masteryEntities = {
  '1': {
    championId: 1,
    championLevel: 4,
    championPoints: 13603,
    lastPlayTime: 1603505470000,
    championPointsSinceLastLevel: 1003,
    championPointsUntilNextLevel: 7997,
    chestGranted: false,
    tokensEarned: 0,
  } as MasteryEntity,
  '2': {
    championId: 2,
    championLevel: 2,
    championPoints: 4339,
    lastPlayTime: 1584237782000,
    championPointsSinceLastLevel: 2539,
    championPointsUntilNextLevel: 1661,
    chestGranted: false,
    tokensEarned: 0,
  } as MasteryEntity,
  '3': {
    championId: 3,
    championLevel: 5,
    championPoints: 26543,
    lastPlayTime: 1606465996000,
    championPointsSinceLastLevel: 4943,
    championPointsUntilNextLevel: 0,
    chestGranted: true,
    tokensEarned: 0,
  } as MasteryEntity,
} as Record<string, MasteryEntity>

describe('masteryViewer reducer', () => {
  it('should handle actions', () => {
    let state = masteryViewerReducer(
      undefined,
      masteryViewerActions.setLevel(2)
    )

    expect(state).toEqual(
      expect.objectContaining({
        level: 2,
      })
    )

    state = masteryViewerReducer(
      state,
      masteryViewerActions.setSearchQuery('kal')
    )

    expect(state).toEqual(
      expect.objectContaining({
        level: 2,
        searchQuery: 'kal',
      })
    )

    state = masteryViewerReducer(state, masteryViewerActions.setTag('top'))

    expect(state).toEqual(
      expect.objectContaining({
        level: 2,
        searchQuery: 'kal',
        tag: 'top',
      })
    )

    state = masteryViewerReducer(state, masteryViewerActions.setLayout('list'))

    expect(state).toEqual(
      expect.objectContaining({
        level: 2,
        searchQuery: 'kal',
        tag: 'top',
        layout: 'list',
      })
    )
  })
})

describe('selectFilteredChampionIds', () => {
  test('should always filter by searchQuery if present', () => {
    const searchQuery = 'ola' // search for Olaf
    const result = selectFilteredChampionIds.resultFunc(
      allChampions,
      {},
      7,
      searchQuery,
      'Assasin'
    )

    expect(result.length).toBe(1)
    expect(result[0]).toBe(olaf.key)
  })

  test('should require the tag and filter to both match if present', () => {
    const result = selectFilteredChampionIds.resultFunc(
      allChampions,
      masteryEntities,
      5,
      undefined,
      'Tank'
    )

    expect(result.length).toBe(1)
    expect(result[0]).toBe(galio.key)
  })

  test('should sort by mastery level', () => {
    const result = selectFilteredChampionIds.resultFunc(
      allChampions,
      masteryEntities,
      undefined,
      undefined,
      undefined
    )

    expect(result[0]).toBe(galio.key)
    expect(result[1]).toBe(annie.key)
    expect(result[2]).toBe(olaf.key)
  })
})
