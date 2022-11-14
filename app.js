import {v4 as uuid} from './node_modules/uuid/dist/esm-browser/index.js';
import { getUsers, semUsuarioLogado, loggedUser, logoutUser } from './users.js';
import { addGrabbingCursor, addRowShadow, removeRowShadow, removeGrabbingCursor } from './table-row.js';
import { semRecadosNoLocalStorage, inicializarRecadosNoLocalStorage,  getRecadosFromLocalStorage, getRecadosFromLoggedUser, sobreporRecadosNoLocalStorage } from './recados.js';

const formNewRecado = document.getElementById('form-new-recado');
const formNewRecadoDescricao = document.getElementById('description');
const formNewRecadoDetalhamento = document.getElementById('details');
const tableRecados = document.getElementById('table-recados');
const idEdicao = document.getElementById('id-edicao');
const logoutButton = document.getElementById('exit');
const userLabel = document.getElementById('user-label');
let recados = [];


window.addEventListener('load', init);
formNewRecado.addEventListener('submit', submitForm);
logoutButton.addEventListener('click', logout);


function redirectTo(page) {
    window.location.href = `./${page}.html`;
}

function logout(event) {
    event.preventDefault();
    logoutUser();
    redirectTo('login');
}

export function recadosArray() {
    return recados;
}

function submitForm(event) {
    event.preventDefault();

    const recado = {
        descricao: event.target.description.value,
        detalhamento: event.target.details.value
    }
    
    if(isCriacao()) {
        recado.id = uuid();
        criarRecado(recado);
    } else {
        salvarRecado(recado);
    }
}

function isCriacao() {
    return idEdicao.value.length === 0;
}





// CRIAR RECADO
function criarRecado(recado) {
    recado.userId = loggedUser();
    recado.ordenador = recados.length + 1;

    recados.push(recado); // adicionar novo recado no array recados

    addNovoRecadoNoLocalStorage(recado); 
    addNovoRecadoNaTable();

    formNewRecado.reset();
}

function addNovoRecadoNaTable() {
    tableRecados.appendChild(popularRecadoHtml(recados[recados.length-1], recados.length -1));
}

function addNovoRecadoNoLocalStorage(recado) {
    const recadosAtualizados = JSON.parse(getRecadosFromLocalStorage()).concat([recado]); // adicionar novo recado em um array temporario
    sobreporRecadosNoLocalStorage(recadosAtualizados);
}




// EDITAR RECADO
function editarRecado(event) {
    const id = event.target.parentElement.parentElement.id;
    const recado = recados.find(e => e.id === id);
    
    formNewRecadoDescricao.value = recado.descricao;
    formNewRecadoDetalhamento.value = recado.detalhamento;
    idEdicao.value = recado.id;
}

function salvarRecado(recado) {
    atualizarNoArrayRecados(recado);
    atualizarNoLocalStorage(recado);
    atualizarRecadoNaTable(recado);

    formNewRecado.reset();
}

function atualizarRecadoNaTable(recado) {
    for(let tr of tableRecados.children) {
        if(tr.id === idEdicao.value) {
            for(let td of tr.children) {
                if(td.classList.value.includes('descricao')) {
                    td.textContent = recado.descricao;
                } else if(td.classList.value.includes('detalhamento')) {
                    td.textContent = recado.detalhamento;
                }
            }
        }
    }
}

function atualizarNoArrayRecados(recado) {
    const recadoParaAtualizar = recados.find(e => e.id === idEdicao.value);
    recadoParaAtualizar.descricao = recado.descricao;
    recadoParaAtualizar.detalhamento = recado.detalhamento;
}

function atualizarNoLocalStorage(recado) {
    const localRecados = JSON.parse(getRecadosFromLocalStorage());
    const localRecado = localRecados.find(e => e.id === idEdicao.value);
    localRecado.descricao = recado.descricao;
    localRecado.detalhamento = recado.detalhamento;    

    sobreporRecadosNoLocalStorage(localRecados);
}




//POPULAR TABELA DE RECADOS
//ordena os recados pela propriedade 'ordenador'
function ordenarRecados() {
    recados.sort((a, b) => {
        if(b.ordenador < a.ordenador) {
            return 1
        } else {
            return -1
        }
    });
}

