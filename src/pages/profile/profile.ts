import Block from './../../utils/block';
import Heading from './../../components/heading/heading'
import Input from './../../components/input/input'
import Button from '../../components/button/button';
import Link from './../../components/link/link'
import Form from './../../modules/form/form'
import templatePage from './profile.tmpl';
import template from './form.tmpl';
import render from '../../utils/render';
import FormValidator from '../../utils/form-validator'
// import HTTPTransport from './../../utils/http-transport';
import '../index.css';
import './profile.css';
import * as tempData from './../home/temp-data';

const emailData = {
  name: 'Почта',
  placeholder: 'pochta@yandex.ru',
  type: 'text',
};

const loginData = {
  name: 'Логин',
  placeholder: 'ivanivanov',
  type: 'text',
};

const nameData = {
  name: 'Имя',
  placeholder: 'Иван',
  type: 'text',
};

const surnameData = {
  name: 'Фамилия',
  placeholder: 'Иванов',
  type: 'text',
};

const displayData = {
  name: 'Имя в чате',
  placeholder: 'Иван',
  type: 'text',
};

const telData = {
  name: 'Телефон',
  placeholder: '+7 (909) 967 30 30',
  type: 'tel',
};


class Profile extends Block {
  validator: FormValidator | undefined;
  user: object; //TODO Заменить после подключения API
  template: string;
  heading: Heading;
  form: Form;
  linkEditProfile: Link;
  linkEditPassword: Link;
  linkLogout: Link;
  button: Button;

  constructor(props: any) {
    super('div', props);
    this.props = props;
    this.validator = undefined;
  }

  public render() {
    return this.compile(templatePage, this.props)
  }
}

// Получить объект пользователя после авторизации и передать в компонент
// console.log(new HTTPTransport().get('/auth/user'))

const heading = new Heading({headingText: 'Иван'});
const inputEmail = new Input(emailData);
const inputLogin = new Input(loginData);
const inputName = new Input(nameData);
const inputSurname = new Input(surnameData);
const inputDisplayName = new Input(displayData);
const inputTel = new Input(telData);
const button = new Button({
  buttonText: 'Сохранить',
  events: {
    click: (evt: Event) => {
      evt.preventDefault();
      form.enableValidation();
      form.sendForm();
    },
  },
});
const linkEditProfile = new Link({linkText: 'Изменить данные', href: '#'});
const linkEditPassword = new Link({linkText: 'Изменить пароль', href: '#'});
const linkLogout = new Link({linkText: 'Выйти', href: '#'});

const form = new Form({
  user: tempData.myUser,
  // tagName: 'div',
  className: 'profile-form',
  template,
  inputEmail,
  inputLogin,
  inputName,
  inputSurname,
  inputDisplayName,
  inputTel,
});

const profile = new Profile({
  user: tempData.myUser,
  className: 'profile',
  heading,
  form,
  linkEditProfile,
  linkEditPassword,
  linkLogout,
  button
});
render('.page', profile.getContent());
profile.dispatchComponentDidMount();

// Тесты
// setTimeout(() => {button.hide()}, 800)
// setTimeout(() => {button.show()}, 1200)
// setTimeout(() => {button.setProps({buttonText: 'Еще раз'})}, 1500)
