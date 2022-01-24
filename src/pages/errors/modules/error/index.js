import Handlebars from 'handlebars';
import './error.css';
import template from './error.tmpl.js';
import Link from '../../../../components/link/index.js'

const link = Link({
    linkUrl: 'index.html',
    linkText: 'Назад к чатам',
});

function ErrorPage(errorNumber, errorText) {
    return Handlebars.compile(template)({errorNumber, errorText, link});
};

export default ErrorPage;