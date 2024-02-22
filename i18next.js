import i18next from 'i18next'; 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './translation/fr.json'
import en from './translation/en.json'


const resources = {
    en: { translation: en },
    fr: { translation: fr },
}
  
i18next
.use(initReactI18next)
.init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en',
    fallbackLng: 'en',
})
  
export default i18next;
