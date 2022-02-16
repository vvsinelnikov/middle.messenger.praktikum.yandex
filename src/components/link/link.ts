import Block from '../../utils/block';
import './link.css';

interface ILink {
  className: string;
  href: string;
  linkText: string;
  events?: {
    click: (evt: Event) => void
  }
}

class Link extends Block {
  linkText: string;

  constructor(props: ILink) {
    super('a', props);
    this.linkText = props.linkText;
  }

  public render(): DocumentFragment {
    return this.compile(this.linkText, this.props);
  }
}

export default Link;
