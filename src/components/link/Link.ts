import Handlebars from 'handlebars';
import './link.css';
import template from './link.tmpl';

interface Params {
  linkUrl: string;
  linkText: string;
}

function Link({ linkUrl = '', linkText = '' }: Params): string {
  return Handlebars.compile(template)({ linkUrl, linkText });
}

export default Link;
