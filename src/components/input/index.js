const Handlebars = require("handlebars");
import './input.css';
import template from './input.tmpl.js';

function input({id, placeholder, type, min_length, max_length, required}) {
    // TODO: добавить проверку на типы
    const input_options =
        (min_length ? `min-length=${min_length} ` : '') +
        (max_length ? `max-length=${max_length} ` : '') +
        (required ? required : '');
    return Handlebars.compile(template)({id, placeholder, type, input_options});
}

export default input;