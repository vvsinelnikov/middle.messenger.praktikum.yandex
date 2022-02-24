import Block from '../../../../services/block';
import Chat from './chat/chat';
import template from './chat/chat.tmpl';
import { IUser, IChatResponse } from '../../../../utils/interfaces';

// TODO Добавить фото
class ChatList extends Block {
  currentUser: IUser;

  firstName: string;

  secondName: string;

  avatar: string;

  chatId: number;

  chat: Chat;

  sendCallback: (evt: Event) => void;

  static __instance: ChatList;

  constructor(props: {
    className: 'chat';
    user: IUser;
    firstName: string;
    secondName: string;
    avatar: string;
    chatId?: number;
  }) {
    if (ChatList.__instance) {
      return ChatList.__instance;
    }

    super('div', props);
    this.currentUser = props.user;
    this.firstName = props.firstName;
    this.secondName = props.secondName;
    this.avatar = props.avatar;
    this.sendCallback = (evt: Event) => {
      evt.preventDefault();
      const message: HTMLInputElement | null = this.element.querySelector('input[name="message"]');
      if (message && message.value.length > 0) {
        console.log({ chatID: this.chatId, message: message.value });
      }
    };

    ChatList.__instance = this;
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }

  public renderChat(chatData: IChatResponse): Chat {
    const chat = new Chat({
      user: this.currentUser,
      className: 'chat__body',
      chatData,
    });
    this.chatId = chatData.id;
    if (this.element.querySelector('.chat__body')) { // @ts-ignore
      this.element.querySelector('.chat__body').remove();
    }
    // @ts-ignore
    document.querySelector('.chat').insertBefore(chat.getContent(), this.element.querySelector('.chat__controls'));

    chat.dispatchComponentDidMount();

    this.addEvents();

    return chat;
  }

  public addEvents() {
    const form = this.element.querySelector('.chat__controls');
    if (form) {
      form.addEventListener('submit', this.sendCallback);
    }
  }
}

export default ChatList;
