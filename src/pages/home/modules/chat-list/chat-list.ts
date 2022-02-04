import Block from '../../../../utils/block';
import Chat from './chat/chat';
import template from './chat/chat.tmpl';
import * as tempData from '../../temp-data';

// TODO Добавить фото
class ChatList extends Block {
  public currentUser: tempData.IUser;

  constructor(props: any) {
    super('div', props);
    this.currentUser = props.user;
  }

  public render() {
    return this.compile(template, this.props);
  }

  public renderChat(chatData: tempData.IChatResponse): Chat {
    const chat = new Chat({
      user: this.currentUser,
      className: 'chat__body',
      chatData,
    });
    // @ts-ignore
    this.element.querySelector('.chat__body').appendChild(chat.getContent());

    chat.dispatchComponentDidMount();

    return chat;
  }
}

export default ChatList;
