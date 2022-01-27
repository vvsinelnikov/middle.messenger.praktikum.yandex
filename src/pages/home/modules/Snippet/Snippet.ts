import Handlebars from 'handlebars';
import render from '../../../../utils/render';
import Block from '../../../../utils/Block'
import './snippet.css';
import template from './snippet.tmpl';

interface Params {
  displayName: string;
  message?: string;
  image?: string;
  timeStamp: string;
  unreadCount?: number;
  isMine?: boolean,
}

//TODO Переписать на классы
// function Snippet({displayName, message, image, timeStamp, unreadCount, isMine}: Params): string {
//   //TODO Вынести в утилиту
//   const fullDate = new Date(timeStamp);
//   const time = fullDate.getHours() + ':' + fullDate.getMinutes();
//
//   const text = image ? 'Изображение' : message;
//   const isMineClass = isMine ? 'snippet__text_my' : '';
//
//   return Handlebars.compile(template)({ displayName, time, text, unreadCount, isMineClass });
// }

class Snippet extends Block {
  constructor(...props: any) {
    super('ul', 'home__snippets-list', ...props);
  }

  public render() {
    return '';
  }

  public renderSnippet(snippet: Params) {
    const fullDate = new Date(snippet.timeStamp);
    const params: any = {
      displayName: snippet.displayName,
      time: fullDate.getHours() + ':' + fullDate.getMinutes(),
      text: snippet.image ? 'Изображение' : snippet.message,
      isMineClass: snippet.isMine ? 'snippet__text_my' : '',
      chatId: this.props.chatId
    }
    if (this.props.unreadCount) { params.unreadCount = this.props.unreadCount };

    render('.home__snippets-list', Handlebars.compile(template)(params));
  }
}

export default Snippet;
