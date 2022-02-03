import ErrorPage from './modules/error/error';
import Link from './../../components/link/link';
import render from '../../utils/render';
import '../index.css';

const link = new Link({linkText: 'Назад к чатам', href: 'index.html'});

const error = new ErrorPage({
    errorText: 'Не туда попали',
    errorNumber: 404,
    link
});
render('.page', error.getContent());
error.dispatchComponentDidMount();
