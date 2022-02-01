import Handlebars from 'handlebars';
import {v4 as makeUUID} from 'uuid';
import './form.css';
import Block from './../../utils/block'
import template from './form.tmpl';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';
import FormValidator from '../../utils/form-validator'

class Form extends Block {
    public formElement: HTMLFormElement;
    private _form: string;
    private headingText: string;
    private inputs: {
        id: string;
        placeholder: string;
        type: string;
        minLength?: number | string;
        maxLength?: number | string;
        required?: string;
    }[];
    private button: {
        buttonText: string;
        buttonType: string;
    };
    private link: {
        linkUrl: string;
        linkText: string;
    };

    constructor(props) {
        super('form', props)

        // const uuid = makeUUID(); // '23a91df9-2a89-4357-b297-ec2924d854e3'

        // const params = {
            // heading: Heading(this.headingText),
            // button: Button(this.button),
            // entry: this.inputs.map((i) => {
            //     // i['settings'] = {withInternalID: true};
            //     return new Input(i)
            // }),
            // link: Link(this.link),
        // }
    }

    public render() {
        // console.log(this.props.input[1])
        const options = {
            heading: this.props.headingText,
            // input: this.props.input,
            // input: this.props.input[0]
            input: this.props.input
        };
        console.log(options)
        return this.compile(template, options);
    }

//     public enableValidation() {
//         const validator = new FormValidator(
//             {
//                 inputSelector: '.input__field',
//                 submitButtonSelector: '.welcome__button',
//                 inactiveButtonClass: 'welcome__button_inactive',
//                 errorClass: 'input__error'
//             },
//             this.formElement
//         );
//         validator.enableValidation();
//     }
//
//     public addEventListeners() {
//         this.formElement.onsubmit = (evt: any) => {
//             evt.preventDefault();
//             this.enableValidation();
//
//             if (this.formElement.checkValidity()) {
//                 for (let i of this.inputs) {
//                     const input: any = this.formElement.querySelector(`#${i.id}`);
//                     if (input) {
//                         console.log({
//                             [input.id]: input.value
//                         })
//                     }
//                 }
//             }
//         }
//     }
}

export default Form;
