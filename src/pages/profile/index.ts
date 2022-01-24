import Handlebars from 'handlebars';
import '../index.css';
import './profile.css';
import template from './profile.tmpl';
import Heading from '../../components/heading/Heading';
import Button from '../../components/button/Button';

const button = {
  buttonType: 'submit',
  buttonText: 'Сохранить',
};

const profile = Handlebars.compile(template)({
  heading: Heading('Иван'),
  entry: [
    {
      name: 'Почта',
      placeholder: 'pochta@yandex.ru',
      type: 'text',
    },
    {
      name: 'Логин',
      placeholder: 'ivanivanov',
      type: 'text',
    },
    {
      name: 'Имя',
      placeholder: 'Иван',
      type: 'text',
    },
    {
      name: 'Фамилия',
      placeholder: 'Иванов',
      type: 'text',
    },
    {
      name: 'Имя в чате',
      placeholder: 'Иван',
      type: 'text',
    },
    {
      name: 'Телефон',
      placeholder: '+7 (909) 967 30 30',
      type: 'tel',
    },
  ],
  button: Button(button),
});

const page: HTMLElement | null = document.querySelector('.page');
if (page) {
  page.insertAdjacentHTML('afterbegin', profile);
}
