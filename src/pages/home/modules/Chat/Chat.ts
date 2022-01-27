import Handlebars from 'handlebars';
import render from '../../../../utils/render';
import Block from '../../../../utils/Block'
import Message from './modules/Message/Message';
import chatTemplate from './chat.tmpl';
import './chat.css';

interface Params {
  timeStamp: string;
  message?: string;
  image?: string;
  direction: string;
}

class Chat extends Block {
  constructor(...props: any) {
    super('div', 'chat', ...props);
  }

  public render() {
    return Handlebars.compile(chatTemplate)(this.props);
  }

  //TODO Дописать логику постинга даты, вынести ее рендеринг из компонента Message
  //TODO Добавить ID для каждого сообщения
  //TODO Добавить методы для изменения статуса прочтения isRead
  public renderMessage(message: Params) {
    const selector = '#chat' + this.props.chatId;
    render(selector, Message(message));
  }
}

export default Chat;
