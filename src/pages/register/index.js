import '../index.css';
import form from '../../modules/form/index.js'

const inputs = [
    {
        id: 'email',
        placeholder: 'Почта',
        type: 'email',
        max_length: 40,
        required: 'required'
    },
    {
        id: 'login',
        placeholder: 'Логин',
        type: 'text',
        min_length: 2,
        max_length: 40,
        required: 'required'
    },
    {
        id: 'name',
        placeholder: 'Имя',
        type: 'text',
        min_length: 2,
        max_length: 40,
        required: 'required'
    },
    {
        id: 'surname',
        placeholder: 'Фамилия',
        type: 'text',
        min_length: 2,
        max_length: 40,
        required: 'required'
    },
    {
        id: 'tel',
        placeholder: 'Телефон',
        type: 'tel',
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
    },
    {
        id: 'password_check',
        placeholder: 'Пароль (еще раз)',
        type: 'password',
        min_length: 2,
        max_length: 40,
        required: 'required'
    }
];

form('Регистрация', inputs, 'Зарегистрироваться', 'login.html', 'Войти');