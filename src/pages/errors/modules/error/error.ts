import Block from '../../../../utils/block';
import template from './error.tmpl';
import './error.css';

interface IErrorPage {
  className: string;
  errorText: string;
  errorNumber: number;
  link: Block;
}

class ErrorPage extends Block {
  constructor(props: IErrorPage) {
    super('div', props);
    this.props = props;
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ErrorPage;
