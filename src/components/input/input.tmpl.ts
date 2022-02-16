const input = `
    <label for="{{name}}" class="input__placeholder input__placeholder_hidden">{{placeholder}}</label>
    <input id="{{name}}" class="input__field" type="{{type}}" placeholder="{{placeholder}}" minlength="{{minLength}}" maxlength="{{maxLength}}" {{required}} {{disabled}} />
    <span id="{{name}}-error" class="input__error"></span>
`;

export default input;
