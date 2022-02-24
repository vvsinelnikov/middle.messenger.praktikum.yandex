import Block from '../../services/block';
import ChatList from './modules/chat-list/chat-list';
import Chat from './modules/chat-list/chat/chat';
import Greeting from './modules/greeting/greeting';
import SnippetList from './modules/snippet-list/snippet-list';
import template from './home.tmpl';
// import HTTPTransport from '../../utils/http-transport';
import '../index.css';
import './home.css';
import * as tempData from './temp-data';
import { IUser, IChatResponse } from '../../utils/interfaces';

// Получить объект пользователя после авторизации и передать в компонент
// console.log('fetch /auth/user')
// console.log(new HTTPTransport().get('/auth/user'))

class Home extends Block {
  // Вложенные компоненты
  static greeting = new Greeting({ className: 'greeting' });

  static chatList = new ChatList({
    className: 'chat',
    user: tempData.myUser,
    firstName: '',
    secondName: '',
    avatar: '',
  });

  static snippetList = new SnippetList({
    className: 'home__snippets-list',
    user: tempData.myUser,
    // events: {
    //     click: (evt: any) => {
    //         for (let i of evt.path) {
    //             if (i.id) {
    //                 const chatId = i.id.slice(7) // получили chatId из id родительского элемента
    //                 for (let i of tempData.chatResponses) {
    //                     if (i.id == chatId) {
    //                         this.eventBusSource.emit(Home.EVTS.FLOW_SNPT, i);
    //                         this.eventBusSource.emit(Home.EVTS.FLOW_CHAT, i);
    //                     }
    //                 }
    //             }
    //         }
    //
    //         // this.eventBusSource.emit(Home.EVTS.FLOW_CHAT, tempData.chatResponses[0]);
    //     }
    // },
  });

  chat: Chat;

  chatId: number;

  user: IUser;

  // static EVTS = {
  //   FLOW_SNPT: 'flow:update-snippets',
  //   FLOW_CHAT: 'flow:update-chat',
  // };

  constructor() {
    super('div', {
      className: 'home',
      greeting: Home.greeting,
      snippetList: Home.snippetList,
      chatList: Home.chatList,
    });
    this.user = tempData.myUser;
  }

  public render(): DocumentFragment {
    Home.chatList.hide();
    return this.compile(template, this.props);
  }

  // public prepareModules(): void {
  //     this.eventBusSource.on(Home.EVTS.FLOW_SNPT, this.renderSnippet.bind(this));
  //     this.eventBusSource.on(Home.EVTS.FLOW_CHAT, this._renderMessage.bind(this));
  // }

  public renderSnippet(snippet: IChatResponse) {
    Home.snippetList.renderSnippet(snippet);
  }

  // Создание и отрисовка окна чата
  public renderChat(chatData: IChatResponse): Chat {
    if (this.props.greeting) { Home.greeting.element.style.display = 'none'; }
    Home.chatList.element.style.display = 'flex';

    // Установка данных пользователя в шапке чата
    if (chatData.id !== this.chatId) {
      const chatId = chatData.id;
      const { firstName, secondName, avatar } = this.getChatDetails(chatData.id);
      Home.chatList.setProps({
        firstName, secondName, avatar,
      });
      this.chatId = chatId;
      this.chat = Home.chatList.renderChat(chatData);
      return this.chat;
    }
    return this.chat;

    // return this.chatList.renderChat(chatData)
  }

  // Отправка сообщения в чат
  public renderMessage(chat: Chat, chatData: IChatResponse) {
    chat.renderMessage(chatData);
  }

  public getChatDetails(chatId: number):
      { firstName: string; secondName: string; avatar: string } {
    // по chatId получаем имя собеседника или название чата, фотографию или аватар,
    // собеседника определяем, отсеивая себя из списка пользователей чата
    // (должно быть не больше двух участников)
    console.log(`fetch /chats/${chatId}/users`);
    // console.log(new HTTPTransport().get(`/chats/${chatId.id}/users`))
    const userData: {
      firstName: string;
      secondName: string;
      avatar: string;
    } = { firstName: '', secondName: '', avatar: '' };
    tempData.chatUsers.forEach((i) => {
      if (i.login !== this.user.login) {
        userData.firstName = i.first_name;
        userData.secondName = i.second_name;
        userData.avatar = i.avatar;
      }
    });
    return userData;
  }

  // public updateSnippets(snippets: tempData.IChatResponse) {
  //     this.eventBusSource.emit(Home.EVTS.FLOW_SNPT, snippets);
  // }
  //
  // public updateChat(message: tempData.IChatResponse) {
  //     this.eventBusSource.emit(Home.EVTS.FLOW_CHAT, message);
  // }
}

export default Home;
