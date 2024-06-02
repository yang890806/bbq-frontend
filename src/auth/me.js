import { getCookie } from 'cookies-next';
import axios from '@/utils/axios';

const getMyInfo = async() => {
	const userId = getCookie('user-id');

	if (userId) {
		const { data: userInfo } = await axios.get(`/user/${userId}`, {}, {});
		return userInfo;
	}
	return {};
}

export default getMyInfo;
