import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export function enablei18nMocks() {
  return i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {},
      },
    },
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
}
