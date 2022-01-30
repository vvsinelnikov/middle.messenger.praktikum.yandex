import '../index.css';
import ErrorPage from './modules/error/error';
import render from '../../utils/render';

const error = ErrorPage(404, 'Не туда попали');
render('.page', error)
