import Block from '../../../../utils/Block';
import './greeting.css';

class Greeting extends Block {
  constructor(props: any) {
    super('p', props);
  }

  render() {
    return this.compile('Выберите чат, чтобы отправить сообщение', this.props);
    // return 'Выберите чат, чтобы отправить сообщение'
  }
}

export default Greeting;
