const formNewRecado = document.getElementById('form-new-recado');
const tableRecados = document.getElementById('table-recados');
let recados = [];


window.addEventListener('load', criarRecadosIfNull);
formNewRecado.addEventListener('submit', submitForm);


function submitForm(event) {
    event.preventDefault();

    const recado = {
        descricao: event.target.description.value,
        detalhamento: event.target.details.value
    }

    addRecado(recado);
}

function addRecado(recado) {
    recados.push(recado);
    localStorage.setItem('recados', JSON.stringify(recados));
    
    popularRecadoHtml(recados[recados.length-1], recados.length -1);
}

function popularTabelaRecados() {
    tableRecados.innerHTML = '';

    recados.forEach((recado, index) => {
        popularRecadoHtml(recado, index);
    });
}

function popularRecadoHtml(recado, index) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = index + 1;

    const tdDescricao = document.createElement('td');
    tdDescricao.textContent = recado.descricao;

    const tdDetalhamento = document.createElement('td');
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

function excluirRecado() {
    console.log('exclusão');
}

function editarRecado() {
    console.log('edição');
}

function criarRecadosIfNull() {
    const userRecados = localStorage.getItem('recados');

    if(userRecados === null) {
        localStorage.setItem('recados', JSON.stringify([]));
    } else {
        recados = JSON.parse(userRecados);
        popularTabelaRecados();
    }

    console.log(recados);
}