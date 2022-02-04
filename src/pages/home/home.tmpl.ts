const template = `
    <div class="home__left">
        <a href="profile.html" class="home__nav">Профиль</a>
        <div class="home__searchbox">
            <input class="searchbox" placeholder="Поиск" type="text">
        </div>
        {{{snippetList}}}
    </div>
    <div class="home__right">
        {{{greeting}}}
        {{{chatList}}}
    </div>
`;

export default template;
