var http = new XMLHttpRequest();
var row;
var iID;
var iNombre;
var iApellido;
var iFecha;
var iMasculino;
var iFemenino;
window.addEventListener('load', loader);

function loader() {
    iNombre = document.getElementById('nombre');
    iApellido = document.getElementById('apellido');
    iFecha = document.getElementById('fecha');
    iMasculino = document.getElementById('male');
    iFemenino = document.getElementById('female');
    btnEliminar = document.getElementById('btnDelete');
    btnModificar = document.getElementById('btnEdit');
    btnModificar.addEventListener('click', Modificar);
    btnEliminar.addEventListener('click', Eliminar);
    http.onreadystatechange = cb;
    http.open("GET", `http://localhost:3000/personas`, true);
    http.send();
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
        let tdid = document.createElement('td');
        let tnid = document.createTextNode(element.id);
        tdid.setAttribute('hidden', true);
        let tdn = document.createElement('td');
        let tn = document.createTextNode(element.nombre);
        let tdap = document.createElement('td');
        let ta = document.createTextNode(element.apellido);
        let tdf = document.createElement('td');
        let tf = document.createTextNode(element.fecha);
        let tds = document.createElement('td');
        let ts = document.createTextNode(element.sexo);

        tdid.appendChild(tnid);
        tdn.appendChild(tn);
        tdap.appendChild(ta);
        tdf.appendChild(tf);
        tds.appendChild(ts);

        tr.appendChild(tdid);
        tr.appendChild(tdn);
        tr.appendChild(tdap);
        tr.appendChild(tdf);
        tr.appendChild(tds);

        tr.addEventListener('dblclick', modalShow);

        bmt.appendChild(tr);
    });

}

function Eliminar() {
    http.onreadystatechange = resServer2;
    http.open('POST', 'http://localhost:3000/eliminar', true);
    element = (`{"id":"${iID}"}`);
    console.log(element)
    http.setRequestHeader('Content-type', 'application/json');
    http.send(element)
}

function Modificar() {
    //validaciones
    if ($('nombre').length > 3) {
        if ($('apellido').length > 3) {
            if (new Date($('fecha')) < Date.now()) {
                if ((iMasculino.checked || iFemenino.checked)) {
                    http.onreadystatechange = resServer;
                    http.open('POST', 'http://localhost:3000/editar', true);
                    element = (`{"id":"${iID}","nombre":"${$('nombre')}","apellido":"${$('apellido')}","fecha":"${$('fecha')}","sexo":"` + (iMasculino.checked ? $('male') : $('female')) + '"}');
                    http.setRequestHeader('Content-type', 'application/json');
                    http.send(element);
                } else {
                    //sexo

                }
            } else {
                //fecha
            }
        } else {
            //apellido
        }
    } else {
        //nombre
    }

}

function modalShow(e) {
    e.preventDefault();
    //openHideDiv();
    iID = e.target.parentNode.childNodes[0].textContent;
    iNombre.value = e.target.parentNode.childNodes[1].textContent;
    iApellido.value = e.target.parentNode.childNodes[2].textContent;
    iFecha.value = e.target.parentNode.childNodes[3].textContent;
    iMasculino.checked = e.target.parentNode.childNodes[4].textContent == 'Male';
    iFemenino.checked = e.target.parentNode.childNodes[4].textContent == 'Female';
    row = e.target.parentNode;
}
/*
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
                 tn = document.createTextNode(iSexo.value);
             break;
             default:
                 break;
            }
            td.appendChild(tn);
            tr.appendChild(td);           
        }
        //agrego el tr al bmt
        bmt.appendChild(tr);
    }else{
        http.onreadystatechange = resServer;
        http.open('POST', 'http://localhost:3000/nuevapersona', true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send(`nombre=${$('nombre')}&apellido=${$('apellido')}&fecha=${$('fecha')}&telefono=${$('telefono')}`)
    }
}
*/
function getTr(elements){
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    for (let index = 0; index < 5; index++) {
        switch(i){
            case 0:
                break;
        }
        
    }
    let tn = document.createTextNode(element.id);
    td.appendChild(tn);
    tr.appendChild(tr);
    
    return tr;
}

function resServer() {
    if (http.readyState == 4) {
        if (http.status === 200) {
            let element = JSON.parse(http.responseText);
            console.log(element);
            newNode = getTr(element);
            resetForm();
        } else {
            alert('error');
        }
    }
}

function resServer2() {
    if (http.readyState == 4) {
        if (http.status === 200) {
            let element = JSON.parse(http.responseText);
            console.log(element);
            bmt.removeChild(row);
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
    div.hidden = !div.hidden;
}

function cerrar() {
    div = document.getElementById('container');
    div.hidden = true;
}

function resetForm() {
    iNombre.value = '';
    iApellido.value = '';
    iFecha.value = '';
    iMasculino.checked = false;
    iFemenino.checked = false;
}
