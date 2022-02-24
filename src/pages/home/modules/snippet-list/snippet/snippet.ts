import Block from '../../../../../services/block';
import template from './snippet.tmpl';
import './snippet.css';
import { IUser, IChatResponse } from '../../../../../utils/interfaces';

class Snippet extends Block {
  snippetData: IChatResponse;

  user: IUser;

  constructor(props: {
    user: IUser,
    className: string;
    snippetData: IChatResponse;
  }) {
    super('li', props);
    this.user = props.user;
  }

  render(): DocumentFragment {
    const params: {
      displayName?: string;
      time?: string;
      text?: string;
      isMineClass?: string;
      chatId?: number;
      unreadCount?: number;
    } = {};
    if (this.props.snippetData) {
      const { user, time, content } = this.props.snippetData.last_message;
      const firstName: string = user.first_name;
      const secondName: string = user.second_name;
      const { login } = user;
      const fullDate = new Date(time);

      // Имя автора последнего сообщения, а не собеседника
      params.displayName = `${firstName} ${secondName}`;
      params.time = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
      params.text = typeof content === 'number' ? 'Изображение' : content;
      params.isMineClass = login === this.user.login ? 'snippet__text_my' : '';
      params.chatId = this.props.snippetData.id;
      params.unreadCount = this.props.snippetData.unread_count;
    }
    return this.compile(template, params);
  }
}

export default Snippet;
