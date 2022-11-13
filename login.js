import { semUsuariologado } from "./users.js";

const formLogin = document.getElementById('form-login');
const formLoginUsername = document.getElementById('username');
const formLoginPassword = document.getElementById('password');
let users = [
    {
        username: 'jspinelli',
        password: 'jts',
        id: '0c5c8f64-54ae-440d-8c1b-dfc9900dac02'
    },
    {
        username: 'bcarboni',
        password: 'bca',
        id: '09165252-0a62-454f-be26-7eaafe38de1b'
    }
];

async function getUsernames() {
    if(semUsuariologado()) {
        if(localStorage.getItem('users') === null) {
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            users = JSON.parse(localStorage.getItem('users'))
            // console.log('users no localStorage: ', JSON.parse(localStorage.getItem('users')));
        }   
    } else {
        window.location.href = './index.html';
    }
}

function logar(event) {
    event.preventDefault();

    const username = event.target.username.value;

    const userFilled = new Promise((res, rej) => {
        usernameNotEmpty() ? res() : rej();
    });

    const passwordCorrect = new Promise((res, rej) => {
        passwordIsCorrect() ? res() : rej();
    });

    const userFound = new Promise((res, rej) => {
        knownUser(username) ? res() : rej();
    });

    Promise.all([userFilled, passwordCorrect, userFound])
    .then(() => {
        const id = users.find(e => e.username === username).id;
        localStorage.setItem('logged-user', id);

        window.location.href = './index.html';
    })
    .catch(() => {console.log("falha");})
}

function usernameNotEmpty() {
    return formLoginUsername.value.length !== 0
}

function passwordIsCorrect() {
    return formLoginPassword.value === users.find(e => e.username === formLoginUsername.value).password;

}

function knownUser(username) {
    return users.map(e => e.username).includes(username);
}

window.addEventListener('load', getUsernames);
formLogin.addEventListener('submit', logar);