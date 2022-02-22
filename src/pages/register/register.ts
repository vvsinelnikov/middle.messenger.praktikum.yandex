import Block from '../../utils/block';
import Heading from '../../components/heading/heading';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Form from '../../modules/form/form';
import template from './register.tmpl';
import render from '../../utils/render';
import '../index.css';
import './register.css';

function registerPage() {
  // Данные для инпутов
  const emailData = {
    className: 'register__input',
    name: 'email',
    placeholder: 'Почта',
    type: 'email',
    maxLength: 40,
    required: 'required',
  };

  const loginData = {
    className: 'register__input',
    name: 'login',
    placeholder: 'Логин',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  };

  const nameData = {
    className: 'register__input',
    name: 'name',
    placeholder: 'Имя',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  };

  const surnameData = {
    className: 'register__input',
    name: 'surname',
    placeholder: 'Фамилия',
    type: 'text',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  };

  const telData = {
    className: 'register__input',
    name: 'tel',
    placeholder: 'Телефон',
    type: 'tel',
    maxLength: 40,
    required: 'required',
  };

  const passwordData = {
    className: 'register__input',
    name: 'password',
    placeholder: 'Пароль',
    type: 'password',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  };

  const passwordCheckData = {
    className: 'register__input',
    name: 'password_check',
    placeholder: 'Пароль (еще раз)',
    type: 'password',
    minLength: 2,
    maxLength: 40,
    required: 'required',
  };

  // Элемены формы
  const inputEmail = new Input(emailData);
  const inputLogin = new Input(loginData);
  const inputName = new Input(nameData);
  const inputSurname = new Input(surnameData);
  const inputTel = new Input(telData);
  const inputPassword = new Input(passwordData);
  const inputPasswordCheck = new Input(passwordCheckData);

  const heading = new Heading({
    headingText: 'Регистрация',
    className: 'heading',
  });

  const button = new Button({
    buttonText: 'Зарегистрироваться',
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
    linkText: 'Войти',
    href: 'login',
  });

  // Форма с элементами
  const form = new Form({
    className: 'form',
    template,
    heading,
    inputEmail,
    inputLogin,
    inputName,
    inputSurname,
    inputTel,
    inputPassword,
    inputPasswordCheck,
    button,
    link,
  });

  // Создание класса и рендеринг страницы
  class Register extends Block {
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

  const register = new Register({
    className: 'register',
    form,
  });
  render('.page', register.getContent());
  register.dispatchComponentDidMount();

}

export default registerPage;
