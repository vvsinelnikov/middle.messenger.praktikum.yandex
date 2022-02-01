import Handlebars from 'handlebars';
import './button.css';
import template from './button.tmpl';

interface Params {
  buttonType: string;
  buttonText: string;
}

function Button({ buttonType = 'button', buttonText = '' }: Params): string {
  return Handlebars.compile(template)({ buttonType, buttonText });
}

// function Button({ buttonType = 'button', buttonText = '' }: Params): string {
//   return Handlebars.compile(template)({ buttonType, buttonText });
// }

export default Button;
