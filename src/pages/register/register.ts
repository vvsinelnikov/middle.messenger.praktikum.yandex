import Block from './../../utils/block';
import Heading from './../../components/heading/heading'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Link from './../../components/link/link'
import template from './register.tmpl';
import render from './../../utils/render';
import FormValidator from '../../utils/form-validator'
// import HTTPTransport from './../../utils/http-transport';
import '../index.css';
import './register.css';
import * as tempData from './../home/temp-data';

const emailData = {
  id: 'email',
  placeholder: 'Почта',
  type: 'email',
  maxLength: 40,
  required: 'required',
};

const loginData = {
  id: 'login',
  placeholder: 'Логин',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const nameData = {
  id: 'name',
  placeholder: 'Имя',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const surnameData = {
  id: 'surname',
  placeholder: 'Фамилия',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const telData = {
  id: 'tel',
  placeholder: 'Телефон',
  type: 'tel',
  maxLength: 40,
  required: 'required',
};

const passwordData = {
  id: 'password',
  placeholder: 'Пароль',
  type: 'password',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const passwordCheckData = {
  id: 'password_check',
  placeholder: 'Пароль (еще раз)',
  type: 'password',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

class Register extends Block {
  validator: FormValidator | undefined;

  constructor(props: {
    user: object; //TODO Заменить после подключения API
    className: string;
    heading: Heading;
    inputEmail: Input;
    inputLogin: Input;
    inputName: Input;
    inputSurame: Input;
    inputTel: Input;
    inputPassword: Input;
    inputPasswordCheck: Input;
    button: Button;
    link: Link;
  }) {
    super('form', props);
    this.props = props;
    this.validator = undefined;
  }

  public render() {
    const options: any = {};
    options.heading = `<h1>${this.props.heading}</h1>`;
    for (let key in this.props) {
      options[key] = this.props.key;
    }

    return this.compile(template, options);
  }

  public componentDidMount() {};

  public enableValidation() {
    if (!this.validator) {
      this.validator = new FormValidator(
          {
            inputSelector: '.input__field',
            submitButtonSelector: '.welcome__button',
            inactiveButtonClass: 'welcome__button_inactive',
            errorClass: 'input__error'
          },
          this.element);
      this.validator.enableValidation();
    }
  };

  public sendForm() {
    const form: HTMLFormElement | null = document.querySelector('.form');
    const inputs: any = document.querySelectorAll('.input__field');
    if (form) {
      if (form.checkValidity()) {
        const result: any = {};
        for (let i of inputs) {
          const input: any = form.querySelector(`#${i.id}`);
          if (input) { result[input.id] = input.value };
        };
        console.log(result)
      };
    };
  };
}

// Получить объект пользователя после авторизации и передать в компонент
// console.log(new HTTPTransport().get('/auth/user'))

const heading = new Heading({headingText: 'Регистрация'});
const inputEmail = new Input(emailData);
const inputLogin = new Input(loginData);
const inputName = new Input(nameData);
const inputSurame = new Input(surnameData);
const inputTel = new Input(telData);
const inputPassword = new Input(passwordData);
const inputPasswordCheck = new Input(passwordCheckData);
const button = new Button({
  buttonText: 'Зарегистрироваться',
  events: {
    click: (evt: Event) => {
      evt.preventDefault();
      register.enableValidation();
      register.sendForm();
    },
  },
});

const link = new Link({linkText: 'Войти', href: 'login.html'});

const register = new Register({
  user: tempData.myUser,
  className: 'form',
  heading,
  inputEmail,
  inputLogin,
  inputName,
  inputSurame,
  inputTel,
  inputPassword,
  inputPasswordCheck,
  button,
  link,
});
render('.page', register.getContent());
register.dispatchComponentDidMount();

// Тесты
// setTimeout(() => {button.hide()}, 800)
// setTimeout(() => {button.show()}, 1200)
// setTimeout(() => {button.setProps({buttonText: 'Еще раз'})}, 1500)




// const button = {
//   buttonType: 'submit',
//   buttonText: 'Зарегистрироваться',
// };
//
// const link = {
//   linkUrl: 'login.html',
//   linkText: 'Войти',
// };
//
// // const form = Form('Регистрация', inputs, button, link);
// // render('.page', form)
// const form = new Form('Вход', inputs, button, link);
//
// render('.page', form.render())
// form.formElement.classList.add('form_login')
// form.addEventListeners()
