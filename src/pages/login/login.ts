import Block from './../../utils/block';
import Heading from './../../components/heading/heading'
import Input from './../../components/input/input'
import Button from './../../components/button/button'
import Link from './../../components/link/link'
import Form from './../../modules/form/form'
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

const heading = new Heading({headingText: 'Вход'});
const inputLogin = new Input(loginData);
const inputPassword = new Input(passwordData);
const button = new Button({
  buttonText: 'Авторизоваться',
  events: {
    click: (evt: Event) => {
      evt.preventDefault();
      form.enableValidation();
      form.sendForm();
    },
  },
});
const link = new Link({linkText: 'Нет аккаунта?', href: 'register.html'});

const form = new Form({
  user: tempData.myUser,
  className: 'form form_login',
  template,
  heading,
  inputLogin,
  inputPassword,
  button,
  link,
});

const login = new Login({
  user: tempData.myUser,
  className: 'login',
  form,
});
render('.page', login.getContent());
login.dispatchComponentDidMount();

// Тесты
// setTimeout(() => {button.hide()}, 800)
// setTimeout(() => {button.show()}, 1200)
// setTimeout(() => {button.setProps({buttonText: 'Еще раз'})}, 1500)
