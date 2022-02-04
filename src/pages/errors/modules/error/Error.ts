import Block from '../../../../utils/block';
import Link from '../../../../components/link/link';
import template from './error.tmpl';
import './error.css';

interface IErrorPage {
  errorText: string;
  errorNumber: number;
  link: Link;
}

class ErrorPage extends Block {
  constructor(props: IErrorPage) {
    super('div', props);
    this.props = props;
  }

  public render() {
    return this.compile(template, this.props);
  }
}

export default ErrorPage;
