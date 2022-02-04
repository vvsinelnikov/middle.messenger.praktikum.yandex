import Block from '../../../../../../../utils/block';
import template from './message.tmpl';
import './message.css';

class Message extends Block {
  timeStamp: string;

  message: string;

  image: string;

  direction: string;

  constructor(props: any) {
    super('div', props);
    this.timeStamp = props.timeStamp;
    this.image = props.image;
    this.direction = props.direction;
    this.message = props.message;
  }

  render() {
    const fullDate = new Date(this.timeStamp);
    const date = fullDate.toDateString();
    const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;

    // TODO Переписать вывод изображений на <img>
    // TODO Написать логику отображения и цвета галочек
    const params: any = {
      date,
      time,
      type: this.image ? 'image' : 'text',
      message: this.message,
      direction: this.direction,
      isRead: this.direction == 'outbound' ? 'message__body_read' : '',
    };

    return this.compile(template, params);
  }
}

export default Message;
