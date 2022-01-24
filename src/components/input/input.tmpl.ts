const input = `
    <label for="{{id}}" class="input__placeholder input__placeholder_hidden">{{placeholder}}</label>
    <input id="{{id}}" class="input__field" type="{{type}}" placeholder="{{placeholder}}" min-length="{{minLength}}" max-length="{{maxLength}}" {{required}} />
    <span class="input__error input__error_hidden"></span>
`;

export default input;
