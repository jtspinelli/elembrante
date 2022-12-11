import {v4 as uuid} from '/uuid/dist/esm-browser/index.js';
import { getUsers, temUsuarioLogado } from './users.js';

const formRegistro = document.getElementById('form-registro');
const formRegistroUsername = document.getElementById('username');
const formRegistroPassword = document.getElementById('password');
const formRegistroPasswordRepeat = document.getElementById('password-repeat');
const errorAlert = document.querySelector('.alert-danger');

formRegistro.addEventListener('submit', submitRegistro);

window.addEventListener('load', () => {
    if(temUsuarioLogado()) {
        window.location.href = '/lembretes';
    }
})

function submitRegistro(event) {
    event.preventDefault();

    const username = event.target.username.value;

    if(usernameAvailable(username) && usernameNotEmpty() && passwordsMatch()) {
        const id = uuid();

        const user = {
            username: event.target.username.value,
            password: event.target.password.value,
            id: id
        };

        const localUsers = JSON.parse(localStorage.getItem('users'));
        localUsers.push(user);

        localStorage.setItem('users', JSON.stringify(localUsers));
        localStorage.setItem('logged-user', id);

        window.location.href = 'lembretes';
    } else {
        errorAlert.classList.add('show');
        shakeAlert();

    }
}

function usernameNotEmpty() {
    return formRegistroUsername.value.length > 0;
}

function passwordsMatch() {
    return formRegistroPassword.value.length > 0 && formRegistroPassword.value === formRegistroPasswordRepeat.value;
}

function usernameTaken(username) {
    const users = getUsers();
    return users.map(e => e.username).includes(username);
}

function usernameAvailable(username) {
    return !usernameTaken(username);
}

function shakeAlert() {
    errorAlert.classList.remove("shake-horizontal");
    errorAlert.offsetHeight;
    errorAlert.classList.add("shake-horizontal");
}