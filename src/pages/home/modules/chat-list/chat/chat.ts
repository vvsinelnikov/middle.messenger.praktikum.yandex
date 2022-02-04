import Block from '../../../../../utils/block';
import Message from './modules/message/message';
import './chat.css';
import * as tempData from '../../../temp-data';

class Chat extends Block {
  private currentUser: tempData.IUser;

  constructor(props: any) {
    super('div', props);
    this.currentUser = props.user;
  }

  public render() {
    return this.compile('', this.props);
  }

  public addEvents() {
    const form = this.element.querySelector('.chat__controls');

    // ПОЧИНИТЬ
    if (form) {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const message: HTMLInputElement | null = this.element.querySelector('.message');
        if (message) {
          console.log(message.value);
        }
      });
    }
  }

  // TODO Добавить фото в шапку
  // TODO Дописать логику постинга даты, вынести ее рендеринг из компонента Message
  // TODO Добавить методы для изменения статуса прочтения isRead

  public renderMessage(chatResponse: tempData.IChatResponse) {
    const timeStamp = chatResponse.last_message.time;
    let messageData; let
      imageData;
    switch (typeof chatResponse.last_message.content) {
      case 'string':
        messageData = chatResponse.last_message.content;
        break;
      case 'number':
        // Сделать запрос на файл
        // console.log(`fetch /chats/${chatResponse.id}/files`);
        // console.log(new HTTPTransport().get(`/chats/${chatResponse.id}/files`))
        imageData = 'tempData.chatFiles[0].file.path';
        break;
    }

    const direction = chatResponse.last_message.user.login == this.currentUser.login ? 'outbound' : 'inbound';
    const options: any = {
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
