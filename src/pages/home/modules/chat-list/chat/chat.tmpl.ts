const chatTemplate = `
    <div class="chat__header">
        <div class="chat__avatar"></div>
        <h2 class="chat__title">{{{firstName}}} {{{secondName}}}</h2>
        <nav class="chat__menu"></nav>
    </div>
<!--    <div class="chat__body">-->
<!--&lt;!&ndash;    {{{chat}}}&ndash;&gt;-->
<!--    </div>                -->
    <form class="chat__controls">
        <nav class="chat__attach-button"></nav>
        <input name="message" type="text" placeholder="Сообщение" class="chat__input">
        <input type="submit" value="" class="chat__send-button">
    </form>
`;

export default chatTemplate;
