const Handlebars = require("handlebars");
import './button.css';
import template from './button.tmpl.js';

function button(button_text) {
    // TODO: добавить проверку на количество символов (regexp)
    return typeof button_text == 'string' ? Handlebars.compile(template)({button_text}) : '';
}

export default button;