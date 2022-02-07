import Block from '../../utils/block';
import Heading from '../../components/heading/heading';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Form from '../../modules/form/form';
import template from './login.tmpl';
import render from '../../utils/render';
import '../index.css';
import './login.css';

// Данные для инпутов
const loginData = {
  className: 'login__input',
  name: 'login',
  placeholder: 'Логин',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

const passwordData = {
  className: 'login__input',
  name: 'password',
  placeholder: 'Пароль',
  type: 'password',
  minLength: 2,
  maxLength: 40,
  required: 'required',
};

// Элементы формы
const inputLogin = new Input(loginData);
const inputPassword = new Input(passwordData);

const heading = new Heading({
  headingText: 'Вход',
  className: 'heading',
});

const button = new Button({
  buttonText: 'Авторизоваться',
  className: 'welcome__button',
  type: 'submit',
  events: {
    click: (evt: Event) => {
      evt.preventDefault();
      form.enableValidation();
      form.sendForm();
    },
  },
});

const link = new Link({
  className: 'link',
  linkText: 'Нет аккаунта?',
  href: 'register.html',
});

// Форма с элементами
const form = new Form({
  className: 'form form_login',
  template,
  heading,
  inputLogin,
  inputPassword,
  button,
  link,
});

// Создание класса и рендеринг страницы
class Login extends Block {
  constructor(props: {
    className: string;
    form: Form;
  }) {
    super('div', props);
    this.props = props;
  }

  public render() {
    return this.compile('{{{form}}}', this.props);
  }
}

const login = new Login({
  className: 'login',
  form,
});
render('.page', login.getContent());
login.dispatchComponentDidMount();
