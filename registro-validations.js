const formRegistroUsername = document.getElementById('username');
const formRegistroPassword = document.getElementById('password');
const formRegistroPasswordRepeat = document.getElementById('password-repeat');
const registroMessenger = document.getElementById('registro-messenger');
const submitButton = document.getElementById('registro-submit-button');

[formRegistroUsername, formRegistroPassword, formRegistroPasswordRepeat].forEach(input => {
    input.addEventListener('keyup', validaRegistro);
});

function validaRegistro() {
    submitButton.disabled = true;

    if(formVazio()) {
        limpaMessenger();
    } else {
        if(faltaCampo()) {
            registroMessenger.textContent = 'Preencha todos os campos.';
        } else if(passwordsDontMatch()) {
            registroMessenger.textContent = 'As senhas não conferem';
        } else {
            limpaMessenger();
            submitButton.disabled = false;
        }
    }
}

function liberaSubmitButton() {

}

function passwordsMatch() {
    return formRegistroPassword.value === formRegistroPasswordRepeat.value;
}

function passwordsDontMatch() {
    return !passwordsMatch();
}

function formVazio() {
    return formRegistroUsername.value.length === 0
    && formRegistroPassword.value.length === 0
    && formRegistroPasswordRepeat.value.length === 0;
}

function faltaCampo() {
    return formRegistroUsername.value.length === 0
    || formRegistroPassword.value.length === 0
    || formRegistroPasswordRepeat.value.length === 0;
}

function limpaMessenger() {
    registroMessenger.textContent = '';
}