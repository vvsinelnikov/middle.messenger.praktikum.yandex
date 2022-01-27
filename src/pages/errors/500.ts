import '../index.css';
import ErrorPage from './modules/Error/Error';
import render from '../../utils/render';

const error = ErrorPage(500, 'Мы уже фиксим');
render('.page', error)
