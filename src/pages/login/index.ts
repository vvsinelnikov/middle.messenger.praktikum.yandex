import '../index.css';
import './login.css';
import Form from '../../modules/form/form';
import render from './../../utils/render';

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

const form = new Form('Вход', inputs, button, link);

render('.page', form.render())
form.formElement.classList.add('form_login')
form.addEventListeners()
