import Block from '../../../../../utils/block';
import Message from './message/message';
import './chat.css';
import { IUser, IChatResponse } from '../../../../../utils/interfaces';

class Chat extends Block {
  currentUser: IUser;

  constructor(props: {
    user: IUser;
    className: string;
    chatData?: IChatResponse;
  }) {
    super('div', props);
    this.currentUser = props.user;
  }

  public render(): DocumentFragment {
    return this.compile('', this.props);
  }

  // TODO Добавить фото в шапку.
  // TODO Добавить логику постинга даты, вынести ее рендеринг из компонента Message
  // TODO Добавить методы для изменения статуса прочтения isRead

  public renderMessage(chatResponse: IChatResponse): void {
    const timeStamp = chatResponse.last_message.time;
    let messageData = '';
    let imageData = '';

    if (typeof chatResponse.last_message.content === 'string') {
      messageData = chatResponse.last_message.content;
    } else {
      // Сделать запрос на файл
      // console.log(`fetch /chats/${chatResponse.id}/files`);
      // console.log(new HTTPTransport().get(`/chats/${chatResponse.id}/files`))
      messageData = String(chatResponse.last_message.content);
      imageData = 'tempData.chatFiles[0].file.path';
    }

    // switch (typeof chatResponse.last_message.content) {
    //   case 'string':
    //     messageData = chatResponse.last_message.content;
    //     break;
    //   case 'number':
    //     // Сделать запрос на файл
    //     // console.log(`fetch /chats/${chatResponse.id}/files`);
    //     // console.log(new HTTPTransport().get(`/chats/${chatResponse.id}/files`))
    //     messageData = String(chatResponse.last_message.content);
    //     imageData = 'tempData.chatFiles[0].file.path';
    //     break;
    // }

    const direction: string = chatResponse.last_message.user.login === this.currentUser.login ? 'outbound' : 'inbound';
    const options: {
      user: IUser,
      className: string,
      timeStamp: string,
      message: string,
      direction : string;
      image?: string;
    } = {
      user: this.currentUser,
      className: 'chat__message',
      timeStamp,
      message: messageData,
      direction,
    };
    if (imageData) { options.image = imageData; }

    const message = new Message(options);
    this.element.appendChild(message.getContent());
    message.dispatchComponentDidMount();
  }
}

export default Chat;
