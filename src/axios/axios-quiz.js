import axios from 'axios';

export default axios.create({
	baseURL: 'https://react-quiz-51dfd.firebaseio.com/'
});