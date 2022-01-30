const template = `
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
`;

export default template;
