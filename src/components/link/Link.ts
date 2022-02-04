import Block from '../../utils/block';
import './link.css';

interface ILink {
  className?: string;
  href: string;
  linkText: string;
}

class Link extends Block {
  linkText: string;

  constructor(props: ILink) {
    super('a', props);
    this.linkText = props.linkText;
  }

  public render(): HTMLElement {
    return this.compile(this.linkText, this.props);
  }
}

export default Link;
