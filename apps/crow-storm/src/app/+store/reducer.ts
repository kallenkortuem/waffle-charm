import { combineReducers } from 'redux'
import {
  championReducer,
  CHAMPION_FEATURE_KEY,
} from './features/champion.slice'
import { masteryReducer, MASTERY_FEATURE_KEY } from './features/mastery.slice'
import {
  summonerReducer,
  SUMMONER_FEATURE_KEY,
} from './features/summoner.slice'

const rootReducer = combineReducers({
  [CHAMPION_FEATURE_KEY]: championReducer,
  [MASTERY_FEATURE_KEY]: masteryReducer,
  [SUMMONER_FEATURE_KEY]: summonerReducer,
})

export default rootReducer
