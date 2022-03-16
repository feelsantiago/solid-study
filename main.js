import $ from 'jquery';
import UiElement from './classes/ui-element';
import { EmailValidator, IncludesValidator, PasswordValidator, TwoWordsValidator } from './classes/validators';

import './style.scss';

const submitButton = $('#submit-button');

const UI_STATES = {
    VALID: true,
    INVALID: false,
};

const userNames = ['ze', 'fulano'];

const uiElements = {
    name: new UiElement('name', [new TwoWordsValidator()]),
    userName: new UiElement('user-name', [
        new IncludesValidator(userNames, 'User name not available', 'User name available'),
    ]),
    email: new UiElement('email', [new EmailValidator()]),
    password: new UiElement('password', [new PasswordValidator()]),
    passwordRepeat: new UiElement('password-repeat'),
};

function login(callback) {
    setTimeout(callback, 1000);
}

// Executa depois que o document esta pronto
$(() => {
    $('#two-factor').hide();

    for (let element of Object.values(uiElements)) {
        element.init();
    }
});

submitButton.on('click', () => {
    // desabilita o butao
    submitButton.prop('disabled', true);

    // pega os valores dos inputs
    const name = uiElements.name.getValue();
    const userName = uiElements.userName.getValue();
    const email = uiElements.email.getValue();
    const password = uiElements.password.getValue();
    const passwordRepeat = uiElements.passwordRepeat.getValue();

    // remove as mensagens de erro
    for (let element of Object.values(uiElements)) {
        element.clean();
    }

    // controle de erro
    let hasError = true;

    for (let element of Object.values(uiElements)) {
        element.validate();
        hasError = !element.valid || hasError;
    }

    if (!passwordRepeat || password !== passwordRepeat) {
        uiElements.passwordRepeat.changeStateBy(UI_STATES.INVALID);
        uiElements.passwordRepeat.showErrorMessage("Passwords don't match");
        hasError = true;
    } else {
        uiElements.passwordRepeat.changeStateBy(UI_STATES.VALID);
    }

    // faz login
    if (hasError) {
        return login(() => submitButton.prop('disabled', false));
    }

    login(() => {
        submitButton.prop('disabled', false);
        alert('Success');
    });
});
