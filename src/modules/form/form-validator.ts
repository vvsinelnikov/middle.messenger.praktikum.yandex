interface validationProps {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  errorClass: string;
}

export default class FormValidator {
  private _formElement: HTMLElement;

  private _inputSelector: string;

  private _submitButton: HTMLElement | null;

  private _inactiveButtonClass: string;

  private _errorClass: string;

  private _inputsList: HTMLFormElement[];

  public inputElement: HTMLFormElement;

  constructor(
    {
      inputSelector, submitButtonSelector, inactiveButtonClass, errorClass,
    } : validationProps,
    formElement: HTMLElement,
  ) {
    this._formElement = formElement;
    this._inputSelector = inputSelector;
    this._submitButton = formElement.parentElement ?
        formElement.parentElement.querySelector(submitButtonSelector) :
        formElement.querySelector(submitButtonSelector);
    this._inactiveButtonClass = inactiveButtonClass;
    this._errorClass = errorClass;
  }

  enableValidation(): void {
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector),
    );

    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => this._isValid(inputElement));
    });
    this.checkSubmitButton();
  }

  _isValid(inputElement: HTMLFormElement): void {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    this.checkSubmitButton();
  }

  _showInputError(inputElement: HTMLFormElement): void {
    const errorElement: HTMLElement | null = document.querySelector(`span[name="${inputElement.name}-error"]`);
    if (errorElement) { errorElement.textContent = inputElement.validationMessage; }
  }

  _hideInputError(inputElement: HTMLFormElement): void {
    inputElement.classList.remove(this._errorClass);
    const errorElement: HTMLElement | null = document.querySelector(`span[name="${inputElement.name}-error"]`);
    if (errorElement) { errorElement.textContent = ''; }
  }

  checkSubmitButton(): void {
    if (!this._inputsList.every((element: HTMLFormElement) => element.validity.valid)) {
      for (const i of this._inputsList) {
        if (!i.validity.valid) { this._showInputError(i); }
      }
      if (this._submitButton) {
        this._submitButton.setAttribute('disabled', 'true');
        this._submitButton.classList.add(this._inactiveButtonClass);
      }
    } else if (this._submitButton) {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  clearValidation(): void {
    this._inputsList.forEach((element) => this._hideInputError(element));
    this.checkSubmitButton();
  }
}
