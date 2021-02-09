import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { bansReducer, BANS_FEATURE_KEY } from './bans.slice'
import {
  championDetailReducer,
  CHAMPION_DETAIL_FEATURE_KEY,
} from './champion-detail.slice'
import { championReducer, CHAMPION_FEATURE_KEY } from './champion.slice'
import { favoriteReducer, FAVORITE_FEATURE_KEY } from './favorite.slice'
import { lolVersionReducer, LOL_VERSION_FEATURE_KEY } from './lol-version.slice'
import {
  masteryViewerReducer,
  MASTERY_VIEWER_FEATURE_KEY,
} from './mastery-viewer.slice'
import { masteryReducer, MASTERY_FEATURE_KEY } from './mastery.slice'
import { settingsReducer, SETTINGS_FEATURE_KEY } from './settings.slice'
import {
  skinPreferenceReducer,
  SKIN_PREFERENCE_FEATURE_KEY,
} from './skin-preference.slice'
import { summonerReducer, SUMMONER_FEATURE_KEY } from './summoner.slice'
import { tagReducer, TAG_FEATURE_KEY } from './tag.slice'

const rootReducer = combineReducers({
  [CHAMPION_FEATURE_KEY]: championReducer,
  [MASTERY_FEATURE_KEY]: masteryReducer,
  [SUMMONER_FEATURE_KEY]: summonerReducer,
  [LOL_VERSION_FEATURE_KEY]: lolVersionReducer,
  [SETTINGS_FEATURE_KEY]: settingsReducer,
  [MASTERY_VIEWER_FEATURE_KEY]: masteryViewerReducer,
  [BANS_FEATURE_KEY]: bansReducer,
  [FAVORITE_FEATURE_KEY]: favoriteReducer,
  [CHAMPION_DETAIL_FEATURE_KEY]: championDetailReducer,
  [SKIN_PREFERENCE_FEATURE_KEY]: skinPreferenceReducer,
  [TAG_FEATURE_KEY]: tagReducer,
})

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage,
  whitelist: [
    SETTINGS_FEATURE_KEY,
    BANS_FEATURE_KEY,
    FAVORITE_FEATURE_KEY,
    SKIN_PREFERENCE_FEATURE_KEY,
    TAG_FEATURE_KEY,
  ],
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

export const store = createStore(persistedReducer, composedEnhancer)
export const persistedStore = persistStore(store)
