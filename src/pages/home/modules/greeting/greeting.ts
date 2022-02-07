import Block from '../../../../utils/Block';
import './greeting.css';

class Greeting extends Block {
  constructor(props: {
    className: string
  }) {
    super('p', props);
  }

  render(): DocumentFragment {
    return this.compile('Выберите чат, чтобы отправить сообщение', this.props);
  }
}

export default Greeting;
