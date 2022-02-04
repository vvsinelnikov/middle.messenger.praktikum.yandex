import Handlebars from 'handlebars';
import Block from '../../utils/block';
import template from './input.tmpl';
import './input.css';

interface IInput {
  className: string;
  headingText: string;
  id: number;
  placeholder: string;
  type: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  disabled?: string;
}

class Input extends Block {
  constructor(props: IInput) {
    super('div', props);
  }

  public render(): HTMLElement {
    return this.compile(Handlebars.compile(template)(this.props), {});
  }
}

export default Input;
