import Block from '../../../../utils/Block'
import './greeting.css';

class Greeting extends Block {
  constructor(...props: any) {
    super('p', 'greeting', ...props);
  }

  render() {
    return 'Выберите чат, чтобы отправить сообщение'
  }
}

export default Greeting;
