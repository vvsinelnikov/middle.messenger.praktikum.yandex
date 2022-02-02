import Block from './../../utils/block';
import './button.css';

class Button extends Block {
  buttonText: string;

  constructor(props: any) {
    props.className = 'welcome__button';
    props.type = 'submit';
    super('button', props);
    this.buttonText = props.buttonText;
  };

  public render() {
    return this.compile(this.buttonText, this.props);
  };
};

export default Button;
