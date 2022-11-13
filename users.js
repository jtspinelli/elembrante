export function getUsers() {
    return JSON.parse(localStorage.getItem('users'));
}

export function semUsuariologado() {
    return [null, 'null'].includes(localStorage.getItem('logged-user'));
}

export function temUsuarioLogado() {
    return !semUsuariologado();
}