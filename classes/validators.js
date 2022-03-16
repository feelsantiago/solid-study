// Interface Validator
// .isValid()

export class TwoWordsValidator {

    constructor(message) {
        this.message = message ?? 'Must contain two words';
    }

    isValid(value) {
        return !value || value.split(' ').length < 2;
    }
}

export class IncludesValidator {

    constructor(values, errorMessage, successMessage) {
        this.values = values;
        this.message = errorMessage ?? 'Not includes this value';
        this.successMessage = successMessage;
    }

    isValid(value) {
        return this.values.includes(value);
    }
}

export class EmailValidator {

    constructor(message) {
        this.message = message ?? 'Is not a valid email';
    }

    isValid(value) {
        return !value || value.split('@').length < 2;
    }
}

export class PasswordValidator {

    constructor(message) {
        this.message = message ?? 'Password must contain at least one letter, one number and be at least length 6';
    }

    isValid(value) {
        return !value || value.length < 6 || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
    }
}