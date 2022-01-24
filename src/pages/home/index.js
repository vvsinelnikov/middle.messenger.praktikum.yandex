import Handlebars from 'handlebars';
import '../index.css';
import './home.css';
import template from './home.tmpl.js';

const home = Handlebars.compile(template)({

});
document.querySelector('.page').insertAdjacentHTML('afterbegin', home);