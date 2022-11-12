import {v4 as uuid} from './node_modules/uuid/dist/esm-browser/index.js';

const formNewRecado = document.getElementById('form-new-recado');
const formNewRecadoDescricao = document.getElementById('description');
const formNewRecadoDetalhamento = document.getElementById('details');
const tableRecados = document.getElementById('table-recados');
const idEdicao = document.getElementById('id-edicao');
let recados = [];


window.addEventListener('load', criarRecadosIfNull);
formNewRecado.addEventListener('submit', submitForm);


function submitForm(event) {
    event.preventDefault();

    const recado = {
        descricao: event.target.description.value,
        detalhamento: event.target.details.value
    }
    
    if(criacao()) {
        recado.id = uuid();
        criarRecado(recado);
    } else {
        salvarRecado(recado);
    }
}

function criacao() {
    return idEdicao.value.length === 0;
}

function criarRecado(recado) {
    recados.push(recado);
    localStorage.setItem('recados', JSON.stringify(recados));
    
    popularRecadoHtml(recados[recados.length-1], recados.length -1);

    formNewRecado.reset();
}

function popularTabelaRecados() {
    tableRecados.innerHTML = '';

    recados.forEach((recado, index) => {
        popularRecadoHtml(recado, index);
    });
}

function popularRecadoHtml(recado, index) {
    const tr = document.createElement('tr');
    tr.id = recado.id;

    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = index + 1;

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

    tr.appendChild(th);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdDetalhamento);
    tr.appendChild(tdBotoes);

    tableRecados.appendChild(tr);
}

function excluirRecado(event) {
    const id = event.target.parentElement.parentElement.id;
    const index = recados.map(e => e.id).indexOf(id);

    recados.splice(index, 1);

    localStorage.setItem('recados', JSON.stringify(recados));

    popularTabelaRecados();
}

function editarRecado(event) {
    const id = event.target.parentElement.parentElement.id;
    const recado = recados.find(e => e.id === id);
    
    formNewRecadoDescricao.value = recado.descricao;
    formNewRecadoDetalhamento.value = recado.detalhamento;
    idEdicao.value = recado.id;

}

function salvarRecado(recado) {
    const recadoAtual = recados.find(e => e.id === idEdicao.value);
    recadoAtual.descricao = recado.descricao;
    recadoAtual.detalhamento = recado.detalhamento;

    localStorage.setItem('recados', JSON.stringify(recados));

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

    formNewRecado.reset();
}

function criarRecadosIfNull() {

    localStorage.setItem('logged-user', 'jonas');

    const user = localStorage.getItem('logged-user');

    if(user === null) {
        window.location.href = './login.html';
    } else {
        const userRecados = localStorage.getItem('recados');

        if(userRecados === null) {
            localStorage.setItem('recados', JSON.stringify([]));
        } else {
            recados = JSON.parse(userRecados);
            popularTabelaRecados();
        }
    }
}