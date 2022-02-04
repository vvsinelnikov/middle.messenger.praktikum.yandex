const Handlebars = require('handlebars');
import './error.css';
import template from './error.tmpl.js';
import link from '../../../../components/link/index.js'

function error(error_number, error_text) {
    const error = Handlebars.compile(template)({error_number, error_text});
    document.querySelector('.page').insertAdjacentHTML('afterbegin', error);
    document.querySelector('.error').insertAdjacentHTML('beforeend', link('index.html', 'Назад к чатам'));

}

export default error;