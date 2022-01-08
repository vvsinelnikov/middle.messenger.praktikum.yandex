const template = `
    <div class="profile">
        <div class="profile__left">
            <a href="home.html" class="profile__home-button"></a>
        </div>    
        <div class="profile__right">
            <div class="profile__avatar"></div>
            <div class="profile__heading"></div>
            
            <form name="profile-form">
                {{#each entry}}
                    <div class="profile__entry">
                        <div class="profile__field">
                            <h2 class="profile__entry-name">{{name}}</h2>
                            <input disabled type="{{type}}" class="profile__entry-input" placeholder="{{placeholder}}">
                        </div>
                        <span class="profile__error profile__error_hidden">Ошибка</span>
                    </div>
                {{/each}}
            </form>
            
            <nav class="profile__entry">
                <a href="" class="profile__link">Изменить данные</a>
                <a href="" class="profile__link">Изменить пароль</a>
                <a href="login.html" class="profile__link profile__link_red">Выйти</a>  
            </nav>

            <diiv class="profile__button">
            
            </diiv>

        </div>
    </div>
`
export default template;