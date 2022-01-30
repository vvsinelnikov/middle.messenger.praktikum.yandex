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



// class Input {
//   id: number;
//   placeholder: string;
//   type: string;
//   minLength?: number;
//   maxLength?: number;
//   required?: number;
//   input: string;
//   inputElement: HTMLElement;
//
//   constructor({id, placeholder, type, minLength, maxLength, required}) {
//     this.input = Handlebars.compile(template)({
//       id, placeholder, type, minLength, maxLength, required,
//     })
//   }
//
//   public render(): HTMLElement {
//     this.inputElement = document.createElement('div');
//     // this.inputElement.classList.add('');
//     this.inputElement.insertAdjacentHTML("afterbegin", this.input)
//     return this.inputElement;
//   }
// }

