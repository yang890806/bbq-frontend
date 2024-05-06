import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources: {
		en: {
			translation: {
				'Home': 'Home', 
			}
		},
		zh: {
			translation: {
				'Home': '首頁', 
			}
		},
	},
});

export default i18n;
