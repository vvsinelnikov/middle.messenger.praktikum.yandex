import '../index.css';
import ErrorPage from './modules/error/Error';

const error = ErrorPage(500, 'Мы уже фиксим');
document.querySelector('.page').insertAdjacentHTML('afterbegin', error);
