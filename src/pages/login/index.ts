import '../index.css';
import './login.css';
import Form from '../../modules/form/Form';

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

const form: string = Form('Вход', inputs, button, link);

const page: HTMLElement | null = document.querySelector('.page');
if (page) {
  page.insertAdjacentHTML('afterbegin', form);
}

const f: HTMLElement | null = document.querySelector('.form');
if (f) {
  f.classList.add('form_login');
}
