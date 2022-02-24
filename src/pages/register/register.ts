import Block from '../../services/block';
import Heading from '../../components/heading/heading';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Form from '../../modules/form/form';
import template from './register.tmpl';
import '../index.css';
import './register.css';

// Создание класса и рендеринг страницы
class Register extends Block {
  // Элемены формы
  static inputEmail = new Input({
    className: 'register__input',
    name: 'email',
    placeholder: 'Почта',
    type: 'email',
    maxLength: 40,
    required: 'required',
  });
  static inputLogin = new Input({
    className: 'register__input',
    name: 'login',
    placeholder: 'Логин',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  });
  static inputName = new Input({
    className: 'register__input',
    name: 'name',
    placeholder: 'Имя',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  });
  static inputSurname = new Input({
    className: 'register__input',
    name: 'surname',
    placeholder: 'Фамилия',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  });
  static inputTel = new Input({
    className: 'register__input',
    name: 'tel',
    placeholder: 'Телефон',
    type: 'tel',
    maxLength: 40,
    required: 'required',
  });
  static inputPassword = new Input({
    className: 'register__input',
    name: 'password',
    placeholder: 'Пароль',
    type: 'password',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  });
  static inputPasswordCheck = new Input({
    className: 'register__input',
    name: 'password_check',
    placeholder: 'Пароль (еще раз)',
    type: 'password',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  });

  static heading = new Heading({
    headingText: 'Регистрация',
    className: 'heading',
  });

  static button = new Button({
    buttonText: 'Зарегистрироваться',
    className: 'welcome__button',
    type: 'submit',
    events: {
      click: (evt: Event) => {
        evt.preventDefault();
        Register.form.enableValidation();
        Register.form.sendForm();
      },
    },
  });

  static link = new Link({
    className: 'link',
    linkText: 'Войти',
    href: 'login',
  });

  // Форма с элементами
  static form = new Form({
    className: 'form',
    template,
    heading: Register.heading,
    inputEmail: Register.inputEmail,
    inputLogin: Register.inputLogin,
    inputName: Register.inputName,
    inputSurname: Register.inputSurname,
    inputTel: Register.inputTel,
    inputPassword: Register.inputPassword,
    inputPasswordCheck: Register.inputPasswordCheck,
    button: Register.button,
    link: Register.link,
  });

  static __instance: Register;

  constructor() {
    if (Register.__instance) {
      return Register.__instance;
    }

    super('div', {
      className: 'register',
      form: Register.form,
    });

    Register.__instance = this;
  }

  public render() {
    return this.compile('{{{form}}}', {});
  }
};

export default Register;
