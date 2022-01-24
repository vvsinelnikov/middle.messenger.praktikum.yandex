import Handlebars from 'handlebars';
import './button.css';
import template from './button.tmpl.js';

function Button({buttonType = 'button', buttonText = ''}) {
    return Handlebars.compile(template)({buttonType, buttonText});
};

export default Button;