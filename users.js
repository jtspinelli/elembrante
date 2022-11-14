export function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

export function loggedUser() {
    return localStorage.getItem('logged-user');
}

export function semUsuarioLogado() {
    return [null, 'null'].includes(localStorage.getItem('logged-user'));
}

export function temUsuarioLogado() {
    return !semUsuarioLogado();
}