import { getCookie } from 'cookies-next';
import Swal from 'sweetalert2';

function getLoggedUser({ t }) {

	const showWarningMsg = () => {
		Swal.fire({
			'title': t('Please log in first.'), 
			'icon': 'warning', 
			'confirmButtonColor': '#F5C265', 
		});
	};

	const user = getCookie('user-id');
	if (!user) {
		showWarningMsg();
		return null;
	}
	
	return parseInt(user, 10);
}

export default getLoggedUser;
