import Handlebars from 'handlebars';
import '../index.css';
import './home.css';
import template from './home.tmpl';
import Chat from './modules/chat/chat';
import Greeting from './modules/greeting/greeting';
import SnippetList from './modules/snippet-list/snippet-list';
import Block from '../../utils/block';
import render from '../../utils/render';
import HTTPTransport from '../../utils/http-transport';
import * as tempData from './temp-data'

class Home extends Block {
    private currentUser: tempData.IUser;
    private greeting: Greeting;
    private greetingHidden: boolean;
    private snippetList: SnippetList;
    private chat: Chat;

    static EVTS = {
        FLOW_SNPT: 'flow:update-snippets',
        FLOW_CHAT: 'flow:update-chat'
    };

    constructor(props: any) {
        super('div', 'home', props);
        this.currentUser = props.user;
        this.greetingHidden = false;
    }

    public render() {
        return this.compile(template, this.props)
        // return Handlebars.compile(template)({});
    }

    public prepareModules(): void {
        this.greeting = new Greeting();
        render('.home__right', this.greeting.getContent())
        this.greeting.dispatchComponentDidMount();

        this.snippetList = new SnippetList({
            user: this.currentUser,
            events: {
                click: (evt: any) => {
                    for (let i of evt.path) {
                        if (i.id) {
                            const chatId = i.id.slice(7) // получили chatId из id родительского элемента
                            for (let i of tempData.chatResponses) {
                                if (i.id == chatId) {
                                    this.eventBusSource.emit(Home.EVTS.FLOW_SNPT, i);
                                    this.eventBusSource.emit(Home.EVTS.FLOW_CHAT, i);
                                }
                            }
                        }
                    }

                    // this.eventBusSource.emit(Home.EVTS.FLOW_CHAT, tempData.chatResponses[0]);
                }
            },
        });
        render('.home__left', this.snippetList.getContent());
        this.snippetList.dispatchComponentDidMount();

        this.chat = new Chat(this.currentUser);

        this.eventBusSource.on(Home.EVTS.FLOW_SNPT, this._renderSnippet.bind(this));
        this.eventBusSource.on(Home.EVTS.FLOW_CHAT, this._renderMessage.bind(this));
    }

    private _initChat() {
        this._hideGreeting();
        render('.home__right', this.chat.getContent());
        this.chat.dispatchComponentDidMount();
        this.chat.addEvents();
    }

    // private _showGreeting() {
    //     this.greeting.show();
    // }

    private _hideGreeting() {
        this.greeting.hide();
    }

    private _renderSnippet(snippet: any) {
        this.snippetList.renderSnippet(snippet);
    }

    private _renderMessage(message: tempData.IChatResponse) {
        if (!this.greetingHidden) {
            this._initChat();
            this.greetingHidden = true;
        }
        this.chat.renderMessage(message)
    }

    public updateSnippets(snippets: tempData.IChatResponse) {
        this.eventBusSource.emit(Home.EVTS.FLOW_SNPT, snippets);
    }

    public updateChat(message: tempData.IChatResponse) {
        this.eventBusSource.emit(Home.EVTS.FLOW_CHAT, message);
    }
}

// Получить объект пользователя после авторизации и передать в компонент
// console.log('fetch /auth/user')
// console.log(new HTTPTransport().get('/auth/user'))
const home = new Home({
    user: tempData.myUser
});
render('.page', home.getContent())
home.dispatchComponentDidMount();
home.prepareModules();

// console.log('fetch /chat')
// setTimeout(() => { home.updateSnippets(tempData.chatResponses[0]) }, 1000)
// setTimeout(() => { home.updateSnippets(tempData.chatResponses[1]) }, 2000)
// setTimeout(() => { home.updateSnippets(tempData.chatResponses[2]) }, 3000)

// setTimeout(() => { home.setProps({user: 'new'}) }, 4000)

// setTimeout(() => { home.updateSnippets(tempData.chatResponses[1]) }, 3000)
// setTimeout(() => { home.updateSnippets(tempData.chatResponses[2]) }, 4000)
// setTimeout(() => { home.updateSnippets(tempData.chatResponses[2]) }, 5000)
//
// setTimeout(() => { home.updateChat(tempData.chatResponses[0]) }, 6000)
