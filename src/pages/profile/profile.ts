import Block from '../../utils/block';
import Heading from '../../components/heading/heading';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Link from '../../components/link/link';
import Form from '../../modules/form/form';
import templatePage from './profile.tmpl';
import template from './form.tmpl';
import render from '../../utils/render';
import FormValidator from '../../utils/form-validator';
// import HTTPTransport from './../../utils/http-transport';
import '../index.css';
import './profile.css';
import * as tempData from '../home/temp-data';

const emailData = {
  className: 'profile__field',
  id: 'email',
  name: 'Почта',
  placeholder: 'pochta@yandex.ru',
  type: 'email',
  maxLength: 40,
  required: 'required',
  disabled: 'disabled',
};

const loginData = {
  className: 'profile__field',
  id: 'login',
  name: 'Логин',
  placeholder: 'ivanivanov',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
  disabled: 'disabled',
};

const nameData = {
  className: 'profile__field',
  id: 'name',
  name: 'Имя',
  placeholder: 'Иван',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
  disabled: 'disabled',
};

const surnameData = {
  className: 'profile__field',
  id: 'surname',
  name: 'Фамилия',
  placeholder: 'Иванов',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
  disabled: 'disabled',
};

const displayData = {
  className: 'profile__field',
  id: 'displayName',
  name: 'Имя в чате',
  placeholder: 'Иван',
  type: 'text',
  minLength: 2,
  maxLength: 40,
  required: 'required',
  disabled: 'disabled',
};

const telData = {
  className: 'profile__field',
  id: 'tel',
  name: 'Телефон',
  placeholder: '+7 (909) 967 30 30',
  type: 'tel',
  maxLength: 40,
  required: 'required',
  disabled: 'disabled',
};

class Profile extends Block {
  validator: FormValidator | undefined;

  user: object; // TODO Заменить после подключения API

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
    this.editProfile = props.editProfile;
  }

  public render() {
    return this.compile(templatePage, this.props);
  }

  public editProfile(): void {
    return this.editProfile();
  }
}

// Получить объект пользователя после авторизации и передать в компонент
// console.log(new HTTPTransport().get('/auth/user'))

// Элемены формы
const heading = new Heading({
  headingText: 'Иван',
  className: 'heading',
});
const inputEmail = new Input(emailData);
const inputLogin = new Input(loginData);
const inputName = new Input(nameData);
const inputSurname = new Input(surnameData);
const inputDisplayName = new Input(displayData);
const inputTel = new Input(telData);
const button = new Button({
  buttonText: 'Сохранить',
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

// Кнопки управления
const linkEditProfile = new Link({
  className: 'link',
  linkText: 'Изменить данные',
  href: '#',
  events: {
    click: (evt: Event) => {
      evt.preventDefault();
      profile.editProfile();
    },
  },
});

const linkEditPassword = new Link({
  className: 'link',
  linkText: 'Изменить пароль',
  href: '#',
  // TODO Сделать попап
});

const linkLogout = new Link({
  className: 'link',
  linkText: 'Выйти',
  href: 'index.html',
});

const form = new Form({
  user: tempData.myUser,
  className: 'profile__form',
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
  button,
  editProfile: () => {
    linkEditProfile.hide();
    linkEditPassword.hide();
    linkLogout.hide();
    button.show();
    inputEmail.setProps({ disabled: false });
    inputLogin.setProps({ disabled: false });
    inputName.setProps({ disabled: false });
    inputSurname.setProps({ disabled: false });
    inputDisplayName.setProps({ disabled: false });
    inputTel.setProps({ disabled: false });
  },
});
render('.page', profile.getContent());
profile.dispatchComponentDidMount();
button.hide();

form.setProps({
  user: {
    id: 256,
    first_name: 'Вова',
    second_name: 'Синельников',
    display_name: 'Это я, Синельников',
    login: 'vvsin',
    email: 'sinelnikov@gmail.com',
    phone: '8(995)-211-37-89',
    avatar: '/path/to/avatar.jpg',
  },
});

// Тесты
// setTimeout(() => {
//   linkEditProfile.hide()
//   linkEditPassword.hide()
//   linkLogout.hide()
// }, 800)
// setTimeout(() => {button.show()}, 1200)
// setTimeout(() => {button.setProps({buttonText: 'Еще раз'})}, 1500)
