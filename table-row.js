import { recadosArray, popularRecadoHtml, atualizarOrdenadoresNaVariableRecados } from './app.js';

let isGrabbing = false;
const tableRecados = document.getElementById('table-recados');
let tr;

let overTr = 1;
let overTrWas = 1;
let clickedTr = 1;
let increased = false;
let increaseCount = 0;
let decreaseCount = 0;

document.body.addEventListener('mouseup', () => {
    if(isGrabbing) {
        document.body.classList.remove('grabbing');
        isGrabbing = false;

        tableRecados.style = '';

        const trDragging = document.getElementById('dragging');
        trDragging.classList.add('hidden');

        // RESETS:
        increaseCount = 0;
        increased = false;
        //////

        const novaOrdemDosRecados = [];

        let index = 0;

        for(let tr of tableRecados.children) {
            if(tr.style.visibility === 'hidden') {
                tr.style = '';
            }

            if(tr.children[0].classList.value.includes('grabbing')) {
                tr.children[0].classList.remove('grabbing');
            }

            tr.removeAttribute('stay-visible');

            if(tr.id !== 'dragging') {
                novaOrdemDosRecados.push(tr.id);
            }

            
            
            tr.children[1].textContent = index;
            index++;
        }

        const recadosReordenados = [];

        recadosArray().forEach((_, i, recados) => {
            const a = recados.find(e => e.id === novaOrdemDosRecados[i]);
            recadosReordenados.push(a);
        });

        

        const recadosNoLocalStorage = JSON.parse(localStorage.getItem('recados'));

        recadosReordenados.forEach((recado, i) => {
            recadosNoLocalStorage.find(e => e.id === recado.id).ordenador = (i + 1);
        })

        atualizarOrdenadoresNaVariableRecados(recadosNoLocalStorage);

        localStorage.setItem('recados', JSON.stringify(recadosNoLocalStorage));
    }

});

document.body.addEventListener('mousemove', teste);

let trPositionsY = [];
export function addGrabbingCursor(event) {
    // console.log("mousedown");

    trPositionsY = [];

    for(let tr of tableRecados.children) {
        if(tr.id !== 'dragging') {
            trPositionsY.push(tr.getBoundingClientRect().y);
        }        
    }

    const indexDaTrClicada = [...tableRecados.children].map(e => e.id).indexOf(event.target.parentElement.id);
    // console.log('INDEX DA TR CLICADA: ', indexDaTrClicada);

    clickedTr = indexDaTrClicada;
    overTr = indexDaTrClicada;
    overTrWas = overTr;

    const grabingAnchor = event.target;
    grabingAnchor.classList.add('grabbing');

    isGrabbing = true;
    
    tr = event.target.parentElement;

    const trDragging = document.getElementById('dragging');
    trDragging.innerHTML = `<td class="td-grab td-grabbed"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M21,10H3V9h18V10z M21,14H3v1h18V14z" class="style-scope yt-icon"></path></g></svg></td><th scope="row">${'1'}</th><td class="descricao">${'DESCRIÇÃO'}</td><td class="detalhamento">${'DETALHAMENTO'}</td><td><button class="btn btn-primary">editar</button><button class="btn btn-secondary">excluir</button></td>`;

    trDragging.children[1].textContent = tr.children[1].textContent;
    trDragging.children[2].textContent = tr.children[2].textContent;
    trDragging.children[3].textContent = tr.children[3].textContent;
}

export function removeGrabbingCursor(event) {
    const grabingAnchor = event.target;
    grabingAnchor.classList.remove('grabbing');

    isGrabbing = false;
    document.body.style.cursor = 'unset';
}

export function addRowShadow(event) {
    const tr = event.target.parentElement;
    tr.classList.add('grab-shadow');
}

export function removeRowShadow(event) {
    const tr = event.target.parentElement;
    tr.classList.remove('grab-shadow');
}



export function teste(event) {
    if(isGrabbing) {
        tableRecados.style.userSelect = 'none';

        const trDragging = document.getElementById('dragging');

        if(!document.body.classList.value.includes('grabbing')) {
          document.body.classList.add('grabbing');
        }

        if(tr.style.visibility !== 'hidden' && !tr.getAttribute('stay-visible')) {
            tr.style.visibility = 'hidden';
        }

        if(trDragging.classList.value.includes('hidden')){
            trDragging.classList.remove('hidden');
        }
        trDragging.style.top = `${event.clientY - trPositionsY[0] - (54 / 2)}px`;


        // enquanto não chegar na última linha:
        for(let i = 0; i < trPositionsY.length; i++) {
            if(event.clientY >= trPositionsY[i] && event.clientY < trPositionsY[i+1]) {
                overTrWas = overTr;
                overTr = i + 1;        
            }
        }

        // caso chegue na última linha:
        if(event.clientY >= trPositionsY[trPositionsY.length - 1] && event.clientY < trPositionsY[trPositionsY.length - 1] + 55){
            overTrWas = overTr;
            overTr = trPositionsY.length;
        }



        // console.log(`OVER TR WAS: ${overTrWas}, NOW: ${overTr}`);



        if(overTrIncreased()){
            if(decreaseCount > 0) {
                decreaseCount--;
            } else {
                increaseCount++;
            }            

            // console.log(`INCREASE COUNT: ${increaseCount}, DECREASE COUNT: ${decreaseCount}`);

            const orderingNum = tableRecados.children[overTr].children[1].textContent;

            const trId = tableRecados.children[overTr].id;
            const recado = recadosArray().find(e => e.id === trId);

            tableRecados.insertBefore(popularRecadoHtml(recado, orderingNum - 1), tableRecados.children[overTrWas]);

            tableRecados.children[overTr + 1].remove();

        } else if(overTrDecreased()){
            if(increaseCount > 0) {
              increaseCount--;  
            } else {
                decreaseCount++;
            }           

            // console.log(`INCREASE COUNT: ${increaseCount}, DECREASE COUNT: ${decreaseCount}`);

            const orderingNum = tableRecados.children[overTr].children[1].textContent;
            
            const trId = tableRecados.children[overTr].id;
            const recado = recadosArray().find(e => e.id === trId);

            tableRecados.children[overTr].remove();

            tableRecados.insertBefore(popularRecadoHtml(recado, orderingNum - 1), tableRecados.children[overTr+1]);
        }
    }
}

function overTrIncreased() {
    return overTrWas !== overTr && overTrWas < overTr;
}

function overTrDecreased() {
    return overTrWas !== overTr && overTrWas > overTr;
}