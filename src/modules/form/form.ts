import Handlebars from 'handlebars';
import './form.css';
import template from './form.tmpl';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import FormValidator from '../../utils/form-validator'

class Form {
    public formElement: HTMLFormElement;
    private _form: string;
    private inputs: any;

    constructor(
        headingText: string,
        inputs: {
            id: string;
            placeholder: string;
            type: string;
            minLength?: number | string;
            maxLength?: number | string;
            required?: string;
        }[],
        button: {
            buttonText: string;
            buttonType: string;
        },
        link: {
            linkUrl: string;
            linkText: string;
        }
    ) {
        this.inputs = inputs;
        this._form = Handlebars.compile(template)({
            heading: Heading(headingText),
            button: Button(button),
            entry: inputs.map((i) => Input(i)),
            link: Link(link),
        });

        this.formElement = document.createElement('form');
        this.formElement.classList.add('form');
        this.formElement.noValidate = true;
        this.formElement.insertAdjacentHTML("afterbegin", this._form)
    }

    public render() {
        return this.formElement;
    }

    public enableValidation() {
        const validator = new FormValidator(
            {
                inputSelector: '.input__field',
                submitButtonSelector: '.welcome__button',
                inactiveButtonClass: 'welcome__button_inactive',
                errorClass: 'input__error'
            },
            this.formElement
        );
        validator.enableValidation();
    }

    public addEventListeners() {
        this.formElement.onsubmit = (evt: any) => {
            evt.preventDefault();
            this.enableValidation();

            if (this.formElement.checkValidity()) {
                for (let i of this.inputs) {
                    const input: any = this.formElement.querySelector(`#${i.id}`);
                    if (input) {
                        console.log({
                            [input.id]: input.value
                        })
                    }
                }
            }
        }
    }
}

export default Form;
