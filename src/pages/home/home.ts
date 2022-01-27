import Handlebars from 'handlebars';
import '../index.css';
import './home.css';
import template from './home.tmpl';
import Chat from './modules/Chat/Chat';
import Greeting from './modules/Greeting/Greeting';
import Snippet from './modules/Snippet/Snippet';
import render from '../../utils/render';

const messages = [
    {
        timeStamp: '2020-01-02T14:22:22.000Z',
        message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n \n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        direction: 'inbound'
    },
    {
        timeStamp: '2020-01-02T14:22:22.000Z',
        message: 'Привет!',
        direction: 'inbound'
    },
    {
        timeStamp: '2020-01-02T14:22:22.000Z',
        image: '../../../../../static/images/example_foto.jpg',
        direction: 'inbound'
    },
    {
        timeStamp: '2020-01-02T14:22:22.000Z',
        message: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n \n Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        direction: 'outbound'
    },
];

const snippets = [
    {
        displayName: 'Андрей',
        image: '../../../../../static/images/example_foto.jpg',
        timeStamp: '2020-01-02T14:22:22.000Z',
    },
    {
        displayName: 'Design Destroyer',
        message: 'Друзья, у меня для вас особенный выпуск новостей!...',
        timeStamp: '2020-01-02T14:22:22.000Z',
        unreadCount: 3,
        isMine: true,
    },
];

const home = Handlebars.compile(template)({});
render('.page', home)

// Отображение сниппетов
const snippetList: Record<number, any> = {};
// let currentSnippet: number | undefined = undefined;
function renderSnippet({chatId}: {chatId: number}) {
    if (snippetList[chatId]) { return }
    else {
        snippetList[chatId] = new Snippet({chatId});
        render('.home__left', snippetList[chatId].getContent());
        snippetList[chatId].dispatchComponentDidMount();
    }
    // currentSnippet = chatId;
};
renderSnippet({chatId: 987});
snippetList[987].renderSnippet(snippets[0]);
snippetList[987].renderSnippet(snippets[1]);


// Отображение и скрытие приветствия
const greeting = new Greeting();
render('.home__right', greeting.getContent())
greeting.dispatchComponentDidMount();

// Отображение и скрытие окна чата
const chatList: Record<number, any> = {};
let currentChat: number | undefined = undefined;
function renderChat({chatId, displayName}: {chatId: number; displayName: string}) {
    if (greeting) { greeting.hide() };
    if (currentChat) {chatList[currentChat].hide()};
    if (chatList[chatId]) { chatList[chatId].show() }
    else {
        chatList[chatId] = new Chat({displayName, chatId});
        render('.home__right', chatList[chatId].getContent());
        chatList[chatId].dispatchComponentDidMount();
    }
    currentChat = chatId;
};
renderChat({displayName: 'Вова', chatId: 123});
chatList[123].renderMessage(messages[0]);
chatList[123].renderMessage(messages[3]);
