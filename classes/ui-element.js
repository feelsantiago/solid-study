import $ from 'jquery';

export default class UiElement {

    constructor(id, validators) {
        this.id = '#' + id;
        this.valid = true;
        this.input = null;
        this.formGroup = null;
        this.validators = validators ?? [];

        // private
        this._validClass = 'is-success';
        this._inValidClass = 'is-danger';
    }

    init() {
       this.input = $(this.id + " input");
       this.formGroup = $(this.id);
    }

    changeStateBy(state) {
        if (state) {
            this.changeToValid();
        } else {
            this.changeToInvalid();
        }
    }

    getValue() {
        return this.input.val();
    }

    clean() {
        $(`${this.id} p`).remove();
    }

    changeToValid() {
        this.valid = true;
        this.input.removeClass(this._inValidClass);
        this.input.addClass(this._validClass);
    }

    changeToInvalid() {
        this.valid = false;
        this.input.removeClass(this._validClass);
        this.input.addClass(this._inValidClass);
    }

    showErrorMessage(message) {
        this.formGroup.append(`<p class="help is-danger">${message}</p>`);
    }

    showSuccessMessage(message) {
        this.formGroup.append(`<p class="help is-success">${message}</p>`);
    }

    validate() {
        for (let validator of this.validators) {
            const isValid = validator.isValid(this.getValue());

            this.changeStateBy(isValid);

            // TODO: refactor
            if (!this.valid) {
                return this.showErrorMessage(validator.message);
            } else {
                if (validator.successMessage) {
                    return this.showSuccessMessage(validator.successMessage);
                }
            }
        }
    }
}