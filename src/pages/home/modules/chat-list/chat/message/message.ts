import Block from '../../../../../../utils/block';
import template from './message.tmpl';
import './message.css';
import { IUser } from '../../../../../../utils/interfaces';

interface IMessage {
  user: IUser;
  className: string;
  timeStamp: string;
  message: string;
  direction: string;
  image?: string;
}

class Message extends Block {
  timeStamp: string;

  message: string;

  image: string;

  direction: string;

  constructor(props: IMessage) {
    super('div', props);
    this.timeStamp = props.timeStamp;
    this.direction = props.direction;
    this.message = props.message;
    if (props.image) {
      this.image = props.image;
    }
  }

  render() {
    const fullDate = new Date(this.timeStamp);
    const date = fullDate.toDateString();
    const time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;

    // TODO Переписать вывод изображений на <img>
    // TODO Написать логику отображения и цвета галочек
    const params: {
      date: string;
      time: string;
      type: string;
      message: string;
      direction: string;
      isRead: string;
    } = {
      date,
      time,
      type: this.image ? 'image' : 'text',
      message: this.message,
      direction: this.direction,
      isRead: this.direction === 'outbound' ? 'message__body_read' : '',
    };

    return this.compile(template, params);
  }
}

export default Message;
