const Handlebars = require('handlebars');
import '../index.css';
import './home.css';
import template from './home.tmpl.js';

// TODO: Разобрать на модули JS и CSS
// TODO: Сверстать всплывающие окна
const home = Handlebars.compile(template)({});
document.querySelector('.page').insertAdjacentHTML('afterbegin', home);