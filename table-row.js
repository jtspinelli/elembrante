let isGrabbing = false;
const tableRecados = document.getElementById('table-recados');
let tr;


document.body.addEventListener('mouseup', () => {
    document.body.classList.remove('grabbing');
    isGrabbing = false;

    const trDragging = document.getElementById('dragging');
    trDragging.classList.add('hidden');

    for(let tr of tableRecados.children) {
        if(tr.style.visibility === 'hidden') {
            tr.style = '';
        }

        if(tr.children[0].classList.value.includes('grabbing')) {
            tr.children[0].classList.remove('grabbing');
        }
    }
});

document.body.addEventListener('mousemove', teste);


export function addGrabbingCursor(event) {
    const grabingAnchor = event.target;
    grabingAnchor.classList.add('grabbing');

    isGrabbing = true;
    console.log("mousedown");
    tr = event.target.parentElement;

    const trDragging = document.getElementById('dragging');
    trDragging.innerHTML = `<td class="td-grab"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon"><path d="M21,10H3V9h18V10z M21,14H3v1h18V14z" class="style-scope yt-icon"></path></g></svg></td><th scope="row">${'1'}</th><td class="descricao">${'DESCRIÇÃO'}</td><td class="detalhamento">${'DETALHAMENTO'}</td><td><button class="btn btn-primary">editar</button><button class="btn btn-secondary">excluir</button></td>`;

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
        
        const trDragging = document.getElementById('dragging');

        if(!document.body.classList.value.includes('grabbing')) {
          document.body.classList.add('grabbing');  
        }

        if(tr.style.visibility !== 'hidden') {
            tr.style.visibility = 'hidden';            
        }        

        

        if(trDragging.classList.value.includes('hidden')){
            trDragging.classList.remove('hidden');
        }

        // trDragging.style.left = `${event.clientX - 70}px`;
        trDragging.style.top = `${event.clientY - 255}px`;

        
    }    
}