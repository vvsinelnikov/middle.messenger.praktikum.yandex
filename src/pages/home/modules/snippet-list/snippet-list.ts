import Snippet from './snippet/snippet';
import Block from '../../../../utils/block';
import * as tempData from '../../temp-data';

// TODO Добавить фото
class SnippetList extends Block {
  private snippetList: any;

  private activeSnippet: any;

  currentUser: tempData.IUser;

  constructor(props: any) {
    super('ul', props);
    this.currentUser = props.user;
    this.snippetList = {};
  }

  public render() {
    return this.compile('', this.props);
  }

  public renderSnippet(snippetData: tempData.IChatResponse): void {
    // добавить ссылку сниппету, который был активным до создания нового
    const clearActiveSnippet = () => {
      if (this.activeSnippet) {
        this.activeSnippet.element.classList.remove('snippet_active');
        this.activeSnippet.setProps({
          events: {
            click: (evt: Event) => {
              evt.preventDefault();
              console.log(`Snippet ${snippetData.id} clicked`);
            },
          },
        });
        this.activeSnippet = undefined;
      }
    };

    if (!Object.keys(this.snippetList).includes(String(snippetData.id))) {
      clearActiveSnippet();
      const snippet = new Snippet({
        user: this.currentUser,
        className: 'snippet snippet_active',
        snippetData,
      });
      this.element.prepend(snippet.getContent());
      snippet.dispatchComponentDidMount();
      this.snippetList[snippetData.id] = snippet;
      this.activeSnippet = snippet;
    } else {
      // удалить существующий сниппет и отрендерить его заново первым
      this.snippetList[snippetData.id].element.remove();
      delete this.snippetList[snippetData.id];

      this.renderSnippet(snippetData);

      // TODO Починить:
      // обновить только свойства без удаления сниппета
      // if (snippetData.id == this.activeSnippet.props.snippetData.id) {
      //    this.activeSnippet.setProps({unread_count: 28})
      // }
    }
  }
}

export default SnippetList;
