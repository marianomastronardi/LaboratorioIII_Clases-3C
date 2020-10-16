var http = new XMLHttpRequest();
var row;
window.addEventListener('load', loader);

function loader() {
    btn = document.getElementById('btnsubmit');
    btno = document.getElementById('hiddendiv');
    equis = document.getElementById('equis');
    tbl = document.getElementById('maintable');
    cnt = document.getElementById('container');
    iNombre = document.getElementById('nombre');
    iApellido = document.getElementById('apellido');
    iFecha = document.getElementById('fecha');
    iTelefono = document.getElementById('telefono');
    btn.addEventListener('click', addItem);
    btno.addEventListener('click', openHideDiv);
    equis.addEventListener('click', cerrar);
    http.onreadystatechange = cb;
    http.open("GET", `http://localhost:3000/personas`, true);
    http.send();
}

function removeRow(e){
    e.preventDefault();
    let tr = e.target.parentNode.parentNode;
    bmt.removeChild(tr);
}

function editRow(e){
    e.preventDefault();
    openHideDiv();
    iNombre.value = e.target.parentNode.parentNode.childNodes[0].textContent;
    iApellido.value = e.target.parentNode.parentNode.childNodes[1].textContent;
    iFecha.value = e.target.parentNode.parentNode.childNodes[2].textContent;
    iTelefono.value = e.target.parentNode.parentNode.childNodes[3].textContent; 
    row = e.target.parentNode.parentNode;
}

function cb() {
    if (http.readyState === 4) {
        if (http.status === 200) {
            let personas = http.responseText;
            FillGrid(JSON.parse(personas));
        }
    }
}

function FillGrid(personas) {
    bmt = document.getElementById('bodymaintable');
    personas.forEach(element => {
      //  bmt.innerHTML = bmt.innerHTML + `<tr><td>${element.nombre}</td><td>${element.apellido}</td><td>${element.fecha}</td><td>${element.telefono}</td><td><a href="#">borrar</a></td></tr>`;
        let tr = document.createElement('tr');
        let tdn = document.createElement('td');
        let tn = document.createTextNode(element.nombre);
        let tdap = document.createElement('td');
        let ta = document.createTextNode(element.apellido);
        let tdf = document.createElement('td');
        let tf = document.createTextNode(element.fecha);
        let tdt = document.createElement('td');
        let tt = document.createTextNode(element.telefono);
        let tda = document.createElement('td');
        let a = document.createElement('a');
        let textA = document.createTextNode('borrar');
        a.appendChild(textA);
        a.setAttribute('href', '');
        a.addEventListener('click', removeRow);
        let tdam = document.createElement('td');
        let am = document.createElement('a');
        let textAm = document.createTextNode('modificar');
        am.appendChild(textAm);
        am.setAttribute('href', '');
        am.addEventListener('click', editRow);

        tdn.appendChild(tn);
        tdap.appendChild(ta);
        tdf.appendChild(tf);
        tdt.appendChild(tt);
        tda.appendChild(a);
        tdam.appendChild(am);

        tr.appendChild(tdn);
        tr.appendChild(tdap);
        tr.appendChild(tdf);
        tr.appendChild(tdt);
        tr.appendChild(tda);
        tr.appendChild(tdam);

        bmt.appendChild(tr);
    });
    
}

function addItem() {
    if(row){         
        bmt.removeChild(row);
        row = null;
        let tr = document.createElement('tr');
        let tn;
        for(i = 0; i < 4; i++){           
            let td = document.createElement('td');
            switch(i){
             case 0:
                  tn = document.createTextNode(iNombre.value);
             break;
             case 1:
                 tn = document.createTextNode(iApellido.value);
             break;
             case 2:
                 tn = document.createTextNode(iFecha.value);
             break;
             case 3:
                 tn = document.createTextNode(iTelefono.value);
             break;
             default:
                 break;
            }
            td.appendChild(tn);
            tr.appendChild(td);           
        }
        //agrego los enlaces boorar y modificar
        let tda = document.createElement('td');
        let a = document.createElement('a');
        let textA = document.createTextNode('borrar');
        a.appendChild(textA);
        a.setAttribute('href', '');
        a.addEventListener('click', removeRow);
        let tdam = document.createElement('td');
        let am = document.createElement('a');
        let textAm = document.createTextNode('modificar');
        am.appendChild(textAm);
        am.setAttribute('href', '');
        am.addEventListener('click', editRow);
        //agrego los enlaces al td
        tda.appendChild(a);
        tdam.appendChild(am);
        //agrego los td al tr
        tr.appendChild(tda);
        tr.appendChild(tdam);
        //agrego el tr al bmt
        bmt.appendChild(tr);
    }else{
        http.onreadystatechange = resServer;
        http.open('POST', 'http://localhost:3000/nuevapersona', true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send(`nombre=${$('nombre')}&apellido=${$('apellido')}&fecha=${$('fecha')}&telefono=${$('telefono')}`)
    }
}

function resServer() {
    if (http.readyState == 4) {
        if (http.status === 200) {
            let element = JSON.parse(http.responseText);
            console.log(element);
            //alert(res);
            bmt.innerHTML = bmt.innerHTML + `<tr><td>${element.nombre}</td><td>${element.apellido}</td><td>${element.fecha}</td><td>${element.telefono}</td><td><a href="#">borrar</a></td></tr>`;
            a = document.getElementsByTagName('a');
            for (let i = 0; i < a.length; i++) {
                a[i].addEventListener('click', removeRow);
            };
            resetForm();
        } else {
            alert('error');
        }
    }
}

function $(id) {
    return document.getElementById(id).value;
}
function openHideDiv() {
    div = document.getElementById('container');
    div.hidden = false;
}

function cerrar() {
    div = document.getElementById('container');
    div.hidden = true;
}

function resetForm() {
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('telefono').value = '';
}
