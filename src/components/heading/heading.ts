import Block from '../../utils/block';
import './heading.css';

class Heading extends Block {
  headingText: string;

  constructor(props: {
    className: string;
    headingText: string;
  }) {
    super('h1', props);
    this.headingText = props.headingText;
  }

  public render(): DocumentFragment {
    return this.compile(this.headingText, this.props);
  }
}

export default Heading;
