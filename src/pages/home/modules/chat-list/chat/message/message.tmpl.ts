const template = `
    <h3 class="message__date">{{date}}</h3>
    <div class="message__body message__body_{{direction}} {{isRead}}">
        <p class="message__{{type}}">{{message}}</p>
<!--        <div class="message__image"></div>-->
        <span class="message__time">{{time}}</span>
    </div>
`;

export default template;
