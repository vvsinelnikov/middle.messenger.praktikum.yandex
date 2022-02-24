import render from '../../utils/render';
import Block from '../block';

export default class Route {
  private _pathname: string;
  private _block: typeof Block | null;
  private _blockClass: typeof Block;
  private _props: {rootQuery: string};

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      if (this._block) {
        render(this._props.rootQuery, this._block.getContent());
        this._block.dispatchComponentDidMount();
      }
      return;
    }

    this._block.show();
  }
}
