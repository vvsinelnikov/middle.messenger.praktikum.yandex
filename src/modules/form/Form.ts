import Handlebars from 'handlebars';
import './form.css';
import template from './form.tmpl';
import Heading from '../../components/heading/Heading';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Link from '../../components/link/Link';

function Form(
  headingText: string,
  inputs: {
    id: string;
    maxLength: number | string;
    minLength: number | string;
    placeholder: string;
    required: string;
    type: string;
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
