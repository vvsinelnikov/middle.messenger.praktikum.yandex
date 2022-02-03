import Handlebars from 'handlebars';
import render from '../../../../utils/render';
import Block from '../../../../utils/block'
import Message from './modules/message/message';
import chatTemplate from './chat.tmpl';
import './chat.css';
import HTTPTransport from '../../../../utils/http-transport';
import * as tempData from '../../temp-data'

class Chat extends Block {
  private chatId: number;
  private currentUser: tempData.IUser;

  constructor(currenUser: tempData.IUser, ...props: any) {
    super('div', 'chat', ...props);
    this.currentUser = currenUser;
  }

  public render() {
    // return Handlebars.compile(chatTemplate)({});
    return this.compile(chatTemplate, this.props)
  }

  public addEvents() {
    const form = this.element.querySelector('.chat__controls');

    // ПОЧИНИТЬ
    if (form) {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault()
        const message = this.element.querySelector('.message');
        if (message) {
          console.log(message.value)
        }
      })
    };
  }

  //TODO Добавить фото в шапку
  //TODO Дописать логику постинга даты, вынести ее рендеринг из компонента Message
  //TODO Добавить методы для изменения статуса прочтения isRead
  public renderMessage(chatResponse: tempData.IChatResponse) {
    if (this.chatId !== chatResponse.id) {
      const chatId = chatResponse.id;
      const {first_name, second_name, avatar} = this.getChatDetails(chatResponse.id);
      this.setProps({first_name, second_name, avatar, chatId});
      // @ts-ignore
      this._render(Handlebars.compile(chatTemplate)({first_name, second_name, avatar, chatId}));
      this.chatId = chatId;
    }

    const timeStamp = chatResponse.last_message.time;
    let message, image;
    switch (typeof chatResponse.last_message.content) {
      case  'string':
        message = chatResponse.last_message.content
        break;
      case 'number':
        // Сделать запрос на файл
        console.log(`fetch /chats/${chatResponse.id}/files`);
        console.log(new HTTPTransport().get(`/chats/${chatResponse.id}/files`))
        image = 'tempData.chatFiles[0].file.path';
        break;
    };

    const direction = chatResponse.last_message.user.login == this.currentUser.login ? 'outbound' : 'inbound';
    const options: any = {timeStamp, message, direction};
    if (image) { options['image'] = image };
    render('.chat__body', Message(options));
  }

  public getChatDetails(chatId: number): {first_name: string; second_name: string; avatar: string} {
    // по chatId получаем имя собеседника или название чата, фотографию или аватар,
    // собеседника определяем, отсеивая себя из списка пользователей чата (должно быть не больше двух участников)
    console.log(`fetch /chats/${chatId}/users`)
    for (let i of tempData.chatUsers) {
      if (i.login !== this.currentUser.login) { return {
        first_name: i.first_name,
        second_name: i.second_name,
        avatar: i.avatar
      }}
    }
    return {first_name: '', second_name: '', avatar: ''};
  }
}

export default Chat;
