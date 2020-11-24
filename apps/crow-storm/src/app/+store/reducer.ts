import { combineReducers } from 'redux'
import { championReducer } from './features/champion.slice'
import { summonerReducer } from './features/summoner.slice'

const rootReducer = combineReducers({
  champion: championReducer,
  summoner: summonerReducer,
})

export default rootReducer
