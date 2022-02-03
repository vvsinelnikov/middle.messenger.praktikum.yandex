import Handlebars from 'handlebars';
import Block from './../../utils/block';
import template from './input.tmpl';
import './input.css';

class Input extends Block {
  className: string;
  id: number;
  placeholder: string;
  type: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  disabled?: string

  constructor(props: any) {
    super('div', props);
  };

  public render() {
    return this.compile(Handlebars.compile(template)(this.props), {});
  };
};

export default Input;
