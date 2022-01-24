const template = `
    <form class="form">
        <div class="form__container">
            {{{heading}}}
            {{#each entry}}
                {{{this}}}
            {{/each}}
        </div>
        <div class="form__container form__buttons">
            {{{button}}}
            {{{link}}}
        </div>
    </form>
`;

export default template;