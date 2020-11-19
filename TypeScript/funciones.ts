namespace Animales {
    //var listaGato: Array<Gato> = new Array<Gato>();
    var auxAnimal: Array<Animal> = new Array<Animal>();
    var listaAnimal: Array<Animal> = new Array<Animal>();
    var perro: HTMLInputElement;
    var razaperro: HTMLInputElement;
    var gato: HTMLInputElement;
    var razagato: HTMLInputElement;
    var pajaro: HTMLInputElement;
    var razapajaro: HTMLInputElement;
    var edad: HTMLInputElement;
    var bmt: any;
    var row: any;
    var nombreAnimal: HTMLInputElement;
    var razaAnimal: HTMLInputElement;

    window.addEventListener('load', () => {
        let btnPerro = (<HTMLInputElement>document.getElementById("btnPerro"));
        btnPerro.addEventListener('click', AgregarPerro);

        let btnGato = (<HTMLInputElement>document.getElementById("btnGato"));
        btnGato.addEventListener('click', AgregarGato);

        let btnPajaro = (<HTMLInputElement>document.getElementById("btnPajaro"));
        btnPajaro.addEventListener('click', AgregarPajaro);

        let btnFilterPerro = (<HTMLInputElement>document.getElementById("btnFilterPerro"));
        btnFilterPerro.addEventListener('click', FilterPerro);

        let btnFilterGato = (<HTMLInputElement>document.getElementById("btnFilterGato"));
        btnFilterGato.addEventListener('click', FilterGato);

        let btnFilterPajaro = (<HTMLInputElement>document.getElementById("btnFilterPajaro"));
        btnFilterPajaro.addEventListener('click', FilterPajaro);

        let btnDelete = (<HTMLInputElement>document.getElementById("btnDelete"));
        btnDelete.addEventListener('click', EliminarAnimal);

        let btnEdit = (<HTMLInputElement>document.getElementById("btnEdit"));
        btnEdit.addEventListener('click', ModificarAnimal);

        let btnend = (<HTMLInputElement>document.getElementById("btnend"));
        btnend.addEventListener('click', openHideDiv);

        let btnVerTodos = (<HTMLInputElement>document.getElementById("btnVerTodos"));
        btnVerTodos.addEventListener('click', () => FillGrid());

        nombreAnimal = (<HTMLInputElement>document.getElementById("nombreAnimal"));
        razaAnimal = (<HTMLInputElement>document.getElementById("razaAnimal"));
        edad = (<HTMLInputElement>document.getElementById("edad"));

        perro = (<HTMLInputElement>document.getElementById("perro"));
        razaperro = (<HTMLInputElement>document.getElementById("razaperro"));

        gato = (<HTMLInputElement>document.getElementById("gato"));
        razagato = (<HTMLInputElement>document.getElementById("razagato"));

        pajaro = (<HTMLInputElement>document.getElementById("pajaro"));
        razapajaro = (<HTMLInputElement>document.getElementById("razapajaro"));

        bmt = (<HTMLInputElement>document.getElementById('bodytable'));

    })

    export function AgregarPerro() {
        let nombrePerro: string = (<HTMLInputElement>document.getElementById("perro")).value;
        let razaPerro: string = (<HTMLInputElement>document.getElementById("razaperro")).value;
        let miMascota: Perro = new Perro(nombrePerro, razaPerro);
        listaAnimal.push(miMascota);
        //auxAnimal.push(miMascota);

        FillGrid();
        resetForm();
    }

    export function AgregarGato() {
        let nombreGato: string = (<HTMLInputElement>document.getElementById("gato")).value;
        let razaGato: string = (<HTMLInputElement>document.getElementById("razagato")).value;
        let miMascota: Gato = new Gato(nombreGato, razaGato);
        listaAnimal.push(miMascota);
        //auxAnimal.push(miMascota);

        FillGrid();
        resetForm();
    }

    export function AgregarPajaro() {
        let nombrePajaro: string = (<HTMLInputElement>document.getElementById("pajaro")).value;
        let razaPajaro: string = (<HTMLInputElement>document.getElementById("razapajaro")).value;
        let miMascota: Pajaro = new Pajaro(nombrePajaro, razaPajaro);
        listaAnimal.push(miMascota);
        //auxAnimal.push(miMascota);

        FillGrid();
        resetForm();
    }

    export function FilterPerro() {

        auxAnimal = []
        listaAnimal.filter(item => {
            if (item.tipo == eAnimal.Perro) auxAnimal.push(item);
        })

        FillGrid(false);
    }

    export function FilterGato() {

        auxAnimal = []
        listaAnimal.filter(item => {
            if (item.tipo == eAnimal.Gato) auxAnimal.push(item);
        })

        FillGrid(false);
    }

    export function FilterPajaro() {

        auxAnimal = []
        listaAnimal.filter(item => {
            if (item.tipo == eAnimal.Pajaro) auxAnimal.push(item);
        })

        FillGrid(false);
    }

    export function FillGrid(copyList:boolean = true) {
        try {

            //borrar filas
            while (bmt.hasChildNodes()) {
                bmt.removeChild(bmt.childNodes[0]);
            }

            if(copyList) auxAnimal = listaAnimal;

            auxAnimal.map((element: Animal, i: number) => {
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
                                tn = document.createTextNode((<Perro>element).raza);
                            } else {
                                tn = document.createTextNode((<Gato>element).raza);
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
                if (i % 2 != 0) tr.setAttribute('class', 'filaImpar');
                bmt.appendChild(tr);
            });
            auxAnimal= [];
        } catch (error) {
            console.log(error);
        }
    }

    export function modalShow(e: any) {
        e.preventDefault();
        row = e.target.parentNode;
        openHideDiv();

        nombreAnimal.value = e.target.parentNode.childNodes[0].textContent;
        razaAnimal.value = e.target.parentNode.childNodes[1].textContent;
        //tipo = e.target.parentNode.childNodes[2].textContent;
    }

    export function openHideDiv() {
        let div: HTMLElement = (<HTMLElement>document.getElementById('formPersona'));
        console.log(div.hidden);
        div.hidden = !div.hidden;

        /* iNombre.removeAttribute('class', 'errValidation');
        iApellido.removeAttribute('class', 'errValidation');
        iFecha.removeAttribute('class', 'errValidation');
        iMasculino.removeAttribute('class', 'errValidation');
        iFemenino.removeAttribute('class', 'errValidation ');*/
    }

    export function EliminarAnimal() {
        listaAnimal = listaAnimal.filter(item =>
            (!(item.nombre == row.childNodes[0].textContent
            && item.tipo == row.childNodes[2].textContent
            && (row.childNodes[2].textContent == eAnimal.Perro ?
                (<Perro>item).raza == row.childNodes[1].textContent
                : row.childNodes[2].textContent == eAnimal.Gato ?
                    (<Gato>item).raza == row.childNodes[1].textContent
                    : (<Pajaro>item).raza == row.childNodes[1].textContent))
            )
        )

        row = undefined;
        resetForm();
        openHideDiv();
        FillGrid();
    }

    export function ModificarAnimal() {
        listaAnimal.map(item => {
            if (
                item.nombre == row.childNodes[0].textContent
                && item.tipo == row.childNodes[2].textContent
                && (row.childNodes[2].textContent == eAnimal.Perro ?
                    (<Perro>item).raza == row.childNodes[1].textContent
                    : row.childNodes[2].textContent == eAnimal.Gato ?
                        (<Gato>item).raza == row.childNodes[1].textContent
                        : (<Pajaro>item).raza == row.childNodes[1].textContent)
                ) 
                {
                item.nombre = nombreAnimal.value;
                (row.childNodes[2].textContent == eAnimal.Perro ?
                    (<Perro>item).raza = razaAnimal.value
                    : row.childNodes[2].textContent == eAnimal.Gato ?
                        (<Gato>item).raza = razaAnimal.value
                        : (<Pajaro>item).raza = razaAnimal.value)
                }
        })

        row = null;
        resetForm();
        openHideDiv();
        FillGrid();
    }

    export function resetForm() {
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
}