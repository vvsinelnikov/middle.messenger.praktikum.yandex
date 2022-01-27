const template = `
    <div class="snippet__body" id="snippet{{chatId}}">
        <div class="snippet__avatar"></div>
        <h2 class="snippet__title">{{displayName}}</h2>
        <span class="snippet__text {{isMineClass}}">{{text}}</span>
        <div class="snippet__time">{{time}}</div>
        <div class="snippet__count">{{unreadCount}}</div>   
    </div>
`;

export default template;
