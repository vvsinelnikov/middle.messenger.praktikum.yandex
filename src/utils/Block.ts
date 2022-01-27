import EventBus from "./EventBus";

class Block {
  private _tagName: string;
  private _className: string;
  private _element: HTMLElement;
  props: any;
  oldProps: {};
  setProps: (nextProps?: any) => void;
  eventBus: () => EventBus;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  constructor(tagName = "div", className = '', props = {}) {
    this.setProps = (nextProps?: any) => {
      if (!nextProps) {
        return;
      }
      Object.assign(this.props, nextProps);
    };
    this._tagName = tagName;
    this._className = className;
    this.props = this._makePropsProxy(props);

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    this._element = document.createElement(this._tagName);
    this._element.className = this._className;
  }

  public init() {
    this._createResources();
    // this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  public componentDidUpdate(oldProps: any, newProps: any) {
    return JSON.stringify(oldProps) !== JSON.stringify(newProps);
  }

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    if (this._element) {
      this._element.innerHTML = block;
    }
  }

  public render() {
    return `<${this._tagName}></${this._tagName}>`;
  }

  public getContent() {
    return this._element;
  }

  private _makePropsProxy(props: any) {
    // @ts-ignore
    const self = this;
    return new Proxy(props, {
      set: (target, prop, value) => {
        let oldProps = {};
        Object.assign(oldProps, props);
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, oldProps, props);
        Object.assign(oldProps, props);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  public show(): void {
    this.getContent().style.display = "block";
  }

  public hide(): void {
    this.getContent().style.display = "none";
  }
}

export default Block;
