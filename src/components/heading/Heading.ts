import Block from './../../utils/block';
import './heading.css';

class Heading extends Block {
  headingType: string;
  headingText: string;

  constructor(props: any) {
    props.className = 'heading';
    super('h1', props);
    this.headingText = props.headingText;
  };

  public render() {
    return this.compile(this.headingText, this.props);
  };
};

export default Heading;
