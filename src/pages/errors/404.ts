import ErrorPage from './modules/error/error';
import Link from '../../components/link/link';
import render from '../../utils/render';
import '../index.css';

function errorPage404() {
  const link = new Link({
    className: 'link',
    linkText: 'Назад к чатам',
    href: '/',
  });

  const error = new ErrorPage({
    className: 'error',
    errorText: 'Не туда попали',
    errorNumber: 404,
    link,
  });
  render('.page', error.getContent());
  error.dispatchComponentDidMount();
};

export default errorPage404;
