const template = `
    <div class="profile__left">
        <a href="home" class="profile__home-button"></a>
    </div>
    <div class="profile__right">
        <div class="profile__avatar"></div>
        {{{heading}}}
        {{{form}}}
        <nav class="profile__entry profile__entry_column">
            {{{linkEditProfile}}}
            {{{linkEditPassword}}}
            {{{linkLogout}}}
<!--                <a href="" class="profile__link">Изменить данные</a>-->
<!--                <a href="" class="profile__link">Изменить пароль</a>-->
<!--                <a href="login.html" class="profile__link profile__link_red">Выйти</a>  -->
        </nav>
        <div class="profile__button">
            {{{button}}}
        </div>
    </div>
`;

export default template;
