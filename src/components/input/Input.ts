import Handlebars from 'handlebars';
import './input.css';
import Block from './../../utils/block'
import template from './input.tmpl';


interface Params {
  id: string;
  placeholder: string;
  type: string;
  minLength?: number | string;
  maxLength?: number | string;
  required?: string;
}

// function Input({
//     id, placeholder = '', type, minLength = '', maxLength = '', required = '',
//   }: Params): string {
//   return Handlebars.compile(template)({
//     id, placeholder, type, minLength, maxLength, required,
//   });
// }
//
// export default Input;

class Input extends Block {
  id: number;
  placeholder: string;
  type: string;
  minLength?: number;
  maxLength?: number;
  required?: number;
  input: string;
  inputElement: HTMLElement;

  constructor(props: any) {
    super('div', props);
  }

  public render() {
    const { id, placeholder, type, minLength, maxLength, required } = this.props;
    const compiledTemplate = Handlebars.compile(template);
    // return compiledTemplate({ id, placeholder, type, minLength, maxLength, required });

    const { __id } = this.props;
    console.log(__id);

    return this.compile(compiledTemplate(this.props), {});
  }
}

export default Input;
