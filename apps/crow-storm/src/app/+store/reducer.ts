import { combineReducers } from 'redux'
import {
  championReducer,
  CHAMPION_FEATURE_KEY,
} from './features/champion.slice'
import {
  lolVersionReducer,
  LOL_VERSION_FEATURE_KEY,
} from './features/lol-version.slice'
import { masteryReducer, MASTERY_FEATURE_KEY } from './features/mastery.slice'
import {
  summonerReducer,
  SUMMONER_FEATURE_KEY,
} from './features/summoner.slice'

const rootReducer = combineReducers({
  [CHAMPION_FEATURE_KEY]: championReducer,
  [MASTERY_FEATURE_KEY]: masteryReducer,
  [SUMMONER_FEATURE_KEY]: summonerReducer,
  [LOL_VERSION_FEATURE_KEY]: lolVersionReducer,
})

export default rootReducer
