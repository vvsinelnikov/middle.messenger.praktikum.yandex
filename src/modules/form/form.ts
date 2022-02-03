import Block from './../../utils/block';
import FormValidator from '../../utils/form-validator';
import './form.css';

class Form extends Block {
    validator: FormValidator | undefined;
    user: object; //TODO Заменить после подключения API
    template: string;
    className: string;
    heading: any;
    inputLogin: any;
    inputPassword: any;
    button: any;
    link: any;

    constructor(props: any) {
        super('form', props);
        this.props = props;
        this.template = props.template;
        this.validator = undefined;
    }

    public render() {
        const options: any = {};
        options.heading = `<h1>${this.props.heading}</h1>`;
        for (let key in this.props) {
            options[key] = this.props.key;
        };

        return this.compile(this.template, options);
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
    }

    public sendForm() {
        const inputs: any = this.getContent().querySelectorAll('.input__field');
        if ((<HTMLFormElement>this.element).reportValidity()) {
            const result: any = {};
            for (let i of inputs) {
                const input: any = this.getContent().querySelector(`#${i.id}`);
                if (input) { result[input.id] = input.value };
            }
            console.log(result)
        }
    }
}

export default Form;
