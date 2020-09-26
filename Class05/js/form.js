var http = new XMLHttpRequest();
window.addEventListener('load', loader);

function loader() {
    btn = document.getElementById('btnsubmit');
    btno = document.getElementById('hiddendiv');
    equis = document.getElementById('equis');
    tbl = document.getElementById('maintable');
    btn.addEventListener('click', addItem);
    btno.addEventListener('click', openHideDiv);
    equis.addEventListener('click', cerrar);
    http.onreadystatechange = cb;
    http.open("GET", `http://localhost:3000/personas`, true);
    http.send();
}

function removeRow() {
    this.closest('tr').remove();
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
        bmt.innerHTML = bmt.innerHTML + `<tr><td>${element.nombre}</td><td>${element.apellido}</td><td>${element.fecha}</td><td>${element.telefono}</td><td><a href="#">borrar</a></td></tr>`;

    });
    a = document.getElementsByTagName('a');
    for (let i = 0; i < a.length; i++) {
        a[i].addEventListener('click', removeRow);
    };
}

function addItem() {
    http.onreadystatechange = resServer;
    http.open('POST', 'http://localhost:3000/nuevapersona', true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(`nombre=${$('nombre')}&apellido=${$('apellido')}&fecha=${$('fecha')}&telefono=${$('telefono')}`)
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
