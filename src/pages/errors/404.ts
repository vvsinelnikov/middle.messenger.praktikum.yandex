import '../index.css';
import ErrorPage from './modules/Error/Error';
import render from '../../utils/render';

const error = ErrorPage(404, 'Не туда попали');
render('.page', error)
