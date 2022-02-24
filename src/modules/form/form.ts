import Block from '../../services/block';
import FormValidator from './form-validator';
import './form.css';

interface IForm {
  className?: string;
  template?: string;
  heading?: Block;
  inputLogin?: Block;
  inputPassword?: Block;
  inputPasswordCheck?: Block;
  inputEmail?: Block;
  inputName?: Block;
  inputSurname?: Block;
  inputDisplayName?: Block;
  inputTel?: Block;
  button?: Block;
  link?: Block;
}

class Form extends Block {
  validator: FormValidator;
  linkEditProfile: any;

  constructor(props: IForm) {
    super('form', props);
    this.props = props;
  }

  public render(): DocumentFragment {
    const template = this.props.template ? this.props.template : '';
    return this.compile(template, this.props);
  }

  public enableValidation(): void {
    if (!this.validator) {
      this.validator = new FormValidator(
        {
          inputSelector: '.input__field',
          submitButtonSelector: '.welcome__button',
          inactiveButtonClass: 'welcome__button_inactive',
          errorClass: 'input__error',
        },
        this.element,
      );
      this.validator.enableValidation();
    }
  }

  public sendForm(): void {
    const inputs: NodeListOf<HTMLInputElement> = this.getContent().querySelectorAll('.input__field');
    if ((<HTMLFormElement> this.element).reportValidity()) {
      const result: { [index: string]: string } = {};

      Array.from(inputs).map((input: HTMLInputElement): void => {
        result[input.name] = input.value;
      });
      console.log(result);
    }
  }
}

export default Form;
