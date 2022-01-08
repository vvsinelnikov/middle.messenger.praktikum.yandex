const Handlebars = require("handlebars");
import './link.css';
import template from './link.tmpl.js';

function link(link_url, link_text) {
    // TODO: добавить проверку на типы
    return Handlebars.compile(template)({link_url, link_text});
}

export default link;