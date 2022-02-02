import Block from './../../utils/block';
import Heading from './../../components/heading/heading'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Link from './../../components/link/link'
import template from './login.tmpl';
import render from './../../utils/render';
import FormValidator from '../../utils/form-validator'
// import HTTPTransport from './../../utils/http-transport';
import '../index.css';
import './login.css';
import * as tempData from './../home/temp-data';


const loginData = {
  id: 'login',
  placeholder: 'Логин',
  type: 'text',
  minLength: 2,
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

class Login extends Block {
  validator: FormValidator | undefined;

  constructor(props: {
    user: object; //TODO Заменить после подключения API
    className: string;
    heading: Heading;
    inputLogin: Input;
    inputPassword: Input;
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

const heading = new Heading({headingText: 'Вход'});
const inputLogin = new Input(loginData);
const inputPassword = new Input(passwordData);
const button = new Button({
  buttonText: 'Авторизоваться',
  events: {
    click: (evt: Event) => {
      evt.preventDefault();
      // login.enableValidation();
      login.sendForm();
    },
  },
});

const link = new Link({linkText: 'Нет аккаунта?', href: 'register.html'});

const login = new Login({
  user: tempData.myUser,
  className: 'form form_login',
  heading,
  inputLogin,
  inputPassword,
  button,
  link,
});
render('.page', login.getContent());
login.dispatchComponentDidMount();

// Тесты
// setTimeout(() => {button.hide()}, 800)
// setTimeout(() => {button.show()}, 1200)
// setTimeout(() => {button.setProps({buttonText: 'Еще раз'})}, 1500)
