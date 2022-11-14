import { loggedUser } from "./users.js";

export function getRecadosFromLocalStorage() {
    return localStorage.getItem('recados');
}

export function semRecadosNoLocalStorage() {
    return getRecadosFromLocalStorage() === null;
}

export function inicializarRecadosNoLocalStorage() {
    localStorage.setItem('recados', JSON.stringify([]));
}

export function getRecadosFromLoggedUser() {
    return JSON.parse(getRecadosFromLocalStorage()).filter(e => e.userId === loggedUser());
}

export function sobreporRecadosNoLocalStorage(recados) {
    localStorage.setItem('recados', JSON.stringify(recados));
}