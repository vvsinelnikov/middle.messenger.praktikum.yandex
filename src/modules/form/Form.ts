import Handlebars from 'handlebars';
import './form.css';
import template from './form.tmpl';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Link from '../../components/Link/Link';

function Form(
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
  },
): string {
  return Handlebars.compile(template)({
    heading: Heading(headingText),
    button: Button(button),
    entry: inputs.map((i) => Input(i)),
    link: Link(link),
  });
}

export default Form;
