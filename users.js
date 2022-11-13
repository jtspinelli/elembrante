export async function getUsers() {
    const resultado = await fetch('./users.json');
    const users = await resultado.json();

    return users;
}