window.addEventListener('load', loader);


function loader(){
    nom = document.getElementById('nombre');
    ape = document.getElementById('apellido');
    btn = document.getElementById('btnsubmit');
    tbl = document.getElementById('maintable');
    bmt = document.getElementById('bodymaintable');

    btn.addEventListener('click', addItem);
}


function createCol(valor){
    var td = document.createElement('td');
    td.innerHTML = valor;
    return td;
}

function removeRow(){
    tr = this.closest('tr');
    tr.remove();
}

function addItem(){
    rownum = tbl.getElementsByTagName('tr').length;
    var tr = document.createElement('tr'); 
    tr.setAttribute("id", rownum);  
    tdn = createCol(nom.value);
    tr.appendChild(tdn);
    tda = createCol(ape.value);
    tr.appendChild(tda);
    tdl = createCol('<a href="#">borrar</a>');
    tdl.addEventListener('click', removeRow);
    tr.appendChild(tdl);
    bmt.appendChild(tr); 
}

