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
				'Books': 'Books', 
				'Login': 'Login',  
				'Creator': 'Creator', 
				'Authors': 'Authors', 
				'Read': 'Read',
				'Create the First Chapter!': 'Create the First Chapter!',  
				'Book Title': 'Book Title', 
				'Introduction': 'Introduction', 
				'Permission': 'Permission', 
				'Public': 'Public', 
				'Private': 'Private',
				'Code': 'Code', 
				'Chapter Name': 'Chapter Name',
				'Describe': 'Describe', 
				'Posting Time': 'Posting Time', 
				'Voting Time': 'Voting Time', 
				'Cancel': 'Cancel', 
				'Save': 'Save', 
			}
		},
		zh: {
			translation: {
				'Home': '首頁', 
				'Back': '返回', 
				'Books': '所有書本', 
				'Login': '登入', 
				'Creator': '建立者', 
				'Authors': '作者', 
				'Read': '閱讀', 
				'Create the First Chapter!': '創建第一個章節！', 
				'Book Title': '書名', 
				'Introduction': '簡介', 
				'Permission': '權限', 
				'Public': '公開', 
				'Private': '私人', 
				'Code': '活動碼', 
				'Chapter Name': '章節名稱', 
				'Describe': '描述', 
				'Posting Time': '投稿時間', 
				'Voting Time': '投票時間', 
				'Cancel': '取消', 
				'Save': '儲存', 
			}
		},
	},
});

export default i18n;
