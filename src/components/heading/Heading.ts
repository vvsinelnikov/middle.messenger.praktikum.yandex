import Block from '../../utils/block';
import './heading.css';

interface IHeading {
  className: string;
  headingText: string;
}

class Heading extends Block {
  private headingText: string;

  constructor(props: IHeading) {
    super('h1', props);
    this.headingText = props.headingText;
  }

  public render(): HTMLElement {
    return this.compile(this.headingText, this.props);
  }
}

export default Heading;
