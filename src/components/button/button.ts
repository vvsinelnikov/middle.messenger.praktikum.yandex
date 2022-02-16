import Block from '../../utils/block';
import './button.css';

interface IButton {
  className: string;
  type: string;
  buttonText: string;
  events?: {
    [index: string] : (evt: Event) => void,
  };
}

class Button extends Block {
  constructor(props: IButton) {
    super('button', props);
    this.buttonText = props.buttonText;
  }

  public render(): DocumentFragment {
    return this.compile(this.buttonText, this.props);
  }
}

export default Button;
