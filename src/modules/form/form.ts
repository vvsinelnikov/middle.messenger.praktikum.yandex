import Handlebars from 'handlebars';
import {v4 as makeUUID} from 'uuid'
import template from './form.tmpl';
import Block from './../../utils/block'
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import FormValidator from '../../utils/form-validator'
import './form.css';

class Form extends Block {
    validator: FormValidator | undefined;

    constructor(props: {
        user: object; //TODO Заменить после подключения API
    }) {
        super('form', props);
        this.props = props;
        this.validator = undefined;
    }

    public render() {
        const options: any = {};
        options.heading = `<h1>${this.props.heading}</h1>`;
        for (let key in this.props) {
            options[key] = this.props.key;
        }

        return this.compile(template, options);
    }

    public enableValidation() {
        if (!this.validator) {
            this.validator = new FormValidator(
                {
                    inputSelector: '.input__field',
                    submitButtonSelector: '.welcome__button',
                    inactiveButtonClass: 'welcome__button_inactive',
                    errorClass: 'input__error'
                },
                this.element);
            this.validator.enableValidation();
        }
    };

    public sendForm() {
        const inputs: any = this.getContent().querySelectorAll('.input__field');
        if (this.element) { // + validate()
            const result: any = {};
            for (let i of inputs) {
                const input: any = this.getContent().querySelector(`#${i.id}`);
                if (input) { result[input.id] = input.value };
            };
            console.log(result)
        };
    };
}

export default Form;
