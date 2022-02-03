import Block from './../../../../utils/block';
import template from './error.tmpl';
import './error.css';

class ErrorPage extends Block {
  errorText: any;
  errorNumber: any;

  constructor(props: {
    errorText: string;
    errorNumber: number;
    link: any;
  }) {
    super('div', props);
    this.props = props;
    errorText: this.errorText;
    errorNumber: this.errorNumber;
  }

  public render() {
    return this.compile(template, this.props);
  }
}

export default ErrorPage;
