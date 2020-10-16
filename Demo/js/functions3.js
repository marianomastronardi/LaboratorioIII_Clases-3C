var http = new XMLHttpRequest();
var row;
var iID;
var iNombre;
var iApellido;
var iFecha;
var iMasculino;
var iFemenino;
var bmt;
var loading;
window.addEventListener('load', loader);

function loader() {
    iNombre = document.getElementById('nombre');
    iApellido = document.getElementById('apellido');
    iFecha = document.getElementById('fecha');
    iMasculino = document.getElementById('male');
    iFemenino = document.getElementById('female');

    btnEliminar = document.getElementById('btnDelete');
    btnModificar = document.getElementById('btnEdit');
    btnAgregar = document.getElementById('btnAdd');
    btnEnviar = document.getElementById('btnEnviar');
    btnEnd = document.getElementById('end');
    bmt = document.getElementById('bodytable');
    loading = document.getElementById('loading');
    /* Eventos */
    btnModificar.addEventListener('click', Modificar);
    btnEliminar.addEventListener('click', Eliminar);
    btnAdd.addEventListener('click', openHideDiv);
    btnEnviar.addEventListener('click', Agregar);
    btnEnd.addEventListener('click', cerrar)
    /* HTTP */
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
    try {
        personas.forEach(element => {
            let tr = document.createElement('tr');
            for (let index = 0; index < 5; index++) {
                let td = document.createElement('td');
                let tn;
                switch (index) {
                    case 0:
                        tn = document.createTextNode(element.id);
                        td.setAttribute('hidden', true);
                        break;
                    case 1:
                        tn = document.createTextNode(element.nombre);
                        break;
                    case 2:
                        tn = document.createTextNode(element.apellido);
                        break;
                    case 3:
                        tn = document.createTextNode(element.fecha);
                        break;
                    case 4:
                        tn = document.createTextNode(element.sexo);
                        break;
                    default:
                        break;
                }
                td.appendChild(tn);
                tr.appendChild(td);

            }
            tr.addEventListener('dblclick', modalShow);

            if (element.id % 2 == 0) {
                tr.setAttribute('class', 'filaImpar');
            }

            bmt.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
}

function modalShow(e) {
    e.preventDefault();
    row = e.target.parentNode;
    openHideDiv();
    iID = e.target.parentNode.childNodes[0].textContent;
    iNombre.value = e.target.parentNode.childNodes[1].textContent;
    iApellido.value = e.target.parentNode.childNodes[2].textContent;
    iFecha.value = e.target.parentNode.childNodes[3].textContent;
    iMasculino.checked = e.target.parentNode.childNodes[4].textContent == 'Male';
    iFemenino.checked = e.target.parentNode.childNodes[4].textContent == 'Female';
}

function $(id) {
    return document.getElementById(id).value;
}

function openHideDiv() {
    let div = document.getElementById('formPersona');
    div.hidden = !div.hidden;
    let alta = document.getElementById('alta');
    let eliminar = document.getElementById('btnDelete');
    let editar = document.getElementById('btnEdit');
    let esAlta = (row === undefined || row === null);
    console.log(esAlta);
    alta.hidden = !esAlta;
    eliminar.hidden = esAlta;
    editar.hidden = esAlta;

    iNombre.removeAttribute('class', 'errValidation');
    iApellido.removeAttribute('class', 'errValidation');
    iFecha.removeAttribute('class', 'errValidation');
    iMasculino.removeAttribute('class', 'errValidation');
    iFemenino.removeAttribute('class', 'errValidation');    
}

function hideSpinner(bHide) {
    let div = document.getElementById('loading');
    let img = document.getElementsByTagName('img')[0];
    div.hidden = bHide
    if (bHide) {
        img.setAttribute('class', 'hide-child');
    } else {
        img.removeAttribute('class', 'hide-child');
    }
}

function cerrar() {
    let div = document.getElementById('formPersona');
    div.hidden = true;
    resetForm();
    row = null;
}

function resetForm() {
    iNombre.value = '';
    iApellido.value = '';
    iFecha.value = '';
    iMasculino.checked = false;
    iFemenino.checked = false;
}

/* eventos */

function Eliminar() {
    try {
        openHideDiv();
        hideSpinner(false);
        http.onreadystatechange = resDelete;
        http.open('POST', 'http://localhost:3000/eliminar', true);

        let obj = new Object();
        obj.id = iID;
        let element = JSON.stringify(obj);

        /* element = (`{"id":"${iID}"}`); */
        http.setRequestHeader('Content-type', 'application/json');
        http.send(element)
    } catch (error) {
        console.log(error);
        hideSpinner(true);
    }
}

function resDelete() {
    try {
        if (http.readyState == 4) {
            if (http.status === 200) {
                let element = JSON.parse(http.responseText);
                bmt.removeChild(row);
                row = null;
                resetForm();
            } else {
                alert('error');
            }
            hideSpinner(true);
        }
    } catch (error) {
        console.log(error);
        hideSpinner(true);
    }
}

function Modificar() {
    //validaciones
    if ($('nombre').length > 3) {
        iNombre.removeAttribute('class', 'errValidation');
        if ($('apellido').length > 3) {
            iApellido.removeAttribute('class', 'errValidation');
            if (new Date($('fecha')) < Date.now()) {
                iFecha.removeAttribute('class', 'errValidation');
                if ((iMasculino.checked || iFemenino.checked)) {
                    iMasculino.removeAttribute('class', 'errValidation');
                    iFemenino.removeAttribute('class', 'errValidation');
                    try {
                        openHideDiv();
                        hideSpinner(false);
                        http.onreadystatechange = resEdit;
                        http.open('POST', 'http://localhost:3000/editar', true);
                        let obj = new Object();
                        obj.id = iID;
                        obj.nombre = $('nombre');
                        obj.apellido = $('apellido');
                        obj.fecha = $('fecha');
                        obj.sexo = (iMasculino.checked ? $('male') : $('female'));
                        let element = JSON.stringify(obj);
                        /* element = (`{"id":"${iID}","nombre":"${$('nombre')}","apellido":"${$('apellido')}","fecha":"${$('fecha')}","sexo":"` + (iMasculino.checked ? $('male') : $('female')) + '"}'); */
                        http.setRequestHeader('Content-type', 'application/json');
                        http.send(element);
                    } catch (error) {
                        console.log(error);
                        hideSpinner(true);
                    }
                } else {
                    alert('Ingrese un Sexo');
                    iMasculino.setAttribute('class', 'errValidation');
                    iFemenino.setAttribute('class', 'errValidation');
                }
            } else {
                console.log('Fecha incorrecta');
                iFecha.setAttribute('class', 'errValidation');
            }
        } else {
            console.log('Apellido incorrecto');
            iApellido.setAttribute('class', 'errValidation');
        }
    } else {
        console.log('Nombre incorrecto');
        iNombre.setAttribute('class', 'errValidation');
    }

}

function resEdit() {
    try {
        if (http.readyState == 4) {
            if (http.status === 200) {
                let element = JSON.parse(http.responseText);
                newTR = getTR();
                bmt.replaceChild(newTR, row);
                row = null;
                resetForm();
            } else {
                alert('error');
            }
            hideSpinner(true);
        }
    } catch (error) {
        console.log(error);
        hideSpinner(true);
    }
}

function Agregar(e) {
    if ($('nombre').length > 3) {
        iNombre.removeAttribute('class', 'errValidation');
        if ($('apellido').length > 3) {
            iApellido.removeAttribute('class', 'errValidation');
            if (new Date($('fecha')) < Date.now()) {
                iFecha.removeAttribute('class', 'errValidation');
                if ((iMasculino.checked || iFemenino.checked)) {
                    iMasculino.removeAttribute('class', 'errValidation');
                    iFemenino.removeAttribute('class', 'errValidation');
                    try {
                        e.preventDefault();
                        openHideDiv();
                        hideSpinner(false);
                        http.onreadystatechange = resCreate;
                        http.open('POST', 'http://localhost:3000/nueva', true);
                        http.setRequestHeader('Content-type', 'application/json');

                        let obj = new Object();
                        obj.id = iID;
                        obj.nombre = $('nombre');
                        obj.apellido = $('apellido');
                        obj.fecha = $('fecha');
                        obj.sexo = (iMasculino.checked ? $('male') : $('female'));
                        let element = JSON.stringify(obj);

                        /* http.send(`nombre=${$('nombre')}&apellido=${$('apellido')}&fecha=${$('fecha')}&telefono=${$('telefono')}`) */
                        http.send(element);
                    } catch (error) {
                        console.log(error);
                        hideSpinner(true);
                    }
                } else {
                    alert('Ingrese un Sexo');
                    iMasculino.setAttribute('class', 'errValidation');
                    iFemenino.setAttribute('class', 'errValidation');
                }
            } else {
                console.log('Fecha incorrecta');
                iFecha.setAttribute('class', 'errValidation');
            }
        } else {
            console.log('Apellido incorrecto');
            iApellido.setAttribute('class', 'errValidation');
        }
    } else {
        console.log('Nombre incorrecto');
        iNombre.setAttribute('class', 'errValidation');
    }
}
function resCreate() {
    try {
        if (http.readyState === 4) {
            if (http.status === 200) {
                let element = JSON.parse(http.responseText);
                let tr = document.createElement('tr');
                let tn;
                for (i = 0; i < 5; i++) {
                    let td = document.createElement('td');
                    switch (i) {
                        case 0:
                            tn = document.createTextNode(element.id);
                            td.setAttribute('hidden', true);
                            break;
                        case 1:
                            tn = document.createTextNode(element.nombre);
                            break;
                        case 2:
                            tn = document.createTextNode(element.apellido);
                            break;
                        case 3:
                            tn = document.createTextNode(element.fecha);
                            break;
                        case 4:
                            tn = document.createTextNode(element.sexo);
                            break;
                        default:
                            break;
                    }
                    td.appendChild(tn);
                    tr.appendChild(td);
                }
                //agrego el tr al bmt
                if (element.id % 2 == 0) {
                    tr.setAttribute('class', 'filaImpar');
                }
                tr.addEventListener('dblclick', modalShow);
                bmt.appendChild(tr);
            } else {
                alert('error');
            }

            hideSpinner(true);
            resetForm();

        }
    } catch (error) {
        console.log(error);
        hideSpinner(true);
    }
}

/* Auxiliares */
function getTR() {
    try {
        let tr = document.createElement('tr');
        for (let index = 0; index < 5; index++) {
            let td = document.createElement('td');
            let tn;
            switch (index) {
                case 0:
                    tn = document.createTextNode(row.childNodes[0].textContent);
                    td.setAttribute('hidden', true);
                    break;
                case 1:
                    tn = document.createTextNode($('nombre'));
                    break;
                case 2:
                    tn = document.createTextNode($('apellido'));
                    break;
                case 3:
                    tn = document.createTextNode($('fecha'));
                    break;
                case 4:
                    tn = document.createTextNode((iMasculino.checked ? $('male') : $('female')));
                    break;
                default:
                    break;
            }
            td.appendChild(tn);
            tr.appendChild(td);
        }
        if (parseInt(row.childNodes[0].textContent) % 2 === 0) {
            tr.setAttribute('class', 'filaImpar');
        }
        tr.addEventListener('dblclick', modalShow);
        return tr;
    } catch (error) {
        console.log(error);
    }
}
