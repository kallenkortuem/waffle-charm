import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      championMastery: 'Champion Mastery',
      inProgress: 'Work in progress',
      searchPlaceholder: 'Search Summoner...',
      championWithCount: '{{count}} Champion',
      championWithCount_plural: '{{count}} Champions',
      mastery: 'Mastery',
      mastery_plural: 'Masteries',
      masteryLevelNumber: 'Mastery Level {{level}}',
      masteryLevelFilter: 'Champion Mastery Level Filter',
      layout: 'Layout',
      list: 'List view',
      module: 'Module view',
      totalMasteryPoints: 'Total Points: {{points}}',
      percentMasteryProgress:
        '{{percent}} progress towards mastery level {{level}}',
      tokenMasteryProgress: '{{earned}} of {{total}} Tokens Earned',
      toggleDarkTheme: 'Toggle light/dark theme',
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
