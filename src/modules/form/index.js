import Handlebars from 'handlebars';
import './form.css';
import template from './form.tmpl.js';
import Heading from '../../components/heading/index.js'
import Input from '../../components/input/index.js'
import Button from '../../components/button/index.js'
import Link from '../../components/link/index.js'

function Form(headingText, inputs, button, link) {
    return Handlebars.compile(template)({
        heading: Heading(headingText),
        button: Button(button),
        entry: inputs.map((i) => {return Input(i)}),
        link: Link(link),
    });
};

export default Form;