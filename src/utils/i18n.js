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
				'Creat New Book +':'Creat New Book +',
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
				'Copied': 'Copied', 
				'Success': 'Success', 
				'has been created.': 'has been created.', 
				'fails to be created.': 'fails to be created.', 
				'Chapter 1': 'Chapter 1', 
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
				'Create New Book +':'建立繪本+',
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
				'Copied': '已複製', 
				'Success': '成功', 
				'has been created.': '已被建立。', 
				'fails to be created.': '創建失敗。', 
				'Chapter 1': '第一章', 
			}
		},
	},
});

export default i18n;
