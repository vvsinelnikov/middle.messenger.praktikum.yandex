import Snippet from './snippet/snippet'
import Block from '../../../../utils/block'
import * as tempData from '../../temp-data'

//TODO Добавить фото
class SnippetList extends Block {
  private snippetList: any;
  private activeSnippet: any;
  currentUser: tempData.IUser;

  constructor(props: any) {
    super('ul', 'home__snippets-list', props);
    this.currentUser = props.user;
    this.snippetList = {};
  }

  public render() {
    return this.compile('<div></div>', this.props)

    // return '';
  }

  public renderSnippet(snippetData: tempData.IChatResponse): void {
    if (this.activeSnippet) {
      this.activeSnippet.classList.remove('snippet_active');
      this._addEvents(this.activeSnippet);
      this.activeSnippet = undefined;
    }

    if (!Object.keys(this.snippetList).includes(String(snippetData.id))) {
      const snippet = Snippet(this.currentUser, snippetData);
      this.element.prepend(snippet);
      this.snippetList[snippetData.id] = snippet;
      this.activeSnippet = snippet;
    }
    else {
      // удалить существующий сниппет и отрендерить его заново первым
      const snippet = this.snippetList[snippetData.id];
      delete this.snippetList[snippetData.id];
      snippet.remove();
      this.renderSnippet(snippetData);
    }
  }

  private _addEvents(target: HTMLElement) {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      target.addEventListener(eventName, events[eventName]);
    });
  }

}

export default SnippetList;
