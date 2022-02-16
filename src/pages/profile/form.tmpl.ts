const template = `
    <div class="profile__entry">
        <h2 class="profile__entry-name">Почта</h2>{{{inputEmail}}}
    </div>
    <div class="profile__entry">
        <h2 class="profile__entry-name">Логин</h2>{{{inputLogin}}}
    </div>
    <div class="profile__entry">
        <h2 class="profile__entry-name">Имя</h2>{{{inputName}}}
    </div>
    <div class="profile__entry">
        <h2 class="profile__entry-name">Фамилия</h2>{{{inputSurname}}}
    </div>
    <div class="profile__entry">
        <h2 class="profile__entry-name">Имя в чате</h2>{{{inputDisplayName}}}
    </div>
    <div class="profile__entry">
        <h2 class="profile__entry-name">Телефон</h2>{{{inputTel}}}
    </div>
`;

export default template;
