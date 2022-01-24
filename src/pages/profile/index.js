import Handlebars from 'handlebars';
import '../index.css';
import './profile.css';
import template from './profile.tmpl.js';
import Heading from '../../components/heading/index.js'
import Button from '../../components/button/index.js'

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
        }
    ],
    button: Button(button),
});

document.querySelector('.page').insertAdjacentHTML('afterbegin', profile);

