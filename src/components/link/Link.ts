import Block from './../../utils/block';
import './link.css';

class Link extends Block {
  linkText: string;

  constructor(props: any) {
    props.className = 'link';
    super('a', props);
    this.linkText = props.linkText;
  };

  public render() {
    return this.compile(this.linkText, this.props);
  };
};

export default Link;
