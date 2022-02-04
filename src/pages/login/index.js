import '../index.css';
import './login.css';
import form from '../../modules/form/index.js'

const inputs = [
    {
        id: 'login',
        placeholder: 'Логин',
        type: 'text',
        min_length: 2,
        max_length: 40,
        required: 'required'
    },
    {
        id: 'password',
        placeholder: 'Пароль',
        type: 'password',
        min_length: 2,
        max_length: 40,
        required: 'required'
    }
];

form('Вход', inputs, 'Авторизоваться', 'register.html', 'Нет аккаунта?');
document.querySelector('.form').classList.add('form_login');
