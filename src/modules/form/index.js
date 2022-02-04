const Handlebars = require('handlebars');
import './form.css';
import template from './form.tmpl.js';
import heading from '../../components/heading/index.js'
import input from '../../components/input/index.js'
import button from '../../components/button/index.js'
import link from '../../components/link/index.js'

function form(heading_text, inputs, button_text, link_url, link_text) {
    const form = Handlebars.compile(template)({});
    document.querySelector('.page').insertAdjacentHTML('afterbegin', form);

    document.querySelector('.form__container').insertAdjacentHTML('afterbegin', heading(heading_text));

    inputs.map((i) => {
        document.querySelector('.form__container').insertAdjacentHTML('beforeend', input(i));
    });

    document.querySelector('.form__buttons').insertAdjacentHTML('afterbegin', button(button_text));
    document.querySelector('.form__buttons').insertAdjacentHTML('beforeend', link(link_url, link_text));

    f = document.querySelector('.form');
    f.addEventListener('submit', (evt) => {
        evt.preventDefault();
        console.log(evt);
    });
}

export default form;