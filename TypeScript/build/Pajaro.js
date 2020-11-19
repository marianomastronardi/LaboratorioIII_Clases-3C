"use strict";
var Animales;
(function (Animales) {
    class Pajaro {
        constructor(nombre, raza) {
            this.nombre = nombre;
            this.raza = raza;
            this.tipo = Animales.eAnimal.Pajaro;
        }
        hacerRuido() {
            return "pi";
        }
    }
    Animales.Pajaro = Pajaro;
})(Animales || (Animales = {}));
