import Handlebars from 'handlebars';
import './link.css';
import template from './link.tmpl.js';

function Link({linkUrl = '', linkText = ''}) {
    return Handlebars.compile(template)({linkUrl, linkText});
};

export default Link;