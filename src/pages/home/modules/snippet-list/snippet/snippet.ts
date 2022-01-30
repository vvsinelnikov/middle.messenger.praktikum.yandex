import Handlebars from 'handlebars';
import './snippet.css';
import template from './snippet.tmpl';
import * as tempData from './../../../temp-data'

//TODO Переписать на классы
function Snippet(currentUser: tempData.IUser, snippetData: tempData.IChatResponse): HTMLElement {
  const {user, time, content} = snippetData.last_message;
  const {first_name, second_name, login} = user;
  const fullDate = new Date(time);
  const params: any = {
    // Имя автора последнего сообщения, а не собеседника
    displayName: first_name + ' ' + second_name,
    time: fullDate.getHours() + ':' + fullDate.getMinutes(),
    text: typeof content == "number"? 'Изображение' : content,
    isMineClass: login == currentUser.login ? 'snippet__text_my' : '',
    chatId: snippetData.id,
  }
  // в классовом компаненте сделать через изменение пропсов
  if (snippetData.unread_count > 0) { params.unreadCount = snippetData.unread_count };

  const snippet = document.createElement('div');
  snippet.classList.add('snippet', 'snippet_active');
  snippet.id = `snippet${snippetData.id}`;
  snippet.insertAdjacentHTML("afterbegin", Handlebars.compile(template)(params))

  return snippet;
}

export default Snippet;
