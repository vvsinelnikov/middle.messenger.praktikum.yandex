import Handlebars from 'handlebars';
import Block from '../../utils/block';
import template from './input.tmpl';
import './input.css';

interface IInput {
  className: string;
  name: string;
  type: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  required?: string;
  disabled?: string;
}

class Input extends Block {
  constructor(props: IInput) {
    super('div', props);
  }

  public render(): DocumentFragment {
    return this.compile(Handlebars.compile(template)(this.props), {});
  }
}

export default Input;
