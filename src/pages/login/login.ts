import '../index.css';
import './login.css';
import Form from '../../modules/form/form';
import render from './../../utils/render';
// import Block from './../../utils/block';
// import * as tempData from './../home/temp-data';

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
  },
];

const button = {
  buttonType: 'submit',
  buttonText: 'Авторизоваться',
};

const link = {
  linkUrl: 'register.html',
  linkText: 'Нет аккаунта?',
};

const form = new Form('Вход', inputs, button, link);

render('.page', form.render())
form.formElement.classList.add('form_login')
form.addEventListeners()



// class Login extends Block {
//   constructor(props: any) {
//     super('main', 'page', props);
//     this.currentUser = props.user;
//   }
//
//   public render() {
//     const form = new Form('Вход', inputs, button, link);
//     // console.log(form)
//     return form.render();
//   }
//
//   public componentDidMount() {}
// }
//
// // Получить объект пользователя после авторизации и передать в компонент
// console.log('fetch /auth/user')
// const login = new Login({
//   user: tempData.myUser
// });
// render('.page', login.getContent())
// login.dispatchComponentDidMount();
