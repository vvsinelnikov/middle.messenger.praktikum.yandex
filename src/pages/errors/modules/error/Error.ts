import Handlebars from 'handlebars';
import './error.css';
import template from './error.tmpl';
import Link from '../../../../components/link/Link';

const link = Link({
  linkUrl: 'index.html',
  linkText: 'Назад к чатам',
});

function ErrorPage(errorNumber: number, errorText: string): string {
  return Handlebars.compile(template)({ errorNumber, errorText, link });
}

export default ErrorPage;
