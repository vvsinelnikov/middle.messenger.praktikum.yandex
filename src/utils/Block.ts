import Handlebars from 'handlebars';
import {v4 as makeUUID} from 'uuid';
import EventBus from './event-bus';

class Block {
  public props: any;
  private _id: number;
  public eventBus: () => EventBus;
  public eventBusSource: EventBus;
  private _tagName: string;
  private _className: string;
  private _element: HTMLElement;
  oldProps: {};
  setProps: (nextProps?: any) => void;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };
  children: any;

  constructor(tagName = "div", propsAndChildren = {
      settings: { withInternalID: false }
  }) {
    // if (propsAndChildren.settings.withInternalID) { this._id = makeUUID() }
    this._id = makeUUID()
    this.props = this._makePropsProxy({ ...propsAndChildren, __id: this._id });
    this.setProps = (nextProps?: any) => {
      if (!nextProps) {
        return;
      }
      Object.assign(this.props, nextProps);
    };
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    this._tagName = tagName;
    // this._className = className;
    this.props = this._makePropsProxy(props);

    const eventBus = new EventBus();
    this.eventBusSource = eventBus;
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

  private _render(block = this.render()) {
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
        Object.assign(oldProps, props);
        return true;
      },
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  public compile(template: string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    });

    return Handlebars.compile(template)(propsAndStubs);
  }

  public _getChildren(propsAndChildren: {any: any}[]) {
    const children: any = {};
    const props: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  public show(): void {
    this.getContent().style.display = "block";
  }

  public hide(): void {
    this.getContent().style.display = "none";
  }
}

export default Block;
