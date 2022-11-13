import {v4 as uuid} from './node_modules/uuid/dist/esm-browser/index.js';
import { getUsers } from './users.js';
import { temUsuarioLogado } from "./users.js";

const formRegistro = document.getElementById('form-registro');
const formRegistroUsername = document.getElementById('username');
const formRegistroPassword = document.getElementById('password');
const formRegistroPasswordRepeat = document.getElementById('password-repeat');

formRegistro.addEventListener('submit', submitRegistro);

window.addEventListener('load', () => {
    if(temUsuarioLogado()) {
        window.location.href = './index.html';
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

        window.location.href = './index.html';
    } else {
        alert('usuário já existe');
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