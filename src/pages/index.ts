import Login from './login/login';
import Register from './register/register';
import Profile from './profile/profile';
import Home from './home/home';
import Error404 from './errors/404';
import Error500 from './errors/500';
import Router from '../services/router/router';

// Индекс проекта для тестирования
import Block from '../services/block'
class Index extends Block {
    constructor() {
        super('div', {});
    }

    public render(): DocumentFragment {
        return this.compile(`
            <div>MessageMe Pages</div>
            <ul>
                <li><a href="./login">Login</a></li>
                <li><a href="./register">Register</a></li>
                <li><a href="./home">Home</a></li>
                <li><a href="./profile">Profile</a></li>
                <li><a href="./404">404</a></li>
                <li><a href="./500">500</a></li>
            </ul>
        `, {});
    }
};

const router = new Router('.page');
router
    .use("/", Index)
    .use("/login", Login)
    .use("/register", Register)
    .use("/profile", Profile, {user: {name: 'From Router'}})
    .use("/home", Home)
    .use("/404", Error404)
    .use("/500", Error500)
    .start();

// Тесты методов
// import {chatResponses} from './home/temp-data';
// setTimeout(() => {router.routes[4]._block.renderSnippet(chatResponses[0])}, 100);
// setTimeout(() => {router.routes[4]._block.renderSnippet(chatResponses[0])}, 500);
// setTimeout(() => {router.routes[4]._block.renderSnippet(chatResponses[1])}, 1000);
// setTimeout(() => {router.routes[4]._block.renderSnippet(chatResponses[2])}, 1500);
// setTimeout(() => {router.routes[4]._block.renderSnippet(chatResponses[0])}, 2000);
// setTimeout(() => {router.routes[4]._block.renderSnippet(chatResponses[0])}, 2500);
//
// setTimeout(() => { router.routes[4]._block.renderChat(chatResponses[0]) }, 1000)
// setTimeout(() => {
//   const chat0 = router.routes[4]._block.renderChat(chatResponses[0]);
//   router.routes[4]._block.renderMessage(chat0, chatResponses[0]);
// }, 1000);
//
// setTimeout(() => {
//   const chat1 = router.routes[4]._block.renderChat(chatResponses[1]);
//   router.routes[4]._block.renderMessage(chat1, chatResponses[1]);
// }, 2000);
//
// setTimeout(() => {
//   const chat0 = router.routes[4]._block.renderChat(chatResponses[0]);
//     router.routes[4]._block.renderMessage(chat0, chatResponses[0]);
//     router.routes[4]._block.renderMessage(chat0, chatResponses[1]);
// }, 3000);
