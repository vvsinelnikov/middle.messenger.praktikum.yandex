// import Handlebars from 'handlebars';
import Block from '../../utils/block';
import ChatList from './modules/chat-list/chat-list';
import Greeting from './modules/greeting/greeting';
import SnippetList from './modules/snippet-list/snippet-list';
import template from './home.tmpl';
import render from '../../utils/render';
// import HTTPTransport from '../../utils/http-transport';
import '../index.css';
import './home.css';
import * as tempData from './temp-data';

const greeting = new Greeting({ className: 'greeting' });

const chatList = new ChatList({
  className: 'chat',
  user: tempData.myUser,
});

class Home extends Block {
  private snippetList: SnippetList;

  private chatId: number;

  currentUser: any;

  greeting: Greeting;

  // static EVTS = {
  //   FLOW_SNPT: 'flow:update-snippets',
  //   FLOW_CHAT: 'flow:update-chat',
  // };

  chatList: any;

  chat: any;

  constructor(props: any) {
    super('div', props);
    this.greeting = greeting;
    this.snippetList = this.props.snippetList;
    this.chatList = this.props.chatList;
    this.currentUser = props.user;
  }

  public render() {
    this.chatList.hide();
    return this.compile(template, this.props);
  }

  // public prepareModules(): void {
  //     this.eventBusSource.on(Home.EVTS.FLOW_SNPT, this.renderSnippet.bind(this));
  //     this.eventBusSource.on(Home.EVTS.FLOW_CHAT, this._renderMessage.bind(this));
  // }

  public renderSnippet(snippet: any) {
    this.snippetList.renderSnippet(snippet);
  }

  // Создание и отрисовка окна чата
  public renderChat(chatData: any) {
    if (this.props.greeting) { this.props.greeting.hide(); }
    this.chatList.show();

    // Установка данных пользователя в шапке чата
    if (this.chatId !== chatData.id) {
      const chatId = chatData.id;
      const { first_name, second_name, avatar } = this.getChatDetails(chatData.id);
      this.chatList.setProps({
        first_name, second_name, avatar, chatId,
      });
      this.chatId = chatId;
      this.chat = this.chatList.renderChat(chatData);
      return this.chat;
    }
    return this.chat;

    // return this.chatList.renderChat(chatData)
  }

  // Отправка сообщения в чат
  public renderMessage(chat: any, chatData: any) {
    chat.renderMessage(chatData);
  }

  public getChatDetails(chatId: number): { first_name: string; second_name: string; avatar: string } {
    // по chatId получаем имя собеседника или название чата, фотографию или аватар,
    // собеседника определяем, отсеивая себя из списка пользователей чата (должно быть не больше двух участников)
    console.log(`fetch /chats/${chatId}/users`);
    // console.log(new HTTPTransport().get(`/chats/${chatId.id}/users`))
    const userData: any = { first_name: '', second_name: '', avatar: '' };
    tempData.chatUsers.forEach((i) => {
      if (i.login !== this.currentUser.login) {
        userData.first_name = i.first_name;
        userData.second_name = i.second_name;
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

// Получить объект пользователя после авторизации и передать в компонент
// console.log('fetch /auth/user')
// console.log(new HTTPTransport().get('/auth/user'))

const snippetList = new SnippetList({
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

const home = new Home({
  className: 'home',
  user: tempData.myUser,
  snippetList,
  chatList,
  // greeting
});
render('.page', home.getContent());
home.dispatchComponentDidMount();

// console.log('fetch /chat')
setTimeout(() => { home.renderSnippet(tempData.chatResponses[0]); }, 100);
// setTimeout(() => { home.renderSnippet(tempData.chatResponses[1]) }, 500)
// setTimeout(() => { home.renderSnippet(tempData.chatResponses[2]) }, 1000)
// setTimeout(() => { home.renderSnippet(tempData.chatResponses[0]) }, 1500)
// setTimeout(() => { home.renderSnippet(tempData.chatResponses[0]) }, 2000)

// setTimeout(() => { home.renderChat(tempData.chatResponses[0]) }, 1000)
setTimeout(() => {
  const chat0 = home.renderChat(tempData.chatResponses[0]);
  home.renderMessage(chat0, tempData.chatResponses[0]);
}, 1000);

setTimeout(() => {
  const chat1 = home.renderChat(tempData.chatResponses[1]);
  home.renderMessage(chat1, tempData.chatResponses[1]);
}, 2000);

setTimeout(() => {
  const chat0 = home.renderChat(tempData.chatResponses[0]);
  home.renderMessage(chat0, tempData.chatResponses[1]);
}, 3000);

// setTimeout(() => { chatList.renderChat(tempData.chatResponses[1]) }, 1200)
// setTimeout(() => { chatList.renderChat(tempData.chatResponses[2]) }, 1300)
