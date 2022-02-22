import loginPage from './login/login';
import registerPage from './register/register';
import profilePage from './profile/profile';
import homePage from './home/home';
import errorPage404 from './errors/404';
import errorPage500 from './errors/500';
import Router from '../utils/router';
import render from '../utils/render';

// Индекс проекта для тестирования
function indexPage(): HTMLElement | void {
    const block = document.createElement('div');
    block.innerHTML = `
        <div>MessageMe Pages</div>
        <ul>
            <li><a href="./login">Login</a></li>
            <li><a href="./register">Register</a></li>
            <li><a href="./home">Home</a></li>
            <li><a href="./profile">Profile</a></li>
            <li><a href="./404">404</a></li>
            <li><a href="./500">500</a></li>
        </ul>
    `
    return render('.page', block);
}

const router = new Router('.page');
router
    .use("/", indexPage)
    .use("/login", loginPage)
    .use("/register", registerPage)
    .use("/profile", profilePage)
    .use("/home", homePage)
    .use("/404", errorPage404)
    .use("/500", errorPage500)
    .start();
