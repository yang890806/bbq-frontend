import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
	lng: 'en',
	fallbackLng: 'en',
	resources: {
		en: {
			translation: {
				'Home': 'Home', 
				'Back': 'Back', 
			}
		},
		zh: {
			translation: {
				'Home': '首頁', 
				'Back': '返回', 
			}
		},
	},
});

export default i18n;
