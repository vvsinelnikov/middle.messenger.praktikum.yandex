import '../index.css';
import ErrorPage from './modules/error/index.js';

const error = ErrorPage(404, 'Не туда попали');
document.querySelector('.page').insertAdjacentHTML('afterbegin', error);