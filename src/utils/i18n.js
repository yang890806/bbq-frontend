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
				'Logout': 'Logout', 
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
				'Copied': 'Copied', 
				'Success': 'Success', 
				'has been created.': 'has been created.', 
				'fails to be created.': 'fails to be created.', 
				'Chapter 1': 'Chapter 1', 
				'Join Event': 'Join Event', 
				'My Events': 'My Events', 
				'Enter Code': 'Enter Code', 
				'Confirm': 'Confirm', 
			}
		},
		zh: {
			translation: {
				'Home': '首頁', 
				'Back': '返回', 
				'Books': '所有書本', 
				'Login': '登入', 
				'Logout': '登出', 
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
				'Copied': '已複製', 
				'Success': '成功', 
				'has been created.': '已被建立。', 
				'fails to be created.': '創建失敗。', 
				'Chapter 1': '第一章', 
				'Join Event': '加入活動', 
				'My Events': '我的活動', 
				'Enter Code': '輸入活動碼',
				'Confirm': '確定',  
			}
		},
	},
});

export default i18n;
