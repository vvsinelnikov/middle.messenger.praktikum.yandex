import Handlebars from 'handlebars';
import './message.css';
import template from './message.tmpl';

interface MessageParams {
  timeStamp: string;
  message?: string;
  image?: string;
  direction: string;
}

//TODO Переписать на классы
function Message({timeStamp, message, image, direction}: MessageParams): string {
  const fullDate = new Date(timeStamp);
  const date = fullDate.toDateString();
  const time = fullDate.getHours() + ':' + fullDate.getMinutes();

  //TODO Переписать вывод изображений на <img>
  const type = image ? 'image' : 'text'

  //TODO Написать логику отображения и цвета галочек
  const isRead = direction == 'outbound' ? 'message__body_read' : '';
  return Handlebars.compile(template)({ date, time, type, message, direction, isRead });
}

export default Message;
