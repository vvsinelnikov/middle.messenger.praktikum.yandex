import Handlebars from 'handlebars';
import './input.css';
import template from './input.tmpl.js';

function Input({id, placeholder = '', type, minLength = '', maxLength = '', required = ''}) {
    return Handlebars.compile(template)({id, placeholder, type, minLength, maxLength, required});
};

export default Input;