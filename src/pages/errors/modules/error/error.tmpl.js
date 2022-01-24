const template = `
    <div class="error">
        <div>
            <h1 class="error__heading">{{errorNumber}}</h1>
            <span class="error__text">{{errorText}}</span>
        </div>
        {{{link}}}
    </div>
`;

export default template;