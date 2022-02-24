import Block from '../../../../services/block';
import Link from '../../../../components/link/link';
import template from './error.tmpl';
import './error.css';

class Error extends Block {
  static link = new Link({
    className: 'link',
    linkText: 'Назад к чатам',
    href: '/',
  });

  constructor(props: {
    className: string;
    errorText: string;
    errorNumber: number,
  }) {
    super('div', {link: Error.link, ...props});
    this.props = props;
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Error;
