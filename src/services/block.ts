import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './event-bus';
import { IBlock } from '../utils/interfaces';

abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  private _id: string;

  private _tagName: string;

  private _className: string | undefined;

  private _type: string | undefined;

  private _href: string | undefined;

  private _element: HTMLElement;

  buttonText: string;

  props: IBlock;

  children: { [index: string]: IBlock };

  eventBus: () => EventBus;

  constructor(tagName = 'div', propsAndChildren: IBlock) {
    // if (propsAndChildren.settings.withInternalID) { this._id = makeUUID() }
    this._id = makeUUID();
    this.props = this._makePropsProxy({ ...propsAndChildren, __id: this._id });
    const { children }: IBlock = this._getChildren(propsAndChildren);
    this.children = children;
    this._tagName = tagName;
    this._className = propsAndChildren.className;
    this._type = propsAndChildren.type;
    this._href = propsAndChildren.href;

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  // Обновление свойств компонентов
  public setProps = (nextProps?: IBlock): void => {
    if (!nextProps) {
      return;
    }

    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      const { children, props } = this._getChildren(nextProps)

      if (Object.values(children).length) {
        Object.assign(this.children, children);
      }
      if (Object.values(props).length) {
        Object.assign(this.props, props);
      }

      // Было так, похже из вебинара заменено кодом выше
      // Object.assign(this.props, nextProps);
    }
  };

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private _createResources() {
    this._element = document.createElement(this._tagName);
    if (this._className) {
      this._element.className = this._className;
    }
    if (this._type) {
      (<HTMLButtonElement> this._element).type = this._type;
    }
    if (this._href) {
      (<HTMLAnchorElement> this._element).href = this._href;
    }
  }

  public init() {
    this._createResources();
  }

  private _componentDidMount() {
    this.componentDidMount();
    // Запуск рендеринга вложенных компонентов
    Object.values(this.children).forEach((child: Block) => {
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
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _componentDidUpdate(oldProps: IBlock, newProps: IBlock) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

  // Отслеживание изменений вложенных компонентов
  public componentDidUpdate(oldProps: IBlock, newProps: IBlock) {
    if (JSON.stringify(oldProps) === JSON.stringify(newProps)) { return false; }

    if (oldProps.buttonText !== newProps.buttonText) {
      if (newProps.buttonText) {
        this.buttonText = newProps.buttonText;
      }
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

  private _render(block: DocumentFragment = this.render()) {
    block = this.render();
    this._removeEvents();
    this._element.innerHTML = '';
    this._element.appendChild(block);
    this._addEvents();
  }

  // Рендеринг дефолтного компонента, если свойства не переданы
  // Для переопределения наследующих компонентов
  public render(): DocumentFragment {
    return document.createDocumentFragment();
  }

  // Регистрация событий при изменении свойств компонента
  private _makePropsProxy(props: IBlock) {
    return new Proxy(props, {
      set: (target: { [index: string | symbol] : any }, prop, value) => {
        const oldProps: IBlock | {} = {};
        Object.assign(oldProps, props);
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, props);
        // TODO Разобраться с примером из тренажера
        // self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  public _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  // Вставка вложенных компонентов в обход шаблонизатора
  // Замена компонента на заглушку, шаблонизация,
  // подмена заглушки компонентом в собранном фрагменте
  public compile(template: string, props: IBlock): DocumentFragment {
    const propsAndStubs: { [index: string] : any } = { ...props };
    Object.entries(this.children).forEach(([key, child]: [string, Block]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    // @ts-ignore
    const fragment: HTMLTemplateElement = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
    Object.values(this.children).forEach((child: Block): void => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  // Сортировка свойств на свойства и вложенные компоненты
  private _getChildren(propsAndChildren: IBlock) {
    const children: { [index: string] : IBlock } = {};
    const props: { [index: string] : IBlock } = {};

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
    this.getContent().style.display = 'block';
  }

  public hide(): void {
    this.getContent().style.display = 'none';
  }
}

export default Block;
