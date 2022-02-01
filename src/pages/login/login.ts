import '../index.css';
import './login.css';
import Block from './../../utils/block';
import Input from './../../components/input/Input'
import template from './login.tmpl';
import render from './../../utils/render';
import HTTPTransport from './../../utils/http-transport';
import * as tempData from './../home/temp-data';

const inputs = [
  {
    id: 'login',
    placeholder: 'Логин',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  },
  {
    id: 'password',
    placeholder: 'Пароль',
    type: 'password',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  },
];

const button = {
  buttonType: 'submit',
  buttonText: 'Авторизоваться',
};

const link = {
  linkUrl: 'register.html',
  linkText: 'Нет аккаунта?',
};

class Login extends Block {
  constructor(props: any) {
    super('main', props);
    this.props = props;
    this.heading = `<h1>${props.heading}</h1>`
  }

  public render() {
    const options = {
      heading: this.heading,
      input: this.props.input
    };

    return this.compile(template, options);
  }

  public componentDidMount() {}
}

// Получить объект пользователя после авторизации и передать в компонент
// console.log('fetch /auth/user')
// console.log(new HTTPTransport().get('/auth/user'))

const login = new Login({
  user: tempData.myUser,
  heading: 'Вход',
  input: new Input(inputs[0]),
});
render('.page', login.getContent())
console.log(login.getContent())
login.dispatchComponentDidMount();

// form.formElement.classList.add('form_login')
// form.addEventListeners()
