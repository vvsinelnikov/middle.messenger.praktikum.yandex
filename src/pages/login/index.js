import '../index.css';
import './login.css';
import Form from '../../modules/form/index.js'

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
    }
];

const button = {
    buttonType: 'submit',
    buttonText: 'Авторизоваться',
};

const link = {
    linkUrl: 'register.html',
    linkText: 'Нет аккаунта?',
};

const form = Form('Вход', inputs, button, link);
document.querySelector('.page').insertAdjacentHTML('afterbegin', form);
document.querySelector('.form').classList.add('form_login');
