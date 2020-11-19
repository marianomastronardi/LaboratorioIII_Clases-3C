"use strict";
var Animales;
(function (Animales) {
    //var listaGato: Array<Gato> = new Array<Gato>();
    var auxAnimal = new Array();
    var listaAnimal = new Array();
    var perro;
    var razaperro;
    var gato;
    var razagato;
    var pajaro;
    var razapajaro;
    var edad;
    var bmt;
    var row;
    var nombreAnimal;
    var razaAnimal;
    window.addEventListener('load', () => {
        let btnPerro = document.getElementById("btnPerro");
        btnPerro.addEventListener('click', AgregarPerro);
        let btnGato = document.getElementById("btnGato");
        btnGato.addEventListener('click', AgregarGato);
        let btnPajaro = document.getElementById("btnPajaro");
        btnPajaro.addEventListener('click', AgregarPajaro);
        let btnFilterPerro = document.getElementById("btnFilterPerro");
        btnFilterPerro.addEventListener('click', FilterPerro);
        let btnFilterGato = document.getElementById("btnFilterGato");
        btnFilterGato.addEventListener('click', FilterGato);
        let btnFilterPajaro = document.getElementById("btnFilterPajaro");
        btnFilterPajaro.addEventListener('click', FilterPajaro);
        let btnDelete = document.getElementById("btnDelete");
        btnDelete.addEventListener('click', EliminarAnimal);
        let btnEdit = document.getElementById("btnEdit");
        btnEdit.addEventListener('click', ModificarAnimal);
        let btnend = document.getElementById("btnend");
        btnend.addEventListener('click', openHideDiv);
        let btnVerTodos = document.getElementById("btnVerTodos");
        btnVerTodos.addEventListener('click', () => FillGrid());
        nombreAnimal = document.getElementById("nombreAnimal");
        razaAnimal = document.getElementById("razaAnimal");
        edad = document.getElementById("edad");
        perro = document.getElementById("perro");
        razaperro = document.getElementById("razaperro");
        gato = document.getElementById("gato");
        razagato = document.getElementById("razagato");
        pajaro = document.getElementById("pajaro");
        razapajaro = document.getElementById("razapajaro");
        bmt = document.getElementById('bodytable');
    });
    function AgregarPerro() {
        let nombrePerro = document.getElementById("perro").value;
        let razaPerro = document.getElementById("razaperro").value;
        let miMascota = new Animales.Perro(nombrePerro, razaPerro);
        listaAnimal.push(miMascota);
        //auxAnimal.push(miMascota);
        FillGrid();
        resetForm();
    }
    Animales.AgregarPerro = AgregarPerro;
    function AgregarGato() {
        let nombreGato = document.getElementById("gato").value;
        let razaGato = document.getElementById("razagato").value;
        let miMascota = new Animales.Gato(nombreGato, razaGato);
        listaAnimal.push(miMascota);
        //auxAnimal.push(miMascota);
        FillGrid();
        resetForm();
    }
    Animales.AgregarGato = AgregarGato;
    function AgregarPajaro() {
        let nombrePajaro = document.getElementById("pajaro").value;
        let razaPajaro = document.getElementById("razapajaro").value;
        let miMascota = new Animales.Pajaro(nombrePajaro, razaPajaro);
        listaAnimal.push(miMascota);
        //auxAnimal.push(miMascota);
        FillGrid();
        resetForm();
    }
    Animales.AgregarPajaro = AgregarPajaro;
    function FilterPerro() {
        auxAnimal = [];
        listaAnimal.filter(item => {
            if (item.tipo == Animales.eAnimal.Perro)
                auxAnimal.push(item);
        });
        FillGrid(false);
    }
    Animales.FilterPerro = FilterPerro;
    function FilterGato() {
        auxAnimal = [];
        listaAnimal.filter(item => {
            if (item.tipo == Animales.eAnimal.Gato)
                auxAnimal.push(item);
        });
        FillGrid(false);
    }
    Animales.FilterGato = FilterGato;
    function FilterPajaro() {
        auxAnimal = [];
        listaAnimal.filter(item => {
            if (item.tipo == Animales.eAnimal.Pajaro)
                auxAnimal.push(item);
        });
        FillGrid(false);
    }
    Animales.FilterPajaro = FilterPajaro;
    function FillGrid(copyList = true) {
        try {
            //borrar filas
            while (bmt.hasChildNodes()) {
                bmt.removeChild(bmt.childNodes[0]);
            }
            if (copyList)
                auxAnimal = listaAnimal;
            auxAnimal.map((element, i) => {
                let tr = document.createElement('tr');
                for (let index = 0; index < 3; index++) {
                    let td = document.createElement('td');
                    let tn = document.createTextNode('');
                    switch (index) {
                        case 0:
                            tn = document.createTextNode(element.nombre);
                            break;
                        case 1:
                            if (element.tipo == 'Perro') {
                                tn = document.createTextNode(element.raza);
                            }
                            else {
                                tn = document.createTextNode(element.raza);
                            }
                            break;
                        case 2:
                            tn = document.createTextNode(element.tipo);
                            break;
                        default:
                            break;
                    }
                    td.appendChild(tn);
                    tr.appendChild(td);
                }
                tr.addEventListener('dblclick', modalShow);
                if (i % 2 != 0)
                    tr.setAttribute('class', 'filaImpar');
                bmt.appendChild(tr);
            });
            auxAnimal = [];
        }
        catch (error) {
            console.log(error);
        }
    }
    Animales.FillGrid = FillGrid;
    function modalShow(e) {
        e.preventDefault();
        row = e.target.parentNode;
        openHideDiv();
        nombreAnimal.value = e.target.parentNode.childNodes[0].textContent;
        razaAnimal.value = e.target.parentNode.childNodes[1].textContent;
        //tipo = e.target.parentNode.childNodes[2].textContent;
    }
    Animales.modalShow = modalShow;
    function openHideDiv() {
        let div = document.getElementById('formPersona');
        console.log(div.hidden);
        div.hidden = !div.hidden;
        /* iNombre.removeAttribute('class', 'errValidation');
        iApellido.removeAttribute('class', 'errValidation');
        iFecha.removeAttribute('class', 'errValidation');
        iMasculino.removeAttribute('class', 'errValidation');
        iFemenino.removeAttribute('class', 'errValidation ');*/
    }
    Animales.openHideDiv = openHideDiv;
    function EliminarAnimal() {
        listaAnimal = listaAnimal.filter(item => (!(item.nombre == row.childNodes[0].textContent
            && item.tipo == row.childNodes[2].textContent
            && (row.childNodes[2].textContent == Animales.eAnimal.Perro ?
                item.raza == row.childNodes[1].textContent
                : row.childNodes[2].textContent == Animales.eAnimal.Gato ?
                    item.raza == row.childNodes[1].textContent
                    : item.raza == row.childNodes[1].textContent))));
        row = undefined;
        resetForm();
        openHideDiv();
        FillGrid();
    }
    Animales.EliminarAnimal = EliminarAnimal;
    function ModificarAnimal() {
        listaAnimal.map(item => {
            if (item.nombre == row.childNodes[0].textContent
                && item.tipo == row.childNodes[2].textContent
                && (row.childNodes[2].textContent == Animales.eAnimal.Perro ?
                    item.raza == row.childNodes[1].textContent
                    : row.childNodes[2].textContent == Animales.eAnimal.Gato ?
                        item.raza == row.childNodes[1].textContent
                        : item.raza == row.childNodes[1].textContent)) {
                item.nombre = nombreAnimal.value;
                (row.childNodes[2].textContent == Animales.eAnimal.Perro ?
                    item.raza = razaAnimal.value
                    : row.childNodes[2].textContent == Animales.eAnimal.Gato ?
                        item.raza = razaAnimal.value
                        : item.raza = razaAnimal.value);
            }
        });
        row = null;
        resetForm();
        openHideDiv();
        FillGrid();
    }
    Animales.ModificarAnimal = ModificarAnimal;
    function resetForm() {
        perro.value = '';
        razaperro.value = '';
        gato.value = '';
        razagato.value = '';
        pajaro.value = '';
        razapajaro.value = '';
        nombreAnimal.value = '';
        razaAnimal.value = '';
        edad.value = "0";
    }
    Animales.resetForm = resetForm;
})(Animales || (Animales = {}));
