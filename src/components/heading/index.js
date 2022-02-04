const Handlebars = require("handlebars");
import './heading.css';
import template from './heading.tmpl.js';

function heading(heading_text) {
    // TODO: добавить проверку на количество символов (regexp)
    return Handlebars.compile(template)(typeof heading_text == 'string' ? {heading_text} : '');
};

export default heading;