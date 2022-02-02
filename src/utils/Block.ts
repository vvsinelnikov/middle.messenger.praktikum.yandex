import Handlebars from 'handlebars';
import {v4 as makeUUID} from 'uuid'
import EventBus from './event-bus';

class Block {
  public props: any;
  public eventBus: () => EventBus;
  public eventBusSource: EventBus;
  private _element: HTMLElement;
  private _id: number;
  private _tagName: string;
  private _className: string;
  private _type: string;
  private _href: string;

  children: any;
  buttonText: string;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  constructor(tagName = "div", propsAndChildren: any = {
      settings: { withInternalID: false }
  }) {
    // if (propsAndChildren.settings.withInternalID) { this._id = makeUUID() }
    this._id = makeUUID()
    this.props = this._makePropsProxy({ ...propsAndChildren, __id: this._id });
    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;

    this._tagName = tagName;
    this._className = props.className;
    this._type = props.type;
    this._href = props.href;

    const eventBus = new EventBus();
    this.eventBusSource = eventBus; // TODO Отрефакторить
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  // Обновление свойств компонентов
  public setProps = (nextProps?: any) => {
    if (!nextProps) {
      return;
    }

    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      Object.assign(this.props, nextProps);
    }
  };

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    this._element = document.createElement(this._tagName);
    this._element.className = this._className;
    (<HTMLButtonElement>this._element).type = this._type;
    (<HTMLAnchorElement>this._element).href = this._href;
  }

  public init() {
    this._createResources();
  }

  private _componentDidMount() {
    this.componentDidMount();
    // Запуск рендеринга вложенных компонентов
    Object.values(this.children).forEach((child: any) => {
      child.dispatchComponentDidMount();
    });
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Для переопределения наследующих компонентов
  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _addEvents() {
    const {events = {}} = this.props;

    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // Отслеживание изменений вложенных компонентов
  public componentDidUpdate(oldProps: any, newProps: any) {
    if (JSON.stringify(oldProps) == JSON.stringify(newProps)) { return false };

    if (oldProps.buttonText !== newProps.buttonText) {
      this.buttonText = newProps.buttonText;
      // TODO Понять смысл и проверить необходимость этого кода из тренажера
      // if (this.children) {
      //   this.children.button.setProps({ text: newProps.buttonText });
      // }
    }

    return true;
  }

  // Доступ к текущему компоненту
  get element() {
    return this._element;
  }

  // Разметка текущего компонента
  public getContent() {
    return this._element;
  }

  private _render(block: HTMLElement = this.render()) {
    block = this.render();
    // this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._addEvents();
  }

  // Рендеринг дефолтного компонента, если свойства не переданы
  // Для переопределения наследующих компонентов
  public render(): HTMLElement {
    const element = document.createElement(this._tagName);
    return element;
  }

  // Регистрация событий при изменении свойств компонента
  private _makePropsProxy(props: any) {
    const self = this;
    return new Proxy(props, {
      set: (target, prop, value) => {
        let oldProps = {};
        Object.assign(oldProps, props);
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, props);
        // self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
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

  public _createDocumentElement(tagName: any) {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  // Вставка вложенных компонентов в обход шаблонизатора
  // Замена компонента на заглушку, шаблонизация,
  // подмена заглушки компонентом в собранном фрагменте
  public compile(template: string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]: any) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
    Object.values(this.children).forEach((child: any) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

  // Сортировка свойств на свойства и вложенные компоненты
  private _getChildren(propsAndChildren: {any: any}[]) {
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
