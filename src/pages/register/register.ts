import Block from './../../utils/block';
import Heading from './../../components/heading/heading'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Link from './../../components/link/link'
import Form from './../../modules/form/form'
import template from './register.tmpl';
import render from './../../utils/render';
import FormValidator from '../../utils/form-validator'
// import HTTPTransport from './../../utils/http-transport';
import '../index.css';
import './register.css';
import * as tempData from './../home/temp-data';

const emailData = {
  className: 'register__input',
  id: 'email',
  placeholder: 'Почта',
  type: 'email',
  maxLength: 40,
  required: 'required',
};

const loginData = {
  className: 'register__input',
  id: 'login',
  placeholder: 'Логин',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const nameData = {
  className: 'register__input',
  id: 'name',
  placeholder: 'Имя',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const surnameData = {
  className: 'register__input',
  id: 'surname',
  placeholder: 'Фамилия',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const telData = {
  className: 'register__input',
  id: 'tel',
  placeholder: 'Телефон',
  type: 'tel',
  maxLength: 40,
  required: 'required',
};

const passwordData = {
  className: 'register__input',
  id: 'password',
  placeholder: 'Пароль',
  type: 'password',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const passwordCheckData = {
  className: 'register__input',
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
    form: Form;
  }) {
    super('div', props);
    this.props = props;
    this.validator = undefined;
  }

  public render() {
    return this.compile('{{{form}}}', this.props)
  }
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
      form.enableValidation();
      form.sendForm();
    },
  },
});

const link = new Link({linkText: 'Войти', href: 'login.html'});

const form = new Form({
  user: tempData.myUser,
  className: 'form',
  template,
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

const register = new Register({
  user: tempData.myUser,
  className: 'register',
  form,
});
render('.page', register.getContent());
register.dispatchComponentDidMount();

// Тесты
// setTimeout(() => {button.hide()}, 800)
// setTimeout(() => {button.show()}, 1200)
// setTimeout(() => {button.setProps({buttonText: 'Еще раз'})}, 1500)
