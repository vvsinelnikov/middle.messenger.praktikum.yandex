import Block from '../../utils/block';
import FormValidator from '../../utils/form-validator';
import './form.css';

interface IForm {
  className?: string;
  user?: object; // TODO Заменить после подключения API
  template?: string;
  heading?: HTMLHeadingElement | string;
  inputLogin?: HTMLInputElement;
  inputPassword?: HTMLInputElement;
  button?: HTMLButtonElement;
  link?: HTMLAnchorElement;
  validator?: FormValidator | undefined;
}

class Form extends Block {
  validator: FormValidator | undefined;

  constructor(props: IForm) {
    super('form', props);
    this.props = props;
    this.validator = undefined;
  }

  public render(): HTMLElement {
    const options: IForm = {};
    options.heading = `<h1>${this.props.heading}</h1>`;
    Object.keys(this.props).forEach((key: string) => {
      options[key] = this.props.key;
    });

    return this.compile(this.props.template, options);
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
      const result: any = {};

      Array.from(inputs).map((i: HTMLInputElement): void => {
        const input: HTMLInputElement | null = this.getContent().querySelector(`#${i.id}`);
        if (input) { result[input.id] = input.value; }
      });
      console.log(result);
    }
  }
}

export default Form;
