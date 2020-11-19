"use strict";
var Animales;
(function (Animales) {
    class Perro {
        constructor(nombre, raza) {
            this.nombre = nombre;
            this.raza = raza;
            this.tipo = Animales.eAnimal.Perro;
        }
        hacerRuido() {
            return "Guau";
        }
    }
    Animales.Perro = Perro;
})(Animales || (Animales = {}));
