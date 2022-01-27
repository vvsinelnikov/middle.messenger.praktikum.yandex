import Handlebars from 'handlebars';
import './input.css';
import template from './input.tmpl';

interface Params {
  id: string;
  placeholder: string;
  type: string;
  minLength?: number | string;
  maxLength?: number | string;
  required?: string;
}

function Input({
  id, placeholder = '', type, minLength = '', maxLength = '', required = '',
}: Params): string {
  return Handlebars.compile(template)({
    id, placeholder, type, minLength, maxLength, required,
  });
}

export default Input;
