import Handlebars from 'handlebars';
import './heading.css';
import template from './heading.tmpl';

function Heading(headingText = '') {
  return Handlebars.compile(template)({ headingText });
}

export default Heading;
