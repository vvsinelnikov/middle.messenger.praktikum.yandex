import Route from './route';
import { IBlock } from './interfaces';

export default class Router {
  static __instance: Router;
  routes: Route[];
  history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: () => IBlock): Router {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: Event) => {
      if (event.currentTarget) {
        // @ts-ignore
        this._onRoute(event.currentTarget.location.pathname);
      }
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    // route.render(route, pathname);
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }
}
