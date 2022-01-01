import './login.css';

const Handlebars = require("handlebars");

const template = `
    <div class="page">
        <form class="login__form">
            <div class="login_container">
                <h1 class="login__heading">Вход</h1>
                <label htmlFor="login" class="login__descriptor login__descriptor__hidden">Логин</label>
                <input id="login" class="login__input" type='text' placeholder="Логин" required minLength='2'
                       maxLength='40'/>
                <span class="login__error login__error__hidden">Ошибка</span>
                <label htmlFor="password" class="login__descriptor login__descriptor__hidden">Пароль</label>
                <input id="password" class="login__input" type='password' placeholder="Пароль" required minLength='2'
                       maxLength='40'/>
                <span class="login__error login__error__hidden">Ошибка</span>
            </div>
            <div class="login_container">
                <input class="login__button" type="submit" value="Авторизоваться"/>
                <a class="login__link" href="/signin">Нет аккаунта?</a>
            </div>
        </form>
    </div>
`;

const login = Handlebars.compile(template)({});
document.body.innerHTML = login