// import render from './render';
import { IBlock } from './interfaces';

export default class Route {
  private _pathname: string;
  private _block: IBlock | null;
  private _blockClass: () => IBlock;
  // private _props: {rootQuery: string};

  constructor(pathname: string, view: () => IBlock, props: {rootQuery: string}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    // this._props = props;
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
      this._block = new this._blockClass();
      return;
    }

    this._block.show();
  }
}
