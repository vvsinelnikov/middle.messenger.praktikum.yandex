import Block from '../../services/block';
import Heading from '../../components/heading/heading';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Form from '../../modules/form/form';
import template from './login.tmpl';
import '../index.css';
import './login.css';

// Создание класса и рендеринг страницы
class Login extends Block {
  // Данные для инпутов
  static loginData = {
    className: 'login__input',
    name: 'login',
    placeholder: 'Логин',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  };

  static passwordData = {
    className: 'login__input',
    name: 'password',
    placeholder: 'Пароль',
    type: 'password',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  };

  // Элементы формы
  static inputLogin = new Input(Login.loginData);
  static inputPassword = new Input(Login.passwordData);

  static heading = new Heading({
    headingText: 'Вход',
    className: 'heading',
  });

  static button = new Button({
    buttonText: 'Авторизоваться',
    className: 'welcome__button',
    type: 'submit',
    events: {
      click: (evt: Event) => {
        evt.preventDefault();
        Login.form.enableValidation();
        Login.form.sendForm();
      },
    },
  });

  static link = new Link({
    className: 'link',
    linkText: 'Нет аккаунта?',
    href: 'register',
  });

  // Форма с элементами
  static form = new Form({
    className: 'form form_login',
    template,
    heading: Login.heading,
    inputLogin: Login.inputLogin,
    inputPassword: Login.inputPassword,
    button: Login.button,
    link: Login.link,
  });

  static __instance: Login;

  constructor() {
    if (Login.__instance) {
      return Login.__instance;
    }

    super('div', {
      className: 'login',
      form: Login.form,
    });

    Login.__instance = this;
  }

  public render() {
    return this.compile('{{{form}}}', {});
  }
};

export default Login;
