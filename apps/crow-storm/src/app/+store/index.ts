import {
  championReducer,
  CHAMPION_FEATURE_KEY,
  lolVersionReducer,
  LOL_VERSION_FEATURE_KEY,
  masteryReducer,
  MASTERY_FEATURE_KEY,
  settingsReducer,
  SETTINGS_FEATURE_KEY,
  summonerReducer,
  SUMMONER_FEATURE_KEY,
} from '@waffle-charm/store'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  [CHAMPION_FEATURE_KEY]: championReducer,
  [MASTERY_FEATURE_KEY]: masteryReducer,
  [SUMMONER_FEATURE_KEY]: summonerReducer,
  [LOL_VERSION_FEATURE_KEY]: lolVersionReducer,
  [SETTINGS_FEATURE_KEY]: settingsReducer,
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, composedEnhancer)
export default store
