const formLogin = document.getElementById('form-login');
const formLoginUsername = document.getElementById('username');
const formLoginPassword = document.getElementById('password');
let users = [];

async function getUsers() {
    const resultado = await fetch('./users.json');
    const users = await resultado.json();
    return users;
}

async function getUsernames() {
    const registeredUsers = await getUsers();

    users = registeredUsers;
}

function logar(event) {
    event.preventDefault();

    const username = event.target.username.value;

    const userFilled = new Promise((res, rej) => {
        usernameNotEmpty() ? res() : rej();
    });

    const passwordFilled = new Promise((res, rej) => {
        passwordNotEmpty() ? res() : rej();
    });

    const userFound = new Promise((res, rej) => {
        knownUser(username) ? res() : rej();
    });

    Promise.all([userFilled, passwordFilled, userFound])
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

function passwordNotEmpty() {
    return formLoginPassword.value.length !== 0
}

function knownUser(username) {
    return users.map(e => e.username).includes(username);
}

window.addEventListener('load', getUsernames);
formLogin.addEventListener('submit', logar);