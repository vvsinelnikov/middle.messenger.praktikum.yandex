const Handlebars = require('handlebars');
import '../index.css';
import './profile.css';
import template from './profile.tmpl.js';
import heading from '../../components/heading/index.js'
import button from '../../components/button/index.js'

const profile = Handlebars.compile(template)({
    entry: [
        {
            name: 'Почта',
            placeholder: "pochta@yandex.ru",
            type: 'text'
        },
        {
            name: 'Логин',
            placeholder: "ivanivanov",
            type: 'text'
        },
        {
            name: 'Имя',
            placeholder: "Иван",
            type: 'text'
        },
        {
            name: 'Фамилия',
            placeholder: "Иванов",
            type: 'text'
        },
        {
            name: 'Имя в чате',
            placeholder: "Иван",
            type: 'text'
        },
        {
            name: 'Телефон',
            placeholder: "+7 (909) 967 30 30",
            type: 'tel'
        }
    ],
});

document.querySelector('.page').insertAdjacentHTML('afterbegin', profile);

document.querySelector('.profile__avatar').insertAdjacentHTML('afterend', heading('Иван'));
document.querySelector('.profile__button').insertAdjacentHTML('beforeend', button('Сохранить'));

