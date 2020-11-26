import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them)
export const resources = {
  en: {
    translation: {
      champion: 'Champion',
      championMastery: 'Champion Mastery',
      inProgress: 'Work in progress',
      searchPlaceholder: 'Search Summoner...',
      championWithCount: '{{count}} Champion',
      championWithCount_plural: '{{count}} Champions',
      mastery: 'Mastery',
      mastery_plural: 'Masteries',
      masteryLevel: 'Mastery Level',
      masteryLevelNumber: 'Mastery Level {{level}}',
      masteryLevelFilter: 'Champion Mastery Level Filter',
      masteryTable: 'Champion Mastery Table',
      roleFilter: 'Champion Roles Filter',
      layout: 'Layout',
      list: 'List view',
      module: 'Module view',
      totalPoints: 'Total Points',
      totalMasteryPoints: 'Total Points:',
      totalChampionLevels: 'Total Levels:',
      percentMasteryProgress:
        '{{percent}}% Progress Towards Mastery Level {{level}}',
      tokenMasteryProgress: '{{earned}} of {{total}} Tokens Earned',
      toggleDarkTheme: 'Toggle light/dark theme',
      progress: 'Progress',
      welcomeHeader: 'Welcome to Fiddlestats',
      welcomeSubheader:
        'Search for a summoner name in the input above to view champion mastery stats.',
    },
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react is already safes from xss
    },
  })

export default i18n
