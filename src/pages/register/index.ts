import '../index.css';
import Form from '../../modules/Form/Form';
import render from '../../utils/render';

const inputs = [
  {
    id: 'email',
    placeholder: 'Почта',
    type: 'email',
    maxLength: 40,
    required: 'required',
  },
  {
    id: 'login',
    placeholder: 'Логин',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  },
  {
    id: 'name',
    placeholder: 'Имя',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  },
  {
    id: 'surname',
    placeholder: 'Фамилия',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  },
  {
    id: 'tel',
    placeholder: 'Телефон',
    type: 'tel',
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
  {
    id: 'password_check',
    placeholder: 'Пароль (еще раз)',
    type: 'password',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  },
];

const button = {
  buttonType: 'submit',
  buttonText: 'Зарегистрироваться',
};

const link = {
  linkUrl: 'login.html',
  linkText: 'Войти?',
};

const form = Form('Регистрация', inputs, button, link);
render('.page', form)
