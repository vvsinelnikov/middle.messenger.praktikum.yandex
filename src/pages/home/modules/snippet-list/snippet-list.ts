import Snippet from './snippet/snippet';
import Block from '../../../../utils/block';
import { IUser, IChatResponse } from '../../../../utils/interfaces';

// TODO Добавить фото
class SnippetList extends Block {
  snippetListing: { [index: number]: Snippet };

  activeSnippet: Snippet | undefined;

  user: IUser;

  static __instance: SnippetList;

  constructor(props: {
    className: string;
    user: IUser,
  }) {
    if (SnippetList.__instance) {
      return SnippetList.__instance;
    }

    super('ul', props);
    this.user = props.user;
    this.snippetListing = {};

    SnippetList.__instance = this;
  }

  public render(): DocumentFragment {
    return this.compile('', this.props);
  }

  public renderSnippet(snippetData: IChatResponse): void {
    // Добавить ссылку сниппету, который был активным до создания нового
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

    // Создать новый сниппет
    if (!Object.keys(this.snippetListing).includes(String(snippetData.id))) {
      clearActiveSnippet();
      const snippet = new Snippet({
        user: this.user,
        className: 'snippet snippet_active',
        snippetData,
      });
      this.element.prepend(snippet.getContent());
      snippet.dispatchComponentDidMount();
      this.snippetListing[snippetData.id] = snippet;
      this.activeSnippet = snippet;
    } else {
      // удалить существующий сниппет и отрендерить его заново первым
      this.snippetListing[snippetData.id].element.remove();
      delete this.snippetListing[snippetData.id];

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
