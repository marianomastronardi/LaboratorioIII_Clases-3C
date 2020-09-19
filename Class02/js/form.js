window.addEventListener('load', loader);


function loader(){
   
    btn = document.getElementById('btnsubmit');
    btno = document.getElementById('hiddendiv');
    equis = document.getElementById('equis');
    tbl = document.getElementById('maintable');
    

    btn.addEventListener('click', addItem);
    btno.addEventListener('click', openHideDiv);
    equis.addEventListener('click', cerrar);
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
    nom = document.getElementById('nombre');
    ape = document.getElementById('apellido');
    bmt = document.getElementById('bodymaintable');
   /* rownum = tbl.getElementsByTagName('tr').length;
    var tr = document.createElement('tr'); 
    tr.setAttribute("id", rownum);  
    tdn = createCol(nom.value);
    tr.appendChild(tdn);
    tda = createCol(ape.value);
    tr.appendChild(tda);
    tdl = createCol('<a href="#">borrar</a>');
    tdl.addEventListener('click', removeRow);
    tr.appendChild(tdl);
    bmt.appendChild(tr); */
    bmt.innerHTML = bmt.innerHTML + `<tr><td>${nom.value}</td><td>${ape.value}</td><td><a href="#">borrar</a></td></tr>`;
    resetForm(nom, ape);
}

function openHideDiv(){
    div = document.getElementById('container');

    div.hidden = false;
}

function cerrar(){
    div = document.getElementById('container');

    div.hidden = true;
}

function resetForm($nom, $ape){
    $nom.value = '';
    $ape.value = '';
}
