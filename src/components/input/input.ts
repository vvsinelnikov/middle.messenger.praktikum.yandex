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
  required?: boolean | string;
  disabled?: boolean | string;
}

class Input extends Block {
  constructor(props: IInput) {
    super('div', props);
    // this.setProps({
    //   events: {
    //     blur: this.onBlur,
    //     focus: this.onFocus
    //   }
    // })
  }

  // TODO Добавить способ валидации из чата
  // public onFocus(evt: Event): void {
  //   const input = evt.target;
  //   const value = input.value;
  //   function showError() {} // данные не валидны, надо показать ошибку
  //
  //   if (!validate(input.type || 'text', value)) {
  //     showError()
  //     return;
  //   }
  //
  //   console.log(value); // данные валидны, можем их куда-нибудь сохранить
  // }
  // public onBlur() {}

  public render(): DocumentFragment {
    return this.compile(Handlebars.compile(template)(this.props), {});
  }
}

export default Input;