function popularTabelaRecados() {
    tableRecados.innerHTML = `<tr id='dragging' class='hidden grab-shadow' style='left:0px;'><td></td></tr>`;
    
    ordenarRecados();

    recados.filter(e => e.userId === loggedUser()).forEach((recado, index) => {
        tableRecados.appendChild(popularRecadoHtml(recado, index));
    });
}

export function popularRecadoHtml(recado, index) {
    const tr = document.createElement('tr');
    tr.id = recado.id;

    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = index + 1;

    const tdGrab = document.createElement('td');
    tdGrab.className = 'td-grab';
    tdGrab.innerHTML = '<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M21,10H3V9h18V10z M21,14H3v1h18V14z" class="style-scope yt-icon"></path></g></svg>'
    tdGrab.addEventListener('mousedown', addGrabbingCursor);
    tdGrab.addEventListener('mouseup', removeGrabbingCursor);
    tdGrab.addEventListener('mouseover', addRowShadow);
    tdGrab.addEventListener('mouseleave', removeRowShadow);

    const tdDescricao = document.createElement('td');
    tdDescricao.className = 'descricao';
    tdDescricao.textContent = recado.descricao;

    const tdDetalhamento = document.createElement('td');
    tdDetalhamento.className = 'detalhamento';
    tdDetalhamento.textContent = recado.detalhamento;    

    const botaoEditar = document.createElement('button');
    botaoEditar.textContent = 'editar';
    botaoEditar.className = 'btn btn-primary';
    botaoEditar.addEventListener('click', editarRecado);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'excluir';
    botaoExcluir.className = 'btn btn-secondary';
    botaoExcluir.addEventListener('click', excluirRecado);

    const tdBotoes = document.createElement('td');
    tdBotoes.appendChild(botaoEditar);
    tdBotoes.appendChild(botaoExcluir);    

    tr.appendChild(tdGrab);
    tr.appendChild(th);    
    tr.appendChild(tdDescricao);
    tr.appendChild(tdDetalhamento);
    tr.appendChild(tdBotoes);

    return tr;
}




// EXCLUIR RECADO
function excluirRecado(event) {
    const id = event.target.parentElement.parentElement.id;
    const index = recados.map(e => e.id).indexOf(id);
    const ordenadorDoRecadoExcluido = recados[index].ordenador;

    removerDoArrayRecados(index, ordenadorDoRecadoExcluido);
    removerDoLocalStorage(id, ordenadorDoRecadoExcluido);

    popularTabelaRecados();
}

function removerDoLocalStorage(id, ordenadorDoRecadoExcluido) {
    const localRecados = JSON.parse(getRecadosFromLocalStorage());
    const indexNoLocalRecados = localRecados.map(e => e.id).indexOf(id);
    
    localRecados.splice(indexNoLocalRecados, 1);

    const localRecadosDoUser = localRecados.filter(e => e.userId === loggedUser());
    ajustarOrdenadores(localRecadosDoUser, ordenadorDoRecadoExcluido);

    sobreporRecadosNoLocalStorage(localRecados);
}

function removerDoArrayRecados(index, ordenadorDoRecadoExcluido) {
    recados.splice(index, 1);
    ajustarOrdenadores(recados, ordenadorDoRecadoExcluido);
}

function ajustarOrdenadores(array, ordenadorDoRecadoExcluido) {
    array.forEach(recado => {
        if(recado.ordenador > ordenadorDoRecadoExcluido) {
            recado.ordenador--;
        }
    })
}




// ATUALIZAR ORDENADORES: caso usuario reordene no front
export function atualizarOrdenadoresNaVariableRecados(recadosReordenados) {
    const recadosDoUser = recadosReordenados.filter(e => e.userId === localStorage.getItem('logged-user'));
    recados = recadosDoUser;
}



function init() {
    if(semUsuarioLogado()) {
        redirectTo('login');
    } else {
        setarUserLabel();
        setarRecados();
    }
}

function setarUserLabel() {
    const userName = getUsers().find(e => e.id === loggedUser()).username;
    userLabel.textContent = userName;
}

function setarRecados() {   
    if(semRecadosNoLocalStorage()) {
        inicializarRecadosNoLocalStorage();
    } else {
        recados = getRecadosFromLoggedUser();
        popularTabelaRecados();
    }
}