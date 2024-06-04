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
				'Author': 'Author',
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
				'Search':'Search',
				'has been created.': 'has been created.', 
				'fails to be created.': 'fails to be created.', 
				'Chapter 1': 'Chapter 1', 
				'Join Event': 'Join Event', 
				'My Events': 'My Events', 
				'Enter event code': 'Enter event code', 
				'Confirm': 'Confirm', 
				'The book has not been published yet...': 'The book has not been published yet...', 
				'The book is not found...': 'The book is not found...', 
				'Find Events': 'Find Events',
				'Go to All Publication': 'Go to All Publication',
				'Go to All Events_chain': 'Go to All Events',
				'Go to All Events_voting': 'Go to All Events',
				'Settings': 'Settings',
				'Publication': 'Publication',
				'Solitaire': 'Solitaire',
				'Vote': 'Vote',
				'Show All': 'Show All',
				'Create': 'Create',
				'Participate': 'Participate',
				'Paragraph': 'Paragraph',
				'Join Event!':'Join Event!',
				'Search by Book Title...': 'Search by Book Title...',
				'Search by Authors...': 'Search by Authors...',
				'Search by Event Code...': 'Search by Event Code...',
				'Search by Event Code': 'Search by Event Code',
				'Enter Event Code...': 'Enter Event Code...',
				'No relevant books found.': 'No relevant books found.', 
				'Post': 'Post', 
				'Vote': 'Vote', 
				'Please log in first.': 'Please log in first.', 
				'Add': 'Add', 
				'The chapter fails to be created.': 'The chapter fails to be created.', 
				'Add Chapter': 'Add Chapter', 
				'The chapter has been created.': 'The chapter has been created.',
				'Error':'Error',
				'The page is created.':'The page is created.',
				'The page fails to be created.':'The page fails to be created.',
				'I want to chain!':'I want to chain!',
				'Enter text...':'Enter text...',
				'Vote successfully!':'Vote successfully!',
				'Fails to vote the page':'Fails to vote the page',
				'Please try again.':'Please try again.',
				'Chaining':'Chaining',
				'Voting':'Voting',
				'Completed':'Completed',
				'Post!': 'Post!', 
				'Paragraph': 'Paragraph', 
				'Published': 'Published', 
				'All': 'All', 
				'Join': 'Join', 
				'Create Event': 'Create Event', 
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
				'Author':'作者',
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
				'Search':'搜尋',
				'has been created.': '已被建立。', 
				'fails to be created.': '創建失敗。', 
				'Chapter 1': '第一章', 
				'Join Event': '加入活動', 
				'My Events': '我的活動', 
				'Enter event code': '輸入活動碼',
				'Confirm': '確定', 
				'The book has not been published yet...': '該書本尚未發行...', 
				'The book is not found...': '查無此書...', 
				'Find Events': '尋找活動',
				'Go to All Publication': '所有刊物',
				'Go to All Events_chain': '所有接龍',
				'Go to All Events_voting': '所有投票',
				'Settings': '前往設定',
				'Publication': '出版物',
				'Solitaire': '接龍',
				'Vote': '投票',
				'Show All': '顯示全部',
				'Create': '創建',
				'Participate': '參與',
				'Paragraph': '段落',
				'Join Event!':'參與活動!',
				'Search by Book Title...': '以書名搜尋...',
				'Search by Authors...': '以作者搜尋...',
				'Search by Event Code...': '以活動碼搜尋...',
				'Search by Event Code': '以活動代碼搜尋',
				'Search by Event Code': '以活動代碼搜尋',
				'Enter Event Code...': '輸入活動代碼...',
				'No relevant books found.': '沒有找到相關書本。', 
				'Post': '投稿', 
				'Vote': '投票', 
				'Please log in first.': '請先登入', 
				'Add': '新增', 
				'Add Chapter': '新增章節', 
				'The chapter fails to be created.': '章節建立失敗', 
				'The chapter has been created.': '章節建立成功',
				'Error':'錯誤',
				'The page is created.':'頁面已建立',
				'The page fails to be created.':'頁面建立失敗',
				'I want to chain!':'我要接龍',
				'Enter text...':'輸入文字...',
				'Vote successfully!':'投票成功!',
				'Fails to vote the page':'投票失敗',
				'Please try again.':'請再試一次',
				'Chaining':'接龍中',
				'Voting':'投票進行中',
				'Completed':'已完成', 
				'Post!': '發布！', 
				'Paragraph': '段落', 
				'Published': '已發布', 
				'All': '全部', 
				'Join': '加入', 
				'Create Event': '建立活動', 
			}
		},
	},
});

export default i18n;
