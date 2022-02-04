import Block from '../../utils/block';
import './button.css';

interface IButton {
  className: string;
  type: string;
  buttonText: string;
}

class Button extends Block {
  buttonText: string;

  constructor(props: IButton) {
    super('button', props);
    this.buttonText = props.buttonText;
  }

  public render(): HTMLElement {
    return this.compile(this.buttonText, this.props);
  }
}

export default Button;
